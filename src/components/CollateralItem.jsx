import { useContext, useEffect } from "react";
import { PoolContext } from "../context/PoolContext";
import { ethers } from "ethers";
import NFTManagerAbi from "../contract/NFTManagerAbi.json";
import { Link } from "react-router-dom";

const CollateralItem = ({ showCollateral, collateralQuery }) => {
  const { collateralItem, getallUserCollateralItem } = useContext(PoolContext);

  useEffect(() => {
    getallUserCollateralItem();
  }, []);

  return (
    <>
      {collateralItem
        ?.filter((data) => {
          return collateralQuery.toLowerCase() === ""
            ? data
            : data._contractAddress
                .toLowerCase()
                .includes(collateralQuery.toLowerCase()) ||
                data._token0
                  .toLowerCase()
                  .includes(collateralQuery.toLowerCase()) ||
                data._token1
                  .toLowerCase()
                  .includes(collateralQuery.toLowerCase());
        })
        .map(({ _contractAddress, _token0, _token1 }) => {
          return (
            <Link to={"/dashboard/" + _contractAddress} key={_contractAddress}>
              <div
                className="h-10 bg-[#10101B] border  rounded-md px-8 flex items-center justify-between border-indigo-600 hover:cursor-pointer mb-3"
                onClick={() => showCollateral()}
              >
                <p>
                  {_contractAddress.toString().slice(0, 10)}...
                  {_contractAddress.toString().slice(-8)}
                </p>
                <p>
                  {_token1}/{_token0}
                </p>
              </div>
            </Link>
          );
        })}
    </>
  );
};

export default CollateralItem;
