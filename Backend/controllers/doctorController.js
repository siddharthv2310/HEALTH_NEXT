import doctorModel from "../models/doctorModel.js";


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

export {changeAvailibility}