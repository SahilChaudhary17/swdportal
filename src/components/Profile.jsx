import React from "react";
import Image from "next/image";
const Profile = () => {
  return (
    <div>
      <div className="flex flex-col px-14 py-16 text-3xl font-medium text-center text-white bg-gradient-to-tr from-primary to-secondary rounded-3xl shadow-2xl max-w-[623px] max-md:px-5 ">
        <Image
          loading="lazy"
          width={250}
          height={250}
          src={'/Sahil.jpg'}
          className="self-center max-w-full aspect-square rounded-lg w-[200px]"
        />
        <div className="mt-7 max-md:max-w-full">21BAI10209</div>
        <div className="mt-3 font-semibold max-md:max-w-full">
          SAHIL CHAUDHARY
        </div>
        <div className="mt-3.5 text-white text-opacity-70 max-md:max-w-full">
          GENERAL SECRETARY
        </div>
      </div>
    </div>
  );
};

export default Profile;
