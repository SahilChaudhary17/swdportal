"use client";
import * as React from "react";
import { CalendarIcon } from "@radix-ui/react-icons";
import { format, formatDate } from "date-fns";
import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { User, MailIcon, Smartphone, Hash, MessageSquare } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Calendar } from "./ui/calendar";
import HeadingCard from "./HeadingCard";

const DatePicker = ({ onSelect }) => {
  const [date, setDate] = useState();

  const handleDateSelect = (date) => {
    // setDate(format(date, "P").toString());
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
      console.log(data);
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
      <HeadingCard heading={"Add/Modify existing complaints"} />
      <div className="pb-5">
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
            <div className="relative flex items-center ">
              <Input
                type="text"
                name="studentName"
                placeholder="Student Name"
                value={formData.studentName}
                onChange={handleChange}
                className=" rounded-2xl border border-violet-500 text-violet-400  font-semibold font-['Poppins'] px-4 py-2"
              />
              <User className="absolute right-6 text-gray-500" size={20} />
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
              <Smartphone
                className="absolute right-6 text-gray-500"
                size={20}
              />
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
          <div className="grid grid-cols-2 gap-4 ">
            <div className="relative flex items-center mt-2 ">
              <DatePicker onSelect={handleDateSelect} />
            </div>
            <div className="relative flex items-center ">
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
            className=" flex items-center gap-x-1 max-w-[166px] bg-gradient-to-r from-violet-500 to-violet-200 rounded-3xl shadow hover:bg-gradient-to-l from-violet-500 to-violet-200 px-4 py-2"
          >
            Submit
          </Button>
        </form>
      </div>
    </div>
  );
};

export default CreateComplaint;
