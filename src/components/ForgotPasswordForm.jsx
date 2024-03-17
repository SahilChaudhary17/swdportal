"use client";
import React, { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { User } from "lucide-react";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "./ui/input-otp";
import { useRouter } from "next/navigation";

const ForgotPasswordForm = () => {
  const [empId, setEmpId] = useState("");
  const [email, setEmail] = useState("");
  const [otp, setOTP] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [step, setStep] = useState(1);
  const router = useRouter();

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `${process.env.SERVER_APP_URL}/auth/forgot-password`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ empId }),
        }
      );
      const data = await response.json();
      setEmail(data.email);
      if (!response.ok) {
        throw new Error(`Forgot password failed: ${data.message}`);
      }
      setStep(2);
    } catch (error) {
      alert(error.message);
    }
  };

  const handleVerifyOTP = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${process.env.SERVER_APP_URL}/auth/verify-otp`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, otp }), // Pass 'otp' state variable
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(`OTP verification failed: ${data.message}`);
      }
      setStep(3);
    } catch (error) {
      alert(error.message);
    }
  };

  const handleUpdatePassword = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `${process.env.SERVER_APP_URL}/auth/update-password`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            empId,
            newPassword,
          }),
        }
      );
      const data = await response.json();
      if (!response.ok) {
        throw new Error(`Update password failed: ${data.message}`);
      } else {
        router.push("/login");
      }
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <form className="gap-4 flex flex-col max-w-md border rounded-3xl shadow-2xl p-12 ">
        {step === 1 && (
          <div className=" flex flex-col gap-6 ">
            <div className="relative flex   items-center rounded-2xl border border-violet-500">
              <Input
                className="rounded-2xl border border-violet-500 text-violet-400  font-semibold font-['Poppins']"
                type="tel"
                placeholder="Employment Number"
                value={empId}
                onChange={(e) => setEmpId(e.target.value)}
              />
              <User className="absolute right-6 " size={20} />
            </div>
            <Button onClick={handleForgotPassword}>Forgot Password</Button>
          </div>
        )}
        {step === 2 && (
          <div className="flex flex-col gap-8">
            <p>Please enter the OTP sent to your email:</p>
            <InputOTP
                className="justify-evenly"
              maxLength={4}
              value={otp}
              onChange={(newOTP) => setOTP(newOTP)} // Update the onChange handler
              render={({ slots }) => (
                <>
                  <InputOTPGroup className="flex gap-2">
                    {slots.map((slot, index) => (
                      <InputOTPSlot key={index} {...slot} />
                    ))}
                  </InputOTPGroup>
                </>
              )}
            />
            <Button onClick={handleVerifyOTP}>Verify OTP</Button>
          </div>
        )}
        {step === 3 && (
          <div className="flex flex-col gap-8">
            <p className="text-center">Enter your new password:</p>
            <Input
              className="rounded-2xl border border-violet-500 text-violet-400  font-semibold font-['Poppins']"
              type="password"
              placeholder="New Password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
            <Button onClick={handleUpdatePassword}>Update Password</Button>
          </div>
        )}
      </form>
    </div>
  );
};

export default ForgotPasswordForm;
