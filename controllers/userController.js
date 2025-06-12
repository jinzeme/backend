// File: backend/controllers/userController.js
import db from '../config/db.js';

// ✅ Get All Users (Excluding Passwords)
export const getUsers = async (req, res) => {
  try {
    const [rows] = await db.query('SELECT id, username, email, profile_picture FROM users');
    res.json(rows);
  } catch (error) {
    console.error('❌ Error fetching users:', error.message);
    res.status(500).json({ message: 'Database error' });
  }
};

// ✅ Get Single User Profile by ID
export const getUserProfile = async (req, res) => {
  const userId = req.params.id;

  if (!userId) {
    return res.status(400).json({ message: 'User ID is required' });
  }

  try {
    const [rows] = await db.query(
      'SELECT id, username, email, profile_picture FROM users WHERE id = ?',
      [userId]
    );

    if (rows.length === 0) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json(rows[0]);
  } catch (error) {
    console.error('❌ Error fetching user profile:', error.message);
    res.status(500).json({ message: 'Database error' });
  }
};

// ✅ Follow a User
export const followUser = async (req, res) => {
  const followerId = req.user.id;
  const followingId = req.params.id;

  if (followerId == followingId) {
    return res.status(400).json({ message: 'You cannot follow yourself' });
  }

  try {
    await db.execute(
      'INSERT INTO follows (follower_id, following_id) VALUES (?, ?)',
      [followerId, followingId]
    );
    res.json({ message: 'User followed successfully' });
  } catch (err) {
    console.error('❌ Error following user:', err.message);
    res.status(500).json({ message: 'Error following user' });
  }
};

// ✅ Unfollow a User
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
    console.error('❌ Error unfollowing user:', err.message);
    res.status(500).json({ message: 'Error unfollowing user' });
  }
};
