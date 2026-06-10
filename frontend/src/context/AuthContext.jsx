import { createContext } from 'react'
import axios from 'axios'
import { toast } from "react-toastify";

export const AuthContext = createContext();

const AuthContextProvider = (props) => {

    const backendUrl = import.meta.env.VITE_BACKEND_URL;

    const sendOtp = async (email) => {
        try {
            const { data } = await axios.post(backendUrl + '/api/user/send-reset-otp', { email })

            return data;
        }
        catch (err) {
            const errMsg = err.response?.data?.message || err.message || "Failed to send OTP";
            toast.error(errMsg);
            return { success: false, message: errMsg };
        }
    }

    const verifyOtp = async (email, otp) => {
        try {
            const { data } = await axios.post(backendUrl + '/api/user/verify-otp', { email, otp });
            return data;
        }
        catch (err) {
            const errMsg = err.response?.data?.message || err.message || "Failed to verify OTP";
            toast.error(errMsg);
            return { success: false, message: errMsg };
        }
    }

    const resetPassword = async (email, newpassword) => {
        try {
            const { data } = await axios.post(backendUrl + '/api/user/reset-password', { email, newpassword });
            return data;
        }
        catch (err) {
            const errMsg = err.response?.data?.message || err.message || "Failed to reset password";
            toast.error(errMsg);
            return { success: false, message: errMsg };
        }
    }

    const value = {
        sendOtp, verifyOtp, resetPassword,
    }

    return <AuthContext.Provider value={value}>
        {props.children}
    </AuthContext.Provider>
}

export default AuthContextProvider;