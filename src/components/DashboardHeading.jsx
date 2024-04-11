"use client";
import { format } from "date-fns";
import React, { useEffect, useReducer, useState } from "react";
import CountUp from "react-countup/build";

const Card = ({ name, data }) => {
  return (
    <div className="flex flex-col p-4 items-center bg-primary rounded-[50px] w-full">
      <link
        href="https://fonts.googleapis.com/css2?family=Train+One&display=swap"
        rel="stylesheet"
      ></link>
      <div className="mt-4 text-4xl text-zinc-300 train-one-regular">
        <CountUp end={data} delay={0.5} duration={1} />
      </div>
      <div className="mt-10 w-full text-center  py-4  text-xl bg-zinc-300  rounded-[40px] text-slate-700">
        {name}
      </div>
    </div>
  );
};

const DashboardHeading = ({userName}) => {
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
  }, []);

  return (
    <div>
      <div className="relative flex ">
        {/* Image */}
        <div className="absolute w-1/2 inset-y-0 right-0  z-10 mr-10   max-xl:hidden">
          <img
            loading="lazy"
            src="/new_img.png"
            // width={1440}
            // height={50}
            className="h-full w-full object-cover  "
            alt="College Student"
          />
        </div>
        {/* Box */}
        <div className="w-full pr-14 pl-12 mt-20  max-xl:mt-4 rounded-3xl shadow-2xl max-md:px-5 bg-primary z-0 ">
          <div className="flex py-6 justify-between max-md:ml-0 max-md:w-full">
            <div className="flex flex-col  self-stretch mt-4 text-base text-white dark:text-zinc-300 text-opacity-80 max-md:mt-10 max-md:max-w-full">
              <h2 className="text-xs max-md:max-w-full ">
                {format(currentTime, "PPP p")}
              </h2>
              <h1 className="mt-3 mr-auto italic text-3xl font-thin   font-['Poppins'] max-md:max-w-full">
                Welcome back, <a className=" not-italic font-thin">{userName}</a>
              </h1>
              <h3 className="max-md:max-w-full  ">
                Always stay informed with the latest updates on your portal!
              </h3>
            </div>
          </div>
        </div>
      </div>

      <div className="flex w-full flex-row mt-10 gap-8 justify-between">
        <Card name={"Total Complaint"} data={`${task.totalComplaints}`} />
        <Card name={"Pending Complaint"} data={`${task.PendingComplaints}`} />
        <Card name={"Resolved Complaint"} data={`${task.ResolvedComplaints}`} />
      </div>
    </div>
  );
};

export default DashboardHeading;
