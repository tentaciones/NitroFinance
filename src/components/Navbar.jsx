import React from "react";
import { Link } from "react-router-dom";

import logo from "../assets/img/Nitro Finance logo design  1.png";

import { ConnectKitButton } from "connectkit";

const Navbar = () => {
  return (
    <div className=" h-[100px] w-screen bg-gray-100  bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-[0.01] fixed top-0  z-[100]">
      <div className="laptop:px-[150px] tablet:px-[50px] pt-7 flex justify-between px-2">
        <div className="flex justify-between hover:cursor-pointer ">
          <img
            src={logo}
            alt="NitroFinanceLogo"
            className="h-[30px] laptop:h-[50px] "
          />
          <div className="font-display text-sm  laptop:text-2xl tablet:text-xl text-white mt-1 laptop:mt-2 laptop:mx-3 mx-1">
            {" "}
            NITROFINANCE
          </div>
          <div className="text-white laptop:text-[15px] tablet:text-[15px]  text-[10px] flex laptop:mt-3 laptop:mx-0 tablet:mx-10 -mx-[50px] mt-12 tablet:mt-10 font-display laptop:space-x-10 space-x-10 laptop:ml-[250px]">
            <Link to="/dashboard">
              <p className="hover:text-[#00FDEE] hover:cursor-pointer">
                Dashboard
              </p>
            </Link>
            <Link to="/positions">
              <p className="hover:text-[#00FDEE] hover:cursor-pointer">
                Positions
              </p>
            </Link>
            <Link to="/market">
              <p className="hover:text-[#00FDEE] hover:cursor-pointer ">
                Market
              </p>
            </Link>
          </div>
        </div>
        <div className="flex justify-end font-display -ml-20  laptop:justify-end laptop:font-display ">
          <ConnectKitButton />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
