import express from 'express';
<<<<<<< HEAD
import { likePost, getPostComments, addComment } from '../controllers/postActionsController.js';
=======
>>>>>>> 1e6f5ac9536420be8add10cae38dfdb1e4a556ad
import authenticateToken from '../middleware/authMiddleware.js';

const router = express.Router();

<<<<<<< HEAD
// Existing routes...
router.post('/:id/like', authenticateToken, likePost);
router.get('/:id/comments', authenticateToken, getPostComments);
router.post('/:id/comments', authenticateToken, addComment);
=======
// ✅ Protect these routes
router.get('/feed', authenticateToken, getFeedPosts);
router.post('/', authenticateToken, createPost);
>>>>>>> 1e6f5ac9536420be8add10cae38dfdb1e4a556ad

export default router;
