"use client";
import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { User, MailIcon, ArrowRightIcon, Smartphone, Hash } from "lucide-react";

const AddStudent = () => {
  const [formData, setFormData] = useState({
    registrationNumber: "",
    name: "",
    email: "",
    mobileNumber: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-y-4">
      <div className="relative flex items-center bg-white rounded-2xl border border-violet-500">
        <Input
          className="bg-white rounded-2xl border border-violet-500 text-violet-400  font-semibold font-['Poppins']"
          type="text"
          name="registrationNumber"
          placeholder="Registration Number"
          value={formData.registrationNumber}
          onChange={handleChange}
        />
        <Hash className="absolute right-6" size={20} />
      </div>
      <div className="relative flex items-center bg-white rounded-2xl border border-violet-500">
        <Input
          className="bg-white rounded-2xl border border-violet-500 text-violet-400  font-semibold font-['Poppins']"
          type="text"
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
        />
        <User className="absolute right-6" size={20} />
      </div>
      <div className="relative flex items-center bg-white rounded-2xl border border-violet-500">
        <Input
          className="bg-white rounded-2xl border border-violet-500 text-violet-400  font-semibold font-['Poppins']"
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
        />
        <MailIcon className="absolute right-6 " size={20} />
      </div>
      <div className="relative flex items-center bg-white rounded-2xl border border-violet-500">
        <Input
          className="bg-white rounded-2xl border border-violet-500 text-violet-400  font-semibold font-['Poppins']"
          type="tel"
          name="mobileNumber"
          placeholder="Mobile Number"
          value={formData.mobileNumber}
          onChange={handleChange}
        />
        <Smartphone className="absolute right-6 " size={20} />
      </div>
      <Button
        type="submit"
        className="flex items-center gap-x-1 max-w-[166px] bg-gradient-to-r from-violet-500 to-violet-200 rounded-3xl shadow hover:bg-gradient-to-l from-violet-600 to-violet-100 "
      >
        Submit
        <ArrowRightIcon size={20} />
      </Button>
    </form>
  );
};

export default AddStudent;
