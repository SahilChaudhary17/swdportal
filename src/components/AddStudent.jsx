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

  const handleChange = async (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    // Check if registration number and mobile number have a length of 10 characters
    if (name === "regNumber" && value.length === 10) {
      // Fetch student details if the registration number exists
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
          }));
          alert("Student exists with this registration number.");
        }
      } catch (error) {
        console.error("Error fetching student details:", error);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { regNumber, name, email, mobileNo } = formData;

    // Check if all fields are filled and regNumber and mobileNo have length of 10 characters
    if (
      regNumber.length === 10 &&
      name !== "" &&
      email !== "" &&
      mobileNo.length === 10
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
          alert("Student added successfully");
          window.location.reload();
        }
      } catch (error) {
        alert(error);
      }
    } else {
      alert("Please fill in all the details and ensure the registration number and mobile number have a length of 10 characters.");
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
