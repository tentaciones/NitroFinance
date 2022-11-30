import {
  MdOutlineArrowBackIos,
  MdSentimentVerySatisfied,
} from "react-icons/md";
import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { ethers } from "ethers";
import sol4Abi from "../contract/Sol4.json";
const MarkettemExapnded = ({ close }) => {
  const { token0, token1, address, colFactor, intRate } = useParams();
  const [sol4Contract, setSol4Contract] = useState(null);
  const [availableLiquidity, setAvailableLiquidity] = useState(null);
  const [tempSigner, setTempSigner] = useState(null);
  const [debt, setDebt] = useState(null);
  const [colValue, setColValue] = useState(null);

  let sol4ContractAddress = address;
  const updateEthers = () => {
    let tempProvider = new ethers.providers.Web3Provider(window.ethereum);
    let tempSigner = tempProvider.getSigner();
    let tempAdddress = tempSigner.getAddress();
    let sol4Contract = new ethers.Contract(
      sol4ContractAddress,
      sol4Abi,
      tempSigner
    );
    setSol4Contract(sol4Contract);
    setTempSigner(tempAdddress);
  };
  const getPoolDataHandler = async () => {
    updateEthers();
    let availableLiquidity = await sol4Contract.getAvaliableLiquidity();
    let debt = await sol4Contract.borrowedValue(tempSigner);
    let colValue = await sol4Contract.collateralValue(tempSigner);
    let colFactor = await sol4Contract.tmcr(tempSigner);
    let intRate = await sol4Contract.air(tempSigner);

    setAvailableLiquidity("$" + availableLiquidity.toString());
    setDebt("$" + debt.toString());
    setColValue("$" + colValue.toString());
  };

  useEffect(() => {
    getPoolDataHandler();
  });

  return (
    <div className=" w-full h-full px-5 pt-10">
      <div className="flex justify-between px-5">
        <div className="flex space-x-2">
          <MdOutlineArrowBackIos
            className="hover:cursor-pointer"
            onClick={() => close()}
          />
          <p>Pair</p>
        </div>

        <p>Available Liquidity</p>
      </div>
      <div className="flex  relative justify-between items-center h-10 px-5   bg-[#10101B] border rounded-md shadow-sm border-indigo-600">
        <p>
          {token0}/{token1}
        </p>
        <p>{availableLiquidity}</p>
      </div>
      <div className="flex justify-end">
        <Link to={"/CreatePosition/" + token0 + "/" + token1 + "/" + address}>
          <button
            className="w-[200px] bg-[#10101B] hover:border-indigo-600 mt-5 h-[30px] rounded-xl hover:bg-[#10101B] "
            style={{
              background:
                "linear-gradient(90.21deg, rgba(85, 255, 245, 0.7) -16.89%, #5764FF 72.48%, rgba(162, 169, 255, 0.7) 100%)",
            }}
          >
            + New Position
          </button>
        </Link>
      </div>

      <div className=" bg-[#10101B] border rounded-md shadow-sm border-indigo-600 mt-5 h-[300px] px-5">
        <div className="bg-black w-full h-[70px] mt-10 px-5 rounded-md flex justify-between items-center">
          <div className="">
            <p>Collateral Value</p>
            <p>${colValue}</p>
          </div>
          <div className="">
            <p>Debt</p>
            <p>${debt}</p>
          </div>
          <div className="">
            <p>Borrowable</p>
            <p>$800</p>
          </div>
        </div>
        <div className="bg-black w-full h-[70px] mt-5 px-5 rounded-md flex justify-between items-center">
          <div className="">
            <p>Available Liquidity (00-00)</p>
            <p>{colValue}</p>
          </div>
          <div className="">
            <p>Collateral Factor</p>
            <p>{colFactor}</p>
          </div>
          <div className="">
            <p>InterestRate</p>
            <p>{intRate}</p>
          </div>
        </div>
        <div className="bg-black w-full h-[70px] mt-3">kk</div>
      </div>
    </div>
  );
};

export default MarkettemExapnded;
