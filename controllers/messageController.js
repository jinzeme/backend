import db from '../config/db.js';

// ✅ Send Message (Async/Await)
export const sendMessage = async (req, res) => {
  const { sender_id, receiver_id, content } = req.body;

  try {
    const sql = 'INSERT INTO messages (sender_id, receiver_id, content) VALUES (?, ?, ?)';
    await db.query(sql, [sender_id, receiver_id, content]);

    res.status(201).json({ message: 'Message sent successfully' });
  } catch (error) {
    console.error('Error sending message:', error.message);
    res.status(500).json({ error: 'Database error' });
  }
};

// ✅ Get Messages by Conversation (Async/Await)
export const getMessages = async (req, res) => {
  const { conversationId } = req.params;

  try {
    const sql = `
      SELECT * FROM messages
      WHERE (sender_id = ? AND receiver_id = ?) OR (sender_id = ? AND receiver_id = ?)
      ORDER BY created_at ASC
    `;

    const [results] = await db.query(sql, [req.user.id, conversationId, conversationId, req.user.id]);

    res.json(results);
  } catch (error) {
    console.error('Error fetching messages:', error.message);
    res.status(500).json({ error: 'Database error' });
  }
};
