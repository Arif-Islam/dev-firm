import { useRouter } from "next/navigation";
import React, { useState, useEffect, useRef } from "react";
import ProductForm from "./ProductForm";
import AccountingComponent from "./AccountingComponent";
import Image from "next/image";
import FileUpload from "./FileUpload";
import Calendar from "./Calendar";
import TripInput from "./TripInput";
import SelectClientInput from "./SelectClientInput";
import { useInvoice } from "@/context/Context";

type Props = {};

const Forms = (props: Props) => {
  const router = useRouter();

  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [tourSelectedOption, setTourSelectedOption] = useState<string | null>(
    "T2390"
  );
  const [price, setPrice] = useState<number | null>(9000);
  const [selectedType, setSelectedType] = useState<string | null>("Plane");
  const [selectedProduct, setSelectedProduct] = useState<string | null>(
    "Falcon8X TBA/LTI"
  );
  const [totalPrice, setTotalPrice] = useState<number | null>(null);
  const [tva, setTva] = useState<number | null>(0);
  const [desc, setDesc] = useState<string | null>("Product description");
  const [reservation, setReservation] = useState<string | null>("R2390");
  const [selectedDate, setSelectedDate] = useState();

  const { invoice, updateInvoice } = useInvoice();

  const [components, setComponents] = useState([
    <ProductForm key={0} index={0} onDelete={() => deleteComponent(0)} />,
  ]);

  const goToInvoicePage = () => {
    const newInvoice = [
      {
        client: selectedOption || "John Smith",
        trip: tourSelectedOption,
        reservation: reservation,
        date: selectedDate || new Date().toLocaleDateString(),
        type: selectedType,
        product: selectedProduct,
        desc: desc,
        price: price,
        tva: tva,
        total: totalPrice,
      },
    ];

    updateInvoice(newInvoice);

    router.push("/invoice");
  };

  // const addComponent = () => {
  //   const newComponents = [
  //     ...components,
  //     <ProductForm
  //       key={components.length}
  //       index={components.length}
  //       onDelete={() => deleteComponent(components.length)}
  //     />,
  //   ];
  //   setComponents(newComponents);
  // };

  const deleteComponent = (indexToDelete: number) => {
    if (components.length === 1) {
      alert("You must order one product!");
      return;
    }

    const updatedComponents = components.filter(
      (_, index) => index !== indexToDelete
    );

    setComponents(updatedComponents);
  };

  useEffect(() => {
    setTotalPrice(price + tva);
    if (invoice?.trip) {
      for (const item of invoice?.trip) {
        if (item.name === tourSelectedOption) {
          setReservation(item.reservation);
          break;
        }
      }
    }
  }, [price, tva]);

  return (
    <>
      {/* Start First Form */}
      <div className="w-full h-[313px] bg-white rounded-[10px] mb-[40px]">
        <div>
          <div className="flex justify-between">
            <div className="flex ">
              <div>
                <SelectClientInput
                  selectedOption={selectedOption}
                  setSelectedOption={setSelectedOption}
                ></SelectClientInput>

                <TripInput
                  tourSelectedOption={tourSelectedOption}
                  setTourSelectedOption={setTourSelectedOption}
                />
              </div>

              <Calendar setSelectedDate={setSelectedDate} />
            </div>
            {/* File Upload */}
            <div className="pt-[43px] pr-[42px]">
              <p className="font-semibold text-lg text-[#3B3E44] mb-[15px]">
                Plane Image
              </p>
              <FileUpload />
            </div>
          </div>
        </div>
      </div>

      {/* Start Second Form */}
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
              selectedType={selectedType}
              setSelectedType={setSelectedType}
              selectedProduct={selectedProduct}
              setSelectedProduct={setSelectedProduct}
              setDesc={setDesc}
            />
          </div>
        ))}

        {/* Add button */}
        <div
          className="ml-[30px] pb-5 w-[150px] text-[#E1BC38] font-medium hover:text-amber-300 text-lg transition-transform   hover:-translate-y-0.5 duration-400 ease-in-out cursor-pointer"
          // onClick={addComponent}
        >
          + Add Product
        </div>

        <hr className="border border-[#E7ECF3]" />

        {/* Accounting */}

        <AccountingComponent price={price} tva={tva} setTva={setTva} />

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
            <div
              className="w-[249px] h-[60px] rounded-[30px] mr-[30px] text-semibold text-lg text-white bg-[#E1BC38] cursor-pointer flex items-center justify-center hover:tracking-wider hover:bg-gradient-to-r hover:from-amber-500 hover:via-amber-400 hover:to-amber-300 transition-all duration-500 ease-in-out"
              onClick={goToInvoicePage}
            >
              Download Invoice
            </div>
          </div>
          <div className=" mr-[92px] flex justify-end items-end">
            <div className="flex flex-col justify-end items-end text-lg mr-[50px]">
              <p className="font-semibold  text-[#E1BC38] mr-[50px]">Total :</p>
            </div>
            <div className="flex flex-col justify-end items-end text-lg">
              <p className="font-medium text-[#E1BC38]">
                {totalPrice?.toLocaleString()}.000
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Forms;
