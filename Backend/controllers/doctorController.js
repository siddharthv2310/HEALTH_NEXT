import doctorModel from "../models/doctorModel.js";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import appointmentModel from "../models/appointmentModel.js";


const changeAvailibility = async(req,res)=>{
    try{
        const {docId}=req.body;
        const docData= await doctorModel.findById(docId);
        await doctorModel.findByIdAndUpdate(docId,{available:!docData.available});
        res.json({success:true,message:"Availibility changed !"})
    }
    catch(err){
        console.log(err);
        res.json({success:false , message:err.message})
    }
}

const doctorList =async(req,res)=>{
    try{
        const doctors = await doctorModel.find({}).select(['-password','-email'])

        res.json({success:true,doctors});

    }
    catch(e){
        console.log(e);
        res.json({success:false , message:e.message})
    }
}
// Api for doctor login

const loginDoctor = async (req,res)=>{
    try{
        const { email,password} = req.body;
        const doctor = await doctorModel.findOne({email});

        if(!doctor){
            return res.json({success:false,message:"invalid credentials"});
        }
        const ismatch = await bcrypt.compare(password,doctor.password)

        if(ismatch){
            const token = jwt.sign ({id:doctor._id},process.env.JWT_SECRET)

            res.json({success:true,token});
        }
        else{
            res.json({success:false,message:"invalid credentials"})
        }
    }
    catch(e){
        console.log(e);
        res.json({success:false , message:e.message})
    }
    
}
//api for getting all the appointments of a docotr
const appointmentsDoctor = async(req,res)=>{
    try{
        const docId =req.docId;

        const appointments = await appointmentModel.find({docId});

       res.json({success:true,appointments})
    }
    catch(e){
        console.log(e);
        res.json({success:false , message:e.message})
    }
}

// for doctor pannel api to mark the appointment completed

const appointmentCompleted= async(req,res)=>{
    try{
        const docId = req.docId;
        const {appointmentId} =req.body;

        const appointmentData =await appointmentModel.findById(appointmentId);

        if(appointmentData && appointmentData.docId === docId){
            await appointmentModel.findByIdAndUpdate(appointmentId,{isCompleted:true});
            return res.json({success:true,message:'appointment Completed'})
        }
        else{
            return res.json({success:false,message:'mark failed'})
        }
    }
    catch(e){
        console.log(e);
        res.json({success:false , message:e.message})
    }
}

// for doctor pannel api to cancel the appointment 

const appointmentCancel= async(req,res)=>{
    try{
        const docId = req.docId;
        const {appointmentId} =req.body;

        const appointmentData =await appointmentModel.findById(appointmentId);

        if(appointmentData && appointmentData.docId === docId){
            await appointmentModel.findByIdAndUpdate(appointmentId,{cancelled:true});
            return res.json({success:true,message:'appointment cancelled'})
        }
        else{
            return res.json({success:false,message:'cancellation failed'})
        }
    }
    catch(e){
        console.log(e);
        res.json({success:false , message:e.message})
    }
}
//api for dashboard
const doctorDashboard = async(req,res)=>{
    try{
        const docId = req.docId;

        const appointmentData =await appointmentModel.find({docId});

        let earning = 0;
        appointmentData.map((item)=>{
            if(item.isCompleted || item.payment){
                earning+=item.amount
            }
        })

        let patients=[]

        appointmentData.map((item)=>{
            if(!patients.includes(item.userId)){
                patients.push(item.userId)
            }
        })

        const dashData = {
            earning,
            appointments:appointmentData.length,
            patients:patients.length,
            latestAppointments : appointmentData.reverse().slice(0,5)
        }

        res.json({success:true,dashData});

    }
    catch(e){
        console.log(e);
        res.json({success:false , message:e.message})
    }
}
// api to get the doctor profile 

const doctorProfile =async(req,res)=>{
    try{
        const docId=req.docId;
        const profileData = await doctorModel.findById(docId).select('-password');

        res.json({success:true,profileData});
    }
     catch(e){
        console.log(e);
        res.json({success:false , message:e.message})
    }
}

// api to update the doctor profile

const updateDoctorProfile=async (req,res)=>{
    try{
        const docId=req.docId;
        const { fees,address,available} = req.body;

        await doctorModel.findByIdAndUpdate(docId,{fees,address,available})

        res.json({success:true,message :"profile updated"});
    }
     catch(e){
        console.log(e);
        res.json({success:false , message:e.message})
    }
}

export {changeAvailibility,doctorList,loginDoctor,appointmentsDoctor,appointmentCompleted,appointmentCancel,doctorDashboard,doctorProfile,updateDoctorProfile}