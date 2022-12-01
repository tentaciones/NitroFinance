import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { ethers } from "ethers";
import sol4Abi from "../contract/Sol4.json";
import SuccessModal from "./SuccessModal";
const Repay = () => {
  const { address } = useParams();
  const [Sol4Contract, setSol4Contract] = useState(null);
  const [borrowedValue, setBorrowedValue] = useState(null);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [transactionHash, setTransactionHash] = useState(null);
  const [tempSigner, setTempSigner] = useState(null);
  let Sol4ContractAddress = address;
  const updateEthers = () => {
    let tempProvider = new ethers.providers.Web3Provider(window.ethereum);
    let tempSigner = tempProvider.getSigner();

    let Sol4Contract = new ethers.Contract(
      Sol4ContractAddress,
      sol4Abi,
      tempSigner
    );
    setTempSigner(tempSigner.getAddress());
    setSol4Contract(Sol4Contract);
  };

  const getMyBorrowedValue = async () => {
    updateEthers();
    let txn = await Sol4Contract.borrowedValue(tempSigner);
    setBorrowedValue(txn.toString());
  };

  const repay = async (e) => {
    e.preventDefault();
    updateEthers();
    let amount = e.target.amount.value;
    let txn = await Sol4Contract.repay(amount);
    setTransactionHash(txn.hash);
    setShowSuccessModal(true);
  };

  useEffect(() => {
    getMyBorrowedValue();
  }, []);

  return (
    <form onSubmit={repay}>
      <div className="w-full mt-5 px-5">
        <div className="flex  px-5 text-xl mt-10">
          <p className="w-1/2">Borrowed value</p>
          <div className="bg-[#10101B] w-1/2 flex justify-center items-center rounded-md h-10">
            <p className="text-sm">{borrowedValue}</p>{" "}
          </div>
        </div>
        <input
          type="number"
          className=" w-full bg-[#10101B] outline-none mt-5 h-20 rounded-md px-5 hover:border-indigo-600 focus:border-indigo-600 placeholder:text-[#999999]"
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
          Repay
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

export default Repay;
