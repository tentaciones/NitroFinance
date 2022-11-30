import { Link, useParams } from "react-router-dom";
import { PoolContext } from "../context/PoolContext";
import { useContext, useState, useEffect } from "react";
import { IoIosArrowBack } from "react-icons/io";
import { IoNavigateCircleOutline } from "react-icons/io5";
import SuccessModal from "./SuccessModal";
import { ethers } from "ethers";

import Sol4Abi from "../contract/Sol4.json";

const RemoveLiquidity = () => {
  const { address, token0, token1 } = useParams();
  let sol4ContractAddress = address;

  const [sol4Contractt, setsol4Contract] = useState(null);
  const [intrate, setIntRate] = useState(null);
  const [ColFactor, setColFactor] = useState("");
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [transactionHash, setTransactionHash] = useState(null);

  const updateEthers = async () => {
    let tempProvider = new ethers.providers.Web3Provider(window.ethereum);
    let tempSigner = tempProvider.getSigner();

    let sol4Contract = new ethers.Contract(
      sol4ContractAddress,
      Sol4Abi,
      tempSigner
    );
    setsol4Contract(sol4Contract);
  };

  const withdrawLiquidityHandler = async (e) => {
    e.preventDefault();
    updateEthers();
    let interest = e.target.interest.value;
    let ColFactor = e.target.ColFactor.value;
    let amount = e.target.amount.value;

    let updateOption = 0;

    let txn = await sol4Contractt.updatePosition(
      amount,
      ColFactor,
      interest,
      updateOption
    );
    setTransactionHash(txn.hash);
    setShowSuccessModal(true);
  };

  const setColI = async (e) => {
    e.preventDefault();
    let ColFactor = e.target.value;

    setColFactor(ColFactor);
  };

  const setIntC = async (e) => {
    e.preventDefault();
    let intrate = e.target.value;

    setIntRate(intrate);
  };

  return (
    <form onSubmit={withdrawLiquidityHandler}>
      <div className="flex justify-center items-center tablet:block">
        <div className="h-screen tablet:px-[500px] py-32 px-[5]  text-white font-display">
          <div className="tablet:w-[515px] w-full bg-[#10101C] h-[750px] rounded-xl shadow-sm shadow-white">
            <div className="flex text-2xl py-10 px-5">
              <Link to="/market/">
                <IoIosArrowBack className="text-3xl hover:cursor-pointer" />
              </Link>
              <div className="flex justify-center w-full">
                <p>Remove Liquidity</p>
              </div>
            </div>
            <div className="flex justify-between ">
              <p className="text-2xl px-5">
                {token1}/{token0}
              </p>
              <div className="flex items-center px-5 space-x-3">
                <IoNavigateCircleOutline className="text-2xl text-[#E7E7E7]" />
                <p className="text-2xl ">
                  {ColFactor}-{intrate}
                </p>
              </div>
            </div>

            <div className="flex justify-between px-5 mt-5">
              <p>Protocol {token1} Balance</p>
              <p></p>
            </div>

            <div className="px-5 flex items-center justify-between gap-5">
              <input
                type="number"
                className="w-full h-[70px] rounded-xl mt-5 relative bg-[#221E2B] px-10 placeholder:text-[#999999] outline-none"
                placeholder="colfactor %"
                id="ColFactor"
                onChange={(e) => setColI(e)}
                value={ColFactor}
              />
              <input
                type="number"
                className="w-full h-[70px] rounded-xl mt-5 relative bg-[#221E2B] px-10 placeholder:text-[#999999] outline-none"
                placeholder="interestRate %"
                id="interest"
                onChange={(e) => setIntC(e)}
                value={intrate}
              />
            </div>

            <div className="px-5 flex items-center justify-end">
              <input
                type="number"
                className="w-full h-[70px] rounded-xl mt-5 relative bg-[#221E2B] px-10 placeholder:text-[#999999] outline-none"
                placeholder="$0"
                id="amount"
              />
              <button className="text-[#00FFF0] absolute text-2xl items-center px-5">
                Max
              </button>
            </div>
            <div className="flex justify-between px-5 mt-5 items-center">
              <p>New Est. Position Size</p>
              <div className="bg-[#221E2B] flex justify-end items-center w-[85px] h-[40px] rounded-xl px-3">
                <p></p>
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
                  <p></p>
                </div>

                <div className="flex justify-between px-5 ">
                  <p>Current Position Size</p>
                  <p></p>
                </div>
              </div>
            </div>
            <div className="px-5 mt-5">
              <button className="bg-gradient-to-r from-cyan-500 to-blue-500 w-full h-[60px] rounded-md text-white mt-5">
                Withdraw
              </button>
            </div>
          </div>
          <div className="-mt-20  absolute">
            {showSuccessModal ? (
              <SuccessModal
                className="-mt-[1000px] "
                transactionHash={transactionHash}
                setShowSuccessModal={setShowSuccessModal}
              />
            ) : (
              <></>
            )}
          </div>
        </div>
      </div>
    </form>
  );
};

export default RemoveLiquidity;
