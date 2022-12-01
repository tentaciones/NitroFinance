import React, { useState } from "react";
import { Repay } from ".";
import UpdateBorrows from "./UpdateBorrows";
import { MdOutlineArrowBackIos } from "react-icons/md";
const DashBoardRepayBorrow = ({ back }) => {
  const [showModal, setShowModal] = useState(false);
  const onShowModalHandlerRepay = () => {
    setShowModal(true);
  };

  const onShowModalHandlerBorrow = () => {
    setShowModal(false);
  };
  return (
    <div className="w-2/5 bg-[#101D28] h-[400px]">
      <div className="flex space-x-20 px-10 pt-10 border-b">
        {showModal ? (
          <div className="flex space-x-20">
            <MdOutlineArrowBackIos
              className="hover:cursor-pointer"
              onClick={() => back()}
            />
            <p
              onClick={() => onShowModalHandlerRepay()}
              className="hover:cursor-pointer bg-clip-text text-transparent   bg-gradient-to-r from-cyan-500 to-blue-500"
            >
              Repay
            </p>
          </div>
        ) : (
          <div className="flex space-x-20">
            <MdOutlineArrowBackIos
              className="hover:cursor-pointer"
              onClick={() => back()}
            />
            <p
              onClick={() => onShowModalHandlerRepay()}
              className="hover:cursor-pointer"
            >
              Repay
            </p>
          </div>
        )}
        {showModal ? (
          <p
            onClick={() => onShowModalHandlerBorrow()}
            className="hover:cursor-pointer"
          >
            Borrow
          </p>
        ) : (
          <p
            onClick={() => onShowModalHandlerBorrow()}
            className="hover:cursor-pointer bg-clip-text text-transparent   bg-gradient-to-r from-cyan-500 to-blue-500"
          >
            Borrow
          </p>
        )}
      </div>
      {showModal ? <Repay /> : <UpdateBorrows />}
    </div>
  );
};

export default DashBoardRepayBorrow;
