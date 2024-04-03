import Image from "next/image";
import React from "react";

const HeadingCard = ({heading}) => {
  return (
    <div className="mb-4 rounded-3xl shadow-xl max-md:px-5 bg-gradient-to-r from-violet-500 to-violet-400">
      <div className="flex max-md:flex-col max-md:gap-0 justify-between">
        <div className="text-3xl mt-10 mx-24 font-semibold text-center text-white whitespace-nowrap">
          {heading}
        </div>

        <div className=" mx-5  w- full max-md:ml-0 max-md:w-full">
          <Image
            // loading="lazy"
            src="/card_cap.svg" 
            width={150}
            height={150}
            alt="Cap for card"
            className=" object-cover overflow-hidden shrink-0 min-h-auto min-w-auto"
            priority
            style={{ width: "auto" }} 
          />
        </div>
      </div>
    </div>
  );
};

export default HeadingCard;
