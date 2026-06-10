import validator from 'validator'
import bcrypt from 'bcrypt'
import { v2 as cloudinary } from 'cloudinary'
import doctorModel from '../models/doctorModel.js'
import jwt from 'jsonwebtoken';
import appointmentsModel from '../models/appointmentModel.js'
import userModel from '../models/userModel.js'
import adminModel from "../models/adminModel.js";


// API for adding doctor;

const addDoctor = async (req, res) => {
    try {
        const { name, email, password, speciality, degree, experience, about, fees, address } = req.body

        const imgFile = req.file;



        // console.log({name,email,password,speciality,degree ,experience,about,fees,address},imgFile);      


        if (!name || !email || !password || !speciality || !degree || !experience || !about || !fees || !address) {
            return res.json({
                success: false,
                message: "Missing Details! fill the imformations "
            })
        }
        // validation email content;
        if (!validator.isEmail(email)) {
            return res.json({
                success: false,
                message: "please inter a valid email"
            })
        }

        // validation of password if strong or not
        if (password.length < 8) {
            return res.json({
                success: false,
                message: "please inter strong password"
            })
        }

        //salt doctor password
        const salt = await bcrypt.genSalt(10);
        const hashedpassword = await bcrypt.hash(password, salt);

        //upload image to cloudinary

        const imageupload = await cloudinary.uploader.upload(imgFile.path, { resource_type: "image" })
        const imageurl = imageupload.secure_url;

        //image validation

        const doctorData = {
            name,
            email,
            password: hashedpassword,
            image: imageurl,
            speciality,
            degree,
            experience,
            about,
            fees,
            address: JSON.parse(address),
            date: Date.now()
        }

        const newDoctor = new doctorModel(doctorData);
        await newDoctor.save();

        res.json({ success: true, message: 'Doctor Added' })

    }
    catch (err) {
        console.log(err);
        res.json({ success: false, message: err.message })
    }
}

//API for admin login
const loginAdmin = async (req, res) => {
    try {

        const { email, password } = req.body;

        const admin = await adminModel.findOne({ email });

        if (!admin) {
            return res.json({
                success: false,
                message: "Admin not found"
            });
        }

        const isMatch = await bcrypt.compare(
            password,
            admin.password
        );

        if (!isMatch) {
            return res.json({
                success: false,
                message: "Invalid credentials"
            });
        }

        const token = jwt.sign({ id: admin._id, role: admin.role }, process.env.JWT_SECRET, { expiresIn: "7d" } );

        res.json({
            success: true,
            token
        });

    } catch (err) {
        console.log(err);

        res.json({
            success: false,
            message: err.message
        });
    }
};
//API for getting all doctors data from mongodb

const allDoctors = async (req, res) => {
    try {
        const doctors = await doctorModel.find({}).select('-password')
        res.json({ success: true, doctors });
    }
    catch (err) {
        console.log(err);
        res.json({ success: false, message: err.message })
    }
}
//api to get all appointments from all users

const appointmentsAdmin = async (req, res) => {
    try {
        const appointments = await appointmentsModel.find({});
        res.json({ success: true, appointments });
    }
    catch (err) {
        console.log(err);
        res.json({ success: false, message: err.message })
    }
}

//api to cancell the apoointments

const apppointmentCancel = async (req, res) => {
    try {

        const { appointmentId } = req.body;

        const appointmentData = await appointmentsModel.findById(appointmentId);
        await appointmentsModel.findByIdAndUpdate(appointmentId, { cancelled: true });


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
//api for admin dashboard

const adminDashboard = async (req, res) => {
    try {
        const doctor = await doctorModel.find({});
        const user = await userModel.find({})
        const appointment = await appointmentsModel.find({})

        const dashData = {
            doctors: doctor.length,
            patients: user.length,
            appointments: appointment.length,

            latestAppointments: appointment.reverse().slice(0, 5)
        }

        res.json({ success: true, dashData });
    }
    catch (err) {
        console.log(err);
        res.json({ success: false, message: err.message })
    }
}



export { addDoctor, loginAdmin, allDoctors, appointmentsAdmin, apppointmentCancel, adminDashboard }