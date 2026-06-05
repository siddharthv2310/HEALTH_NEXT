import React, { useState } from "react";
import { use } from "react";
import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate('/verify-reset-otp')
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-[#f5f5f5]">
      <form
        onSubmit={handleSubmit}
        className="bg-white w-125 rounded-2xl shadow-md px-12 py-10"
      >
        <h1 className="text-4xl font-bold text-[#1f2937]">
          Forgot Password
        </h1>

        <p className="text-gray-500 mt-3 text-xl">
          Enter your registered email to receive OTP
        </p>

        <div className="mt-9">
          <label className="block text-2xl mb-3">Email</label>

          <input
            type="email"
            placeholder="Enter your email"
            className="w-full border border-gray-400 rounded-xl px-4 py-4 text-lg outline-none focus:border-indigo-500"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <button
          type="submit"
          className="w-full mt-10 py-4 rounded-xl bg-linear-to-r from-indigo-500 to-indigo-600 text-white text-2xl font-medium"
        >
          Send OTP
        </button>

        <p className="text-center mt-6">
          <span className="text-gray-600">
            Remember your password?
          </span>{" "}
          <span onClick={()=> navigate('/login')} className="text-indigo-600 cursor-pointer cursor-pointer">
            Login here
          </span>
        </p>
      </form>
    </div>
  );
};

export default ForgotPassword;