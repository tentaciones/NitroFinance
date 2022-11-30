import React from "react";
import { useContext, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { PoolContext } from "../context/PoolContext";

export const MyDropDown = (props) => {
  const { allMarket } = useContext(PoolContext);
  const [chosen, setChosen] = useState(null);
  const [chosenTokenAddress, setChosenTokenAddress] = useState(null);
  const { address, token0, token1 } = useParams();

  const onChangeHandler = (e) => {
    setChosen(e.target.value);
    setChosenTokenAddress(e.target.value2);
    //console.log(chosen);
    console.log(e.target.id);

    props.func(e.target.value);
  };

  const onChangeHandler2 = (e) => {
    if (address) {
      setChosen(address);
    }
    props.func(address);
  };

  useEffect(
    (e) => {
      onChangeHandler2(e);
    },
    [address]
  );

  return (
    <div>
      <select
        className="w-full relative p-5 text-white bg-[#10101B] border rounded-md shadow-sm outline-none appearance-none hover:cursor-pointer border-indigo-600 focus:border-indigo-600"
        onChange={(e) => onChangeHandler(e)}
        value={chosen}
      >
        {allMarket.map(({ token0, token1, market }) => {
          return (
            <option value={market} id="llll" key={market}>
              {" "}
              {token1.toString()}/{token0.toString()}
            </option>
          );
        })}
      </select>
    </div>
  );
};

export default MyDropDown;
