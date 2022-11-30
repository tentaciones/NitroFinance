import { useState, useEffect } from "react";
import { ethers } from "ethers";
import { BiArrowBack } from "react-icons/bi";
import { Link, useParams } from "react-router-dom";
import { Loading, SuccessModal } from ".";
import sol4Abi from "../contract/Sol4.json";
import usdcAbi from "../contract/UsdcAbi.json";
import chart from "../assets/img/Group 1 (41).png";
import empty from "../assets/img/Empty state.png";
import ApprovalLoading from "./ApprovalLoading";
const CreatePosition = () => {
  const [done, setDone] = useState(false);
  const [showChart, setShowChart] = useState(false);
  const [sol4Contract, setSol4contract] = useState(null);
  const [token1ContractAddress, setToken1ContractAddress] = useState(null);
  const [token1Contract, setToken1Contract] = useState(null);
  const [CollateralFactor, setCollateralFactor] = useState(null);
  const [intRate, setInterestRate] = useState(null);
  const [invariantRate, setInvariantRate] = useState(null);
  const [positionSize, setPositionSize] = useState(null);
  const [enablebuttontext, setEnablebuttontext] = useState("Preview");
  const [approve, setApproved] = useState(false);
  const [txHash, setTxHash] = useState(null);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [walletBalance, setWalletBalance] = useState(null);
  const [transactionHash, setTransactionHash] = useState(null);
  const [colFactor, setColFactor] = useState("");
  const [interest, setInterest] = useState("");
  const [usdcAmount, setUsdcAmount] = useState("");

  const { address, token1, token0 } = useParams();
  const load = () => {
    setDone(true);
  };

  let sol4ContractAddress = address;

  const updateEthers = async () => {
    let tempProvider = new ethers.providers.Web3Provider(window.ethereum);
    let tempSigner = tempProvider.getSigner();
    let sol4Contract = new ethers.Contract(
      sol4ContractAddress,
      sol4Abi,
      tempSigner
    );
    setSol4contract(sol4Contract);

    let token1Contract = new ethers.Contract(
      token1ContractAddress,
      usdcAbi,
      tempSigner
    );
    setToken1Contract(token1Contract);
  };

  const getTokenAmount = async () => {
    let token1Balance = await token1Contract.balanceOf(address);
    let decimals = await token1Contract.decimals();
    let balanceIntoken1 = ethers.utils.formatUnits(token1Balance, decimals);
    setWalletBalance(balanceIntoken1);
    console.log(balanceIntoken1);
  };

  const previewHandler = async (e) => {
    e.preventDefault();
    updateEthers();
    let colFactor = e.target.colFactor.value;
    let interest = e.target.interest.value;
    let usdcAmount = e.target.usdcAmount.value;
    let token1ContractAddress = await sol4Contract.token1();
    let invariantRate = await sol4Contract.getValueofInvariant(
      colFactor,
      interest
    );
    let positionSize = await sol4Contract.getPresumedPositionSize(
      usdcAmount,
      colFactor,
      interest
    );
    setToken1ContractAddress(token1ContractAddress);
    setInvariantRate(invariantRate.toString());
    setInterestRate(interest.toString());
    setPositionSize(positionSize.toString());
    setCollateralFactor(colFactor.toString());
    setDone(false);
    setShowChart(true);
    setEnablebuttontext("Approve");
  };

  const approveTokenHandle = async (e) => {
    e.preventDefault();
    updateEthers();
    let usdcAmount = e.target.usdcAmount.value;
    let txn = await token1Contract.approve(sol4ContractAddress, usdcAmount);
    setTxHash(txn.hash);
    setApproved(true);
    setEnablebuttontext("Add");
  };

  const createPositionHandler = async (e) => {
    e.preventDefault();
    updateEthers();
    let colFactor = e.target.colFactor.value;
    let interest = e.target.interest.value;
    let usdcAmount = e.target.usdcAmount.value;
    let txn = await sol4Contract.addLiquidity(colFactor, interest, usdcAmount);
    setColFactor(colFactor);
    setInterest(interest);
    setUsdcAmount(usdcAmount);
    setTransactionHash(txn.hash);
    setShowSuccessModal(true);
    setColFactor("");
    setInterest("");
    setUsdcAmount("");
    setCollateralFactor("");
    setInterestRate("");
    setInvariantRate("");
    setPositionSize("");
    setShowChart(false);
    setEnablebuttontext("Preview");
  };

  const createHandler = async (e) => {
    e.preventDefault();
    {
      approve
        ? createPositionHandler(e)
        : done
        ? previewHandler(e)
        : approveTokenHandle(e);
    }
  };

  useEffect(() => {
    getTokenAmount();
  });

  return (
    <div className="h-screen py-32 flex justify-center text-white font-display tablet:px-0 px-2">
      <div className="tablet:w-[895px] w-full bg-[#10101C] h-[600px] rounded-[30px] shadow shadow-white">
        <div className="text-2xl flex mt-10 tablet:px-20 px-2">
          <Link to="/market">
            <BiArrowBack className="hover:cursor-pointer" />
          </Link>
          <div className="flex justify-center w-full">
            <p>Create Position</p>
          </div>
          <p className="">
            {token1}/{token0}
          </p>
        </div>
        <form onSubmit={createHandler}>
          <div className="flex justify-between tablet:px-20 px-2 text-[10px] tablet:text-[16px] ">
            <div className="w-1/2 mt-20">
              <div className="flex  justify-between">
                <p>{token1} Balance</p>
                <p>{walletBalance}</p>
              </div>

              <div className="flex  justify-between mt-10">
                <p>Collateral Factor [%]</p>
                <p>Interest Rate [%]</p>
              </div>

              <div
                className="flex  justify-between mt-5 mx-3 space-x-2 tablet:space-x-0"
                onClick={load}
              >
                <input
                  type="number"
                  className="bg-[#221E2A] rounded-[10px] outline-none tablet:h-[60px] h-[30px] tablet:w-[140px] w-1/2 px-3 placeholder:text-[#999999]"
                  placeholder="80"
                  id="colFactor"
                  onChange={(e) => setColFactor(e.target.value)}
                  value={colFactor}
                />
                <input
                  type="number"
                  className="bg-[#221E2A] rounded-[10px] outline-none tablet:h-[60px] h-[30px] tablet:w-[140px] w-1/2 px-3 placeholder:text-[#999999]"
                  placeholder="10"
                  id="interest"
                  onChange={(e) => setInterest(e.target.value)}
                  value={interest}
                />
              </div>

              <div className="mt-5 mx-3">
                <p>Amount</p>
                <input
                  type="number"
                  className="bg-[#221E2A] rounded-[10px] outline-none tablet:h-[60px] h-[30px] w-full mt-5 px-3 placeholder:text-[#999999]"
                  placeholder="80"
                  id="usdcAmount"
                  onChange={(e) => setUsdcAmount(e.target.value)}
                  value={usdcAmount}
                />
              </div>
              <button className="bg-gradient-to-r from-cyan-500 to-blue-500 w-full h-[60px] rounded-md text-white mt-10">
                {enablebuttontext}
              </button>
            </div>

            <div className="flex flex-col items-center w-1/2 tablet:pl-20 pl-2">
              {done ? (
                <Loading />
              ) : (
                <div>
                  {" "}
                  {showChart ? (
                    <div className="flex">
                      <p className="mt-32">{CollateralFactor}</p>
                      <div>
                        <img src={chart} alt="empty-state" className="mt-20" />
                        <p className="ml-[150px]">{intRate}</p>
                      </div>
                    </div>
                  ) : (
                    <img src={empty} alt="empty-state" className="mt-32" />
                  )}
                </div>
              )}

              <div className=" bg-[#221E2A]  h-[160px] tablet:w-[365px] w-full rounded-[10px] tablet:px-5 px-1 py-5 space-y-3 mt-5 ">
                <div className=" w-full flex justify-between  ">
                  <p>collateralFactor</p>
                  <p className="text-[#999999]"> {CollateralFactor}%</p>
                </div>

                <div className=" w-full flex justify-between  ">
                  <p> interestRate</p>
                  <p className="text-[#999999]">{intRate}%</p>
                </div>

                <div className=" w-full flex justify-between  ">
                  <p>Value Of Invariant </p>
                  <p className="text-[#999999]">{invariantRate}k</p>
                </div>

                <div className=" w-full flex justify-between  ">
                  <p>Current Position Size </p>
                  <p className="text-[#999999]">{positionSize}k</p>
                </div>
              </div>
            </div>
          </div>
          {showSuccessModal ? (
            <SuccessModal
              className="-mt-[1000px] "
              transactionHash={transactionHash}
              setShowSuccessModal={setShowSuccessModal}
            />
          ) : (
            <></>
          )}
          {/*<ApprovalLoading className="-mt-[1000px] " />*/}
        </form>
      </div>
    </div>
  );
};

export default CreatePosition;
