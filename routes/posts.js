import express from 'express';
import { getFeedPosts, createPost } from '../controllers/postsController.js';
import authenticateToken from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/feed', authenticateToken, getFeedPosts);
router.post('/', authenticateToken, createPost);

export default router;
