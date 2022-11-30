import React from "react";
import { BiSearch } from "react-icons/bi";
import { MdOutlineArrowBackIos } from "react-icons/md";
import { Link } from "react-router-dom";
const PositionExpanded = ({ close }) => {
  return (
    <div className="flex space-x-5 h-[500px] w-full shadow-sm mt-10">
      <div className="w-3/5  px-5  bg-[#10101B]  border-indigo-600 border rounded-3xl">
        <div className="flex justify-between ">
          <MdOutlineArrowBackIos
            className="hover:cursor-pointer mt-10"
            onClick={() => close()}
          />
          <p className="mt-10">Eth/Usdc</p>
          <div className="flex items-center mt-5">
            <input
              type="text"
              className=" relative  tablet:h-[50px] h-[30px] outline-none bg-[#121E28] tablet:px-20  px-[30px] tablet:rounded-3xl rounded-xl tablet:w-[300px] w-full tablet:mr-0 mr-[10px]  placeholder:text-[#BEBEBE] hover:outline-indigo-600 focus:outline-indigo-600"
              placeholder="search"
            />
            <BiSearch className=" absolute text-xl tablet:mx-10 mx-2" />
          </div>
        </div>
        <Link to="/myPosition">
          <div className="flex justify-between items-center  pt-5 hover:bg-black px-5 rounded-md">
            <div>
              <p>PositionId</p>
              <p>#1</p>
            </div>
            <div>
              <p>Position</p>
              <p>80-20</p>
            </div>
            <div>
              <p>PositionSize</p>
              <p>300</p>
            </div>
            <div>
              <p>InvariantValue</p>
              <p>1k</p>
            </div>
          </div>
        </Link>
      </div>
      <div className="w-2/5  px-5  h-[250px] bg-[#10101B]  border-indigo-600 border rounded-3xl">
        <div className="space-y-5 pt-[50px]">
          <div className="flex justify-between">
            <p>Total Positions</p>
            <p>1</p>
          </div>
          <div className="flex justify-between">
            <p>Total Position Size</p>
            <p>800k</p>
          </div>
          <div className="flex justify-between">
            <p>Cumalated Invariant Value</p>
            <p>30</p>
          </div>
          <div className="flex justify-between">
            <p>Total Liquidity</p>
            <p>$3</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PositionExpanded;
