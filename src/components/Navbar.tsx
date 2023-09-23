import Image from "next/image";
import React from "react";

type Props = {};

const Navbar = (props: Props) => {
  return (
    <main className="poppins-font">
      <div className="bg-white w-full h-[119px] rounded-[20px] flex items-center justify-between">
        <div className="w-[476px] h-[55px] ml-7 relative">
          <input
            className="w-full h-full text-[#3B3E44] rounded-[30px] border-[1px] border-[#3B3E44] border-opacity-20 pl-[52px] pr-[10px] focus:outline-none hover:border-[#E1BC38] focus-within:shadow-md"
            placeholder="Search"
            type="text"
            name="input"
            id="input"
          />
          <Image
            src="/icons/search.png"
            width={24}
            height={24}
            className="absolute -translate-x-1/2 -translate-y-1/2 top-1/2 ml-7"
            alt="search"
          />
        </div>
        <div className="flex items-center">
          <div className="relative mr-[30px] hover:scale-110 transition-all duration-300 ease-in-out">
            <Image
              src="/icons/messages-nav.png"
              width={28}
              height={30}
              className="cursor-pointer "
              alt="messages"
            />
            <div className="absolute -top-2 -right-[7px]">
              <p className="w-5 h-5 flex items-center justify-center text-[11.43px] font-bold text-white bg-[#72ADD7] rounded-full">
                4
              </p>
            </div>
          </div>
          <div className="relative mr-[30px] hover:scale-110 transition-all duration-300 ease-in-out">
            <Image
              src="/icons/notifications-nav.png"
              width={25}
              height={30}
              className="cursor-pointer "
              alt="messages"
            />
            <div className="absolute -top-2 -right-[10px]">
              <p className="w-5 h-5 flex items-center justify-center text-[11.43px] font-bold text-white bg-[#F8BB54] rounded-full">
                4
              </p>
            </div>
          </div>
          <Image
            src="/icons/profilePicture.png"
            width={50}
            height={50}
            className="cursor-pointer mr-[20px] hover:opacity-80 hover:scale-105 transition-all duration-300 ease-in-out"
            alt="profile"
          />
          <Image
            src="/icons/profile dropdown.png"
            width={14}
            height={14}
            className="cursor-pointer mr-[30px] hover:scale-125 transition-all duration-300 ease-in-out"
            alt="dropdown"
          />
        </div>
      </div>
    </main>
  );
};

export default Navbar;
