import Image from "next/image";
import React from "react";
import SearchInput from "./SearchInput";
import { useState, useEffect, useRef } from "react";
import { Plus } from "lucide-react";
import ProductForm from "./ProductForm";
import { useInvoice } from "@/context/Context";

type Props = {};

const SecondForm = (props: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isOpen2, setIsOpen2] = useState(false);

  //   const [subtotal, setSubtotal] = useState([]);
  const [price, setPrice] = useState(9000);
  const [selectedOption, setSelectedOption] = useState("Plane");
  const [tourSelectedOption, setTourSelectedOption] =
    useState("Falcon8X TBA/LTI");

  const [invoice] = useInvoice();

  const [planeTva, setPlaneTva] = useState();
  const [shipTva, setShipeTva] = useState();
  useEffect(() => {
    if (invoice?.products) {
      for (const item of invoice?.products) {
        if (item?.type === "Plane") {
          setPlaneTva(item.tva);
          setShipeTva(null);
        } else if (item?.type === "Ship") {
          setShipeTva(item.tva);
          //   setPlaneTva(null);
        }
      }
    }
  }, [invoice?.products]);

  const [components, setComponents] = useState([
    <ProductForm key={0} index={0} onDelete={() => deleteComponent(0)} />,
  ]);

  const addComponent = () => {
    const newComponents = [
      ...components,
      <ProductForm
        key={components.length}
        index={components.length}
        onDelete={() => deleteComponent(components.length)}
      />,
    ];
    setComponents(newComponents);
  };

  const deleteComponent = (indexToDelete: number) => {
    if (components.length === 1) {
      alert("You must have at least one component.");
      return;
    }
    console.log("index", indexToDelete);
    const updatedComponents = components.filter(
      (_, index) => index !== indexToDelete
    );
    console.log("updated components", updatedComponents);
    setComponents(updatedComponents);
  };

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };
  const toggleDropdown2 = () => {
    setIsOpen2(!isOpen2);
  };

  return (
    <div className="w-full bg-white rounded-[10px]">
      <div className="pt-5 pl-[31px] pb-[17px] flex justify-between">
        <div className="flex">
          <div className="mr-[55px] flex items-center">
            <p className="font-semibold text-[#3B3E44] mr-[5px]">
              Products Type
            </p>
            <Image
              src="/icons/up-down.png"
              width={5}
              height={10}
              alt="up-down"
            />
          </div>
          <div className="mr-[186px] flex items-center">
            <p className="font-semibold text-[#3B3E44] mr-[5px]">Products</p>
            <Image
              src="/icons/up-down.png"
              width={5}
              height={10}
              alt="up-down"
            />
          </div>
          <div className="mr-[55px]">
            <p className="font-semibold text-[#3B3E44]">Description</p>
          </div>
        </div>
        <div className="mr-[206px]">
          <p className="font-semibold text-[#3B3E44]">Total</p>
        </div>
      </div>

      <hr className="border border-[#E7ECF3] mb-5" />

      {/* Inputs */}
      {components.map((component, index) => (
        <div key={index}>
          <ProductForm
            index={index}
            onDelete={deleteComponent}
            price={price}
            setPrice={setPrice}
            selectedOption={selectedOption}
            setSelectedOption={setSelectedOption}
            tourSelectedOption={tourSelectedOption}
            setTourSelectedOption={setTourSelectedOption}
          />
        </div>
      ))}

      {/* Add button */}
      <div
        className="ml-[30px] pb-5 w-[150px] text-[#E1BC38] font-medium hover:text-amber-300 text-lg transition-transform   hover:-translate-y-0.5 duration-400 ease-in-out cursor-pointer"
        // onClick={() => setProductCount(productCount + 1)}
        onClick={addComponent}
      >
        + Add Product
      </div>

      <hr className="border border-[#E7ECF3]" />

      {/* Accounting */}

      <div className="my-[30px] mr-[92px] flex justify-end items-end">
        <div className="flex flex-col justify-end items-end text-lg mr-[50px]">
          <p className="font-semibold  text-[#3B3E44] mr-[50px] mb-5">
            Subtotal :
          </p>
          <p className="font-semibold  text-[#3B3E44] mr-[50px] ">TVA :</p>
        </div>
        <div className="flex flex-col justify-end items-end text-lg">
          <p className="font-medium text-[#84878B] mb-5">{price}</p>
          <p className="font-medium text-[#84878B]">
            {selectedOption === "Plane" ? planeTva : shipTva}
          </p>
        </div>
      </div>

      <hr className="border border-[#E7ECF3] mb-[30px]" />

      {/* Download section */}
      <div className="pl-[30px] pb-[35px] flex items-center justify-between">
        <div className="flex">
          <div className="w-[141px] h-[60px] rounded-[30px] mr-[30px] text-semibold text-lg text-white bg-[#E1BC38] cursor-pointer flex items-center justify-center hover:bg-amber-300 transition-colors duration-300 ease-in-out">
            Save
          </div>
          <div className="w-[141px] h-[60px] rounded-[30px] mr-[30px] text-semibold text-lg text-[#84878B] bg-white border border-[#84878B] cursor-pointer flex items-center justify-center hover:border-red-700 hover:text-red-500 transition-all duration-300 ease-in-out">
            Cancel
          </div>
          <div className="w-[249px] h-[60px] rounded-[30px] mr-[30px] text-semibold text-lg text-white bg-[#E1BC38] cursor-pointer flex items-center justify-center hover:tracking-wider hover:bg-gradient-to-r hover:from-amber-500 hover:via-amber-400 hover:to-amber-300 transition-all duration-500 ease-in-out">
            Download Invoice
          </div>
        </div>
        <div className=" mr-[92px] flex justify-end items-end">
          <div className="flex flex-col justify-end items-end text-lg mr-[50px]">
            <p className="font-semibold  text-[#E1BC38] mr-[50px]">Total :</p>
          </div>
          <div className="flex flex-col justify-end items-end text-lg">
            <p className="font-medium text-[#E1BC38]">
              {selectedOption === "Plane" && planeTva
                ? price + planeTva
                : price + shipTva}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SecondForm;
