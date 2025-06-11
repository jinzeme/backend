import db from '../config/db.js';

// ✅ Follow a User
export const followUser = async (req, res) => {
  const followerId = req.user.id;
  const followingId = req.params.id;

  if (followerId == followingId) {
    return res.status(400).json({ message: 'You cannot follow yourself' });
  }

  try {
    const sql = 'INSERT INTO follows (follower_id, following_id) VALUES (?, ?)';
    await db.query(sql, [followerId, followingId]); // ✅ Correct pool query method

    res.json({ message: 'User followed successfully' });
  } catch (err) {
    console.error('Error following user:', err.message);
    res.status(500).json({ message: 'Error following user' });
  }
};

// ✅ Unfollow a User
export const unfollowUser = async (req, res) => {
  const followerId = req.user.id;
  const followingId = req.params.id;

  try {
    const sql = 'DELETE FROM follows WHERE follower_id = ? AND following_id = ?';
    await db.query(sql, [followerId, followingId]); // ✅ Correct pool query method

    res.json({ message: 'User unfollowed successfully' });
  } catch (err) {
    console.error('Error unfollowing user:', err.message);
    res.status(500).json({ message: 'Error unfollowing user' });
  }
};

// ✅ Get Followers of a User
export const getFollowers = async (req, res) => {
  const { userId } = req.params;

  try {
    const sql = 'SELECT * FROM follows WHERE following_id = ?';
    const [rows] = await db.query(sql, [userId]);

    res.json(rows);
  } catch (err) {
    console.error('Error fetching followers:', err.message);
    res.status(500).json({ message: 'Error fetching followers' });
  }
};
