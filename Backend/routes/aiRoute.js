import express from 'express';
import authUser from '../middlewares/authUser.js';
import { chatWithGemini } from '../controllers/aiController.js';

const aiRouter = express.Router();

aiRouter.post('/chat',authUser,chatWithGemini);

export default aiRouter;