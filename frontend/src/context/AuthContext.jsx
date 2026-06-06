import {createContext} from 'react'
import axios from 'axios'
import { toast } from "react-toastify";

export const AuthContext = createContext();

const AuthContextProvider = (props)=>{

    const backendUrl = import.meta.env.VITE_BACKEND_URL;

    const sendOtp = async(email)=>{
        try{
            const {data} = await axios.post(backendUrl+'/api/user/send-reset-otp',{email})
            
            return data;
        }
        catch(err){
            toast.error(err.message);
        }
    }

    const verifyOtp=async(email,otp)=>{
        try{
            const {data} = await axios.post(backendUrl+'/api/user/verify-otp',{email,otp});
            return data;
        }
        catch(err){
            toast.error(err.message);
        }
    }

    const resetPassword=async(email,newpassword)=>{
        try{
            const {data} = await axios.post(backendUrl+'/api/user/reset-password',{email,newpassword});
            return data;
        }
        catch(err){
            toast.error(err.message);
        }
    }

    const value ={
        sendOtp,verifyOtp,resetPassword,
    }

    return <AuthContext.Provider value={value}>
        {props.children}
      </AuthContext.Provider>
}

export default AuthContextProvider;