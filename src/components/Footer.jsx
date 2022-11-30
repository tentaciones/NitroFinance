import React from "react";
import { useContext } from "react";
import { PoolContext } from "../context/PoolContext";
const Footer = () => {
  const { BlockNumber } = useContext(PoolContext);
  return (
    <div className=" flex h-[50px] w-screen tablet:text-[16px] text-[10px] text-gray-500 font-display justify-between items-center mt-[300px]  border-t border-gray-500  px-2 tablet:px-32">
      <p>NITROFINANCE</p>
      <div className="flex gap-5">
        <p>TWITTER</p>
        <p>DISCORD</p>
        <p>MEDIUM</p>
        <p>GITHUB</p>
        <div className="flex space-x-2">
          <p className="animate-ping bg-green-600 rounded-full h-2 w-2 mt-2"></p>
          <p className="text-green-600">{BlockNumber}</p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
