import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { User, MailIcon, ArrowRightIcon, Smartphone, Hash } from "lucide-react";
import HeadingCard from "./HeadingCard";
import { Toast } from "./Toast";
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
            title: "Student exists with this registration number.",
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
            title: "Student added successfully.",
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
        title: "All info required. Reg & mobile # must be 10 digits.",
      });
    }
  };

  return (
    <div className="w-full ">
      <HeadingCard heading={"Create A New Student Profile"} />

      <form
        onSubmit={handleSubmit}
        className="flex flex-col m-auto gap-y-4 max-w-3xl "
      >
        <div className="relative flex gap-3 items-center">
          <div className="w-1/3 h-full py-4 rounded-2xl bg-[#d9d9d9] px-7 text-primary font-semibold">
            Registration Number
          </div>
          <Input
            className="rounded-2xl w-2/3 text-base font-semibold  px-4"
            type="text"
            name="regNumber"
            placeholder="00XYZ00000"
            value={formData.regNumber}
            onChange={handleChange}
          />
          <Hash className="absolute right-6" size={20} />
        </div>
        <div className="relative flex gap-3 items-center">
          <div className="w-1/3 h-full py-4 rounded-2xl bg-[#d9d9d9] px-7 text-primary font-semibold">
            Student Name
          </div>
          <Input
            className=" rounded-2xl w-2/3 text-base font-semibold  px-4"
            type="text"
            name="name"
            placeholder="John Doe"
            value={formData.name}
            onChange={handleChange}
          />
          <User className="absolute right-6" size={20} />
        </div>

        <div className="relative flex gap-3 items-center">
          <div className="w-1/3 h-full py-4 rounded-2xl bg-[#d9d9d9] px-7 text-primary font-semibold">
            Student Email
          </div>
          <Input
            className=" rounded-2xl w-2/3 text-base font-semibold  px-4"
            type="email"
            name="email"
            placeholder="john_doe@example.com"
            value={formData.email}
            onChange={handleChange}
          />
          <MailIcon className="absolute right-6 " size={20} />
        </div>
        <div className="relative flex gap-3 items-center">
          <div className="w-1/3 h-full py-4 rounded-2xl bg-[#d9d9d9] px-7 text-primary font-semibold">
            Mobile Number
          </div>
          <Input
            className="rounded-2xl w-2/3 text-base font-semibold  px-4"
            type="tel"
            name="mobileNo"
            placeholder="0000000000"
            value={formData.mobileNo}
            onChange={handleChange}
          />
          <Smartphone className="absolute right-6 " size={20} />
        </div>
        <div className="relative flex gap-3 items-center">
          <div className="w-1/3 h-full py-4 rounded-2xl bg-[#d9d9d9] px-7 text-primary font-semibold">
            Gender (M / F)
          </div>
          <select
            className="appearance-none w-2/3 text-muted-foreground rounded-2xl bg-background ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 border-input border font-semibold p-4"
            name="gender"
            value={formData.gender}
            onChange={handleChange}
          >
            <option value="" hidden disabled>
              Select Gender
            </option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
        </div>
        <div className="flex w-full justify-center items-center">
          <Button
            type="submit"
            className=" w-1/2 py-6 bg-primary rounded-3xl shadow hover:scale-105 ease-in-out font-semibold "
          >
            Submit
            <ArrowRightIcon size={20} />
          </Button>
        </div>
      </form>
    </div>
  );
};

export default AddStudent;
