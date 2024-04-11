"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "./ui/button";
import { ArrowRightIcon } from "@radix-ui/react-icons";
import { Input } from "./ui/input";
import { Eye, EyeOff, User } from "lucide-react";
import Link from "next/link";
import { Toast } from "./Toast";
const LoginForm = () => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    empId: "",
    password: "",
  });
  useEffect(() => {
    const token = localStorage.getItem("complaintToken");
    if (token) {
      router.push("/");
    }
  }, []);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleTogglePassword = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${process.env.SERVER_APP_URL}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(`Login failed : ${data.message}`);
      }
      localStorage.setItem("complaintToken", data.token);
      Toast.fire({
        icon: "success",
        title: "Login successfully!",
      });
      router.push("/");
    } catch (error) {
      Toast.fire({
        icon: "error",
        title: error.message,
      });
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="absolute top-0 left-0 right-0 flex justify-between px-4 py-2">
        <div className="flex items-center">
          <a href="/login">
            <img
              src="/SW Logo.png"
              alt="Office of Students' Welfare"
              className="h-28 w-auto"
            />
          </a>
        </div>
        <div className="flex items-center">
          <a
            href="https://vitbhopal.ac.in/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src="/vitblogo.png"
              alt="VIT Bhopal University"
              className="h-24 w-auto"
            />
          </a>
        </div>
      </div>
      <form
        onSubmit={handleSubmit}
        className="gap-4 flex flex-col max-w-md border rounded-3xl shadow-2xl p-12 "
      >
        <div className="relative flex items-center rounded-2xl border border-violet-500">
          <Input
            className="rounded-2xl border border-violet-500 text-violet-400  font-semibold font-['Poppins']"
            type="tel"
            name="empId"
            placeholder="Employment Number"
            value={formData.empId}
            onChange={handleChange}
          />
          <User className="absolute right-6 " size={20} />
        </div>
        <div className="relative flex items-center rounded-2xl border border-violet-500">
          <Input
            className="rounded-2xl border border-violet-500 text-violet-400  font-semibold font-['Poppins']"
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="********"
            value={formData.password}
            onChange={handleChange}
          />
          {showPassword ? (
            <Eye
              className="absolute right-6 cursor-pointer"
              size={20}
              onClick={handleTogglePassword}
            />
          ) : (
            <EyeOff
              className="absolute right-6 cursor-pointer"
              size={20}
              onClick={handleTogglePassword}
            />
          )}
        </div>
        <div className="flex justify-between items-center">
          <Button
            type="submit"
            className="flex items-center gap-x-1 max-w-[250px] bg-gradient-to-r from-violet-500 to-violet-200 rounded-3xl shadow hover:bg-gradient-to-l from-violet-600 to-violet-100 "
          >
            Login
            <ArrowRightIcon size={20} />
          </Button>

          <Link href={"/login/forgot-password"}>Forgot Password?</Link>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
