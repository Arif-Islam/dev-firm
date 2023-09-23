import React from "react";

type Props = {
  setSelectedDate: any;
};

const Calendar = ({ setSelectedDate }: Props) => {
  return (
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
          onChange={(event) =>
            setSelectedDate(new Date(event.target.value).toLocaleDateString())
          }
        />
      </div>
    </div>
  );
};

export default Calendar;
