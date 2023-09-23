"use client";
import { ChevronsLeft, ChevronsRight } from "lucide-react";
import Image from "next/image";
import React, { useState } from "react";
import { useSpring, useTransition, animated } from "@react-spring/web";

type Props = {};

interface dropDownItemsType {
  title: string;
}

interface linkType {
  title: string;
  icon: string;
  isOpen?: boolean;
  dropDownItems?: dropDownItemsType[];
}

const links: linkType[] = [
  {
    title: "Dashboard",
    icon: "/icons/dashboard.png",
  },
  {
    title: "Reservations",
    icon: "/icons/reservations.png",
  },
  {
    title: "Trips",
    icon: "/icons/trips.png",
    isOpen: false,
    dropDownItems: [
      { title: "Trips IDs" },
      { title: "Flowers" },
      { title: "Drinks" },
    ],
  },
  {
    title: "Invoices",
    icon: "/icons/invoices.png",
  },
  {
    title: "Planes",
    icon: "/icons/planes.png",
    isOpen: false,
    dropDownItems: [
      { title: "Foods" },
      { title: "Planes" },
      { title: "Airbus" },
    ],
  },
  {
    title: "Amenities",
    icon: "/icons/amenities.png",
    isOpen: false,
    dropDownItems: [{ title: "Ship" }, { title: "Mango" }, { title: "Orange" }],
  },
  {
    title: "Contacts",
    icon: "/icons/contacts.png",
  },
  {
    title: "Team",
    icon: "/icons/team.png",
  },
  {
    title: "Crew Members",
    icon: "/icons/crew_members.png",
  },
  {
    title: "Files",
    icon: "/icons/files.png",
  },
  {
    title: "Messages",
    icon: "/icons/messages.png",
  },
  {
    title: "Calendar",
    icon: "/icons/calendar.png",
  },
  {
    title: "Setting",
    icon: "/icons/settings.png",
  },
];

const Sidebar = (props: Props) => {
  const [Menu, SetMenu] = useState(links);
  const [open, setOpen] = useState(true);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const setSubMenuOpen = (index: number) => {
    SetMenu((prevMenus) =>
      prevMenus.map((menu, i) => {
        if (i === index) {
          return { ...menu, isOpen: !menu.isOpen };
        }
        return menu;
      })
    );
  };

  const sidebarProps = useSpring({
    from: { opacity: 0, marginTop: -50 },
    to: { opacity: 1, marginTop: 0 },
    delay: 20,
    duration: 50,
  });

  // color code: #383FE1 blue

  return (
    <div className="poppins-font">
      <animated.div
        style={sidebarProps}
        className={`${
          isCollapsed ? "w-[100px]" : "w-[345px]"
        }  bg-[#E1BC38] min-h-screen relative transition-all duration-500 ease-in-out rounded-[20px]`}
      >
        {isCollapsed ? (
          <ChevronsRight
            className="text-gray-200 w-8 h-8 absolute right-7 top-12 cursor-pointer z-50 transition-all duration-500 ease-in-out"
            onClick={() => setIsCollapsed(!isCollapsed)}
          />
        ) : (
          <ChevronsLeft
            className="text-gray-200 w-8 h-8 absolute right-7 top-12 cursor-pointer z-50 transition-all duration-500 ease-in-out"
            onClick={() => setIsCollapsed(!isCollapsed)}
          />
        )}
        {!isCollapsed && (
          <h1
            className={`${
              isCollapsed ? "text-xl" : "text-[40px] leading-[60px]"
            } text-white opacity-50 font-medium text-center pt-8 pb-[27px]`}
          >
            Logo
          </h1>
        )}

        <ul
          className={`flex flex-col ${
            isCollapsed
              ? "justify-end items-end pt-[110px]"
              : "justify-end items-end"
          } `}
        >
          {Menu.map((Menu, index) => (
            <div key={index}>
              <div
                className={`h-[86px] py-1 flex  ${
                  isCollapsed ? "justify-center" : "justify-end"
                }`}
              >
                <li
                  key={index}
                  className={`${index === 3 && "bg-[#ffde6580]"} ${
                    isCollapsed ? "w-[80px] pl-5" : "w-[300px] pl-8"
                  }  h-[78px] rounded-l-full flex rounded-md  cursor-pointer hover:bg-[#ffde6580] items-center
                transition-all duration-300 ease-in-out`}
                  onClick={() => setSubMenuOpen(index)}
                >
                  {Menu.icon && (
                    <Image
                      src={Menu.icon}
                      width={25}
                      height={25}
                      className={`${isCollapsed ? "mr-2" : "mr-[17px]"}`}
                      alt="Icon"
                    />
                  )}
                  {!isCollapsed && (
                    <p
                      className={`${
                        index === 3 ? "text-white" : "text-[#FFFFFF80]"
                      } flex-1 font-medium`}
                    >
                      {Menu.title}
                    </p>
                  )}

                  {Menu.dropDownItems && (
                    <Image
                      src="/icons/dropdown.png"
                      width={20}
                      height={20}
                      alt="dropdown"
                      className={`${Menu.isOpen && "rotate-180"} ${
                        isCollapsed ? "mr-2" : "mr-[35px]"
                      }  transition-all duration-300 ease-in-out`}
                    />
                  )}
                </li>
              </div>
              {Menu.dropDownItems && Menu.isOpen && open && (
                <ul className="overflow-hidden">
                  {Menu.dropDownItems.map((subMenuItem, idx) => (
                    <li
                      key={idx}
                      className={`${
                        isCollapsed
                          ? "w-[80px] text-[13px] hover:text-sm pl-[20px]"
                          : "w-[300px] text-sm hover:text-[15px] pl-[70px]"
                      }  flex cursor-pointer text-center  text-white opacity-75 py-1 transition-all duration-300 ease-in-out`}
                    >
                      {subMenuItem.title}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </ul>

        <div className="mt-5 pb-[49px]">
          <div
            className={`${
              isCollapsed
                ? "justify-center hover:scale-110"
                : "ml-[82px] w-[85px] hover:scale-105"
            } flex items-center cursor-pointer transition-all duration-300 ease-in-out`}
          >
            <Image
              src="/icons/logout.png"
              className={`${!isCollapsed && "mr-[10px]"}`}
              width={20}
              height={25}
              alt="logout"
            />
            {!isCollapsed && <p className="font-medium text-white">Logout</p>}
          </div>
        </div>
      </animated.div>
    </div>
  );
};

export default Sidebar;
