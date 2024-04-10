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
  MessageSquareMore,
  MoveLeft,
  Smartphone,
  User,
} from "lucide-react";
import { Toast } from "./Toast";
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
    IdCardStatus: selectedComplaint.IdCardStatus,
    remark: selectedComplaint.remark,
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
      // alert(data.message);
      Toast.fire({
        icon: "success",
        title: data.message,
      });
    } catch (error) {
      // console.error("Error resolving complaint:", error);
      Toast.fire({
        icon: "error",
        title: error.message,
      });
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
      // alert(data.message);
      Toast.fire({
        icon: "success",
        title: data.message,
      });
    } catch (error) {
      // console.error("Error modifying complaint:", error);
      Toast.fire({
        icon: "error",
        title: error.message,
      });
    }
  };

  return (
    <div className="w-full">
      {/* <form onSubmit={handleSubmit} className="flex flex-col gap-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="relative flex items-center">
            <Input
              type="text"
              name="registrationNumber"
              placeholder="Registration Number"
              value={formData.registrationNumber}
              onChange={handleChange}
              disabled
              className="rounded-2xl  text-base font-semibold  px-4"
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
                className="rounded-2xl  text-base font-semibold  px-4"
              />
              <User className="absolute right-6 text-gray-500" size={20} />
            </div>
            <div className="">
              <Input
                className="rounded-2xl  text-base font-semibold  px-4"
                name="gender"
                value={formData.gender}
                disabled
                onChange={handleChange}
              />
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
            type="button"
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
      </form> */}
      {/* <Button className="w-fit mr-8 mb-4 hover:scale-105" onClick={() => onBack(null)}>
              <MoveLeft className="text-white" size={20} />
            </Button> */}
      <form onSubmit={handleSubmit} className="flex flex-col gap-y-4  ">
        <div className="grid grid-cols-2 gap-4">
          <div className="relative flex items-center ">
            <Input
              value={formData.registrationNumber}
              disabled
              className="rounded-2xl  text-base font-semibold  px-4 "
            />
            <Hash
              className="absolute right-6 text-muted-foreground"
              size={20}
            />
          </div>
          <div className="relative flex items-center gap-4 justify-between">
            <div className="flex w-full relative items-center">
              <Input
                disabled
                value={formData.studentName}
                className="rounded-2xl  text-base font-semibold  px-4 "
              />
              <User
                className="absolute right-6 text-muted-foreground"
                size={20}
              />
            </div>
            <div className=" flex relative items-center">
              <Input
                disabled
                className="rounded-2xl  text-base font-semibold  px-4"
                value={formData.gender}
              />
            </div>
          </div>
          <div className="relative flex items-center ">
            <Input
              disabled
              value={formData.email}
              className=" rounded-2xl  text-base font-semibold  px-4 "
            />
            <MailIcon
              className="absolute right-6 text-muted-foreground"
              size={20}
            />
          </div>
          <div className="relative flex items-center gap-4 justify-between">
            <div className="flex w-full relative items-center">
              <Input
                disabled
                value={formData.studentMobileNo}
                className="rounded-2xl  text-base font-semibold  px-4 "
              />
              <Smartphone
                className="absolute right-6 text-muted-foreground"
                size={20}
              />
            </div>
            <div className=" flex relative items-center">
              <Input
                disabled
                className="rounded-2xl  text-base font-semibold  px-4"
                value={formData.dateTime.substr(0, 10)}
              />
              <Calendar
                className="absolute right-6 text-muted-foreground"
                size={20}
              />
            </div>
          </div>
        </div>
        <div className="relative flex items-center ">
          <Input
            type="text"
            name="title"
            placeholder="Complaint Name"
            value={formData.title}
            onChange={handleChange}
            className=" rounded-2xl  text-base font-semibold  px-4 "
          />
        </div>
        <div className="relative flex items-center">
          <Textarea
            name="description"
            placeholder="Complaint Description"
            value={formData.description}
            onChange={handleChange}
            className=" rounded-2xl  text-base font-semibold  px-4 "
          />
          <MessageSquare
            className="absolute right-6 top-4 text-muted-foreground"
            size={20}
          />
        </div>
        <div className="relative flex items-center gap-4 justify-between">
          <div className="flex w-1/2 relative items-center">
            <Input
              type="text"
              name="remark"
              placeholder="Remarks"
              value={formData.remark}
              onChange={handleChange}
              className="rounded-2xl  text-base font-semibold  px-4 "
            />
            <MessageSquareMore
              className="absolute right-6 text-muted-foreground"
              size={20}
            />
          </div>
          <div className=" flex w-1/2 relative items-center">
            <select
              className="appearance-none w-full text-base text-muted-foreground  rounded-2xl flex h-[54px]  bg-background ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 border-input border font-semibold  disabled:opacity-50 py-2 px-8"
              name="IdCardStatus"
              value={formData.IdCardStatus}
              onChange={handleChange}
            >
              <option value="" disabled hidden>
                Select ID Status
              </option>
              <option className="" value="Taken">
                ID Taken
              </option>
              <option value="Returned Back">ID Returned Back</option>
            </select>
          </div>
        </div>
        <div className="relative flex items-center gap-4 justify-between">
          <div className="flex w-1/2 relative items-center justify-between">
            <Button
              className="w-fit p-6  hover:scale-105"
              onClick={() => onBack(null)}
            >
              <MoveLeft className="text-white" size={25} />
            </Button>
            <Button
              type="button"
              onClick={handleResolve}
              className=" rounded-2xl shadow hover:scale-105 p-6 bg-green-500  hover:bg-green-600 "
            >
              Mark as Resolved
            </Button>
            <Button
              type="submit"
              variant='default'
              className=" rounded-2xl shadow hover:scale-105 p-6"
            >
              Save Changes
            </Button>
          </div>
          <div className="flex w-1/2 relative items-center ">
            <Input
              value={formData.facultyName}
              disabled
              className=" rounded-2xl  text-base font-semibold  px-4"
            />
            <User
              className="absolute right-6 text-muted-foreground"
              size={20}
            />
          </div>
        </div>
      </form>
    </div>
  );
};

export default ModifyForm;
