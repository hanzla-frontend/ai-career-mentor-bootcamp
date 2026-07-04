import express from 'express';
import { chatController } from '../controllers/chatController.js';

const router = express.Router();

// Send a chat message
router.post('/', chatController.sendMessage);

// Send a chat message with RAG context
router.post('/rag', chatController.sendRAGMessage);

// Clear chat history
router.delete('/history', chatController.clearHistory);

export default router;