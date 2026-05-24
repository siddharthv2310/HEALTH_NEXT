import React, { useState } from "react";

const Login = () => {
  const [state, setState] = useState("Sign Up");

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmitHandler = (e) => {
    e.preventDefault();

    if (state === "Sign Up") {
      console.log("Sign Up Data:", { name, email, password });
    } else {
      console.log("Login Data:", { email, password });
    }
  };

  return (
    <form
      onSubmit={onSubmitHandler}
      className="min-h-[80vh] flex items-center justify-center bg-gray-100"
    >
      <div className="bg-white p-8 rounded-xl shadow-md w-87.5">

        {/* Heading */}
        <p className="text-2xl font-semibold text-gray-800">
          {state === "Sign Up" ? "Create Account" : "Login"}
        </p>

        <p className="text-sm text-gray-500 mt-2 mb-6">
          Please {state === "Sign Up" ? "sign up" : "log in"} to book appointment
        </p>

        {/* Name (only for signup) */}
        {state === "Sign Up" && (
          <div className="mb-4">
            <p className="text-sm text-gray-600 mb-1">Full Name</p>
            <input
              type="text"
              onChange={(e) => setName(e.target.value)}
              value={name}
              className="w-full border rounded-md px-3 py-2 outline-none focus:ring-2 focus:ring-indigo-400"
              required
            />
          </div>
        )}

        {/* Email */}
        <div className="mb-4">
          <p className="text-sm text-gray-600 mb-1">Email</p>
          <input
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            className="w-full border rounded-md px-3 py-2 outline-none focus:ring-2 focus:ring-indigo-400"
            required
          />
        </div>

        {/* Password */}
        <div className="mb-6">
          <p className="text-sm text-gray-600 mb-1">Password</p>
          <input
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            className="w-full border rounded-md px-3 py-2 outline-none focus:ring-2 focus:ring-indigo-400"
            required
          />
        </div>

        {/* Button */}
        <button
          type="submit"
          className="w-full cursor-pointer bg-indigo-500 hover:bg-indigo-600 transition duration-300 text-white py-2 rounded-md"
        >
          {state === "Sign Up" ? "Create Account" : "Login"}
        </button>

        {/* Toggle */}
        <p className="text-sm text-gray-500 mt-4 text-center">
          {state === "Sign Up"
            ? "Already have an account?"
            : "create account ?"}{" "}
          <span
            onClick={() =>
              setState(state === "Sign Up" ? "Login" : "Sign Up")
            }
            className="text-indigo-500 cursor-pointer hover:underline"
          >
            {state === "Sign Up" ? "Login here" : "click here"}
          </span>
        </p>
      </div>
    </form>
  );
};


export default Login
