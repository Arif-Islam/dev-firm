"use client";

import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import axios from "axios";

interface Props {
  children?: ReactNode;
}

const InvoiceContext = createContext([]);

export function useInvoice() {
  return useContext(InvoiceContext);
}

export function ContextProvider({ children }: Props) {
  const [invoice, setInvoice] = useState({});
  const [downloadInvoice, setDownloadInvoice] = useState([]);

  const updateInvoice = (newInvoice) => {
    setDownloadInvoice(newInvoice);
    localStorage.setItem("invoice", JSON.stringify(newInvoice));
  };

  // const download = [];

  useEffect(() => {
    const storedInvoice = JSON.parse(localStorage.getItem("invoice"));
    if (storedInvoice) {
      setDownloadInvoice(storedInvoice);
    }

    const fetchData = async () => {
      try {
        await axios.get("/api/submit").then((response) => {
          setInvoice(response.data);
        });
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <InvoiceContext.Provider
      value={{ invoice, downloadInvoice, setDownloadInvoice, updateInvoice }}
    >
      {children}
    </InvoiceContext.Provider>
  );
}
