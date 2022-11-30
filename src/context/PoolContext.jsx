import React, { useState, createContext, useEffect } from "react";
import { ethers } from "ethers";
import NFTManagerAbi from "../contract/NFTManagerAbi.json";
import FactoryContractAbi from "../contract/FactoryContractAbi.json";
import sol4Abi from "../contract/Sol4.json";
import collateralAbi from "../contract/UsdcAbi.json";
export const PoolContext = createContext();

export const Logic = ({ children }) => {
  const FactoryContractAddress = "0x52e6A6F28e5aeA5B6C9582fa90c153c17E39164D";
  const NftManagerAddress = "0x988A44544cD98ACd99B600ed5993e0B5528c513c";
  const [FactoryContract, SetFactoryContract] = useState(null);
  const [NftManagerContract, setNftManagerContract] = useState(null);
  const [allMarket, setAllMarket] = useState([]);
  const [BlockNumber, setBlockNumber] = useState(null);
  const [transactionHash, SetTransactionHash] = useState("");
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [collateralItem, setCollateralItem] = useState(null);
  const [borrowItem, setBorrowItem] = useState(null);
  const [myPositionItem, setMyPosition] = useState(null);
  const [token0, setToken0] = useState("");
  const [token1, setToken1] = useState("");
  const [sol4Contract, setSol4Contract] = useState(null);
  const [locusItem, setLocusItem] = useState(null);
  const [collateralcontract, setCollateral] = useState(null);
  const [approved, setApproved] = useState(false);
  const [buttonText, setButtonText] = useState("Approve");
  const [collateralContractAddress, setCollateralContractAddress] =
    useState(null);
  const [amount, setAmount] = useState("");

  const updateEthers = () => {
    let tempProvider = new ethers.providers.Web3Provider(window.ethereum);
    let tempSigner = tempProvider.getSigner();
    let FactoryContract = new ethers.Contract(
      FactoryContractAddress,
      FactoryContractAbi,
      tempSigner
    );

    let NftManagerContract = new ethers.Contract(
      NftManagerAddress,
      NFTManagerAbi,
      tempSigner
    );

    SetFactoryContract(FactoryContract);
    setNftManagerContract(NftManagerContract);
  };

  const createMarketHandler = async (e) => {
    updateEthers();
    e.preventDefault();

    let token0 = e.target.token0.value;
    let token1 = e.target.token1.value;
    let fee = 3000;
    let txn = await FactoryContract.deploy(token0, token1, fee);
    setToken0(token0);
    setToken0(token1);
    setShowSuccessModal(true);
    SetTransactionHash(txn.hash);
    setToken0("");
    setToken1("");
    console.log(txn);
  };

  const getAllMarketHandler = async () => {
    updateEthers();
    let txn = await FactoryContract.getAllMarket();
    setAllMarket(txn);
    console.log(txn);
  };

  const getallUserCollateralItem = async () => {
    updateEthers();
    let collateralItem = await NftManagerContract.getAllMyCollateral();
    console.log(collateralItem);
    setCollateralItem(collateralItem);
  };

  const getallUserBorrowItem = async () => {
    updateEthers();
    let borrowItem = await NftManagerContract.getAllMyBorrows();
    setBorrowItem(borrowItem);
  };

  const getAllMyPositions = async () => {
    updateEthers();
    let myPositionItem = await NftManagerContract.getAllMyPositions();
    setMyPosition(myPositionItem);
  };

  const updateEthersSol4Contract = (sol4ContractAddress) => {
    let tempProvider = new ethers.providers.Web3Provider(window.ethereum);
    let tempSigner = tempProvider.getSigner();
    let sol4Contract = new ethers.Contract(
      sol4ContractAddress,
      sol4Abi,
      tempSigner
    );
    setSol4Contract(sol4Contract);
  };

  const withdrawHandler = async (e, sol4ContractAddress) => {
    e.preventDefault();
    updateEthersSol4Contract(sol4ContractAddress);

    let amount = e.target.amount.value;
    let txn = await sol4Contract.withdrawCollateral(amount);
    SetTransactionHash(txn.hash);
    setShowSuccessModal(true);
    console.log(txn);
  };

  const showLocusItemHandler = async (sol4ContractAddress) => {
    updateEthersSol4Contract(sol4ContractAddress);
    let txn = await sol4Contract.getAllExistingLocus();

    setLocusItem(txn);
  };

  const updateEthersAddCollateral = async (sol4ContractAddress) => {
    let tempProvider = new ethers.providers.Web3Provider(window.ethereum);
    let tempSigner = tempProvider.getSigner();
    let sol4Contract = new ethers.Contract(
      sol4ContractAddress,
      sol4Abi,
      tempSigner
    );

    setSol4Contract(sol4Contract);
    let collateralContractAddress = await sol4Contract.token0();
    let collateralcontract = new ethers.Contract(
      collateralContractAddress,
      collateralAbi,
      tempSigner
    );
    setCollateralContractAddress(collateralContractAddress);
    setCollateral(collateralcontract);
  };

  const appoveCollateralHandler = async (e, sol4ContractAddress) => {
    updateEthersAddCollateral(sol4ContractAddress);
    console.log(sol4ContractAddress);
    let amount = e.target.amount.value;
    let txn = collateralcontract.approve(sol4ContractAddress, amount);
    setAmount(e.target.value);
    setApproved(true);

    setButtonText("Add");
  };

  const addCollateralHandler = async (e, sol4ContractAddress) => {
    e.preventDefault();
    updateEthersAddCollateral(sol4ContractAddress);

    let usdcAmount = e.target.amount.value;
    let txn = await sol4Contract.addCollateral(usdcAmount);
    SetTransactionHash(txn.hash);
    setShowSuccessModal(true);
    setApproved(false);

    setButtonText("Approve");
    setAmount("");
    console.log(txn);
  };

  const addCollateral = async (e, sol4ContractAddress) => {
    e.preventDefault();
    {
      approved
        ? addCollateralHandler(e, sol4ContractAddress)
        : appoveCollateralHandler(
            e,
            sol4ContractAddress,
            collateralContractAddress
          );
    }
  };

  const updateBlockNumber = async () => {
    let tempProvider = new ethers.providers.Web3Provider(window.ethereum);
    let tx = await tempProvider.getBlockNumber();
    setBlockNumber(tx.toString());
  };
  useEffect(() => {
    updateBlockNumber();
  });
  useEffect(() => {
    getAllMarketHandler();
  }, []);
  return (
    <PoolContext.Provider
      value={{
        BlockNumber,
        createMarketHandler,
        allMarket,
        getAllMarketHandler,
        updateEthers,
        NftManagerAddress,
        transactionHash,
        showSuccessModal,
        setShowSuccessModal,
        token0,
        setToken0,
        token1,
        setToken1,
        getallUserCollateralItem,
        collateralItem,
        getallUserBorrowItem,
        borrowItem,
        getAllMyPositions,
        myPositionItem,
        showLocusItemHandler,
        locusItem,
        addCollateral,
        buttonText,
        setShowSuccessModal,
        setAmount,
        amount,
        withdrawHandler,
      }}
    >
      {children}
    </PoolContext.Provider>
  );
};
