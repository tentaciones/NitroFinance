import { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { PoolContext } from "../context/PoolContext";

const PositionItems = ({ open, positionQuery }) => {
  const { getAllMyPositions, myPositionItem, getNftData } =
    useContext(PoolContext);

  useEffect(() => {
    getAllMyPositions();
  }, []);

  const get = async (sol4ContractAddress, id, colFactor, intRate) => {
    getNftData(sol4ContractAddress, id, colFactor, intRate);
    //open();
  };

  return (
    <div className="text-white px-5 mt-5 w-full">
      {myPositionItem
        ?.filter((data) => {
          return positionQuery.toLowerCase() === ""
            ? data
            : data._token0
                .toLowerCase()
                .includes(positionQuery.toLowerCase()) ||
                data._token1
                  .toLowerCase()
                  .includes(positionQuery.toLowerCase()) ||
                data._contractAddress
                  .toLowerCase()
                  .includes(positionQuery.toLowerCase()) ||
                data._collateralFactor
                  .toString()
                  .toLowerCase()
                  .includes(positionQuery.toLowerCase()) ||
                data._interestRate
                  .toString()
                  .toLowerCase()
                  .includes(positionQuery.toLowerCase()) ||
                data._nftId
                  .toString()
                  .toLowerCase()
                  .includes(positionQuery.toLowerCase());
        })
        .map(
          ({
            _contractAddress,
            _token1,
            _token0,
            _collateralFactor,
            _interestRate,
            _nftId,
          }) => {
            return (
              <div
                className="w-full h-[60px] rounded-md bg-black  flex items-center px-5 hover:cursor-pointer mb-3"
                onClick={() =>
                  get(
                    _contractAddress,
                    _nftId,
                    _collateralFactor,
                    _interestRate
                  )
                }
                key={_contractAddress}
              >
                <Link
                  to={
                    "/myposition/" +
                    _token0 +
                    "/" +
                    _token1 +
                    "/" +
                    _contractAddress +
                    "/" +
                    _collateralFactor +
                    "/" +
                    _interestRate +
                    "/" +
                    _nftId
                  }
                >
                  <div className="flex gap-20 ">
                    <p>{_nftId.toString()}</p>
                    <p>
                      {_token1}/{_token0}
                    </p>
                    <p>{_contractAddress}</p>

                    <p>
                      {_collateralFactor.toString()}-{_interestRate.toString()}
                    </p>
                  </div>
                </Link>
              </div>
            );
          }
        )}
    </div>
  );
};

export default PositionItems;
