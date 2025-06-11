import db from '../config/db.js';

// Send Message
export const sendMessage = (req, res) => {
  const { sender_id, receiver_id, content } = req.body;

  const sql = 'INSERT INTO messages (sender_id, receiver_id, content) VALUES (?, ?, ?)';
  db.query(sql, [sender_id, receiver_id, content], (err, result) => {
    if (err) return res.status(500).json({ error: 'Database error' });
    return res.status(201).json({ message: 'Message sent successfully' });
  });
};

// Get Messages by Conversation
export const getMessages = (req, res) => {
  const { conversationId } = req.params;

  const sql = `
    SELECT * FROM messages
    WHERE (sender_id = ? AND receiver_id = ?) OR (sender_id = ? AND receiver_id = ?)
    ORDER BY created_at ASC
  `;
  db.query(sql, [req.user.id, conversationId, conversationId, req.user.id], (err, results) => {
    if (err) return res.status(500).json({ error: 'Database error' });
    return res.json(results);
  });
};
