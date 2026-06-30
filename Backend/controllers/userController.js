import validator from 'validator'
import bcrypt from 'bcrypt'
import userModel from '../models/userModel.js'
import jwt from 'jsonwebtoken'
import doctorModel from '../models/doctorModel.js'
import { v2 as cloudinary } from 'cloudinary'
import appointmentModel from '../models/appointmentModel.js'
import razorpay from 'razorpay'
import sendEmail from '../utils/sendEmail.js'
import { OAuth2Client } from "google-auth-library";
import { verifyGoogleCode } from "../services/authService.js";
import crypto from "crypto";

// import { validateWebhookSignature } from 'razorpay'
// api to register user


const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.json({ success: false, message: "enter all credentials" });
        }
        if (!validator.isEmail(email)) {
            return res.json({ success: false, message: "enter a valid email" });
        }
        if (password.length < 8) {
            return res.json({ success: false, message: "enter strong password of length 8 or greater" });
        }

        const existingUser = await userModel.findOne({ email });

        if (existingUser) {
            return res.json({
                success: false,
                message: "User already exists"
            });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const userData = {
            name,
            email,
            password: hashedPassword
        }

        const newUser = new userModel(userData);
        const user = await newUser.save();

        //token creation 
    
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET,  { expiresIn: "7d" })
        res.json({
            success: true,
            token
        })

    }
    catch (err) {
        console.log(err);
        res.json({ success: false, message: err.message })
    }
}

// api for user login

const loginUser = async (req, res) => {
    try {

        const { email, password } = req.body;

        const user = await userModel.findOne({ email });

        if (!user) {
            return res.json({ success: false, message: 'user not found' });
        }

        if (!user.password) {
            return res.json({
                success: false,
                message: "This account was created using Google Sign-In"
            });
        }


        const isMatch = await bcrypt.compare(password, user.password);

        if (isMatch) {
             const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET,  { expiresIn: "7d" })
            // const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET)
            res.json({ success: true, token });
        }
        else {
            res.json({ success: false, message: 'Invalid credentials' });
        }

    }
    catch (err) {
        console.log(err);
        res.json({ success: false, message: err.message })
    }
}

//api to get user profile data

const getProfile = async (req, res) => {
    try {
        const userId = req.userId;

        const userData = await userModel.findById(userId).select('-password');

        res.json({ success: true, userData });
    }
    catch (err) {
        console.log(err);
        res.json({ success: false, message: err.message })
    }
}
//api to update user profile

const updateProfile = async (req, res) => {
    try {
        const userId = req.userId;

        const { name, phone, address, dob, gender } = req.body;
        const imageFile = req.file;

        if (!userId || !name || !phone || !address || !dob || !gender) {
            return res.json({ success: false, message: "data missing" })
        }

        let parsedAddress;

        try {

            parsedAddress = typeof address === "string" ? JSON.parse(address) : address;

        }
        catch {

            return res.json({
                success: false,
                message: "Invalid address format"
            });
        }

        await userModel.findByIdAndUpdate(userId, { name, phone, address: parsedAddress, dob, gender })

        if (imageFile) {
            //upload image to cloudinary
            const imageUpload = await cloudinary.uploader.upload(imageFile.path, { resource_type: 'image' })
            const imageUrl = imageUpload.secure_url

            await userModel.findByIdAndUpdate(userId, { image: imageUrl })
        }
        res.json({ success: true, message: "profile Updated!" })
    }
    catch (err) {
        console.log(err);
        res.json({ success: false, message: err.message })
    }
}

// api for booking appointments


