"use client";
import Forms from "@/components/Forms";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import { useSpring, animated } from "@react-spring/web";

export default function Home() {
  const mainProps = useSpring({
    from: { opacity: 0, marginTop: -50 },
    to: { opacity: 1, marginTop: 0 },
    delay: 120,
    duration: 150,
  });
  const navProps = useSpring({
    from: { opacity: 0, marginRight: -550 },
    to: { opacity: 1, marginRight: 0 },
    delay: 100,
    duration: 100,
  });
  return (
    <div className="flex w-full">
      <Sidebar />
      <animated.div
        style={mainProps}
        className="flex flex-col pl-[25px] w-full"
      >
        <animated.div style={navProps}>
          <Navbar />
        </animated.div>
        <div className="poppins-font">
          <div className="pl-[5px] my-[30px]">
            <p className="font-semibold text-[26px] text-[#3B3E44] mb-[5px]">
              Invoices
            </p>
            <p className="text-[#84878B]">Invoices / New Invoice</p>
          </div>

          <Forms />
        </div>
      </animated.div>
    </div>
  );
}
