import express from 'express'
import { bookAppointment, cancelAppointments, getProfile, listAppointment, loginUser, paymentRazorpay, registerUser, ResetPassword, sendResetOtp, updateProfile, verifyOtp, verifyRazorpay } from '../controllers/userController.js'
import authUser from '../middlewares/authUser.js';
import upload from '../middlewares/multer.js';


const userRouter =express.Router();

userRouter.post('/register',registerUser);
userRouter.post('/login',loginUser);
userRouter.get('/get-profile',authUser,getProfile);
userRouter.post('/update-profile',upload.single('image'),authUser,updateProfile)
userRouter.post('/book-appointment',authUser,bookAppointment)
userRouter.get('/appointments',authUser,listAppointment)
userRouter.post('/cancel-appointment',authUser,cancelAppointments)
userRouter.post('/payment-razorpay',authUser,paymentRazorpay)
userRouter.post('/verifyRazorpay',authUser,verifyRazorpay)
userRouter.post('/send-reset-otp',sendResetOtp);
userRouter.post('/verify-otp',verifyOtp);
userRouter.post('/reset-password',ResetPassword);




export default userRouter