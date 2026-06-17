import express from 'express';
import authUser from '../middlewares/authUser.js';
import { chatWithGemini, confirmCancellation } from '../controllers/aiController.js';
import { confirmBooking } from '../controllers/aiController.js';


const aiRouter = express.Router();

aiRouter.post('/chat', authUser,chatWithGemini);
aiRouter.post( "/confirm-booking",authUser,confirmBooking );
aiRouter.post("/confirm-cancel",authUser,confirmCancellation)

export default aiRouter;