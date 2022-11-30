import React, { useState } from "react";
import { MyDropDown } from ".";
import { ethers } from "ethers";
import Sol4Abi from "../contract/Sol4.json";
const Borrow = () => {
  const [selected, setSelected] = useState(null);
  const [sol4Contract, setSol4Contract] = useState(null);
  const pull_Data = (data) => {
    setSelected(data);
  };

  let sol4ContractAddress = selected;

  const updateEthers = async () => {
    let tempProvider = new ethers.providers.Web3Provider(window.ethereum);
    let tempSigner = tempProvider.getSigner();
    let address = tempSigner.getAddress();
    let sol4Contract = new ethers.Contract(
      sol4ContractAddress,
      Sol4Abi,
      tempSigner
    );
    setSol4Contract(sol4Contract);
  };

  const BorrowHandler = async (e) => {
    e.preventDefault();
    updateEthers();
    let collateralFactor = e.target.collateralFactor.value;
    let interestRate = e.target.interestRate.value;
    let usdcAmount = e.target.usdcAmount.value;
    let txn = await sol4Contract.borrow(
      collateralFactor,
      interestRate,
      usdcAmount
    );
    console.log(txn);
  };

  return (
    <form onSubmit={BorrowHandler}>
      <div className="w-full mt-5 px-5">
        <MyDropDown func={pull_Data} />
        <div className="flex space-x-5 mt-5">
          <input
            type="number"
            className=" w-1/2 bg-[#10101B] outline-none h-10 rounded-md px-5 hover:border-indigo-600 focus:border-indigo-600 placeholder:text-[#999999]"
            placeholder="Collateral Factor %"
            id="collateralFactor"
          />

          <input
            type="number"
            className=" w-1/2 bg-[#10101B] outline-none h-10 rounded-md px-5 hover:border-indigo-600 focus:border-indigo-600 placeholder:text-[#999999]"
            placeholder="Interest rate %"
            id="interestRate"
          />
        </div>
        <input
          type="number"
          className=" w-full bg-[#10101B] outline-none mt-5 h-10 rounded-md px-5 hover:border-indigo-600 focus:border-indigo-600 placeholder:text-[#999999]"
          placeholder="Amount 0.0"
          id="usdcAmount"
        />
        <button
          className="w-full bg-[#10101B] hover:border-indigo-600 mt-5 h-[60px] rounded-xl hover:bg-[#10101B] "
          style={{
            background:
              "linear-gradient(90.21deg, rgba(85, 255, 245, 0.7) -16.89%, #5764FF 72.48%, rgba(162, 169, 255, 0.7) 100%)",
          }}
        >
          Borrow
        </button>
      </div>
    </form>
  );
};

export default Borrow;
