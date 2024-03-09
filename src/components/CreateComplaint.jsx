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
import ThemeToggler from "./ThemeToggler";

const DatePicker = ({ onSelect }) => {
  const [date, setDate] = useState();

  const handleDateSelect = (date) => {
    setDate(format(date, "P").toString());
    onSelect(date);
  };

  return (
    <Popover className=" ">
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className="w-full justify-start text-left rounded-lg border border-violet-500"
        >
          <CalendarIcon className="mr-2 h-4 w-4 text-gray-500" size={20}/>
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
    name: "",
    email: "",
    mobileNumber: "",
    complaintName: "",
    description: "",
    complaintBy: "",
    date: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleDateSelect = (date) => {
    setFormData((prevData) => ({
      ...prevData,
      date: date.toISOString().slice(0, 22), // convert to "YYYY-MM
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // You can handle form submission here
    console.log(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-y-4 mt-4 ml-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="relative flex items-center ">
          <Input
            type="text"
            name="registrationNumber"
            placeholder="Registration Number"
            value={formData.registrationNumber}
            onChange={handleChange}
            className="bg-white rounded-2xl border border-violet-500 text-violet-400  font-semibold font-['Poppins'] px-4 py-2"
          />
          <Hash className="absolute right-6 text-gray-500" size={20} />
        </div>
        <div className="relative flex items-center ">
          <Input
            type="text"
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleChange}
            className="bg-white rounded-2xl border border-violet-500 text-violet-400  font-semibold font-['Poppins'] px-4 py-2"
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
            className="bg-white rounded-2xl border border-violet-500 text-violet-400  font-semibold font-['Poppins'] px-4 py-2"
          />
          <MailIcon className="absolute right-6 text-gray-500" size={20} />
        </div>
        <div className="relative flex items-center ">
          <Input
            type="tel"
            name="mobileNumber"
            placeholder="Mobile Number"
            value={formData.mobileNumber}
            onChange={handleChange}
            className="bg-white rounded-2xl border border-violet-500 text-violet-400  font-semibold font-['Poppins'] px-4 py-2"
          />
          <Smartphone className="absolute right-6 text-gray-500" size={20} />
        </div>
      </div>
      <div className="relative flex items-center ">
        <Input
          type="text"
          name="complaintName"
          placeholder="Complaint Name "
          value={formData.complaintName}
          onChange={handleChange}
          className="bg-white rounded-2xl border border-violet-500 text-violet-400  font-semibold font-['Poppins'] px-4 py-2"
        />
      </div>
      <div className="relative flex items-center">
        <Textarea
          name="description"
          placeholder="Complaint Description"
          value={formData.description}
          onChange={handleChange}
          className="bg-white rounded-2xl border border-violet-500 text-violet-400  font-semibold font-['Poppins'] px-4 py-2"
        />
        <MessageSquare className="absolute right-6 top-4  text-gray-500" size={20} />
      </div>
      <div className="grid grid-cols-2 gap-4 ">
        <div className="relative flex items-center  ">
          <DatePicker onSelect={handleDateSelect} />
        </div>
        <div className="relative flex items-center mt-4">
          <Input
            type="text"
            name="complaintBy"
            placeholder="Complaint By"
            value={formData.complaintBy}
            onChange={handleChange}
            className="bg-white rounded-2xl border border-violet-500 text-violet-400  font-semibold font-['Poppins'] px-4 py-2"
          />
          <User className="absolute right-6 text-gray-500" size={20} />
        </div>
      </div>
      <Button
        type="submit"
        className="mt-4 flex items-center gap-x-1 max-w-[166px] bg-gradient-to-r from-violet-500 to-violet-200 rounded-3xl shadow hover:bg-gradient-to-l from-violet-500 to-violet-200 px-4 py-2"
      >
        Submit
      </Button>
      <ThemeToggler/>
    </form>
  );
};

export default CreateComplaint;
