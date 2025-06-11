import express from 'express';
import { getUsers, getUserProfile } from '../controllers/userController.js';
import authenticateToken from '../middleware/authMiddleware.js';

const router = express.Router();

// ✅ Protect these routes
router.get('/', authenticateToken, getUsers);
router.get('/:id', authenticateToken, getUserProfile);

export default router;
