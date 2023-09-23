import Image from "next/image";
import React from "react";
import SearchInput from "./SearchInput";
import { useState, useEffect, useRef } from "react";
import { useInvoice } from "@/context/Context";

type Props = {
  index?: number;
  onDelete?: any;
  price?: number | null;
  setPrice?: any;
  selectedType?: string | null;
  setSelectedType?: any;
  selectedProduct?: string | null;
  setSelectedProduct?: any;
  setDesc: any;
};

const ProductForm = ({
  index,
  onDelete,
  price,
  setPrice,
  selectedType,
  setSelectedType,
  selectedProduct,
  setSelectedProduct,
  setDesc,
}: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isOpen2, setIsOpen2] = useState(false);
  const dropdownRef = useRef(null);
  const dropdownRef2 = useRef(null);

  const { invoice } = useInvoice();

  let typeOptions = invoice?.products?.map((item) => item.type);
  let productOptions = invoice?.product?.map((item) => item.name);

  useEffect(() => {
    const x = invoice?.product?.find((item) => item.name === selectedProduct);
    setPrice(x?.price);
  }, [invoice?.product, selectedProduct, price, setPrice]);

  if (selectedType === "Plane") {
    productOptions = productOptions?.slice(0, 5);
  } else if (selectedType === "Ship") {
    productOptions = productOptions?.slice(-4);
  }

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
    <div className="pb-5 pl-[30px] flex justify-between">
      <div className="flex">
        <div className="relative w-[166px] mr-[15px]">
          <div className="relative">
            <div className="relative w-full">
              <div
                className="w-[166px] h-[60px] rounded-[10px] text-[#84878B] text-sm flex items-center pl-5 border border-[#DCDCDC] cursor-pointer  hover:border-[#E1BC38] focus:outline-none"
                onClick={toggleDropdown}
              >
                {selectedType}
                <div className="absolute inset-y-0 right-0 flex items-center pr-[25px] pointer-events-none">
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
                setSelectedType={setSelectedType}
                dropdownRef={dropdownRef}
                typeOptions={typeOptions}
              />
            )}
          </div>
        </div>
        <div className="relative w-[254px] mr-[15px]">
          <div className="relative">
            <div className="relative w-full">
              <div
                className="w-[254px] h-[60px] rounded-[10px] text-[#84878B] text-sm flex items-center pl-5 border border-[#DCDCDC] cursor-pointer  hover:border-[#E1BC38] focus:outline-none"
                onClick={toggleDropdown2}
              >
                {selectedProduct}
                <div className="absolute inset-y-0 right-0 flex items-center pr-[25px] pointer-events-none">
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
                setSelectedProduct={setSelectedProduct}
                dropdownRef2={dropdownRef2}
                productOptions={productOptions}
              />
            )}
          </div>
        </div>
        <div className="w-[389px]">
          <input
            type="text"
            placeholder="Description for Product"
            onChange={(e) => setDesc(e.target.value)}
            className="w-[389px] h-[60px] rounded-[10px] text-[#84878B] text-sm flex items-center pl-5 border border-[#DCDCDC] hover:border-[#E1BC38] focus:shadow-md focus:outline-none"
          />
        </div>
      </div>
      <div className="flex items-center">
        <input
          type="text"
          readOnly
          placeholder="11,500.000"
          value={price?.toLocaleString() + ".000"}
          className="w-[155px] h-[60px] rounded-[10px] text-[#84878B] text-sm flex items-center pl-5 border border-[#DCDCDC] hover:border-[#E1BC38] focus:shadow-md focus:outline-none mr-[14px]"
        />
        <Image
          src="/icons/delete.png"
          className="mr-7 cursor-pointer hover:bg-red-200 rounded-lg transition-all duration-300 ease-in-out"
          onClick={() => onDelete(index)}
          width={50}
          height={50}
          alt="delete"
        />
      </div>
    </div>
  );
};

export default ProductForm;
