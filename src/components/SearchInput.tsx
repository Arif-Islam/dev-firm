import Image from "next/image";
import React from "react";
import { useState } from "react";

type Props = {
  setSelectedOption?: any;
  dropdownRef?: any;
  dropdownRef2?: any;
  options?: any;
  setTourSelectedOption?: any;
  tourOptions?: any;
  setSelectedType?: any;
  setSelectedProduct?: any;
  typeOptions?: any;
  productOptions?: any;
};

const SearchInput = ({
  setSelectedOption,
  dropdownRef,
  dropdownRef2,
  options,
  setTourSelectedOption,
  tourOptions,
  setSelectedType,
  setSelectedProduct,
  typeOptions,
  productOptions,
}: Props) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [hide, setHide] = useState(false);

  const filterOptions = () => {
    if (options) {
      return options.filter((option: any) =>
        option.toLowerCase().includes(searchTerm.toLowerCase())
      );
    } else if (tourOptions) {
      return tourOptions.filter((option: any) =>
        option.toLowerCase().includes(searchTerm.toLowerCase())
      );
    } else if (typeOptions) {
      return typeOptions.filter((option: any) =>
        option.toLowerCase().includes(searchTerm.toLowerCase())
      );
    } else if (productOptions) {
      return productOptions.filter((option: any) =>
        option.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
  };

  const handleOptionSelect = (option: any) => {
    if (options) {
      setSelectedOption(option);
    } else if (tourOptions) {
      setTourSelectedOption(option);
    } else if (typeOptions) {
      setSelectedType(option);
    } else if (productOptions) {
      setSelectedProduct(option);
    }

    setSearchTerm("");
    setHide(true);
  };

  return (
    <div
      ref={dropdownRef || dropdownRef2}
      style={{ boxShadow: "0px 0px 15px 0px #0000000D" }}
      className={`${
        hide && "hidden"
      } absolute top-full left-0 w-[295px] mt-[10px] bg-white border border-[#DCDCDC] rounded-[10px] pt-5 pb-2 px-4 z-50`}
    >
      <div className="relative">
        <input
          type="text"
          className="w-[262px] h-[55px] pl-[39px] text-[#3B3E44] border rounded-[30px] border-[#3B3E44] border-opacity-20 focus:outline-none focus:border-opacity-60"
          placeholder="Search"
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <Image
          src="/icons/search.png"
          className="absolute top-1/2 -translate-x-1/2 -translate-y-1/2 left-6"
          width={24}
          height={24}
          alt="search"
        />
      </div>

      <ul className="py-2">
        {filterOptions()?.map((option: any, index: number) => (
          <li
            key={index}
            className={`${index === 0 && "mt-[10px]"}   ${
              (index !== options?.length - 1 ||
                index !== tourOptions?.length - 1) &&
              "mb-[19px]"
            } text-[#84878B] text-lg hover:text-[#E1BC38] font-normal pr-2 rounded-[10px] cursor-pointer`}
            onClick={() => handleOptionSelect(option)}
          >
            {option}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SearchInput;
