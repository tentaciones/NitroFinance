import { HiOutlineArrowNarrowLeft } from "react-icons/hi";
import { IoNavigateCircleOutline } from "react-icons/io5";
import { TfiArrowsHorizontal } from "react-icons/tfi";
import { Link, useParams } from "react-router-dom";
import { useContext } from "react";
import { PoolContext } from "../context/PoolContext";

const MyPosition = () => {
  const { token0, token1, market, nftId, colFactor, intRate } = useParams();
  const { image } = useContext(PoolContext);
  return (
    <div className=" py-32 tablet:px-[300px]  px-2 font-display">
      <Link to="/positions">
        <div className="flex text-[#BEBEBE]">
          <HiOutlineArrowNarrowLeft className="text-2xl mx-2" />
          <p>Back to Dashboard</p>
        </div>
      </Link>
      <div className="flex justify-between text-[#BEBEBE]">
        <div className="flex justify-between">
          <p className="text-white">
            {token1}/{token0}
          </p>
          <div className="flex space-x-3 px-1">
            <IoNavigateCircleOutline className="text-2xl" />
            <p className="text-white text-xl">
              {colFactor},{intRate}
            </p>
          </div>
        </div>

        <div className="space-x-3 tablet:block flex justify-between">
          <Link
            to={"/increaseLiquidity/" + token0 + "/" + token1 + "/" + market}
          >
            <button className="bg-[#05B8B2] border rounded-lg text-white tablet:h-[50px] tablet:w-[200px] w-[100px] tablet:text-[16px] text-[10px] h-[25px]">
              + Increase Liquidity
            </button>
          </Link>
          <Link to={"/removeLiquidity/"}>
            <button className="bg-[#121E28] border rounded-lg text-white tablet:h-[50px] tablet:w-[200px] w-[100px] tablet:text-[16px] text-[10px] h-[25px]">
              {" "}
              - Remove Liquidity
            </button>
          </Link>
        </div>
      </div>
      <div className="flex tablet:space-x-10 space-x-2 mt-5">
        <div className="flex justify-center items-center h-[500x] tablet:w-[500px] w-1/2 bg-[#111E28] rounded-lg shadow-lg">
          <img src={image} alt="nftImage" />
        </div>
        <div className="h-[500px] tablet:w-[500px] w-1/2  bg-[#111E28] rounded-lg shadow-lg tablet:text-[16px] text-[10px]">
          <div className="flex justify-between text-white  tablet:px-10  px-2  pt-20 pb-5 ">
            <p>TokenID</p>
            <p>{nftId}</p>
          </div>

          <div className="flex justify-between text-white tablet:px-10  px-2 py-5 ">
            <p>My Position Size</p>
            <p>222k</p>
          </div>
          <div className="flex justify-between text-white tablet:px-10  px-2  py-5 ">
            <p>Utilization Rate</p>
            <p>33%</p>
          </div>

          <div className="flex justify-between text-white tablet:px-10  px-2  py-5 ">
            <p>Invariant Value (k)</p>
            <p>100k</p>
          </div>

          <div className="flex justify-between text-white tablet:px-10  px-2  py-5 ">
            <p>Total Position Size</p>
            <p>10000k</p>
          </div>
        </div>
      </div>

      <div className="flex mt-5 justify-between">
        <div className="w-[370px] h-[140px] bg-[#111E28] rounded-lg flex flex-col items-center justify-center">
          <p className="text-[#BEBEBE]">Collateral Factor</p>
          <p className="text-white">{colFactor}%</p>
        </div>
        <div className="flex justify-center items-center">
          <TfiArrowsHorizontal className="text-[#BEBEBE] text-[30px]" />
        </div>

        <div className="w-[370px] h-[140px] bg-[#111E28] rounded-lg flex flex-col items-center justify-center">
          <p className="text-[#BEBEBE]">Interest</p>
          <p className="text-white">{intRate}%</p>
        </div>
      </div>
    </div>
  );
};

export default MyPosition;
