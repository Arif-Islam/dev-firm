import { useInvoice } from "@/context/Context";
import React, { useState, useEffect, useRef } from "react";
import SearchInput from "./SearchInput";

type Props = {
  tourSelectedOption: string | null;
  setTourSelectedOption: any;
};

const TripInput = ({ tourSelectedOption, setTourSelectedOption }: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const { invoice } = useInvoice();

  let tourOptions = invoice?.trip?.map((item) => item.name);

  useEffect(() => {
    const handleClickOutside = (event: any) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  return (
    <div className="pt-[30px] pl-[31px]">
      <p className="font-semibold text-lg text-[#3B3E44] mb-[15px]">Trip</p>
      <div className="relative w-[254px] ml-[2px]">
        <div className="relative">
          <div className="relative w-full">
            <div
              className="w-[254px] h-[60px] rounded-[30px] text-[#84878B] text-sm flex items-center pl-5 border border-[#DCDCDC] cursor-pointer  hover:border-[#E1BC38] focus:outline-none"
              onClick={() => setIsOpen((prev) => !prev)}
            >
              {tourSelectedOption || "T2390"}
              <div className="absolute inset-y-0 right-0 flex items-center pr-7 pointer-events-none">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 h-5 text-[#84878B]"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </div>
            </div>
          </div>

          {isOpen && (
            <SearchInput
              setTourSelectedOption={setTourSelectedOption}
              dropdownRef={dropdownRef}
              tourOptions={tourOptions}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default TripInput;
