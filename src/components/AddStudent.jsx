import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { User, MailIcon, ArrowRightIcon, Smartphone, Hash } from "lucide-react";
import HeadingCard from "./HeadingCard";
import {Toast} from './Toast'
const AddStudent = () => {
  const [formData, setFormData] = useState({
    regNumber: "",
    name: "",
    email: "",
    mobileNo: "",
    gender: "",
  });

  const handleChange = async (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    if (name === "regNumber" && value.length === 10) {
      try {
        const response = await fetch(
          `${process.env.SERVER_APP_URL}/faculty/student/${value}`
        );
        if (response.ok) {
          const studentData = await response.json();
          setFormData((prevData) => ({
            ...prevData,
            name: studentData.name,
            email: studentData.email,
            mobileNo: studentData.mobileNo,
            gender: studentData.gender,
          }));
          Toast.fire({ 
            icon: "warning",
            title: 'Student exists with this registration number.',
          });
        }
      } catch (error) {
        console.error("Error fetching student details:", error);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { regNumber, name, email, mobileNo, gender } = formData;

    if (
      regNumber.length === 10 &&
      name !== "" &&
      email !== "" &&
      mobileNo.length === 10 &&
      gender !== ""
    ) {
      try {
        const response = await fetch(
          `${process.env.SERVER_APP_URL}/faculty/students/add`,
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
        } else {
          Toast.fire({ 
            icon: "success",
            title: 'Student added successfully.',
          });
        }
      } catch (error) {
        Toast.fire({ 
          icon: "error",
          title: error.message,
        });
      }
    } else {
      Toast.fire({ 
        icon: "warning",
        title: 'All info required. Reg & mobile # must be 10 digits.',
      });
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
        <div className="relative flex items-center rounded-2xl border border-violet-500">
          <select
            className="appearance-none text-gray-500  rounded-2xl flex h-[54px] w-full bg-background ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 border-violet-500 border font-semibold font-['Poppins'] disabled:opacity-50 py-2 px-8 dark:text-gray-400"
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
          className="flex items-center gap-x-1 max-w-[166px] bg-violet-500 rounded-3xl shadow hover:bg-violet-600"
        >
          Submit
          <ArrowRightIcon size={20} />
        </Button>
      </form>
    </div>
  );
};

export default AddStudent;
