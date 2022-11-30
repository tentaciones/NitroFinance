import React, { useState } from "react";
import IncreaseLiquidity from "./IncreaseLiquidity";
import RemoveLiquidity from "./RemoveLiquidity";

const IncreaseAndDecreaseLiquidity = () => {
  const [buttonText, setButtonText] = useState("Withdraw Liquidity");
  const [add, setAdd] = useState(false);
  const setChanged = () => {
    setAdd(!add);
  };

  return (
    <div className=" w-full   text-white ">
      <div className="mt-32 flex justify-end px-[350px]">
        {add ? (
          <button onClick={setChanged} className="hover:cursor-pointer">
            AddLiquidity
          </button>
        ) : (
          <button onClick={setChanged}>Withdraw Liquidity</button>
        )}
      </div>
      <div className="-mt-32">
        {add ? <RemoveLiquidity /> : <IncreaseLiquidity />}
      </div>
    </div>
  );
};

export default IncreaseAndDecreaseLiquidity;
