"use client"
import { format } from 'date-fns';
import React, { useEffect, useState } from 'react';

const DashboardHeading = () => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="pr-14 pl-16 rounded-3xl shadow-2xl max-md:px-5 bg-gradient-to-r from-violet-500 to-violet-400">
      <div className="flex gap-5 max-md:flex-col max-md:gap-0">
        <div className="flex flex-col w-[69%] max-md:ml-0 max-md:w-full">
          <div className="flex flex-col self-stretch my-auto text-base text-white text-opacity-80 max-md:mt-10 max-md:max-w-full">
            <div className="max-md:max-w-full">
              {format(currentTime, "PPP")} {currentTime.toLocaleTimeString()}
            </div>
            <div className="mt-16 mr-auto text-3xl font-semibold text-center text-white max-md:mt-10 max-md:max-w-full">
              Welcome back,
            </div>
            <div className="max-md:max-w-full">
              Always stay informed with the latest updates on your portal!
            </div>
          </div>
        </div>
        <div className="flex flex-col  w-[50%] max-md:ml-0 max-md:w-full">
          <img
            loading="lazy"
            src="/CollegeStudent.png"
            className=" w-full h-[250px] max-w-[450px] min-h-[250px] max-md:mt-10"
          />
        </div>
      </div>
    </div>
  );
};

export default DashboardHeading;
