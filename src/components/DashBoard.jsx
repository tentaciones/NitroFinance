import { BiSearch } from "react-icons/bi";
import {
  BorrowItem,
  CollateralItem,
  DashBoardCollateral,
  DashBoardRepayBorrow,
} from ".";
import { useState } from "react";
const DashBoard = () => {
  const [showBorrowModal, setShowBorrowModal] = useState(false);
  const [showCollateralModal, setShowCollateralModal] = useState(false);
  const [collateralQuery, setCollateralQuery] = useState("");
  const [borrowQuery, setBorrowQuery] = useState("");
  const onshowBorrowHandler = () => {
    setShowBorrowModal(false);
    setShowCollateralModal(true);
  };

  const onShowCollateralModalHandler = () => {
    setShowCollateralModal(false);
    setShowBorrowModal(true);
  };

  const backHandandler = () => {
    setShowCollateralModal(false);

    setShowBorrowModal(false);
  };

  return (
    <div className="px-32 pt-32 h-full text-white font-display">
      <div className="flex space-x-5">
        {showBorrowModal ? (
          <DashBoardCollateral back={backHandandler} />
        ) : (
          <div className="h-[500px] w-1/2 bg-[#101D28] rounded-lg px-5 ">
            <div className="flex justify-between">
              <p className="py-10">My Borrows</p>
              <div className="flex items-center">
                <input
                  type="text"
                  className=" relative  tablet:h-[50px] h-[30px] outline-none bg-[#121E28] tablet:px-20  px-[30px] tablet:rounded-3xl rounded-xl tablet:w-[300px] w-full tablet:mr-0 mr-[10px]  placeholder:text-[#BEBEBE] hover:outline-indigo-600 focus:outline-indigo-600"
                  placeholder="search"
                  onChange={(e) => setBorrowQuery(e.target.value)}
                />
                <BiSearch className=" absolute text-xl tablet:mx-10 mx-2" />
              </div>
            </div>
            <BorrowItem
              showBorrow={onshowBorrowHandler}
              borrowQuery={borrowQuery}
            />
          </div>
        )}
        {showCollateralModal ? (
          <DashBoardRepayBorrow back={backHandandler} />
        ) : (
          <div className="h-[500px] w-1/2 bg-[#101D28] rounded-lg px-5 ">
            <div className="flex justify-between">
              <p className="py-10">My Collaterals</p>
              <div className="flex items-center">
                <input
                  type="text"
                  className=" relative  tablet:h-[50px] h-[30px] outline-none bg-[#121E28] tablet:px-20  px-[30px] tablet:rounded-3xl rounded-xl tablet:w-[300px] w-full tablet:mr-0 mr-[10px]  placeholder:text-[#BEBEBE] hover:outline-indigo-600 focus:outline-indigo-600"
                  placeholder="search"
                  onChange={(e) => setCollateralQuery(e.target.value)}
                />
                <BiSearch className=" absolute text-xl tablet:mx-10 mx-2" />
              </div>
            </div>
            <CollateralItem
              showCollateral={onShowCollateralModalHandler}
              collateralQuery={collateralQuery}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default DashBoard;
