"use client";
import React, { useState, useEffect, useRef } from "react";
import SearchInput from "./SearchInput";
import { useInvoice } from "@/context/Context";

type Props = {
  selectedOption: string | null;
  setSelectedOption: any;
};

const SelectClientInput = ({ selectedOption, setSelectedOption }: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const { invoice } = useInvoice();

  let options = invoice?.client?.map((item) => item.name);

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
    <div className="pt-[43px] pl-[31px]">
      <p className="font-semibold text-lg text-[#3B3E44] mb-[15px]">Select</p>
      <div className="relative w-[596px] ml-[2px]">
        <div className="relative">
          <div className="relative w-full">
            <div
              className="w-[596px] h-[60px] rounded-[30px] text-[#84878B] flex items-center pl-5 border border-[#DCDCDC] cursor-pointer  hover:border-[#E1BC38] focus:outline-none"
              onClick={() => setIsOpen((prev) => !prev)}
            >
              {selectedOption || "Select Client"}
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
              setSelectedOption={setSelectedOption}
              dropdownRef={dropdownRef}
              options={options}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default SelectClientInput;
