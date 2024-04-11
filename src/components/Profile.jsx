"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
const Profile = ({token}) => {
  const [userData, setUserData] = useState({ name: "", post: "", empId: "", img:"" });
  useEffect(() => {
    if (token) {
      try {
        setUserData({
          name: token.name,
          post: token.post,
          empId: token.empId,
          img:token.name + ".jpg"
        });
      } catch (error) {
        console.error("Error decoding token:", error);
      }
    }
  }, []);
  return (
    <div className="flex justify-center items-center h-full">
      <div className="w-[500px] flex flex-col px-14 py-16 text-3xl font-medium text-center text-white bg-gradient-to-tr from-primary to-secondary rounded-3xl shadow-2xl max-md:px-5">
        {userData.name ? (
          <Image
            loading="lazy"
            width={250}
            height={250}
            src={`/${userData.img}`}
            alt="Profile Picture"
            className="self-center max-w-full aspect-square rounded-lg w-[200px]"
          />
        ) : null
        }
        <div className="mt-7 max-md:max-w-full">{userData.empId}</div>
        <div className="mt-3 font-semibold max-md:max-w-full">
          {userData.name}
        </div>
        <div className="mt-3.5 text-white text-opacity-70 max-md:max-w-full">
          {userData.post}
        </div>
      </div>
    </div>
  );
};

export default Profile;
