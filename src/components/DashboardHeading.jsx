"use client";
import { format } from "date-fns";
import React, { useEffect, useReducer, useState } from "react";
import CountUp from "react-countup/build";

const Card = ({ name, data }) => {
  return (
    <div className="max-w-xs rounded-2xl py-4 bg-violet-300  flex flex-col justify-between items-center">
      <h1 className="text-white font-['Poppins'] text-2xl font-semibold">
        {name}
      </h1>
      <div className="text-4xl leading-none font-bold text-violet-500">
        <CountUp end={data} delay={0.5} duration={1} />
      </div>
    </div>
  );
};

const DashboardHeading = () => {
  const [currentTime, setCurrentTime] = useState(new Date());

  const [task, updateTask] = useReducer(
    (prev, next) => ({
      ...prev,
      ...next,
    }),
    {
      totalComplaints: "",
      PendingComplaints: "",
      ResolvedComplaints: "",
      totalStudents: "",
      MaleStudents: "",
      FemaleStudents: "",
    }
  );

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    fetch(`${process.env.SERVER_APP_URL}/faculty/complaints`)
      .then((response) => response.json())
      .then((data) => {
        let pendingCount = 0;
        let resolvedCount = 0;
        data.complaints.forEach((complaint) => {
          if (complaint.status === "Pending") {
            pendingCount++;
          } else if (complaint.status === "Resolved") {
            resolvedCount++;
          }
        });
        updateTask({
          totalComplaints: data.complaints.length,
          PendingComplaints: pendingCount,
          ResolvedComplaints: resolvedCount,
        });
      })
      .catch((error) => {
        console.error("Error fetching complaints:", error);
      });
    fetch(`${process.env.SERVER_APP_URL}/faculty/students`)
      .then((response) => response.json())
      .then((data) => {
        let MaleCount = 0;
        let FemaleCount = 0;
        data.students.forEach((student) => {
          if (student.gender === "Male") {
            MaleCount++;
          } else if (student.gender === "Female") {
            FemaleCount++;
          }
        });
        updateTask({
          totalStudents: data.students.length,
          MaleStudents: MaleCount,
          FemaleStudents: FemaleCount,
        });
      })
      .catch((error) => {
        console.error("Error fetching students:", error);
      });
  }, []);

  return (
    <div>
      <div className="pr-14 pl-16 rounded-3xl shadow-2xl max-md:px-5 bg-gradient-to-r from-violet-500 to-violet-400">
        <div className="flex gap-5 max-md:flex-col max-md:gap-0">
          <div className="flex flex-col w-[69%] max-md:ml-0 max-md:w-full">
            <div className="flex flex-col self-stretch my-auto text-base text-white text-opacity-80 max-md:mt-10 max-md:max-w-full">
              <div className="max-md:max-w-full">
                {format(currentTime, "PPP p")}
              </div>
              <div className="mt-16 mr-auto text-3xl font-semibold text-center text-white max-md:mt-10 max-md:max-w-full">
                Welcome back,
              </div>
              <div className="max-md:max-w-full">
                Always stay informed with the latest updates on your portal!
              </div>
            </div>
          </div>
          <div className="flex flex-col w-[50%] max-md:ml-0 max-md:w-full">
            <img
              loading="lazy"
              src="/CollegeStudent.png"
              className=" w-full h-[250px] max-w-[450px] min-h-[250px] max-md:mt-10"
            />
          </div>
        </div>
      </div>

      <div className="pl-10 grid grid-cols-3 mt-4 gap-y-4">
        <Card name={"Total Complaint"} data={`${task.totalComplaints}`} />
        <Card name={"Pending Complaint"} data={`${task.PendingComplaints}`} />
        <Card name={"Resolved Complaint"} data={`${task.ResolvedComplaints}`} />
        <Card name={"Total Students"} data={`${task.totalStudents}`} />
        <Card name={"Male Students"} data={`${task.MaleStudents}`} />
        <Card name={"Female Students"} data={`${task.FemaleStudents}`} />
      </div>
    </div>
  );
};

export default DashboardHeading;
