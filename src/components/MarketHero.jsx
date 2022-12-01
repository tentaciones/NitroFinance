import React, { useState, useContext } from "react";
import { BiSearch } from "react-icons/bi";
import { MarketItem } from ".";
import { Locus } from ".";
import { PoolContext } from "../context/PoolContext";
import "./toggle.css";
const MarketHero = ({ showLocusHandler }) => {
  const {
    getAllMarketHandler,
    getallUserCollateralItem,
    getallUserBorrowItem,
    getAllMyPositions,
    gettAllLocusesUnderPool,
  } = useContext(PoolContext);
  const [showAllLocus, setShowAllLocus] = useState(false);
  const [show, setShow] = useState(false);
  const [query, setQuery] = useState("");
  const handleShow = () => {
    setShow(!show);
    getAllMarketHandler();
    getallUserCollateralItem();
    getallUserBorrowItem();
    getAllMyPositions();
    gettAllLocusesUnderPool();
  };
  const showLocus = () => {
    setShowAllLocus(!showAllLocus);
  };
  return (
    <>
      {show ? (
        <div className="w-full">
          <div className="flex items-center">
            <input
              type="text"
              className=" relative  tablet:h-[50px] h-[30px] outline-none bg-[#121E28] tablet:px-20  px-[30px] tablet:rounded-3xl rounded-xl tablet:w-[300px] w-full tablet:mr-0 mr-[10px]  placeholder:text-[#BEBEBE] hover:outline-indigo-600 focus:outline-indigo-600"
              placeholder="search"
              onChange={(e) => setQuery(e.target.value)}
            />
            <BiSearch className=" absolute text-xl tablet:mx-10 mx-2" />
          </div>

          {showAllLocus ? (
            <Locus show={showLocus} />
          ) : (
            <div className="w-full laptop:h-[500px] h-[500px] tablet:h-[700px] bg-[#101D28] mt-10 rounded-lg ">
              <div className="flex px-10 py-5 justify-between">
                <p>Market</p>

                <div class="relative  inline-block w-10 mr-2   align-middle select-none transition duration-200 ease-in">
                  <input
                    type="checkbox"
                    name="toggle"
                    id="toggle"
                    class="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer"
                    onClick={() => handleShow()}
                  />
                  <label
                    for="toggle"
                    class="toggle-label block overflow-hidden h-6 rounded-full bg-gray-300 cursor-pointer"
                  ></label>
                </div>
              </div>

              <MarketItem show={showLocus} query={query} />
            </div>
          )}
        </div>
      ) : (
        <div className="w-full">
          <div className="flex items-center">
            <input
              type="text"
              className=" relative  tablet:h-[50px] h-[30px] outline-none bg-[#121E28] tablet:px-20  px-[30px] tablet:rounded-3xl rounded-xl tablet:w-[300px] w-full tablet:mr-0 mr-[10px]  placeholder:text-[#BEBEBE] hover:outline-indigo-600 focus:outline-indigo-600"
              placeholder="search"
            />
            <BiSearch className=" absolute text-xl tablet:mx-10 mx-2" />
          </div>

          {showAllLocus ? (
            <Locus show={showLocus} />
          ) : (
            <div className="w-full laptop:h-[100px] h-[100px] shadow-lg shadow-white tablet:h-[200px] bg-[#101D28] mt-10 rounded-lg ">
              <div className="flex px-10 py-5 justify-between">
                <p>Market</p>

                <div class="relative  inline-block w-10 mr-2   align-middle select-none transition duration-200 ease-in">
                  <input
                    type="checkbox"
                    name="toggle"
                    id="toggle"
                    class="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer"
                    onClick={() => handleShow()}
                  />
                  <label
                    for="toggle"
                    class="toggle-label block overflow-hidden h-6 rounded-full bg-gray-300 cursor-pointer"
                  ></label>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default MarketHero;
