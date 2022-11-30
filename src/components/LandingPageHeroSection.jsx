import React from "react";
import polygonDesign from "../assets/img/Polygon design 1.png";
import blockChainDesign from "../assets/img/Component 1.png";
import loopDesign from "../assets/img/Frame 49.png";
import hDesign from "../assets/img/Component 4.png";
import { Link } from "react-router-dom";
import { FaDiscord, FaTwitter, FaGithub } from "react-icons/fa";
import { BsMedium } from "react-icons/bs";
const LandingPageHeroSection = () => {
  return (
    <div className=" py-32 font-display pl-32">
      <p className="font-bold text-3xl text-white mt-10">A PERMISSIONLESS</p>
      <p className="font-bold text-3xl text-white mt-3">
        DECENTRALIZED LENDING PROTOCOL
      </p>
      <p className=" text-[#FFFFFF] mt-5">Create and mange your own pool</p>
      <div className="flex gap-5">
        <Link to="/market">
          <button className="bg-gradient-to-r from-cyan-500 to-blue-500 w-[200px] h-10 mt-10 rounded-md text-white flex justify-center items-center">
            Launch App
          </button>
        </Link>
        <div className="bg-gradient-to-r p-[2px] from-cyan-500 to-blue-500 w-[200px] h-10 mt-10 rounded-md text-white flex justify-center items-center hover:cursor-pointer">
          <button className="bg-[#0F1823] w-full h-full rounded-md">
            Read Docs
          </button>
        </div>
      </div>
      <div className="flex justify-end">
        <img src={polygonDesign} alt="polygonDesign" className="-mt-[350px] " />
      </div>
      <div className="pr-32">
        <div className="h-[200px] w-full bg-gray-100  bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-[0.01] rounded-md text-white ">
          <div className="flex justify-between items-center h-full px-20">
            <div className="flex flex-col">
              <p className="text-3xl font-bold">$6,999,124.98</p>
              <p className="text-[#BEBEBE]">Total Value Locked </p>
            </div>

            <div className="flex flex-col">
              <p className="text-3xl font-bold">999,124 +</p>
              <p className="text-[#BEBEBE]">Total Users </p>
            </div>

            <div className="flex flex-col">
              <p className="text-3xl font-bold">$6,999,124.98</p>
              <p className="text-[#BEBEBE]">Total Loan Volume </p>
            </div>
          </div>
        </div>
      </div>
      <div className="text-white mt-[200px] w-[600px]">
        <p className="text-3xl font-bold">Most Secured Protocol</p>
        <p className="mt-3">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas
          ipsam, facilis perferendis harum odio, deserunt soluta magnam quae
          laudantium, doloremque quam. Repudiandae consectetur necessitatibus
          ullam eum est, sint nihil accusantium.
        </p>
      </div>
      <div className="flex justify-end -mt-[250px]">
        <img src={blockChainDesign} alt="blockchain" />
      </div>
      <div className="px-32">
        <img src={loopDesign} alt="loop" />
      </div>
      <div className="text-white -mt-[100px]  flex flex-col items-end  px-32 ">
        <p className="font-bold text-3xl">Lend And Provide Liquidity</p>
        <p className="mt-3 w-96">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint facilis
          quos tempora blanditiis velit modi facere, dicta aspernatur tempore,
          ab dolorem, consectetur quam sed quas ea nulla iure eos omnis?
        </p>
      </div>
      <div className="flex font-bold text-3xl justify-center mt-20">
        <p className="bg-clip-text text-transparent   bg-gradient-to-r from-cyan-500 to-blue-500">
          Our Goal
        </p>
      </div>
      <p className="py-2 text-[#FFFFFF] ">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Assumenda sint
        possimus molestias eos? Praesentium recusandae doloribus deserunt nam
        modi molestiae beatae iusto, quidem saepe labore ratione nisi quod
        distinctio neque.
      </p>
      <p className="py-2 text-[#FFFFFF] pr-10">
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Deleniti
        blanditiis, sit nobis rem provident accusantium reiciendis debitis
        consequatur. Nesciunt aperiam nostrum delectus adipisci provident, odio
        voluptatibus error fugiat sint? Pariatur!
      </p>
      <div className="flex  justify-center items-center font-bold text-3xl mt-32">
        {" "}
        <p className="bg-clip-text text-transparent   bg-gradient-to-r from-cyan-500 to-blue-500">
          Join Our Community
        </p>
      </div>
      <div className="flex  justify-center space-x-10 text-xl text-white mt-2">
        <FaDiscord className="hover:cursor-pointer" />
        <FaTwitter className="hover:cursor-pointer" />
        <FaGithub className="hover:cursor-pointer" />
        <BsMedium className="hover:cursor-pointer" />
      </div>
      <div className="flex justify-end -mt-96">
        <img src={hDesign} alt="hdesigh" />
      </div>

      <div className="flex justify-between text-white items-baseline text-sm pr-10 mt-32 -mb-[100px]">
        <p>Copyright @2022NitroFinance. All rights reserved.</p>
        <div className="flex space-x-5">
          <p>Terms and Conditions</p>
          <p>Privacy Policy</p>
        </div>
      </div>
    </div>
  );
};

export default LandingPageHeroSection;
