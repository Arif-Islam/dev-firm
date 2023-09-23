"use client";
import { useInvoice } from "@/context/Context";
import Image from "next/image";
import React, { useState, useEffect, useRef } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { useSpring, useTransition, animated } from "@react-spring/web";

type Props = {};

const InvoicePage = (props: Props) => {
  const [client, setClient] = useState<string>("");
  const [trip, setTrip] = useState<string>("");
  const [reservation, setReservation] = useState<string>("");
  const [type, setType] = useState<string>("");
  const [product, setProduct] = useState<string>("");
  const [desc, setDesc] = useState<string>("");
  const [price, setPrice] = useState<number | null>();
  const [tva, setTva] = useState<number | null>();
  const [total, setTotal] = useState<number | null>();
  const [invoiceDate, setInvoiceDate] = useState();

  const [clicked, setClicked] = useState<boolean>(false);

  const { downloadInvoice } = useInvoice();

  const pdfRef = useRef();

  useEffect(() => {
    for (const item of downloadInvoice) {
      setClient(item.client);
      setTrip(item.trip);
      setType(item.type);
      setProduct(item.product);
      setDesc(item.desc);
      setPrice(item.price);
      setTva(item.tva);
      setTotal(item.total);
      setReservation(item.reservation);
      setInvoiceDate(item.date);
    }
  }, [
    downloadInvoice,
    setClient,
    setDesc,
    setPrice,
    setProduct,
    setReservation,
    setTotal,
    setTrip,
    setTva,
    setType,
    setInvoiceDate,
  ]);

  const downloadPdf = () => {
    setClicked(true);
    setTimeout(() => {
      const input = pdfRef.current;
      html2canvas(input).then((canvas) => {
        const imgData = canvas.toDataURL("image/png");
        const pdf = new jsPDF("p", "mm", "a4", true);
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = pdf.internal.pageSize.getHeight();
        const imgWidth = canvas.width;
        const imgHeight = canvas.height;
        const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);
        const imgX = (pdfWidth - imgWidth * ratio) / 2;
        const imgY = 30;
        pdf.addImage(
          imgData,
          "PNG",
          imgX,
          imgY,
          imgWidth * ratio,
          imgHeight * ratio
        );
        pdf.save("invoice.pdf");
      });

      setClicked(false);
    }, 1);
  };

  const invoiceProps = useSpring({
    from: { opacity: 0, marginRight: -550 },
    to: { opacity: 1, marginRight: 0 },
    delay: 50,
    duration: 50,
  });
  const btnProps = useSpring({
    from: { opacity: 0, marginLeft: -550 },
    to: { opacity: 1, marginLeft: 0 },
    delay: 50,
    duration: 50,
  });
  return (
    <div className="w-screen flex flex-col items-center justify-center">
      <animated.div style={invoiceProps}>
        <div
          ref={pdfRef}
          className="w-[1410px] rounded-[10px] mx-auto poppins-font bg-white"
        >
          <div className="px-[35px] pt-[31px] pb-[44px]  flex items-center justify-between">
            <div>
              <p className="font-semibold text-[26px] text-[#3B3E44] mb-[10px]">
                Invoice No #
                <span className="font-medium text-[#84878B]">I909112</span>
              </p>
              <p className="font-medium text-lg text-[#3B3E44]">
                Date : <span className="text-[#84878B]">{invoiceDate}</span>
              </p>
            </div>
            <div className="font-medium text-black opacity-50 text-[40px] ">
              Logo
            </div>
            <div className="text-[#84878B] text-end">
              <p className="mb-[5px]">
                <span className="mb-[5px]">1474 Avenue Kwame</span>
                NKRUMAH 10 BP 13395
              </p>
              <p className="mb-[5px]">10 Ouagadougou, Burkina Faso</p>
              <p className=" mb-[5px] hover:text-[#E1BC38]">
                <a href="mailto:finance@lizetransport.com">
                  finance@lizetransport.com
                </a>
              </p>
              <p>+1 (226) 50 272383</p>
            </div>
          </div>

          <hr className="border border-[#E7ECF3] mb-[30px]" />

          <div className="pl-[35px] pr-[50px] pb-[30px]">
            <p className="font-semibold text-lg text-[#3B3E44] mb-[5px]">
              Invoiced To:
            </p>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[#84878B] mb-[5px]">{client}</p>
                <p className="text-[#84878B] mb-[5px]">
                  Lize Transport Organization
                </p>
                <p className="text-[#84878B] ">+1 (226) 50 272383</p>
              </div>
              <div className="text-end text-[#84878B]">
                <p className="mb-[5px]">1474 Avenue Kwame,</p>
                <p className="mb-[5px]">NKRUMAH 10 BP 13395</p>
                <p className="mb-[5px]">10 Ouagadougou, Burkina Faso</p>
                <p className="hover:text-[#E1BC38]">
                  <a href="mailto:finance@lizetransport.com">
                    finance@lizetransport.com
                  </a>
                </p>
              </div>
            </div>
          </div>

          <div className="w-full border-y border-[#E7ECF3] pl-[35px] pr-[87px] h-16">
            <div className="h-full flex items-center">
              <div className="mr-[233px] flex items-center justify-start py-5 ">
                <p
                  style={{ verticalAlign: "middle" }}
                  className={`font-semibold text-[#3B3E44] mr-[5px] ${
                    clicked ? "-mt-[19px]" : ""
                  } `}
                >
                  Products
                </p>
                <Image
                  src="/icons/up-down.png"
                  className=""
                  style={{ verticalAlign: "middle" }}
                  width={5}
                  height={10}
                  alt="up-down"
                />
              </div>
              <div className="mr-[233px] py-5 ">
                <p
                  style={{ verticalAlign: "middle" }}
                  className={` ${
                    clicked ? "-mt-[19px]" : ""
                  } font-semibold text-[#3B3E44]`}
                >
                  Description
                </p>
              </div>
              <div className="mr-[233px] py-5 flex items-center justify-start">
                <p
                  style={{ verticalAlign: "middle" }}
                  className={`font-semibold text-[#3B3E44] mr-[5px] ${
                    clicked ? "-mt-[19px]" : ""
                  } `}
                >
                  Reservation
                </p>
                <Image
                  src="/icons/up-down.png"
                  style={{ verticalAlign: "middle" }}
                  width={5}
                  height={10}
                  alt="up-down"
                />
              </div>
              <div className="mr-[233px] py-5">
                <p
                  style={{ verticalAlign: "middle" }}
                  className={` ${
                    clicked ? "-mt-[19px]" : ""
                  } font-semibold text-[#3B3E44]`}
                >
                  Trip
                </p>
              </div>
              <div className="py-5 ">
                <p
                  style={{ verticalAlign: "middle" }}
                  className={` ${
                    clicked ? "-mt-[19px]" : ""
                  } font-semibold text-[#3B3E44]`}
                >
                  Total
                </p>
              </div>
            </div>
          </div>

          <div className="w-full mx-auto pl-[35px] flex items-center text-[#84878B] text-sm ">
            <div className="w-[316px] py-5">
              <p className={`${clicked && "-mt-[18px]"}`}>{product}</p>
            </div>
            <div className="w-[310px] mr-[16px] py-5">
              <p className={`${clicked && "-mt-[18px]"}`}>{desc}</p>
            </div>
            <div className="w-[340px]  py-5">
              <p className={`${clicked && "-mt-[18px]"}`}>{reservation}</p>
            </div>
            <div className="w-[265px] py-5">
              <p className={`${clicked && "-mt-[18px]"}`}>{trip}</p>
            </div>
            <div className="py-5">
              <p className={`${clicked && "-mt-[18px]"}`}>
                {price?.toLocaleString()}.000
              </p>
            </div>
          </div>

          <hr className="border border-[#E7ECF3] mb-[30px]" />

          <div className="mb-[30px] mr-[50px] flex justify-end items-end">
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

          <div className="w-full border-y border-[#E7ECF3]">
            <div className=" font-semibold text-lg text-[#E1BC38] my-5 mr-[50px] flex justify-end items-end">
              <div className="flex flex-col justify-end items-end text-lg mr-[50px]">
                <p className="mr-[50px]">Total :</p>
              </div>
              <div className="flex flex-col justify-end items-end text-lg">
                <p className="font-semibold">{total?.toLocaleString()}.000</p>
              </div>
            </div>
          </div>

          <div className="text-center py-5 text-[#84878B]">Name Of Company</div>
        </div>
      </animated.div>

      <animated.div
        style={btnProps}
        className="w-[249px] h-[60px] rounded-[30px] my-7 text-semibold text-lg text-white bg-[#E1BC38] cursor-pointer flex items-center justify-center hover:tracking-wider hover:bg-gradient-to-r hover:from-amber-500 hover:via-amber-400 hover:to-amber-300 transition-all duration-500 ease-in-out"
        onClick={downloadPdf}
      >
        Download Invoice
      </animated.div>
    </div>
  );
};

export default InvoicePage;
