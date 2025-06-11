import express from 'express';
import { followUser, unfollowUser } from '../controllers/followsController.js';
import authenticateToken from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/follow/:id', authenticateToken, followUser);
router.delete('/unfollow/:id', authenticateToken, unfollowUser);

export default router;
