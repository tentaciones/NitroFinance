import { useEffect, useState, useContext } from "react";
import { ethers } from "ethers";

import { Link, useParams } from "react-router-dom";
import { MarkettemExapnded } from ".";
import sol4Abi from "../contract/Sol4.json";
import { PoolContext } from "../context/PoolContext";

const LocusItem = ({ expanded, close, isExpanded }) => {
  const { address, token0, token1 } = useParams();
  let sol4ContractAddress = address;
  const { locusItem, showLocusItemHandler } = useContext(PoolContext);

  /*const [sol4Contract, setSol4Contract] = useState(null);
  const [locusItem, setLocusItem] = useState(null);
  const updateEthers = () => {
    let tempProvider = new ethers.providers.Web3Provider(window.ethereum);
    let tempSigner = tempProvider.getSigner();
    let sol4Contract = new ethers.Contract(
      sol4ContractAddress,
      sol4Abi,
      tempSigner
    );
    setSol4Contract(sol4Contract);
  };
  const showLocusItemHandler = async () => {
    updateEthers();
    let txn = await sol4Contract.getAllExistingLocus();

    setLocusItem(txn);
  };*/

  useEffect(() => {
    showLocusItemHandler(sol4ContractAddress);
  }, []);

  return (
    <div>
      {isExpanded ? (
        <MarkettemExapnded close={close} />
      ) : (
        <>
          {" "}
          <div className="flex justify-between px-5">
            <p>positions</p>
            <p>Total Liquidity</p>
            <p>Value of invariant</p>
            <p>Active interest</p>
            <p>Invariant Rate</p>
          </div>
          {locusItem?.map(
            ({
              collateralFactor,
              interestRate,
              locusId,
              liquidity,
              k,
              initialized,
            }) => {
              return (
                <Link
                  to={
                    "/market/" +
                    token0 +
                    "/" +
                    token1 +
                    "/" +
                    +address +
                    "/" +
                    collateralFactor +
                    "/" +
                    interestRate
                  }
                  key={locusId.toString()}
                >
                  <div
                    className="flex justify-between items-center px-5 mt-5 bg-black rounded-md h-10 hover:cursor-pointer"
                    onClick={() => expanded()}
                  >
                    <p>
                      {collateralFactor.toString()}-{interestRate.toString()}
                    </p>
                    <p>${liquidity.toString()}</p>
                    <p>{k.toString()}K</p>
                    <p>50%</p>
                    <p>5%</p>
                  </div>
                </Link>
              );
            }
          )}
        </>
      )}
    </div>
  );
};

export default LocusItem;
