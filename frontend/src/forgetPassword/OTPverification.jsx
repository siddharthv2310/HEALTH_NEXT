import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";


const OTPVerification = () => {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const inputRefs = useRef([]);
  const navigate = useNavigate();

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

  const handleVerify = () => {
    const otpValue = otp.join("");

    if (otpValue.length !== 6) {
      alert("Please enter complete OTP");
      return;
    }

    navigate('/reset-password');

    console.log("OTP:", otpValue);

    // API call here
    // await axios.post('/verify-otp', { otp: otpValue })
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-[#f8f8f8] px-4">
      <div className="bg-white w-full max-w-md rounded-2xl shadow-md p-8">
        <h1 className="text-3xl font-bold text-gray-800">
          Verify OTP
        </h1>

        <p className="text-gray-500 mt-2">
          Enter the 6-digit code sent to your email
        </p>

        <div
          className="flex justify-between mt-8"
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
              className="
                w-12
                h-12
                border
                rounded-lg
                text-center
                text-xl
                font-semibold
                outline-none
                focus:border-indigo-500
                focus:ring-2
                focus:ring-indigo-200
              "
            />
          ))}
        </div>

        <p className="text-center text-gray-500 mt-4">
          OTP expires in 02:00
        </p>

        <button
          onClick={handleVerify}
          className="
            w-full
            mt-6
            py-3
            rounded-xl
            bg-gradient-to-r
            from-indigo-500
            to-indigo-600
            text-white
            font-medium
          "
        >
          Verify OTP
        </button>

        <p className="text-center mt-4 text-indigo-600 cursor-pointer">
          Resend OTP
        </p>
      </div>
    </div>
  );
};

export default OTPVerification;