import { Link, useParams } from "react-router-dom";
import { PoolContext } from "../context/PoolContext";
import { useContext, useState, useEffect } from "react";
import { IoIosArrowBack } from "react-icons/io";
import { IoNavigateCircleOutline } from "react-icons/io5";
import SuccessModal from "./SuccessModal";
import { ethers } from "ethers";

import Sol4Abi from "../contract/Sol4.json";
import tokenAbi from "../contract/UsdcAbi.json";

const IncreaseLiquidity = () => {
  const [sol4Contractt, setsol4Contract] = useState(null);
  const [tokenContract, setTokenContract] = useState(null);
  const [approved, setApproved] = useState(null);
  const [intrate, setIntRate] = useState(null);
  const [ColFactor, setColFactor] = useState("");
  const [currentPosSize, setcurrentPosSize] = useState(null);
  const [valueOfInvariant, setvalueOfInvariant] = useState(null);
  const [newPositionSize, setnewPositionSize] = useState(null);
  const [previewed, setPreviewed] = useState(false);
  const [buttonText, setButtonText] = useState("Preview");
  const { address, token0, token1 } = useParams();
  let sol4ContractAddress = address;

  const updateEthers = async () => {
    let tempProvider = new ethers.providers.Web3Provider(window.ethereum);
    let tempSigner = tempProvider.getSigner();

    let sol4Contract = new ethers.Contract(
      sol4ContractAddress,
      Sol4Abi,
      tempSigner
    );
    setsol4Contract(sol4Contract);
    let tokenContractAddress = await sol4Contractt.token1();

    let tokenContract = new ethers.Contract(
      tokenContractAddress,
      tokenAbi,
      tempSigner
    );

    setTokenContract(tokenContract);
  };

  const previewHandler = async (e) => {
    e.preventDefault();
    let ColFactor = e.target.ColFactor.value;
    let interest = e.target.interest.value;
    let usdcAmount = e.target.usdcAmount.value;
    let newPositionSize = await sol4Contractt.getPresumedPositionSize(
      usdcAmount,
      ColFactor,
      interest
    );
    let valueOfInvariant = await sol4Contractt.getValueofInvariant(
      ColFactor,
      interest
    );
    //let currentPosSize;
    setnewPositionSize(newPositionSize.toString());
    setvalueOfInvariant(valueOfInvariant.toString());
    //setcurrentPosSize(currentPosSize.toString());
    setIntRate(interest + "%");
    setColFactor(ColFactor + "%");
    setPreviewed(true);
    setButtonText("Approve");
  };

  const approveTokenHandler = async (e) => {
    updateEthers();
    e.preventDefault();
    let usdcAmount = e.target.usdcAmount.value;
    let txn = await tokenContract.approve(sol4ContractAddress, usdcAmount);
    setApproved(true);
    setButtonText("Add");
  };

  const addLiquidityHandler = async (e) => {
    e.preventDefault();
    updateEthers();
    let usdcAmount = e.target.usdcAmount.value;
    let ColFactor = e.target.ColFactor.value;
    let interest = e.target.interest.value;
    let updateOption = 1;

    let txn = await sol4Contractt.updatePosition(
      usdcAmount,
      ColFactor,
      interest,
      updateOption
    );
  };

  const addLiquidity = async (e) => {
    approved
      ? addLiquidityHandler(e)
      : previewed
      ? approveTokenHandler(e)
      : previewHandler(e);
  };

  /*useEffect(() => {
    updateEthers();
  }, [sol4ContractAddress]);*/

  return (
    <form onSubmit={addLiquidity}>
      <div className="flex justify-center items-center tablet:block">
        <div className="h-screen tablet:px-[500px] py-32 px-[5]  text-white font-display">
          <div className="tablet:w-[515px] w-full bg-[#10101C] h-[750px] rounded-xl shadow-sm shadow-white">
            <div className="flex text-2xl py-10 px-5">
              <Link to="/market/">
                <IoIosArrowBack className="text-3xl hover:cursor-pointer" />
              </Link>
              <div className="flex justify-center w-full">
                <p>Add Liquidity</p>
              </div>
            </div>
            <div className="flex justify-between ">
              <p className="text-2xl px-5">
                {token1}/{token0}
              </p>
              <div className="flex items-center px-5 space-x-3">
                <IoNavigateCircleOutline className="text-2xl text-[#E7E7E7]" />
                <p className="text-2xl ">
                  {ColFactor} {intrate}
                </p>
              </div>
            </div>

            <div className="flex justify-between px-5 mt-5">
              <p>Protocol USDC Balance</p>
              <p>$1000</p>
            </div>

            <div className="px-5 flex items-center justify-between gap-5">
              <input
                type="number"
                className="w-full h-[70px] rounded-xl mt-5 relative bg-[#221E2B] px-10 placeholder:text-[#999999] outline-none"
                placeholder="colfactor %"
                id="ColFactor"
              />
              <input
                type="number"
                className="w-full h-[70px] rounded-xl mt-5 relative bg-[#221E2B] px-10 placeholder:text-[#999999] outline-none"
                placeholder="interestRate %"
                id="interest"
              />
            </div>

            <div className="px-5 flex items-center justify-end">
              <input
                type="number"
                className="w-full h-[70px] rounded-xl mt-5 relative bg-[#221E2B] px-10 placeholder:text-[#999999] outline-none"
                placeholder="$0"
                id="usdcAmount"
              />
              <button className="text-[#00FFF0] absolute text-2xl items-center px-5">
                Max
              </button>
            </div>
            <div className="flex justify-between px-5 mt-5 items-center">
              <p>New Est. Position Size</p>
              <div className="bg-[#221E2B] flex justify-end items-center w-[85px] h-[40px] rounded-xl px-3">
                <p>{newPositionSize}k</p>
              </div>
            </div>
            <div className="px-5">
              <div className="w-full  bg-[#221E2B] h-[160px] mt-5 rounded-xl py-5 space-y-2">
                <div className="flex justify-between px-5 ">
                  <p>Collateral Factor</p>
                  <p>{ColFactor}</p>
                </div>

                <div className="flex justify-between px-5 ">
                  <p>Interest Rate</p>
                  <p>{intrate}</p>
                </div>

                <div className="flex justify-between px-5 ">
                  <p>Value of Invariant</p>
                  <p>{valueOfInvariant}</p>
                </div>

                <div className="flex justify-between px-5 ">
                  <p>Current Position Size</p>
                  <p>{currentPosSize}</p>
                </div>
              </div>
            </div>
            <div className="px-5 mt-5">
              <button className="bg-gradient-to-r from-cyan-500 to-blue-500 w-full h-[60px] rounded-md text-white mt-5">
                {buttonText}
              </button>
            </div>
          </div>
          <div className="-mt-20  absolute">
            {false ? <SuccessModal /> : <></>}
          </div>
        </div>
      </div>
    </form>
  );
};

export default IncreaseLiquidity;
