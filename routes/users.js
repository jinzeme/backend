import express from 'express';
import { getUsers, getUserProfile, followUser, unfollowUser } from '../controllers/userController.js';
import authenticateToken from '../middleware/authMiddleware.js';

const router = express.Router();

// Existing routes...
router.get('/', authenticateToken, getUsers);
router.get('/:id', authenticateToken, getUserProfile);
router.post('/:id/follow', authenticateToken, followUser);
router.post('/:id/unfollow', authenticateToken, unfollowUser);

export default router;