const bookAppointment = async (req, res) => {
    try {
        const userId = req.userId;
        const { docId, slotDate, slotTime } = req.body;

        const docData = await doctorModel.findById(docId).select('-password');

        if (!docData) {
            return res.json({
                success: false,
                message: "Doctor not found"
            });
        }

        if (!docData.available) {
            return res.json({ success: false, message: "doctor not available" });
        }

        let slots_booked = JSON.parse(
            JSON.stringify(docData.slots_booked || {})
        );

        // checking slot availability

        if (slots_booked[slotDate]) {

            if (slots_booked[slotDate].includes(slotTime)) {

                return res.json({
                    success: false,
                    message: "slot not available"
                });

            }

            slots_booked[slotDate].push(slotTime);

        } else {

            slots_booked[slotDate] = [slotTime];
        }
        const userData = await userModel.findById(userId).select('-password');

        const docDataObj = docData.toObject();
        delete docDataObj.slots_booked;

        const appointmentData = {
            userId,
            docId,
            userData,
            docData: docDataObj,
            amount: docData.fees,
            slotTime,
            slotDate,
            date: Date.now()
        }

        const newAppointment = new appointmentModel(appointmentData);
        await newAppointment.save();

        // save new slotsData in docData

        await doctorModel.findByIdAndUpdate(
            docId,
            {
                $set: {
                    slots_booked: slots_booked
                }
            }
        )

        res.json({ success: true, message: 'Appointment booked' })

    }
    catch (err) {
        console.log(err);
        res.json({ success: false, message: err.message })
    }
}
// api for the my appointnments;

const listAppointment = async (req, res) => {
    try {
        const userId = req.userId;
        const appointments = await appointmentModel.find({ userId })

        res.json({ success: true, appointments })
    }
    catch (err) {
        console.log(err);
        res.json({ success: false, message: err.message })
    }
}

// api to cancell Appointments

const cancelAppointments = async (req, res) => {
    try {
        const userId = req.userId;
        const { appointmentId } = req.body;

        const appointmentData = await appointmentModel.findById(appointmentId);

        if (!appointmentData) {
            return res.json({
                success: false,
                message: "Appointment not found"
            });
        }

        //verify appointmentUser

        if (appointmentData.userId.toString() != userId) {
            return res.json({ success: false, message: "unauthorised action" });
        }

        await appointmentModel.findByIdAndUpdate(appointmentId, { cancelled: true })

        // releasing doctor slot

        const { docId, slotDate, slotTime } = appointmentData

        const doctorData = await doctorModel.findById(docId);

        let slots_booked = doctorData.slots_booked;

        slots_booked[slotDate] = slots_booked[slotDate].filter(e => e !== slotTime)

        await doctorModel.findByIdAndUpdate(docId, { slots_booked });

        res.json({ success: true, message: "appointment cancelled" })
    }
    catch (err) {
        console.log(err);
        res.json({ success: false, message: err.message })
    }
}

const razorpayInstance = new razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET
})
// api to make a payment of aapointments

const paymentRazorpay = async (req, res) => {
    try {
        const { appointmentId } = req.body
        const appointmentData = await appointmentModel.findById(appointmentId)

        if (!appointmentData || appointmentData.cancelled) {
            return res.json({ success: true, message: "Appointment Cancelled or Not Found !" })
        }

        // creating options for razorpay payment;

        const options = {
            amount: appointmentData.amount * 100,
            currency: process.env.CURRENCY,
            receipt: appointmentId,
        }

        //creation of an order

        const order = await razorpayInstance.orders.create(options)

        res.json({ success: true, order })
    }
    catch (err) {
        console.log(err);
        res.json({ success: false, message: err.message })
    }
}
//api to verify payment 
const verifyRazorpay = async (req, res) => {
    try {

        const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

        const generatedSignature = crypto
            .createHmac( "sha256", process.env.RAZORPAY_KEY_SECRET )
            .update( razorpay_order_id + "|" + razorpay_payment_id )
            .digest("hex");

        if ( generatedSignature !== razorpay_signature ) 
        {
            return res.json({
                success: false,
                message: "Payment verification failed"
            });
        }

        const orderInfo = await razorpayInstance.orders.fetch( razorpay_order_id );

        const appointment = await appointmentModel.findById( orderInfo.receipt );

        if (!appointment) { return res.json({
                success: false,
                message: "Appointment not found"
            });
        }

        if (appointment.payment) {
            return res.json({
                success: true,
                message: "Already verified"
            });
        }

        appointment.payment = true;
        await appointment.save();

        return res.json({
            success: true,
            message: "Payment successful"
        });

    } catch (err) {

        console.log(err);

        return res.json({
            success: false,
            message: err.message
        });
    }
};
// api for sending Reser OTP

