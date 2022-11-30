import React, { useState, useContext } from "react";

import { MyDropDown } from ".";

import { PoolContext } from "../context/PoolContext";

const AddCollateral = () => {
  const [selected, setSelectedAddress, setAmount, amount] = useState(null);

  const { addCollateral, buttonText } = useContext(PoolContext);
  const pull_Data = (data) => {
    setSelectedAddress(data);

    console.log(data);
  };

  let sol4ContractAddress = selected;

  const add = async (e) => {
    addCollateral(e, sol4ContractAddress);
  };

  return (
    <form onSubmit={add}>
      <div className="w-full mt-10 px-5">
        <MyDropDown func={pull_Data} />

        <input
          type="number"
          className=" w-full bg-[#10101B] outline-none mt-5 h-[50px] rounded-md px-5 hover:border-indigo-600 focus:border-indigo-600 placeholder:text-[#999999]"
          placeholder="Amount 0.0"
          id="amount"
          onChange={(e) => setAmount(e.target.value)}
          value={amount}
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
    </form>
  );
};

export default AddCollateral;
