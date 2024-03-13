"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import jwt from "jsonwebtoken";
const Profile = () => {
  const [userData, setUserData] = useState({ name: "", post: "", empId: "" });
  const [userImage, setUserImage] = useState("Sahil.jpg");
  useEffect(() => {
    const token = localStorage.getItem("complaintToken");
    if (token) {
      try {
        const decodedToken = jwt.decode(token);
        setUserData({
          name: decodedToken.name,
          post: decodedToken.post,
          empId: decodedToken.empId,
        });
        setUserImage(decodedToken.name + ".jpg");
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
            src={`/${userImage}`}
            alt="Profile Picture"
            className="self-center max-w-full aspect-square rounded-lg w-[200px]"
          />
        ) : (
          <Image
            width={250}
            height={250}
            src={"/Sahil.jpg"}
            alt="Profile Picture"
            priority
            className="self-center max-w-full aspect-square rounded-lg w-[200px]"
          />
        )}
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
