import React, { useContext, useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { toast } from "react-toastify";



const OTPVerification = () => {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const inputRefs = useRef([]);
  const navigate = useNavigate();
  const { verifyOtp, sendOtp } = useContext(AuthContext)


  // to get the email from the navigate 
  // const location = useLocation();
  const email = localStorage.getItem("resetEmail");
  const [expireAt, setExpireAt] = useState(Number(localStorage.getItem("otpExpireAt")));
  // console.log("Expire At:", expireAt);
  // console.log("Current:", Date.now());

  //for countdown of otp verification;
  const [timeLeft, setTimeLeft] = useState(() => {
  const expire = Number(localStorage.getItem("otpExpireAt"));
  return expire ? Math.max(0, Math.floor((expire - Date.now()) / 1000)) : 0;
});

  useEffect(() => {

    if (!expireAt) return;

    const timer = setInterval(() => {

      const remaining = Math.max(
        0,
        Math.floor((expireAt - Date.now()) / 1000)
      );

      setTimeLeft(remaining);

      if (remaining <= 0) {
        clearInterval(timer);
      }

    }, 1000);

    return () => clearInterval(timer);

  }, [expireAt]);




  useEffect(() => {
    inputRefs.current[0]?.focus();
  }, []);

  const focusInput = (index) => {
    const input = inputRefs.current[index];

    if (!input) return;

    input.focus();

    // Select existing digit
    setTimeout(() => {
      input.select();
    }, 0);
  };

  const handleChange = (index, value) => {
    if (!/^\d*$/.test(value)) return;

    const digit = value.slice(-1);

    const newOtp = [...otp];
    newOtp[index] = digit;
    setOtp(newOtp);

    if (digit && index < otp.length - 1) {
      focusInput(index + 1);
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace") {
      e.preventDefault();

      if (otp[index]) {
        const newOtp = [...otp];
        newOtp[index] = "";
        setOtp(newOtp);
      } else if (index > 0) {
        focusInput(index - 1);
      }
    }

    if (e.key === "ArrowLeft") {
      e.preventDefault();

      if (index > 0) {
        focusInput(index - 1);
      }
    }

    if (e.key === "ArrowRight") {
      e.preventDefault();

      if (index < otp.length - 1) {
        focusInput(index + 1);
      }
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();

    const pastedData = e.clipboardData
      .getData("text")
      .trim()
      .slice(0, 6);

    if (!/^\d+$/.test(pastedData)) return;

    const newOtp = [...otp];

    pastedData.split("").forEach((digit, index) => {
      newOtp[index] = digit;
    });

    setOtp(newOtp);

    const lastIndex = Math.min(
      pastedData.length - 1,
      otp.length - 1
    );

    focusInput(lastIndex);
  };

  const handleVerify = async () => {

    const otpValue = otp.join("");

    if (otpValue.length !== 6) {
      toast.error("Please enter complete OTP");
      return;
    }

    const data = await verifyOtp(email, otpValue);

    if (data.success) {
      toast.success(data.message);
      navigate('/reset-password');
    }

    else {
      toast.error(data.message)
    }

  };

  const sendAgainOtp = async () => {

    const data = await sendOtp(email);

    if (data.success) {
      localStorage.setItem("otpExpireAt", data.expireAt);
      setExpireAt(data.expireAt);
      toast.success("OTP resend successfully")
    }

    else {
      toast.error(data.message);
    }

  }

  useEffect(() => {

    if (!localStorage.getItem("resetEmail")) {
      navigate("/forgot-password");
    }

  }, []);

  // for representing time in min and sec
  const minutes = String(
    Math.floor(timeLeft / 60)
  ).padStart(2, "0");

  const seconds = String(
    timeLeft % 60
  ).padStart(2, "0");

  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-[#f8f8f8] px-4">
      <div className="bg-white w-full max-w-md rounded-2xl shadow-md p-6 sm:p-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">
          Verify OTP
        </h1>

        <p className="text-gray-500 mt-2">
          Enter the 6-digit code sent to your email
        </p>

       <div
  className="flex justify-center gap-2 sm:gap-3 mt-8"
  onPaste={handlePaste}
>
          {otp.map((digit, index) => (
            <input
              key={index}
              ref={(el) => (inputRefs.current[index] = el)}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={digit}
              onChange={(e) =>
                handleChange(index, e.target.value)
              }
              onKeyDown={(e) =>
                handleKeyDown(index, e)
              }
              onFocus={() => {
                if (digit) {
                  setTimeout(() => {
                    inputRefs.current[index]?.select();
                  }, 0);
                }
              }}
              className="w-10 h-10 sm:w-12 sm:h-12 border rounded-lg text-center text-lg sm:text-xl font-semibold outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
            />
          ))}
        </div>

        <p className="text-center text-gray-500 mt-4">
          OTP expires in {minutes}:{seconds}
        </p>

        <button
          disabled={timeLeft === 0}
          onClick={handleVerify}
         className={`w-full mt-6 py-3 rounded-xl text-white font-medium transition-all ${timeLeft === 0 ? "bg-gray-400 cursor-not-allowed" : "bg-gradient-to-r from-indigo-500 to-indigo-600 hover:shadow-lg active:scale-[0.98]"}`}
        >
          Verify OTP
        </button>

        {timeLeft === 0 && (
          <p
            onClick={sendAgainOtp}
            className="text-center mt-4 text-indigo-600 cursor-pointer"
          >
            Resend OTP
          </p>
        )}
      </div>
    </div>
  );
};

export default OTPVerification;