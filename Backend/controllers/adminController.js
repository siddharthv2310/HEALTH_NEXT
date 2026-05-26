import validator from 'validator'
import bcrypt from 'bcrypt'
import {v2 as cloudinary} from 'cloudinary'
import doctorModel from '../models/doctorModel.js'
import jwt from 'jsonwebtoken';


// API for adding doctor;

const addDoctor=async(req,res)=>{
    try{
        const {name,email,password,speciality,degree ,experience,about,fees,address}=req.body
        
        const imgFile=req.file;
        
        

        // console.log({name,email,password,speciality,degree ,experience,about,fees,address},imgFile);      

        
        if(!name || !email || !password  || !speciality || !degree || !experience || !about || !fees || !address){
            return res.json({
                success:false,
                message:"Missing Details! fill the imformations "
            })
        }
        // validation email content;
        if(!validator.isEmail(email)){
            return res.json({
                success:false,
                message:"please inter a valid email"
            })
        }

        // validation of password if strong or not
        if(password.length<8){
            return res.json({
                success:false,
                message:"please inter strong password"
            })
        }

        //salt doctor password
        const salt=await bcrypt.genSalt(10);
        const hashedpassword=await bcrypt.hash(password,salt);

        //upload image to cloudinary

        const imageupload=await cloudinary.uploader.upload(imgFile.path,{resource_type:"image"})
        const imageurl=imageupload.secure_url;

        //image validation

          const doctorData={
            name,
            email,
            password:hashedpassword,
            image:imageurl,
            speciality,
            degree ,
            experience,
            about,
            fees,
            address:JSON.parse(address),
            date:Date.now()
        }

        const newDoctor=new doctorModel(doctorData);
        await newDoctor.save();

        res.json({success:true ,message:'Doctor Added'})

    }
    catch(err){
        console.log(err);
        res.json({success:false , message:err.message})
    }
}

//API for admin login
const loginAdmin=async(req,res)=>{
    try{
        const {email,password}=req.body;

        if(email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD){
            const token = jwt.sign(email+password,process.env.JWT_SECRET)
            res.json({success:true,token})
        }
        else{
            res.json({success:false, message:"invalid credentials"})
        }
    }
    catch(err){
        console.log(err);
        res.json({success:false , message:err.message})
    }
}
//API for getting all doctors data from mongodb

const allDoctors= async (req,res)=>{
    try{
        const doctors= await doctorModel.find({}).select('-password')
        res.json({success:true,doctors});
    }
    catch(err){
        console.log(err);
        res.json({success:false , message:err.message})
    }
}

export {addDoctor,loginAdmin,allDoctors}