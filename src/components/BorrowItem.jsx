import { useContext, useEffect } from "react";
import { PoolContext } from "../context/PoolContext";

const BorrowItem = ({ showBorrow, borrowQuery }) => {
  const { getallUserBorrowItem, borrowItem } = useContext(PoolContext);

  useEffect(() => {
    getallUserBorrowItem();
  }, []);
  return (
    <>
      {borrowItem
        ?.filter((data) => {
          return borrowQuery.toLowerCase() === ""
            ? data
            : data._contractAddress
                .toLowerCase()
                .includes(borrowQuery.toLowerCase()) ||
                data._token0
                  .toLowerCase()
                  .includes(borrowQuery.toLowerCase()) ||
                data._token1.toLowerCase().includes(borrowQuery.toLowerCase());
        })
        .map(({ _contractAddress, _token0, _token1 }) => {
          return (
            <div
              className="h-10 bg-[#10101B] border  rounded-md px-5 flex items-center justify-between border-indigo-600 hover:cursor-pointer"
              onClick={() => showBorrow()}
            >
              <p>{_contractAddress}</p>
              <p>
                {_token1}/{_token0}
              </p>
            </div>
          );
        })}
    </>
  );
};

export default BorrowItem;
