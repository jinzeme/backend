import express from 'express';
import { likePost, getPostComments, addComment } from '../controllers/postActionsController.js';
import authenticateToken from '../middleware/authMiddleware.js';

const router = express.Router();

// Existing routes...
router.post('/:id/like', authenticateToken, likePost);
router.get('/:id/comments', authenticateToken, getPostComments);
router.post('/:id/comments', authenticateToken, addComment);

export default router;
