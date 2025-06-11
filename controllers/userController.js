import db from '../config/db.js';

// Get All Users
export const getUsers = (req, res) => {
  const sql = 'SELECT id, username, email FROM users';
  db.query(sql, (err, results) => {
    if (err) return res.status(500).json({ error: 'Database error' });
    return res.json(results);
  });
};

// Get User Profile by ID
export const getUserProfile = (req, res) => {
  const userId = req.params.id;

  const sql = 'SELECT id, username, email FROM users WHERE id = ?';
  db.query(sql, [userId], (err, results) => {
    if (err || results.length === 0) return res.status(404).json({ error: 'User not found' });
    return res.json(results[0]);
  });
};
