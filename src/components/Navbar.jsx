import React from "react";
import ThemeToggler from "./ThemeToggler";
import { Input } from "./ui/input";

const Navbar = () => {
  return (
    <div className=" w-full flex justify-between  gap-28 mt-4 items-center text-base text-center whitespace-nowrap max-md:flex-wrap">
      <div className="flex-3">
        <Input
          className="w-80 justify-between items-center px-8 py-4 rounded-3xl shadow-2xl text-black text-opacity-50 max-md:px-5 dark:text-gray-100 dark:border-gray-400 "
          type="text"
          name="regNumber"
          placeholder="Search by Registration Number"
          // value={}
          // onChange={}
        />
      </div>
      <div className="flex gap-5 justify-between left-0">
        <div className="flex  ">
          <img
            loading="lazy"
            srcSet="https://cdn.builder.io/api/v1/image/assets/TEMP/34590618cfe0a606816b1ae373a2cee1a02bdc5ee3d15b631304345a492bebbf?apiKey=95c72b9b5f5249ebb8078eebb9f06b59&width=100 100w, https://cdn.builder.io/api/v1/image/assets/TEMP/34590618cfe0a606816b1ae373a2cee1a02bdc5ee3d15b631304345a492bebbf?apiKey=95c72b9b5f5249ebb8078eebb9f06b59&width=200 200w, https://cdn.builder.io/api/v1/image/assets/TEMP/34590618cfe0a606816b1ae373a2cee1a02bdc5ee3d15b631304345a492bebbf?apiKey=95c72b9b5f5249ebb8078eebb9f06b59&width=400 400w, https://cdn.builder.io/api/v1/image/assets/TEMP/34590618cfe0a606816b1ae373a2cee1a02bdc5ee3d15b631304345a492bebbf?apiKey=95c72b9b5f5249ebb8078eebb9f06b59&width=800 800w, https://cdn.builder.io/api/v1/image/assets/TEMP/34590618cfe0a606816b1ae373a2cee1a02bdc5ee3d15b631304345a492bebbf?apiKey=95c72b9b5f5249ebb8078eebb9f06b59&width=1200 1200w, https://cdn.builder.io/api/v1/image/assets/TEMP/34590618cfe0a606816b1ae373a2cee1a02bdc5ee3d15b631304345a492bebbf?apiKey=95c72b9b5f5249ebb8078eebb9f06b59&width=1600 1600w, https://cdn.builder.io/api/v1/image/assets/TEMP/34590618cfe0a606816b1ae373a2cee1a02bdc5ee3d15b631304345a492bebbf?apiKey=95c72b9b5f5249ebb8078eebb9f06b59&width=2000 2000w, https://cdn.builder.io/api/v1/image/assets/TEMP/34590618cfe0a606816b1ae373a2cee1a02bdc5ee3d15b631304345a492bebbf?apiKey=95c72b9b5f5249ebb8078eebb9f06b59&"
            className="shrink-0 w-12 rounded-full"
          />
          <div className="flex flex-col flex-1 px-2">
            <div className="font-medium text-black dark:text-gray-200">
              Sahil Chaudhary
            </div>
            <div className="text-black text-opacity-50 dark:text-gray-400">
              General Secretary
            </div>
          </div>
        </div>
        <div className="mt-2">
          <ThemeToggler />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
