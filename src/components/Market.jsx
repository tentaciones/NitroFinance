import React, { useState, useContext } from "react";
import { BsPlus } from "react-icons/bs";
import { Link } from "react-router-dom";
import {
  MarketHero,
  Borrow,
  WithdrawCollateral,
  AddCollateral,
  SuccessModal,
} from ".";
import { PoolContext } from "../context/PoolContext";
import Approving from "./Approving";
const Market = () => {
  const [showBorrow, setShowBorrow] = useState(true);
  const [showAddCollateral, setShowAddCollateral] = useState(false);
  const [showWithdrawCollateral, setShowWithdrawCollateral] = useState(false);

  const { transactionHash, showSuccessModal, setShowSuccessModal, approving } =
    useContext(PoolContext);
  const onShowBorrowHandler = () => {
    setShowAddCollateral(false);
    setShowWithdrawCollateral(false);
    setShowBorrow(true);
  };

  const onShowAddCollateralHandler = () => {
    setShowWithdrawCollateral(false);
    setShowBorrow(false);
    setShowAddCollateral(true);
  };

  const onShowWithdrawCollateral = () => {
    setShowBorrow(false);
    setShowAddCollateral(false);
    setShowWithdrawCollateral(true);
  };
  return (
    <>
      <div className=" flex z-[2] tablet:mt-32 space-x-5 laptop:mt-32 mt-20 laptop:px-32 tablet:px-10 laptop:text-[16px] tablet:text-[14px] text-[10px] px-3 font-display  text-white h-screen ">
        <div className="w-3/5">
          <MarketHero />
        </div>

        <div className="w-2/5">
          <div className="flex justify-end">
            <Link to={"/createMarket"}>
              <button className="tablet:w-[200px] laptop:w-[250px] w-20 laptop:text-[16px] tablet:text-2xl h-[30px] text-[10px] bg-gradient-to-r from-cyan-500 to-blue-500 tablet:h-[50px] rounded-md flex justify-center items-center">
                <BsPlus className="tablet:text-3xl laptop:text-3xl text-[15px]" />
                New Market
              </button>
            </Link>
          </div>
          <div className="w-full laptop:h-[350px] h-[300px] tablet:h-[400px] bg-[#101D28] mt-10 rounded-lg">
            <div className="flex justify-between px-5 pt-5">
              {showBorrow ? (
                <p
                  className="hover:cursor-pointer bg-clip-text text-transparent   bg-gradient-to-r from-cyan-500 to-blue-500 "
                  onClick={() => onShowBorrowHandler()}
                >
                  Borrow
                </p>
              ) : (
                <p
                  className="hover:cursor-pointer   "
                  onClick={() => onShowBorrowHandler()}
                >
                  Borrow
                </p>
              )}
              {showAddCollateral ? (
                <p
                  className="hover:cursor-pointer bg-clip-text text-transparent   bg-gradient-to-r from-cyan-500 to-blue-500"
                  onClick={() => onShowAddCollateralHandler()}
                >
                  Add collateral
                </p>
              ) : (
                <p
                  className="hover:cursor-pointer"
                  onClick={() => onShowAddCollateralHandler()}
                >
                  Add collateral
                </p>
              )}

              {showWithdrawCollateral ? (
                <p
                  className="hover:cursor-pointer  bg-clip-text text-transparent   bg-gradient-to-r from-cyan-500 to-blue-500"
                  onClick={() => onShowWithdrawCollateral()}
                >
                  Withdraw Collateral
                </p>
              ) : (
                <p
                  className="hover:cursor-pointer"
                  onClick={() => onShowWithdrawCollateral()}
                >
                  Withdraw Collateral
                </p>
              )}
            </div>
            <hr />
            {showBorrow ? (
              <Borrow />
            ) : showAddCollateral ? (
              <AddCollateral />
            ) : showWithdrawCollateral ? (
              <WithdrawCollateral />
            ) : (
              <></>
            )}
          </div>
        </div>
      </div>
      {showSuccessModal ? (
        <div className="-mt-[600px]">
          <SuccessModal
            className=""
            transactionHash={transactionHash}
            setShowSuccessModal={setShowSuccessModal}
          />
        </div>
      ) : (
        <></>
      )}

      {approving ? (
        <div className=" ">
          <Approving />
        </div>
      ) : (
        <></>
      )}
    </>
  );
};

export default Market;
