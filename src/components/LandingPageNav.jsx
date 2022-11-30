import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/img/Nitro Finance logo design  1.png";

const LandingPageNav = () => {
  return (
    <div className="h-[100px] w-full bg-gray-100  bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-[0.01] fixed top-0  z-[100]">
      <div className="px-[150px] pt-7  ">
        <div className="flex justify-between w-full hover:cursor-pointer">
          <div className="flex">
            <img
              src={logo}
              alt="NitroFinanceLogo"
              className="h-[50px] w-[50px"
            />
            <div className="font-display text-2xl text-white mt-2 mx-3">
              {" "}
              NITROFINANCE
            </div>
          </div>

          <div className="text-white flex justify-end mt-3 font-display space-x-10 ml-[250px]">
            <Link to="/">
              <p className="hover:text-[#00FDEE] hover:cursor-pointer">Goals</p>
            </Link>
            <Link to="/">
              <p className="hover:text-[#00FDEE] hover:cursor-pointer">
                Community
              </p>
            </Link>
            <Link to="/">
              <p className="hover:text-[#00FDEE] hover:cursor-pointer">
                About Us
              </p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPageNav;
