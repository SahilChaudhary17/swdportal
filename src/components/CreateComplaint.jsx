"use client";
import * as React from "react";
import { CalendarIcon } from "@radix-ui/react-icons";
import { format } from "date-fns";
import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { User, MailIcon, Smartphone, Hash, MessageSquare } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Calendar } from "./ui/calendar";
import HeadingCard from "./HeadingCard";

export const DatePicker = ({ onSelect }) => {
  const [date, setDate] = useState();

  const handleDateSelect = (date) => {
    setDate(date);
    onSelect(date);
  };

  return (
    <Popover className=" ">
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className="flex h-[54px] w-full px-8 py-2 justify-start text-left rounded-2xl border border-violet-500"
        >
          <CalendarIcon className="mr-2 h-4 w-4 text-gray-500" size={20} />
          {date ? (
            <span className="">{format(date, "PPP")}</span>
          ) : (
            <span className="text-gray-500">Pick a date</span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="single"
          selected={date}
          disabled={(date) =>
            date > new Date() || date < new Date("1900-01-01")
          }
          onSelect={handleDateSelect}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
};
const CreateComplaint = () => {
  const [formData, setFormData] = useState({
    registrationNumber: "",
    studentName: "",
    gender: "",
    email: "",
    studentMobileNo: "",
    title: "",
    description: "",
    facultyName: "",
    dateTime: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    if (name === "registrationNumber" && value.length === 10) {
      fetchStudentDetails(value);
    }
  };

  const fetchStudentDetails = async (regNo) => {
    try {
      const response = await fetch(
        `${process.env.SERVER_APP_URL}/faculty/student/${regNo}`
      );
      if (response.ok) {
        const studentData = await response.json();
        setFormData((prevData) => ({
          ...prevData,
          studentName: studentData.name,
          email: studentData.email,
          studentMobileNo: studentData.mobileNo,
          gender: studentData.gender,
        }));
      } else {
        setFormData((prevData) => ({
          ...prevData,
          studentName: "",
          email: "",
          studentMobileNo: "",
          gender: "",
        }));
      }
    } catch (error) {
      console.error("Error fetching student details:", error);
    }
  };

  const handleDateSelect = (date) => {
    const localDate = new Date(date);
    const timezoneOffset = localDate.getTimezoneOffset() * 60 * 1000;
    const utcDate = new Date(localDate.getTime() - timezoneOffset);
    setFormData((prevData) => ({
      ...prevData,
      dateTime: utcDate.toISOString().slice(0, 24),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if all details are filled
    const isFormComplete = Object.values(formData).every(
      (value) => value !== ""
    );

    if (!isFormComplete) {
      alert("Please fill in all the details before submitting.");
      return;
    }

    try {
      const response = await fetch(
        `${process.env.SERVER_APP_URL}/faculty/complaint/create`,
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
        throw new Error(`Submission failed: ${data.message}`);
      }
      alert(data.message);
    } catch (error) {
      alert("Error submitting form:", error);
    }
  };

  return (
    <div className="w-full">
      <HeadingCard heading={"Add new complaints"} />
      <form onSubmit={handleSubmit} className="flex flex-col gap-y-4  ">
        <div className="grid grid-cols-2 gap-4">
          <div className="relative flex items-center ">
            <Input
              type="text"
              name="registrationNumber"
              placeholder="Registration Number"
              value={formData.registrationNumber}
              onChange={handleChange}
              className="rounded-2xl border border-violet-500 text-violet-400  font-semibold font-['Poppins'] px-4 py-2"
            />
            <Hash className="absolute right-6 text-gray-500" size={20} />
          </div>
          <div className="relative flex items-center gap-4 justify-between">
            <div className="flex w-full relative items-center">
              <Input
                type="text"
                name="studentName"
                placeholder="Student Name"
                value={formData.studentName}
                onChange={handleChange}
                className="w-full rounded-2xl border border-violet-500 text-violet-400 font-semibold font-['Poppins'] px-4 py-2"
              />
              <User className="absolute right-6 text-gray-500" size={20} />
            </div>
            <div className="">
              <select
                className="appearance-none  text-gray-500  rounded-2xl flex h-[54px]  bg-background ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 border-violet-500 border font-semibold font-['Poppins'] disabled:opacity-50 py-2 px-8 dark:text-gray-400"
                name="gender"
                value={formData.gender}
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
          <div className="relative flex items-center ">
            <Input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              className=" rounded-2xl border border-violet-500 text-violet-400  font-semibold font-['Poppins'] px-4 py-2"
            />
            <MailIcon className="absolute right-6 text-gray-500" size={20} />
          </div>
          <div className="relative flex items-center ">
            <Input
              type="tel"
              name="studentMobileNo"
              placeholder="Mobile Number"
              value={formData.studentMobileNo}
              onChange={handleChange}
              className=" rounded-2xl border border-violet-500 text-violet-400  font-semibold font-['Poppins'] px-4 py-2"
            />
            <Smartphone className="absolute right-6 text-gray-500" size={20} />
          </div>
        </div>
        <div className="relative flex items-center ">
          <Input
            type="text"
            name="title"
            placeholder="Complaint Name"
            value={formData.title}
            onChange={handleChange}
            className=" rounded-2xl border border-violet-500 text-violet-400  font-semibold font-['Poppins'] px-4 py-2"
          />
        </div>
        <div className="relative flex items-center">
          <Textarea
            name="description"
            placeholder="Complaint Description"
            value={formData.description}
            onChange={handleChange}
            className=" rounded-2xl border border-violet-500 text-violet-400  font-semibold font-['Poppins'] px-4 "
          />
          <MessageSquare
            className="absolute right-6 top-4  text-gray-500"
            size={20}
          />
        </div>
        <div className="flex  gap-4 items-center w-full">
          <div className="relative flex-1 items-center   ">
            <DatePicker onSelect={handleDateSelect} />
          </div>
          <div className="relative flex flex-1 items-center ">
            <Input
              type="text"
              name="facultyName"
              placeholder="Complaint By"
              value={formData.facultyName}
              onChange={handleChange}
              className=" rounded-2xl border border-violet-500 text-violet-400  font-semibold font-['Poppins'] px-4 py-2"
            />
            <User className="absolute right-6 text-gray-500" size={20} />
          </div>
        </div>
        <Button
          type="submit"
          className=" flex items-center gap-x-1 max-w-[166px] bg-violet-500 rounded-3xl shadow hover:bg-violet-600 px-4 py-2"
        >
          Submit
        </Button>
      </form>
    </div>
  );
};

export default CreateComplaint;
