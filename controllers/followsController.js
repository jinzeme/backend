import db from '../config/db.js';

// Follow a user
export const followUser = async (req, res) => {
    const followerId = req.user.id;
    const followingId = req.params.id;

    if (followerId == followingId) return res.status(400).json({ message: 'You cannot follow yourself' });

    try {
        await db.execute(
            'INSERT INTO follows (follower_id, following_id) VALUES (?, ?)',
            [followerId, followingId]
        );
        res.json({ message: 'User followed successfully' });
    } catch (err) {
        res.status(500).json({ message: 'Error following user' });
    }
};

// Unfollow a user
export const unfollowUser = async (req, res) => {
    const followerId = req.user.id;
    const followingId = req.params.id;

    try {
        await db.execute(
            'DELETE FROM follows WHERE follower_id = ? AND following_id = ?',
            [followerId, followingId]
        );
        res.json({ message: 'User unfollowed successfully' });
    } catch (err) {
        res.status(500).json({ message: 'Error unfollowing user' });
    }
};
