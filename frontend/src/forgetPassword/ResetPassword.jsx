import React, { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { AuthContext } from "../context/AuthContext";
import { useLocation, useNavigate } from "react-router-dom";

const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const { resetPassword } = useContext(AuthContext);
  // const location = useLocation();
  const navigate = useNavigate();

  const email = localStorage.getItem('resetEmail')
  

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setPasswordError("Password do not match");
      return;
    }
    setPasswordError("");

    if (password.length < 8) {
      toast.error("Password must be at least 8 characters");
      return;
    }

//     console.log("Email:", email);
// console.log("OTP:", otp);
// console.log("Password:", password);

    const data = await resetPassword(email, password);

    if (data.success) {
      localStorage.removeItem('resetEmail');
      localStorage.removeItem('otpExpireAt')
      toast.success(data.message);
      navigate('/login');
    }
    else {
      toast.error(data.message);
    }

  };

  useEffect(() => {

    if (!email ) {
      navigate("/forgot-password");
    }

  }, [email, navigate]);

  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-[#f5f5f5]">
      <form
        onSubmit={handleSubmit}
        className="bg-white w-[500px] rounded-2xl shadow-md px-12 py-5"
      >
        <h1 className="text-4xl font-bold text-[#1f2937]">
          Reset Password
        </h1>

        <p className="text-gray-500 mt-2 text-lg">
          Create your new password
        </p>

        <div className="mt-5">
          <label className="block text-2xl mb-2">
            New Password
          </label>

          <input
            type="password"
            className="w-full border border-gray-400 rounded-xl px-4 py-3 text-md outline-none focus:border-indigo-500"
            value={password}
            onChange={(e) =>
              setPassword(e.target.value)
            }
          />
        </div>

        <div className="mt-4">
          <label className="block text-2xl mb-2">
            Confirm Password
          </label>

          <input
            type="password"
            className="w-full border border-gray-400 rounded-xl px-4 py-3 text-md outline-none focus:border-indigo-500"
            value={confirmPassword}
            onChange={(e) => {
              const value = e.target.value;
              setConfirmPassword(value);
              if (password === value) {
                setPasswordError("");
              }
              else {
                setPasswordError("Passwords do not match");
              }
            }
            }
          />
          {passwordError && (
            <p className="text-red-500 text-sm mt-1">
              {passwordError}
            </p>
          )}
        </div>

        <button
          type="submit"
          className="w-full mt-10 py-3 rounded-xl bg-gradient-to-r from-indigo-500 to-indigo-600 text-white text-2xl font-medium"
        >
          Reset Password
        </button>
      </form>
    </div>
  );
};

export default ResetPassword;