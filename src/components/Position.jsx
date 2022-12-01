import React from "react";
import { useState } from "react";
import { BiSearch } from "react-icons/bi";
import { PositionItems, PositionExpanded } from ".";
const Position = () => {
  const [showExpand, setShowExpand] = useState(false);
  const [positionQuery, setPositionQuery] = useState("");
  const onExpandHandler = () => {
    setShowExpand(true);
  };
  const onCloseExpandHandler = () => {
    setShowExpand(false);
  };
  return (
    <div className="px-32 pt-32 text-white font-display">
      <div className="flex items-center">
        <input
          type="text"
          className=" relative  tablet:h-[50px] h-[30px] outline-none bg-[#121E28] tablet:px-20  px-[30px] tablet:rounded-3xl rounded-xl tablet:w-[300px] w-full tablet:mr-0 mr-[10px]  placeholder:text-[#BEBEBE] hover:outline-indigo-600 focus:outline-indigo-600"
          placeholder="search"
          onChange={(e) => setPositionQuery(e.target.value)}
        />
        <BiSearch className=" absolute text-xl tablet:mx-10 mx-2" />
      </div>
      {showExpand ? (
        <PositionExpanded close={onCloseExpandHandler} />
      ) : (
        <div className="h-[500px]  bg-[#10101B]  border-indigo-600 border rounded-3xl shadow-sm mt-10 ">
          <div className="flex justify-center items-center mt-5 text-2xl">
            <p>My Positions</p>
          </div>

          <PositionItems open={onExpandHandler} positionQuery={positionQuery} />
        </div>
      )}
    </div>
  );
};

export default Position;
