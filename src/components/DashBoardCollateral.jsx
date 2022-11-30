import React, { useState } from "react";
import { MdOutlineArrowBackIos } from "react-icons/md";
import UpdataAddCollateral from "./UpdataAddCollateral";
import UpdateWithdrawCollateral from "./UpdateWithdrawCollateral";
const DashBoardCollateral = ({ back }) => {
  const [showModal, setShowModal] = useState(false);
  const onShowModalHandlerRepay = () => {
    setShowModal(true);
  };

  const onShowModalHandlerBorrow = () => {
    setShowModal(false);
  };
  return (
    <div className="w-2/5 bg-[#101D28] h-[400px]">
      <div className="flex justify-between px-10 pt-10 border-b">
        <MdOutlineArrowBackIos
          className="hover:cursor-pointer"
          onClick={() => back()}
        />
        {showModal ? (
          <p
            onClick={() => onShowModalHandlerRepay()}
            className="hover:cursor-pointer bg-clip-text text-transparent   bg-gradient-to-r from-cyan-500 to-blue-500"
          >
            Add Collateral
          </p>
        ) : (
          <p
            onClick={() => onShowModalHandlerRepay()}
            className="hover:cursor-pointer"
          >
            Add Collateral
          </p>
        )}
        {showModal ? (
          <p
            onClick={() => onShowModalHandlerBorrow()}
            className="hover:cursor-pointer"
          >
            Withdraw Collateral
          </p>
        ) : (
          <p
            onClick={() => onShowModalHandlerBorrow()}
            className="hover:cursor-pointer bg-clip-text text-transparent   bg-gradient-to-r from-cyan-500 to-blue-500"
          >
            Withdraw Collateral
          </p>
        )}
      </div>
      {showModal ? <UpdataAddCollateral /> : <UpdateWithdrawCollateral />}
    </div>
  );
};

export default DashBoardCollateral;
