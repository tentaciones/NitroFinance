import { TbHandClick } from "react-icons/tb";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { PoolContext } from "../context/PoolContext";
const MarketItem = ({ show, query }) => {
  const { allMarket, showLocusItemHandler } = useContext(PoolContext);

  const getAllLocusItemHandler = async (address) => {
    showLocusItemHandler(address);
  };

  return (
    <>
      {allMarket
        .filter((data) => {
          return query.toLowerCase() === ""
            ? data
            : data.token0.toLowerCase().includes(query.toLowerCase()) ||
                data.token1.toLowerCase().includes(query.toLowerCase()) ||
                data.market.toLowerCase().includes(query.toLowerCase());
        })
        .map(({ token0, token1, market }) => {
          return (
            <div
              className="flex  relative space-x-10 items-center h-10 px-5  mb-5 bg-[#10101B] border rounded-md shadow-sm border-indigo-600"
              key={market}
            >
              <Link
                to={
                  "/increaseLiquidity/" + token0 + "/" + token1 + "/" + market
                }
              >
                <div className="flex  space-x-10">
                  <p>
                    {token1.toString()}/{token0.toString()}
                  </p>
                  <p>
                    {market.toString().slice(0, 6)}...
                    {market.toString().slice(-4)}
                  </p>
                </div>
              </Link>
              <Link
                to={
                  "/createPosition/" +
                  token0 +
                  "/" +
                  token1 +
                  "/" +
                  market.toString()
                }
              >
                <div className="bg-white text-black font-display w-[100px] rounded-md text-[10px] flex justify-center items-center">
                  <div onClick={() => getAllLocusItemHandler(market)}>
                    + New Position
                  </div>
                </div>
              </Link>
              <Link
                to={
                  "/market/" +
                  token0.toString() +
                  "/" +
                  token1.toString() +
                  "/" +
                  market.toString()
                }
                className="w-full"
              >
                <div
                  className="flex justify-center items-center bg-white text-black w-full rounded-lg hover:cursor-pointer"
                  onClick={() => show()}
                >
                  <TbHandClick />
                  <p className="">Positions</p>
                </div>
              </Link>
            </div>
          );
        })}
    </>
  );
};

export default MarketItem;
