import React, { useState, useContext } from "react";
import { MyDropDown } from ".";
import { PoolContext } from "../context/PoolContext";

const WithdrawCollateral = () => {
  const [selected, setSelected] = useState(null);
  const { withdrawHandler } = useContext(PoolContext);
  const pull_Data = (data) => {
    setSelected(data);
  };

  let sol4ContractAddress = selected;

  const withdraw = async (e) => {
    withdrawHandler(e, sol4ContractAddress);
  };

  return (
    <form onSubmit={withdraw}>
      <div className="w-full mt-10 px-5">
        <MyDropDown func={pull_Data} />

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
          Withdraw
        </button>
      </div>
    </form>
  );
};

export default WithdrawCollateral;
