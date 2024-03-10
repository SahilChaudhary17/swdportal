"use client";
import React, { useState,useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "./ui/button";
import { ArrowRightIcon } from "@radix-ui/react-icons";
import { Input } from "./ui/input";
import { Eye, EyeOff, User } from "lucide-react";
import Link from "next/link";

const LoginForm = () => {
  const router = useRouter();
  const [error, setError] = useState(null);
  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    empId: "",
    password: ""
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
      [name]: value
    }));
  };

  const handleTogglePassword = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      });
      const data = await response.json();
      console.log(data)
      if (!response.ok) {
        throw new Error(`Login failed : ${data.message}` );
      }
      localStorage.setItem("complaintToken", data.token);
      router.push("/");
    } catch (error) {
        setError(error.message);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="gap-4 mt-6 flex flex-col border p-12 rounded-3xl shadow-xl mx-7"
    >
      {error && (
        <p className="text-center bg-red-300 py-4 mb-6 rounded">{error}</p>
      )}
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

        <Link href={"/forgot-password"}>Forgot Password?</Link>
      </div>
    </form>
  );
};

export default LoginForm;
