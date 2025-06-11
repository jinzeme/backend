import db from '../config/db.js';

// ✅ Get All Users (Excluding Passwords)
export const getUsers = async (req, res) => {
  try {
    const [rows] = await db.query('SELECT id, username, email, profile_picture FROM users'); // Exclude password

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
