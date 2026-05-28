import validator from 'validator'
import bcrypt from 'bcrypt'
import userModel from '../models/userModel.js'
import jwt from 'jsonwebtoken'
import doctorModel from '../models/doctorModel.js'
import {v2  as cloudinary} from 'cloudinary'
import appointmentModel from '../models/appointmentModel.js'

// api to register user

const registerUser = async (req,res)=>{
    try{
        const {name,email,password}= req.body;

        if(!name || !email || !password){
            return res.json({success:false , message:"enter all credentials"});
        }
        if(!validator.isEmail(email)){
            return res.json({success:false , message:"enter a valid email"});
        }
        if(password.length < 8){
            return res.json({success:false , message:"enter strong password of length 8 or greater"});
        }

        const salt=await bcrypt.genSalt(10);
        const hashedPassword= await  bcrypt.hash(password,salt);

        const userData={
            name,
            email,
            password : hashedPassword
        }

        const newUser=new userModel(userData);
        const user= await newUser.save();

        //token creation 
        const token = jwt.sign({id:user._id},process.env.JWT_SECRET)
        res.json({
            success:true,
            token
        })

    }
    catch(err){
        console.log(err);
        res.json({success:false , message:err.message})
    }
}

// api for user login

const loginUser= async (req,res)=>{
    try{

        const {email,password} = req.body;

        const user = await userModel.findOne({email});

        if(!user){
            return res.json({success:false, message:'user not found'});
        }

        const isMatch= await bcrypt.compare(password,user.password);

        if(isMatch){
            const token = jwt.sign({id:user._id},process.env.JWT_SECRET)
            res.json({success:true,token});
        }
        else{
           res.json({success:false, message:'Invali credentials'});
        }

    }
    catch(err){
        console.log(err);
        res.json({success:false , message:err.message})
    }
}

//api to get user profile data

const getProfile = async (req,res)=>{
    try{
        const userId = req.userId;

        const userData = await userModel.findById(userId).select('-password');

        res.json({success:true,userData});
    }
    catch(err){
        console.log(err);
        res.json({success:false , message:err.message})
    }
}
//api to update user profile

const updateProfile = async (req,res)=>{
    try{
        const userId = req.userId;

        const {name,phone,address,dob,gender}=req.body;
        const imageFile=req.file;

        if(!userId || !name || !phone || !address || !dob || !gender){
            return res.json({success:false , message:"data missing"})
        }

        await userModel.findByIdAndUpdate(userId,{name,phone,address:JSON.parse(address),dob,gender})

        if(imageFile){
            //upload image to cloudinary
            const imageUpload= await cloudinary.uploader.upload(imageFile.path,{resource_type:'image'})
            const imageUrl=imageUpload.secure_url

            await userModel.findByIdAndUpdate(userId,{image:imageUrl})
        }
        res.json({success:true,message:"profile Updated!"})
    }
    catch(err){
        console.log(err);
        res.json({success:false , message:err.message})
    }
}

// api for booking appointments

const bookAppointment=async (req,res)=>{
    try{
        const userId=req.userId;
        const {docId,slotDate,slotTime}=req.body;

        const docData=await doctorModel.findById(docId).select('-password');

        if(!docData.available){
            return res.json({success:false,message:"doctor not available"});
        }
        
        let slots_booked = docData.slots_booked || {};

        // checking for slot availability;

        if(slots_booked[slotDate]){
            if(slots_booked[slotDate].includes(slotTime)){
                return res.json({success:false,message:"slots not available"});
            }
            else{
                slots_booked[slotDate].push(slotTime)
            }
        }
        else{
            slots_booked[slotDate]=[];
            slots_booked[slotDate].push(slotTime);
        }

        const userData=await userModel.findById(userId).select('-password');

        const docDataObj = docData.toObject();
        delete docDataObj.slots_booked;

        const appointmentData={
            userId,
            docId,
            userData,
            docData: docDataObj,
            amount:docData.fees,
            slotTime,
            slotDate,
            date:Date.now()
        }

        const newAppointment  = new appointmentModel(appointmentData);
        await newAppointment.save();

        // save new slotsData in docData

        await doctorModel.findByIdAndUpdate(docId,{slots_booked})

        res.json({success:true,message:'Appointment booked'})

    }
    catch(err){
        console.log(err);
        res.json({success:false , message:err.message})
    }
}

export {registerUser,loginUser,getProfile,updateProfile,bookAppointment}