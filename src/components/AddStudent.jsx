"use client";
import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { User, MailIcon, ArrowRightIcon, Smartphone, Hash } from "lucide-react";
import HeadingCard from "./HeadingCard";

const AddStudent = () => {
  const [formData, setFormData] = useState({
    regNumber: "",
    name: "",
    email: "",
    mobileNo: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        "http://localhost:5000/faculty/students/add",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );
      const data = await response.json();
      if (!response.ok) {
        throw new Error(`Adding failed : ${data.message}`);
      }else {
        alert("Student added successfully");
        window.location.reload(); // Refresh the page
      }
    } catch (error) {
      alert(error);
    }
  };

  return (
    <div className="w-full ">
      <HeadingCard heading={"Create A New Student Profile"} />

      <form onSubmit={handleSubmit} className="flex flex-col gap-y-4 max-w-lg">
        <div className="relative flex items-center rounded-2xl border border-violet-500">
          <Input
            className="rounded-2xl border border-violet-500 text-violet-400  font-semibold font-['Poppins']"
            type="text"
            name="regNumber"
            placeholder="Registration Number"
            value={formData.regNumber}
            onChange={handleChange}
          />
          <Hash className="absolute right-6" size={20} />
        </div>
        <div className="relative flex items-center  rounded-2xl border border-violet-500">
          <Input
            className=" rounded-2xl border border-violet-500 text-violet-400  font-semibold font-['Poppins']"
            type="text"
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleChange}
          />
          <User className="absolute right-6" size={20} />
        </div>
        <div className="relative flex items-center  rounded-2xl border border-violet-500">
          <Input
            className=" rounded-2xl border border-violet-500 text-violet-400  font-semibold font-['Poppins']"
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
          />
          <MailIcon className="absolute right-6 " size={20} />
        </div>
        <div className="relative flex items-center  rounded-2xl border border-violet-500">
          <Input
            className=" rounded-2xl border border-violet-500 text-violet-400  font-semibold font-['Poppins']"
            type="tel"
            name="mobileNo"
            placeholder="Mobile Number"
            value={formData.mobileNo}
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
    </div>
  );
};

export default AddStudent;
