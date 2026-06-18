import React, { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const { resetPassword } = useContext(AuthContext);
  const navigate = useNavigate();

  const email = localStorage.getItem("resetEmail");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setPasswordError("Passwords do not match");
      return;
    }

    setPasswordError("");

    if (password.length < 8) {
      toast.error("Password must be at least 8 characters");
      return;
    }

    const data = await resetPassword(email, password);

    if (data.success) {
      localStorage.removeItem("resetEmail");
      localStorage.removeItem("otpExpireAt");

      toast.success(data.message);
      navigate("/login");
    } else {
      toast.error(data.message);
    }
  };

  useEffect(() => {
    if (!email) {
      navigate("/forgot-password");
    }
  }, [email, navigate]);

  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-gray-100 px-4 py-8">
      <form
        onSubmit={handleSubmit}
        className="bg-white w-full max-w-lg rounded-2xl shadow-md px-6 sm:px-8 md:px-12 py-6 sm:py-8"
      >
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800">
          Reset Password
        </h1>

        <p className="text-gray-500 mt-2 text-sm sm:text-base md:text-lg">
          Create your new password
        </p>

        <div className="mt-6">
          <label className="block text-lg sm:text-xl mb-2">
            New Password
          </label>

          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm sm:text-base outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition"
            placeholder="Enter new password"
          />
        </div>

        <div className="mt-4">
          <label className="block text-lg sm:text-xl mb-2">
            Confirm Password
          </label>

          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => {
              const value = e.target.value;
              setConfirmPassword(value);

              if (password === value) {
                setPasswordError("");
              } else {
                setPasswordError("Passwords do not match");
              }
            }}
            className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm sm:text-base outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition"
            placeholder="Confirm password"
          />

          {passwordError && (
            <p className="text-red-500 text-sm mt-2">
              {passwordError}
            </p>
          )}
        </div>

        <button
          type="submit"
          className="w-full mt-8 py-3 rounded-xl bg-gradient-to-r from-indigo-500 to-indigo-600 text-white text-base sm:text-lg font-medium hover:shadow-lg active:scale-[0.98] transition-all"
        >
          Reset Password
        </button>
      </form>
    </div>
  );
};

export default ResetPassword;