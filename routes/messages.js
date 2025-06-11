import express from 'express';
import { sendMessage, getMessages } from '../controllers/messageController.js';
import authenticateToken from '../middleware/authMiddleware.js';

const router = express.Router();

// ✅ Protect message routes
router.post('/', authenticateToken, sendMessage);
router.get('/:conversationId', authenticateToken, getMessages);

export default router;
