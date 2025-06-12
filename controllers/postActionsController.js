import db from '../config/db.js';

// ✅ Like or Unlike Post
export const likePost = async (req, res) => {
  const userId = req.user.id;
  const postId = req.params.id;

  try {
    const [existing] = await db.query('SELECT * FROM likes WHERE user_id = ? AND post_id = ?', [userId, postId]);

    if (existing.length > 0) {
      await db.query('DELETE FROM likes WHERE user_id = ? AND post_id = ?', [userId, postId]);
      return res.json({ message: 'Post unliked' });
    } else {
      await db.query('INSERT INTO likes (user_id, post_id) VALUES (?, ?)', [userId, postId]);
      return res.json({ message: 'Post liked' });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error processing like' });
  }
};

// ✅ Get Comments
export const getPostComments = async (req, res) => {
  const postId = req.params.id;

  try {
    const [comments] = await db.query(`
      SELECT comments.id, comments.content, comments.created_at, users.username
      FROM comments
      JOIN users ON comments.user_id = users.id
      WHERE comments.post_id = ?
      ORDER BY comments.created_at ASC
    `, [postId]);

    res.json(comments);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error fetching comments' });
  }
};

// ✅ Add Comment
export const addComment = async (req, res) => {
  const userId = req.user.id;
  const postId = req.params.id;
  const { content } = req.body;

  if (!content) return res.status(400).json({ message: 'Comment cannot be empty' });

  try {
    await db.query('INSERT INTO comments (user_id, post_id, content) VALUES (?, ?, ?)', [userId, postId, content]);
    res.status(201).json({ message: 'Comment added successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error adding comment' });
  }
};
