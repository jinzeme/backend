// File: backend/routes/posts.js
import express from 'express';
import { likePost, getPostComments, addComment } from '../controllers/postActionsController.js';
import { getFeedPosts, createPost } from '../controllers/postController.js';
import authenticateToken from '../middleware/authMiddleware.js';

const router = express.Router();

// ✅ Like and Comment Routes
router.post('/:id/like', authenticateToken, likePost);
router.get('/:id/comments', authenticateToken, getPostComments);
router.post('/:id/comments', authenticateToken, addComment);

// ✅ Feed and Post Routes
router.get('/feed', authenticateToken, getFeedPosts);
router.post('/', authenticateToken, createPost);

export default router;
