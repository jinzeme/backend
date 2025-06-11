import db from '../config/db.js';

// Get feed posts (user and followed users)
export const getFeedPosts = async (req, res) => {
    const userId = req.user.id;
    try {
        const [rows] = await db.execute(
            `SELECT posts.*, users.username, users.profile_picture
             FROM posts
             JOIN users ON posts.user_id = users.id
             WHERE posts.user_id = ? OR posts.user_id IN (SELECT following_id FROM follows WHERE follower_id = ?)
             ORDER BY posts.created_at DESC`,
            [userId, userId]
        );
        res.json(rows);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching feed posts' });
    }
};

// Create a new post
export const createPost = async (req, res) => {
    const userId = req.user.id;
    const { content, image_url } = req.body;

    if (!content) return res.status(400).json({ message: 'Post content is required' });

    try {
        await db.execute(
            'INSERT INTO posts (user_id, content, image_url) VALUES (?, ?, ?)',
            [userId, content, image_url || null]
        );
        res.status(201).json({ message: 'Post created successfully' });
    } catch (err) {
        res.status(500).json({ message: 'Error creating post' });
    }
};
