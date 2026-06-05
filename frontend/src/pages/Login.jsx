import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";
import axios from 'axios'
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Login = () => {

  const {backendUrl,token,setToken} = useContext(AppContext)
  
  const navigate = useNavigate();

  const [state, setState] = useState("Sign Up");

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmitHandler =async (e) => {
    e.preventDefault();

    try{
      if(state === 'Sign Up'){
        const {data} = await axios.post(backendUrl + '/api/user/register',{name,password,email})

        if(data.success){
          localStorage.setItem('token',data.token);
          setToken(data.token);
        }
        else{
          toast.error(data.message);
        }
      }

      else{

        const {data} = await axios.post(backendUrl + '/api/user/login',{password,email})

        if(data.success){
          localStorage.setItem('token',data.token);
          setToken(data.token);
        }
        else{
          toast.error(data.message);
        }
      }


    }
    catch(err){
      toast.error(err.message);
    }


  };

  useEffect(()=>{
    if(token){
      navigate('/');
    }
  },[token])

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
        <div className="mb-1">
          <p className="text-sm text-gray-600 mb-1">Password</p>
          <input
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            className="w-full border rounded-md px-3 py-2 outline-none focus:ring-2 focus:ring-indigo-400"
            required
          />
        </div>

        <div>
          <button onClick={() => navigate('/forgot-password')} className=" text-sm mt-0 pt-0 text-blue-500 mb-6 cursor-pointer navigate"> forget password</button>
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
