import React, { useEffect, useState, useContext } from "react";
import { BiSearch } from "react-icons/bi";
import { MdOutlineArrowBackIos } from "react-icons/md";
import { Link, useParams } from "react-router-dom";
import { PoolContext } from "../context/PoolContext";
const PositionExpanded = ({ close }) => {
  const { token0, token1, market, nftId, colFactor, intRate } = useParams();
  const { LocuseUnderPoolItem, getNftData } = useContext(PoolContext);
  const [query, setQuery] = useState("");
  useEffect(() => {}, []);
  const nftDataHandler = async (e) => {
    getNftData(e, nftId);
    //console.log("llll");
  };
  return (
    <div className="flex space-x-5 h-[500px] w-full shadow-sm mt-10">
      <div className="w-3/5  px-5  bg-[#10101B]  border-indigo-600 border rounded-3xl">
        <div className="flex justify-between ">
          <MdOutlineArrowBackIos
            className="hover:cursor-pointer mt-10"
            onClick={() => close()}
          />
          <p className="mt-10">
            {token1}/{token0}
          </p>
          <div className="flex items-center mt-5">
            <input
              type="text"
              className=" relative  tablet:h-[50px] h-[30px] outline-none bg-[#121E28] tablet:px-20  px-[30px] tablet:rounded-3xl rounded-xl tablet:w-[300px] w-full tablet:mr-0 mr-[10px]  placeholder:text-[#BEBEBE] hover:outline-indigo-600 focus:outline-indigo-600"
              placeholder="search"
              onChange={(e) => setQuery(e.target.value)}
            />
            <BiSearch className=" absolute text-xl tablet:mx-10 mx-2" />
          </div>
        </div>
        {LocuseUnderPoolItem?.filter((data) => {
          return query.toLowerCase() === ""
            ? data
            : data.token0.toLowerCase().includes(query.toLowerCase()) ||
                data.token1.toLowerCase().includes(query.toLowerCase()) ||
                data.market.toLowerCase().includes(query.toLowerCase()) ||
                data.colFactor.toLowerCase().includes(query.toLowerCase()) ||
                data.intRate.toLowerCase().includes(query.toLowerCase()) ||
                data.nftId.toLowerCase().includes(query.toLowerCase());
        }).map(({ token0, token1, market }) => {
          return (
            <Link
              to={
                "/myPosition/" +
                token0 +
                "/" +
                token1 +
                "/" +
                market +
                "/" +
                colFactor +
                "/" +
                intRate +
                "/" +
                nftId
              }
            >
              <div
                className="flex justify-between items-center  pt-5 hover:bg-black px-5 rounded-md"
                onClick={() => nftDataHandler}
              >
                <div>
                  <p>PositionId</p>
                  <p>#{nftId}</p>
                </div>
                <div>
                  <p>Position</p>
                  <p>
                    {colFactor}-{intRate}
                  </p>
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
          );
        })}
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
