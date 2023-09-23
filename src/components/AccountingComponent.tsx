import { useInvoice } from "@/context/Context";
import React, { useState, useEffect } from "react";

type Props = {
  price: number | null;
  tva: number | null;
  setTva: any;
};

const AccountingComponent = ({ price, tva, setTva }: Props) => {
  const { invoice } = useInvoice();

  useEffect(() => {
    if (invoice?.products) {
      for (const item of invoice?.products) {
        if (item?.type === "Plane") {
          setTva(item.tva);
          break;
        }
      }
    }
  }, [invoice?.products]);
  return (
    <div className="my-[30px] mr-[92px] flex justify-end items-end">
      <div className="flex flex-col justify-end items-end text-lg mr-[50px]">
        <p className="font-semibold  text-[#3B3E44] mr-[50px] mb-5">
          Subtotal :
        </p>
        <p className="font-semibold  text-[#3B3E44] mr-[50px] ">TVA :</p>
      </div>
      <div className="flex flex-col justify-end items-end text-lg">
        <p className="font-medium text-[#84878B] mb-5">
          {price?.toLocaleString()}.000
        </p>
        <p className="font-medium text-[#84878B]">
          {tva?.toLocaleString()}.000
        </p>
      </div>
    </div>
  );
};

export default AccountingComponent;
