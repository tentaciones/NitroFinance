import React from "react";
import { MdOutlineArrowBackIos } from "react-icons/md";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { PoolContext } from "../context/PoolContext";
import SuccessModal from "./SuccessModal";
const NewMarket = () => {
  const {
    createMarketHandler,
    setShowSuccessModal,
    transactionHash,
    showSuccessModal,
    token0,
    setToken0,
    token1,
    setToken1,
  } = useContext(PoolContext);

  return (
    <form onSubmit={createMarketHandler}>
      <div className="px-32 pt-32 text-white font-display w-screen flex justify-center items-center">
        <div className="   h-[400px] w-[400px] bg-[#10101C] rounded-md shadow shadow-white px-5">
          <div className="flex text-2xl pt-10 space-x-5">
            <Link to={"/market"}>
              <MdOutlineArrowBackIos className="hover:cursor-pointer" />
            </Link>
            <p className="">Create New Market</p>
          </div>

          <input
            type="text"
            className="w-full px-5 mt-[30px] h-[60px] rounded-xl outline-none bg-[#10101C] outline-indigo-600  placeholder:text-[#BEBEBE]"
            placeholder="token0"
            id="token0"
            onChange={(e) => setToken0(e.target.value)}
            value={token0}
          />
          <input
            type="text"
            className="w-full px-5 mt-[30px] h-[60px] rounded-xl outline-none bg-[#10101C] outline-indigo-600  placeholder:text-[#BEBEBE]"
            placeholder="token1"
            id="token1"
            onChange={(e) => setToken1(e.target.value)}
            value={token1}
          />

          <button
            className="w-full bg-[#10101B] hover:border-indigo-600 mt-10 h-[60px] rounded-xl hover:bg-[#10101B] "
            style={{
              background:
                "linear-gradient(90.21deg, rgba(85, 255, 245, 0.7) -16.89%, #5764FF 72.48%, rgba(162, 169, 255, 0.7) 100%)",
            }}
          >
            Create
          </button>
        </div>
      </div>
      {showSuccessModal ? (
        <SuccessModal
          transactionHash={transactionHash}
          setShowSuccessModal={setShowSuccessModal}
        />
      ) : (
        <></>
      )}
    </form>
  );
};

export default NewMarket;
