import express from 'express';
const router = express.Router();
import { sendMessage, getMessages } from '../controllers/messageController.js';
import authenticateToken from '../middleware/authMiddleware.js';

router.post('/', authenticateToken, sendMessage);
router.get('/:conversationId', authenticateToken, getMessages);

export default router;
