import React, { useState } from "react";
import jwt from "jsonwebtoken";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import {
  Calendar,
  Hash,
  MailIcon,
  MessageSquare,
  MoveLeft,
  Smartphone,
  User,
} from "lucide-react";

const ModifyForm = ({ selectedComplaint, onBack }) => {
  const token = localStorage.getItem("complaintToken");
  const decodedToken = jwt.decode(token);

  const [formData, setFormData] = useState({
    registrationNumber: selectedComplaint.registrationNumber,
    studentName: selectedComplaint.studentName,
    gender: selectedComplaint.gender,
    email: selectedComplaint.email,
    studentMobileNo: selectedComplaint.studentMobileNo,
    title: selectedComplaint.title,
    description: selectedComplaint.description,
    facultyName: selectedComplaint.facultyName,
    dateTime: selectedComplaint.dateTime,
    status: selectedComplaint.status,
    modifiedBy: decodedToken.name,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleResolve = async () => {
    try {
      const response = await fetch(
        `${process.env.SERVER_APP_URL}/faculty/complaints/${selectedComplaint._id}/resolve`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );
      const data = await response.json();
      alert(data.message);
    } catch (error) {
      console.error("Error resolving complaint:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `${process.env.SERVER_APP_URL}/faculty/modify/${selectedComplaint._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );
      const data = await response.json();
      alert(data.message);
    } catch (error) {
      console.error("Error modifying complaint:", error);
    }
  };

  return (
    <div className="w-full">
      <form onSubmit={handleSubmit} className="flex flex-col gap-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="relative flex items-center">
            <Input
              type="text"
              name="registrationNumber"
              placeholder="Registration Number"
              value={formData.registrationNumber}
              onChange={handleChange}
              disabled
              className="rounded-2xl disabled:opacity-75 border border-violet-500 text-violet-400 font-semibold font-['Poppins'] px-4 py-2"
            />
            <Hash className="absolute right-6 text-gray-500" size={20} />
          </div>
          <div className="relative flex items-center gap-4 justify-between">
            <div className="flex w-full relative items-center">
              <Input
                type="text"
                name="studentName"
                placeholder="Student Name"
                disabled
                value={formData.studentName}
                onChange={handleChange}
                className="w-full disabled:opacity-75 rounded-2xl border border-violet-500 text-violet-400 font-semibold font-['Poppins'] px-4 py-2"
              />
              <User className="absolute right-6 text-gray-500" size={20} />
            </div>
            <div className="">
              <select
                className="appearance-none disabled:opacity-75 text-gray-500  rounded-2xl flex h-[54px]  bg-background ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 border-violet-500 border font-semibold font-['Poppins'] py-2 px-8 dark:text-gray-400"
                name="gender"
                value={formData.gender}
                disabled
                onChange={handleChange}
              >
                <option value="" disabled hidden>
                  Select Gender
                </option>
                <option className="" value="Male">
                  Male
                </option>
                <option value="Female">Female</option>
              </select>
            </div>
          </div>
          <div className="relative flex items-center">
            <Input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              disabled
              className="rounded-2xl disabled:opacity-75 border border-violet-500 text-violet-400 font-semibold font-['Poppins'] px-4 py-2"
            />
            <MailIcon className="absolute right-6 text-gray-500" size={20} />
          </div>
          <div className="relative flex items-center">
            <Input
              type="tel"
              name="studentMobileNo"
              placeholder="Mobile Number"
              value={formData.studentMobileNo}
              onChange={handleChange}
              disabled
              className="rounded-2xl disabled:opacity-75 border border-violet-500 text-violet-400 font-semibold font-['Poppins'] px-4 py-2"
            />
            <Smartphone className="absolute right-6 text-gray-500" size={20} />
          </div>
        </div>
        <div className="relative flex items-center">
          <Input
            type="text"
            name="title"
            placeholder="Complaint Name"
            value={formData.title}
            onChange={handleChange}
            className="rounded-2xl border border-violet-500 text-violet-400 font-semibold font-['Poppins'] px-4 py-2"
          />
        </div>
        <div className="relative flex items-center">
          <Textarea
            name="description"
            placeholder="Complaint Description"
            value={formData.description}
            onChange={handleChange}
            className="rounded-2xl border border-violet-500 text-violet-400 font-semibold font-['Poppins'] px-4 "
          />
          <MessageSquare
            className="absolute right-6 top-4 text-gray-500"
            size={20}
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="relative flex items-center">
            <Input
              type="text"
              name="facultyName"
              placeholder="Complaint By"
              value={formData.dateTime.substr(0, 10)}
              onChange={handleChange}
              disabled
              className="rounded-2xl disabled:opacity-75 border border-violet-500 text-violet-400 font-semibold font-['Poppins'] px-4 py-2"
            />
            <Calendar className="absolute right-6 text-gray-500" size={20} />
          </div>
          <div className="relative flex items-center">
            <Input
              type="text"
              name="facultyName"
              placeholder="Complaint By"
              value={formData.facultyName}
              onChange={handleChange}
              disabled
              className="rounded-2xl disabled:opacity-75 border border-violet-500 text-violet-400 font-semibold font-['Poppins'] px-4 py-2"
            />
            <User className="absolute right-6 text-gray-500" size={20} />
          </div>
        </div>
        <div className="flex gap-4">
          <Button className="w-fit mr-8" onClick={() => onBack(null)}>
            <MoveLeft className="text-white" size={20} />
          </Button>
          <Button
            type='button'
            onClick={handleResolve}
            className="flex items-center gap-x-1 max-w-[166px] bg-green-500 rounded-3xl shadow hover:bg-green-600 px-4 py-2"
          >
            Mark as Resolved
          </Button>
          <Button
            type="submit"
            className="flex items-center gap-x-1 max-w-[166px] bg-violet-500 rounded-3xl shadow hover:bg-violet-600 px-4 py-2"
          >
            Save Changes
          </Button>
        </div>
      </form>
    </div>
  );
};

export default ModifyForm;
