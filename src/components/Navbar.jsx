"use client";
import React, { useState, useEffect } from "react";
import ThemeToggler from "./ThemeToggler";
import { Input } from "./ui/input";
import jwt from "jsonwebtoken";
import Image from "next/image";
import { useRouter } from "next/navigation";
const Navbar = ({setActive, search, setSearch}) => {
  const [userData, setUserData] = useState({ name: "", post: "", image: "" });
  const router = useRouter();
  useEffect(() => {
    const token = localStorage.getItem("complaintToken");
    if (token) {
      try {
        const decodedToken = jwt.decode(token);
        setUserData({
          name: decodedToken.name,
          post: decodedToken.post,
          image: decodedToken.name + ".jpg",
        });
      } catch (error) {
        console.error("Error decoding token:", error);
      }
    } else {
      router.replace("/login");
    }
  }, []);

  function handleSearch(e) {
    setActive('View') 
    setSearch(e.target.value)
  }

  return (
    <div className=" w-full flex justify-between gap-28 items-center text-base text-center whitespace-nowrap max-md:flex-wrap">
      <div className="flex-3">
        <Input
          id="Search"
          className="w-80 justify-between items-center px-8 py-4 rounded-3xl shadow-2xl text-black text-opacity-50 max-md:px-5 dark:text-gray-100 dark:border-gray-400 "
          type="text"
          name="regNumber"
          placeholder="Search by Registration Number"
          value={search}
          onChange={(e)=>handleSearch(e)}
        />
      </div>
      <div className="flex gap-5 justify-between left-0">
        {userData.image ? (
          <div className="flex  ">
            <Image
              loading="lazy"
              width={75}
              height={75}
              alt="User Image"
              src={`/${userData.name}.jpg`}
              className="shrink-0 w-12 rounded-full border-violet-500 border-[4px]"
            />
            <div className="flex flex-col flex-1 px-2">
              <div className="font-medium text-black dark:text-gray-200">
                {userData.name}
              </div>
              <div className="text-black text-opacity-50 dark:text-gray-400">
                {userData.post}
              </div>
            </div>
          </div>
        ) : (
          <div className="flex  ">
            <img
              loading="lazy"
              srcSet="https://cdn.builder.io/api/v1/image/assets/TEMP/34590618cfe0a606816b1ae373a2cee1a02bdc5ee3d15b631304345a492bebbf?apiKey=95c72b9b5f5249ebb8078eebb9f06b59&width=100 100w, https://cdn.builder.io/api/v1/image/assets/TEMP/34590618cfe0a606816b1ae373a2cee1a02bdc5ee3d15b631304345a492bebbf?apiKey=95c72b9b5f5249ebb8078eebb9f06b59&width=200 200w, https://cdn.builder.io/api/v1/image/assets/TEMP/34590618cfe0a606816b1ae373a2cee1a02bdc5ee3d15b631304345a492bebbf?apiKey=95c72b9b5f5249ebb8078eebb9f06b59&width=400 400w, https://cdn.builder.io/api/v1/image/assets/TEMP/34590618cfe0a606816b1ae373a2cee1a02bdc5ee3d15b631304345a492bebbf?apiKey=95c72b9b5f5249ebb8078eebb9f06b59&width=800 800w, https://cdn.builder.io/api/v1/image/assets/TEMP/34590618cfe0a606816b1ae373a2cee1a02bdc5ee3d15b631304345a492bebbf?apiKey=95c72b9b5f5249ebb8078eebb9f06b59&width=1200 1200w, https://cdn.builder.io/api/v1/image/assets/TEMP/34590618cfe0a606816b1ae373a2cee1a02bdc5ee3d15b631304345a492bebbf?apiKey=95c72b9b5f5249ebb8078eebb9f06b59&width=1600 1600w, https://cdn.builder.io/api/v1/image/assets/TEMP/34590618cfe0a606816b1ae373a2cee1a02bdc5ee3d15b631304345a492bebbf?apiKey=95c72b9b5f5249ebb8078eebb9f06b59&width=2000 2000w, https://cdn.builder.io/api/v1/image/assets/TEMP/34590618cfe0a606816b1ae373a2cee1a02bdc5ee3d15b631304345a492bebbf?apiKey=95c72b9b5f5249ebb8078eebb9f06b59&"
              className="shrink-0 w-12 rounded-full border-violet-500 border-[10px] p-2 "
            />
            <div className="flex flex-col flex-1 px-2">
              <div className="font-medium text-black dark:text-gray-200">
                Name
              </div>
              <div className="text-black text-opacity-50 dark:text-gray-400">
                POST
              </div>
            </div>
          </div>
        )}
        <div className="mt-2">
          <ThemeToggler />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
