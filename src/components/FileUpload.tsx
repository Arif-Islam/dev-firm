import Image from "next/image";
import React, { useState } from "react";
import { X, Upload } from "lucide-react";

type Props = {};

const FileUpload = (props: Props) => {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event: any) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setSelectedFile(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveFile = () => {
    setSelectedFile(null);
  };
  return (
    <div
      className={`w-[186px] h-[124px] ${
        selectedFile
          ? "rounded-[10px]"
          : "border border-dashed border-[#E1BC38]"
      }  relative`}
    >
      {selectedFile ? (
        <div className="hover:opacity-90 hover:cursor-pointer">
          <p
            onClick={handleRemoveFile}
            className="w-full absolute top-12 z-50 flex items-center justify-center font-semibold text-white"
          >
            Change
          </p>
          <Image
            src={selectedFile}
            alt="Uploaded"
            fill={true}
            className="rounded-[10px] object-cover hover:opacity-90 contrast-125"
          />
          <div className="absolute inset-0 bg-black opacity-30 rounded-[10px]"></div>

          <button
            onClick={handleRemoveFile}
            className="absolute -top-3 -right-2 bg-[#F1F1F1] text-[#84878B] hover:bg-red-500 hover:text-red-300 transition-all duration-300 ease-in-out rounded-full p-0.5 w-[26px] h-[26px] flex items-center justify-center"
          >
            <X className="w-[22px] h-[22px]" strokeWidth={2.5} />
          </button>
        </div>
      ) : (
        <div className="w-full h-full absolute top-1/2 -translate-x-1/2 -translate-y-1/2 left-1/2 flex flex-wrap items-center justify-center">
          <label
            htmlFor="file-upload"
            className="flex items-center justify-center cursor-pointer text-sm text-[#E1BC38] font-medium"
          >
            <Upload className="mr-[15px] w-6 h-6" strokeWidth={1.5} />
            Upload <br /> Plane Image
          </label>
          <input
            type="file"
            id="file-upload"
            accept="image/*"
            className="hidden"
            onChange={handleFileChange}
          />
        </div>
      )}
    </div>
  );
};

export default FileUpload;
