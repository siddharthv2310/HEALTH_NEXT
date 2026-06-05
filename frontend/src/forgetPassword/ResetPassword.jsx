import React, { useState } from "react";

const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] =
    useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      return alert("Passwords do not match");
    }

    console.log(password);
  };

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
            onChange={(e) =>
              setConfirmPassword(e.target.value)
            }
          />
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