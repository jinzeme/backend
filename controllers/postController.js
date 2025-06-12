import db from '../config/db.js';

// ✅ Get Feed Posts (User and Followed Users)
export const getFeedPosts = async (req, res) => {
  const userId = req.user.id;

  try {
    const sql = `
      SELECT posts.*, users.username, users.profile_picture
      FROM posts
      JOIN users ON posts.user_id = users.id
      WHERE posts.user_id = ? OR posts.user_id IN (
        SELECT following_id FROM follows WHERE follower_id = ?
      )
      ORDER BY posts.created_at DESC
    `;

    const [rows] = await db.query(sql, [userId, userId]); // ✅ Use db.query, not db.execute
    res.json(rows);
  } catch (err) {
    console.error('Error fetching feed posts:', err.message);
    res.status(500).json({ message: 'Error fetching feed posts' });
  }
};

// ✅ Create a New Post
export const createPost = async (req, res) => {
  const userId = req.user.id;
  const { content, image_url } = req.body;

  if (!content) {
    return res.status(400).json({ message: 'Post content is required' });
  }

  try {
    const sql = 'INSERT INTO posts (user_id, content, image_url) VALUES (?, ?, ?)';
    await db.query(sql, [userId, content, image_url || null]); // ✅ Use db.query

    res.status(201).json({ message: 'Post created successfully' });
  } catch (err) {
    console.error('Error creating post:', err.message);
    res.status(500).json({ message: 'Error creating post' });
  }
};
