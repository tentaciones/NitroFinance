import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { ethers } from "ethers";
import collateralAbi from "../contract/UsdcAbi.json";
import Sol4Abi from "../contract/Sol4.json";
import SuccessModal from "./SuccessModal";
const UpdataAddCollateral = () => {
  const { address } = useParams();
  const [sol4Contract, setSol4Contract] = useState(null);
  const [approved, setApproved] = useState(false);
  const [collateralcontract, setCollateral] = useState(null);
  const [buttonText, setButtonText] = useState("Approve");
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [transactionHash, setTransactionHash] = useState(null);
  let sol4ContractAddress = address;

  const updateEthers = async () => {
    let tempProvider = new ethers.providers.Web3Provider(window.ethereum);
    let tempSigner = tempProvider.getSigner();
    let sol4Contract = new ethers.Contract(
      sol4ContractAddress,
      Sol4Abi,
      tempSigner
    );

    setSol4Contract(sol4Contract);
    let collateralContractAddress = await sol4Contract.token0();
    let collateralcontract = new ethers.Contract(
      collateralContractAddress,
      collateralAbi,
      tempSigner
    );
    setCollateral(collateralcontract);
  };

  const appoveCollateralHandler = async (e) => {
    updateEthers();
    console.log(sol4ContractAddress);
    let amount = e.target.amount.value;
    let txn = collateralcontract.approve(sol4ContractAddress, amount);

    setApproved(true);

    setButtonText("Add");
  };

  const addCollateralHandler = async (e) => {
    e.preventDefault();
    updateEthers();

    let usdcAmount = e.target.amount.value;
    let txn = await sol4Contract.addCollateral(usdcAmount);
    setTransactionHash(txn.hash);
    setShowSuccessModal(true);
    console.log(txn);
  };

  const addCollateral = async (e) => {
    e.preventDefault();
    {
      approved ? addCollateralHandler(e) : appoveCollateralHandler(e);
    }
  };
  return (
    <form onSubmit={addCollateral}>
      <div className="w-full mt-10 px-5">
        <input
          type="number"
          className=" w-full bg-[#10101B] outline-none mt-5 h-[50px] rounded-md px-5 hover:border-indigo-600 focus:border-indigo-600 placeholder:text-[#999999]"
          placeholder="Amount 0.0"
          id="amount"
        />

        <button
          className="w-full bg-[#10101B] hover:border-indigo-600 mt-5 h-[60px] rounded-xl hover:bg-[#10101B] "
          style={{
            background:
              "linear-gradient(90.21deg, rgba(85, 255, 245, 0.7) -16.89%, #5764FF 72.48%, rgba(162, 169, 255, 0.7) 100%)",
          }}
        >
          {buttonText}
        </button>
      </div>
      {showSuccessModal ? (
        <SuccessModal
          className="-mt-[1000px] "
          transactionHash={transactionHash}
          setShowSuccessModal={setShowSuccessModal}
        />
      ) : (
        <></>
      )}
    </form>
  );
};

export default UpdataAddCollateral;
