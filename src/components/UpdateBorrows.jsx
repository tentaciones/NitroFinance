import { useState } from "react";
import { ethers } from "ethers";
import Sol4Abi from "../contract/Sol4.json";
import { useParams } from "react-router-dom";
import SuccessModal from "./SuccessModal";
const UpdateBorrows = () => {
  const { address } = useParams();
  const [sol4Contract, setSol4Contract] = useState(null);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [transactionHash, setTransactionHash] = useState(null);
  let sol4ContractAddress = address;
  const updateEthers = () => {
    let tempProvider = new ethers.providers.Web3Provider(window.ethereum);
    let tempSigner = tempProvider.getSigner();
    let sol4Contract = new ethers.Contract(
      sol4ContractAddress,
      Sol4Abi,
      tempSigner
    );
    setSol4Contract(sol4Contract);
  };

  const BorrrowMoreHandler = async (e) => {
    e.preventDefault();
    updateEthers();

    let amount = e.target.amount.value;
    let collateralFactor = e.target.collateralFactor.value;
    let interestRate = e.target.interestRate.value;
    let txn = await sol4Contract.borrow(collateralFactor, interestRate, amount);
    setTransactionHash(txn.hash);
    setShowSuccessModal(true);
    console.log(txn);
  };
  return (
    <form onSubmit={BorrrowMoreHandler}>
      <div className="w-full mt-10 px-5 ">
        <div className="flex space-x-5 mt-5">
          <input
            type="number"
            className=" w-1/2 bg-[#10101B] outline-none h-20 rounded-md px-5 hover:border-indigo-600 focus:border-indigo-600 placeholder:text-[#999999]"
            placeholder="Collateral Factor %"
            id="collateralFactor"
          />

          <input
            type="number"
            className=" w-1/2 bg-[#10101B] outline-none h-20 rounded-md px-5 hover:border-indigo-600 focus:border-indigo-600 placeholder:text-[#999999]"
            placeholder="Interest rate %"
            id="interestRate"
          />
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
          Borrow
        </button>
      </div>
      {showSuccessModal ? (
        <div className="mt-[100px]">
          <SuccessModal
            className="-mt-[1000px] "
            transactionHash={transactionHash}
            setShowSuccessModal={setShowSuccessModal}
          />
        </div>
      ) : (
        <></>
      )}
    </form>
  );
};

export default UpdateBorrows;
