import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { toast } from "react-toastify";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const { sendOtp } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email.trim()) {
      toast.error("Please enter your email");
      return;
    }

    const data = await sendOtp(email);

    if (data.success) {
      toast.success(data.message);

      localStorage.setItem("resetEmail", email);
      localStorage.setItem("otpExpireAt", data.expireAt);

      navigate("/verify-reset-otp");
    } else {
      toast.error(data.message);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-gray-100 px-4 py-8">
      <form
        onSubmit={handleSubmit}
        className="bg-white w-full max-w-lg rounded-2xl shadow-md px-6 sm:px-8 md:px-12 py-8 sm:py-10"
      >
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800">
          Forgot Password
        </h1>

        <p className="text-gray-500 mt-3 text-sm sm:text-base md:text-lg">
          Enter your registered email to receive OTP
        </p>

        <div className="mt-8">
          <label className="block text-base sm:text-lg font-medium mb-2">
            Email
          </label>

          <input
            type="email"
            placeholder="Enter your email"
            className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm sm:text-base outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <button
          type="submit"
          className="w-full mt-8 py-3 rounded-xl bg-gradient-to-r from-indigo-500 to-indigo-600 text-white text-base sm:text-lg font-medium hover:shadow-lg active:scale-[0.98] transition-all"
        >
          Send OTP
        </button>

        <p className="text-center mt-6 text-sm sm:text-base">
          <span className="text-gray-600">
            Remember your password?
          </span>{" "}
          <span
            onClick={() => navigate("/login")}
            className="text-indigo-600 cursor-pointer font-medium hover:underline"
          >
            Login here
          </span>
        </p>
      </form>
    </div>
  );
};

export default ForgotPassword;