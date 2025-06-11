import express from 'express';
const router = express.Router();
import { getUsers, getUserProfile } from '../controllers/userController.js';
import authenticateToken from '../middleware/authMiddleware.js';

router.get('/', authenticateToken, getUsers);
router.get('/:id', authenticateToken, getUserProfile);

export default router;
