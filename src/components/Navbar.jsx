import React, { useState, useEffect } from "react";
import ThemeToggler from "./ThemeToggler";
import { Input } from "./ui/input";
import Image from "next/image";
const Navbar = ({ setActive, search, setSearch, token }) => {
  const [userData, setUserData] = useState({ name: "", post: "", image: "" });
  useEffect(() => {
    if (token) {
      setUserData({
        name: token.name,
        post: token.post,
        image: token.name + ".jpg",
      });
    }
  }, [token]);

  function handleSearch(e) {
    setActive("View");
    setSearch(e.target.value);
  }

  return (
    <div className="  flex flex-col md:flex-row justify-between items-center gap-5 font-sans">
      <div className="flex-1 flex-grow">
        <Input
          id="Search"
          className=" px-8 py-4 rounded-full shadow-md text-black dark:text-gray-100 dark:bg-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          type="text"
          name="regNumber"
          placeholder="Search by Registration Number"
          value={search}
          onChange={(e) => handleSearch(e)}
        />
      </div>
      <div className="flex items-center gap-2 md:flex-grow md:justify-end">
        {userData.image ? (
          <div className="flex items-center mr-2">
            <Image
              loading="lazy"
              width={50}
              height={50}
              alt="User Image"
              src={`/${userData.name}.jpg`}
              className="rounded-full  border-primary shrink-0 border-4"
            />
            <div className="flex flex-col ml-2 items-center">
              <div className="font-medium text-black dark:text-gray-200">
                {userData.name}
              </div>
              <div className="text-gray-500 dark:text-gray-400">
                {userData.post}
              </div>
            </div>
          </div>
        ) : null}
        <ThemeToggler className="ml-2" />
      </div>
    </div>
  );
};

export default Navbar;
