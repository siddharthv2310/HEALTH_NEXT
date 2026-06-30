import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
// We go back to the standard component that worked with your backend
import { GoogleLogin } from "@react-oauth/google";

const Login = () => {
  const { backendUrl, token, setToken , userData} = useContext(AppContext);
  const navigate = useNavigate();

  const [state, setState] = useState("Sign Up");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // New state to manage transition smoothly and stop the flashing cycle
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleGoogleSuccess = async (credentialResponse) => {
    try {
      setIsLoggingIn(true); // Freeze the UI to handle transition smoothly

      const { data } = await axios.post(
        `${backendUrl}/api/user/google-login`,
        {
          idToken: credentialResponse.credential, // Uses your working backend setup
        }
      );

      if (data.success) {
        localStorage.setItem("token", data.token);
        setToken(data.token);
        // Notice: We removed navigate("/") from here! 
        // We let the useEffect hook below handle it globally and cleanly.
      } else {
        setIsLoggingIn(false);
        toast.error(data.message);
      }
    } catch (error) {
      setIsLoggingIn(false);
      toast.error(error.message || "Google Login Failed");
    }
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    if (isSubmitting) return;

    setIsSubmitting(true);

    try {
      if (state === "Sign Up") {
        const { data } = await axios.post(
          `${backendUrl}/api/user/register`,
          { name, email, password }
        );

        if (data.success) {
          localStorage.setItem("token", data.token);
          setToken(data.token);
        } else {
          toast.error(data.message);
        }
      } else {
        const { data } = await axios.post(
          `${backendUrl}/api/user/login`,
          { email, password }
        );

        if (data.success) {
          localStorage.setItem("token", data.token);
          setToken(data.token);
        } else {
          toast.error(data.message);
        }
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    if (userData) {
        navigate("/");
    }
  }, [userData, navigate]);

  // Smooth full-screen state during redirect to prevent background page flashing
  if (isLoggingIn || token) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="flex flex-col items-center gap-2">
          <div className="w-8 h-8 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-sm font-medium text-gray-500">Securing session...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[90vh] flex items-center justify-center bg-gray-100 px-4 py-8">
      <div className="bg-white rounded-3xl shadow-xl p-6 sm:p-8 md:p-12 w-full max-w-md mx-auto">

        {/* HEADER SECTION */}
        <div className="text-center mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-2">
            {state === "Sign Up" ? "Create Account" : "Welcome Back"}
          </h1>
          <p className="text-sm text-gray-500">
            {state === "Sign Up"
              ? "Create your account to book appointments quickly."
              : "Login to manage your appointments and profile."}
          </p>
        </div>

        {/* TOP: WORKING GOOGLE LOGIN BUTTON */}
        <div className="flex justify-center w-full mb-6">
          <GoogleLogin
            onSuccess={handleGoogleSuccess}
            onError={() => {
              toast.error("Google Login Failed");
            }}
          />
        </div>

        {/* MIDDLE: VISUAL DIVIDER */}
        <div className="flex items-center my-6 w-full">
          <div className="flex-1 border-t border-gray-200"></div>
          <span className="px-3 text-xs font-semibold tracking-wider text-gray-400 whitespace-nowrap">
            OR CONTINUE WITH EMAIL
          </span>
          <div className="flex-1 border-t border-gray-200"></div>
        </div>

        {/* BOTTOM: MANUAL FORM */}
        <form onSubmit={onSubmitHandler} className="w-full">
          {state === "Sign Up" && (
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Full Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                placeholder="Enter your full name"
                className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all text-sm"
              />
            </div>
          )}

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Email Address</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="Enter your email"
              className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all text-sm"
            />
          </div>

          <div className={state === "Login" ? "mb-2" : "mb-6"}>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="Enter your password"
              className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all text-sm"
            />
          </div>

          {state === "Login" && (
            <div className="text-right mb-6">
              <button
                type="button"
                onClick={() => navigate("/forgot-password")}
                className="text-xs font-medium text-indigo-600 hover:text-indigo-700 hover:underline bg-transparent border-none cursor-pointer"
              >
                Forgot Password?
              </button>
            </div>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-indigo-600 hover:bg-indigo-700 disabled:opacity-60 disabled:cursor-not-allowed text-white font-semibold py-3 px-4 rounded-xl transition shadow-sm hover:shadow active:scale-[0.99] duration-150 text-sm mb-6"
          >
            {isSubmitting
              ? "Please wait..."
              : state === "Sign Up"
                ? "Create Account"
                : "Login"}
          </button>

          <p className="text-center text-sm text-gray-500">
            {state === "Sign Up" ? "Already have an account?" : "Don't have an account?"}
            <button
              type="button"
              onClick={() => setState(state === "Sign Up" ? "Login" : "Sign Up")}
              className="ml-1.5 text-indigo-600 cursor-pointer font-semibold hover:underline bg-transparent border-none"
            >
              {state === "Sign Up" ? "Login" : "Sign Up"}
            </button>
          </p>
        </form>

      </div>
    </div>
  );
};

export default Login;