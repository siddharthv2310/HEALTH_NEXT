import express from 'express';
import authUser from '../middlewares/authUser.js';
import { chatWithGemini, clearChatHistory, confirmCancellation, getChatHistory } from '../controllers/aiController.js';
import { confirmBooking } from '../controllers/aiController.js';


const aiRouter = express.Router();

aiRouter.post('/chat', authUser,chatWithGemini);
aiRouter.post( "/confirm-booking",authUser,confirmBooking );
aiRouter.post("/confirm-cancel",authUser,confirmCancellation);
aiRouter.get("/history",authUser,getChatHistory);
aiRouter.delete("/clear-history",authUser,clearChatHistory)

export default aiRouter;