import React from "react";
import FileUpload from "./FileUpload";
import SearchInput from "./SearchInput";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import { useInvoice } from "@/context/Context";

type Props = {};

const FirstForm = (props: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isOpen2, setIsOpen2] = useState(false);
  const dropdownRef = useRef(null);
  const dropdownRef2 = useRef(null);
  const [selectedOption, setSelectedOption] = useState(null);
  const [tourSelectedOption, setTourSelectedOption] = useState(null);

  const [invoice] = useInvoice();

  const options = invoice?.client?.map((item) => item.name);
  const tourOptions = invoice?.trip?.map((item) => item.name);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };
  const toggleDropdown2 = () => {
    setIsOpen2(!isOpen2);
  };

  useEffect(() => {
    const handleClickOutside = (event: any) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
      if (
        dropdownRef2.current &&
        !dropdownRef2.current.contains(event.target)
      ) {
        setIsOpen2(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  return (
    <div className="w-full h-[313px] bg-white rounded-[10px] mb-[40px]">
      <div>
        <div className="flex justify-between">
          <div className="flex ">
            {/* First & Fourth: Select Client & Trip */}
            <div>
              {/* Client */}
              <div className="pt-[43px] pl-[31px]">
                <p className="font-semibold text-lg text-[#3B3E44] mb-[15px]">
                  Select
                </p>
                <div className="relative w-[596px] ml-[2px]">
                  <div className="relative">
                    <div className="relative w-full">
                      <div
                        className="w-[596px] h-[60px] rounded-[30px] text-[#84878B] flex items-center pl-5 border border-[#DCDCDC] cursor-pointer  hover:border-[#E1BC38] focus:outline-none"
                        onClick={toggleDropdown}
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
                        dropdownRef2={undefined}
                        tourOptions={undefined}
                      />
                    )}
                  </div>
                </div>
              </div>
              {/* Trip */}
              <div className="pt-[30px] pl-[31px]">
                <p className="font-semibold text-lg text-[#3B3E44] mb-[15px]">
                  Trip
                </p>
                <div className="relative w-[254px] ml-[2px]">
                  <div className="relative">
                    <div className="relative w-full">
                      <div
                        className="w-[254px] h-[60px] rounded-[30px] text-[#84878B] text-sm flex items-center pl-5 border border-[#DCDCDC] cursor-pointer  hover:border-[#E1BC38] focus:outline-none"
                        onClick={toggleDropdown2}
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

                    {isOpen2 && (
                      <SearchInput
                        setTourSelectedOption={setTourSelectedOption}
                        dropdownRef2={dropdownRef2}
                        tourOptions={tourOptions}
                        dropdownRef={undefined}
                      />
                    )}
                  </div>
                </div>
              </div>
            </div>
            {/* Second: Calendar */}
            <div className="pt-[43px] pl-[20px]">
              <p className="font-semibold text-lg text-[#3B3E44] mb-[15px]">
                Invoice Date
              </p>
              <div className="w-[300px] ml-[2px]">
                <input
                  type="date"
                  id="datepicker"
                  placeholder="Select Date"
                  className="w-full h-[60px] px-5 border border-[#DCDCDC] rounded-[30px] hover:border-[#E1BC38] cursor-pointer focus:outline-none"
                />
              </div>
            </div>
          </div>
          {/* Third: File Upload */}
          <div className="pt-[43px] pr-[42px]">
            <p className="font-semibold text-lg text-[#3B3E44] mb-[15px]">
              Plane Image
            </p>
            <FileUpload />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FirstForm;