const sendResetOtp = async (req, res) => {
    try {
        const { email } = req.body;

        if (!email) {
            return res.json({ success: false, message: "Email is required" });
        }

        const data = await userModel.findOne({ email });

        if (!data) {
            return res.json({ success: false, message: "user not found" });
        }

        const otp = Math.floor(100000 + Math.random() * 900000).toString();



        // it should be await  
        await sendEmail(
            email,
            "password reset otp",
            `
            <h2>Password Reset Request</h2>
            <p>Your OTP is:</p>
            <h1>${otp}</h1>
            <p>This OTP will expire in 1 minutes.</p>

            `
        )

        const hashedOtp = await bcrypt.hash(otp, 10);

        data.resetOtp = hashedOtp;

        data.resetOtpExpireAt = Date.now() + 1 * 60 * 1000;

        data.isResetVerified = false;

        await data.save();

        return res.json({ success: true, message: "OTP generated successfully", expireAt: data.resetOtpExpireAt });

    }
    catch (err) {
        console.log(err);
        res.json({ success: false, message: err.message })
    }
}
// api for  verify otp 

const verifyOtp = async (req, res) => {
    try {
        const { email, otp } = req.body;

        if (!email || !otp) {
            return res.json({ success: false, message: "Email and otp are required" });
        }

        const data = await userModel.findOne({ email });

        if (!data) {
            return res.json({ success: false, message: "user not found" });
        }


        const isOtpValid = await bcrypt.compare(otp, data.resetOtp);

        if (!isOtpValid) {
            return res.json({ success: false, message: "Invalid OTP" })
        }

        if (data.resetOtpExpireAt < Date.now()) {
            return res.json({ success: false, message: "OTP expired" })
        }

        data.isResetVerified = true;
        await data.save();

        res.json({ success: true, message: "OTP verified successfully" })

    }
    catch (err) {
        console.log(err);
        res.json({ success: false, message: err.message })
    }
}

// api for reseting password

const ResetPassword = async (req, res) => {
    try {
        const { email, newpassword } = req.body;

        if (!email || !newpassword) {
            return res.json({
                success: false,
                message: "Missing Details"
            });
        }

        const data = await userModel.findOne({ email });

        if (!data) {
            return res.json({
                success: false,
                message: "User not found"
            });
        }


        if (!data.isResetVerified) {
            return res.json({
                success: false,
                message: "verify OTP first"
            });
        }

        if (data.resetOtpExpireAt < Date.now()) {
            return res.json({
                success: false,
                message: "OTP Expired"
            });
        }

        const hashedPassword = await bcrypt.hash(newpassword, 10);

        data.password = hashedPassword

        data.resetOtp = "";
        data.resetOtpExpireAt = 0;
        data.isResetVerified = false;

        await data.save();

        return res.json({
            success: true,
            message: "Password Reset Successfully"
        });
    }
    catch (err) {
        console.log(err);
        res.json({ success: false, message: err.message })
    }
}
// api for google login

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

const googleLogin = async (req, res) => {
    try {
        const { idToken } = req.body;

        const ticket = await client.verifyIdToken({
            idToken,
            audience: process.env.GOOGLE_CLIENT_ID,
        });

        const payload = ticket.getPayload();
        const { email, name, picture } = payload;

        let user = await userModel.findOne({ email });

        if (!user) {
            user = await userModel.create({
                name,
                email,
                image: picture,
                isGoogleUser: true,
            });
        }

        // const token = jwt.sign(
        //     { id: user._id },
        //     process.env.JWT_SECRET,
        //     { expiresIn: "7d" }
        // );
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET,  { expiresIn: "7d" })

        return res.json({
            success: true,
            token,
        });

    } catch (error) {
        console.log(error);
        return res.json({
            success: false,
            message: error.message,
        });
    }
};
export {
    registerUser, loginUser, getProfile, updateProfile, bookAppointment, listAppointment, cancelAppointments,
    paymentRazorpay, verifyRazorpay, sendResetOtp, verifyOtp, ResetPassword, googleLogin,
}