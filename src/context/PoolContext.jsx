import React, { useState, createContext, useEffect } from "react";
import { ethers } from "ethers";
import NFTManagerAbi from "../contract/NFTManagerAbi.json";
import FactoryContractAbi from "../contract/FactoryContractAbi.json";
import sol4Abi from "../contract/Sol4.json";
import collateralAbi from "../contract/UsdcAbi.json";
export const PoolContext = createContext();

export const Logic = ({ children }) => {
  const FactoryContractAddress = "0x238fa2A9315f6347B92094ddB42c319F5e25EA49";
  const NftManagerAddress = "0x8C542feCb230464B467eAa7e8042990af5DdF2FB";
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
  const [LocuseUnderPoolItem, setLocuseUnderPoolItem] = useState([]);
  const [image, setImage] = useState("");
  const [approving, setApproving] = useState(false);
  const [valueOfInvriant, setValueOfInvariant] = useState(null);
  const [myPositionSize, setMyPositionSize] = useState(null);
  const [utilisationRate, setUtilisationRate] = useState(null);
  const [availableLiquidity, setAvailableLiquidity] = useState(null);
  const [tempSigner, setTempSigner] = useState(null);
  const [debt, setDebt] = useState(null);
  const [colValue, setColValue] = useState(null);
  const [tmcr, setTmcr] = useState(null);
  const [air, setAir] = useState(null);

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

  const getPoolDataHandler = async (
    sol4ContractAddress,
    interestRate,
    CollateralFactor
  ) => {
    updateEthersSol4Contract(sol4ContractAddress);
    let availableLiquidity = await sol4Contract.getAvaliableLiquidity(
      CollateralFactor,
      interestRate
    );
    let debt = await sol4Contract.borrowedValue(tempSigner);
    let colValue = await sol4Contract.collateralValue(tempSigner);
    let colFactor = await sol4Contract.tmcr(tempSigner);
    let intRate = await sol4Contract.air(tempSigner);
    setTmcr(colFactor.toString());
    setAir(intRate.toString());
    setAvailableLiquidity("$" + availableLiquidity.toString());
    setDebt("$" + debt.toString());
    setColValue("$" + colValue.toString());
  };

  const gettAllLocusesUnderPool = async (sol4ContractAddress) => {
    updateEthersSol4Contract(sol4ContractAddress);
    let txn = sol4Contract.getAllMyPositions();
    setLocuseUnderPoolItem(txn);
  };

  const BorrowHandler = async (e, sol4ContractAddress) => {
    e.preventDefault();
    updateEthersSol4Contract(sol4ContractAddress);
    let collateralFactor = e.target.collateralFactor.value;
    let interestRate = e.target.interestRate.value;
    let usdcAmount = e.target.usdcAmount.value;
    let txn = await sol4Contract.borrow(
      collateralFactor,
      interestRate,
      usdcAmount
    );
    SetTransactionHash(txn.hash);
    setShowSuccessModal(true);
    console.log(txn);
  };

  const getNftData = async (sol4ContractAddress, id, colFactor, intRate) => {
    updateEthersSol4Contract(sol4ContractAddress);
    let image = await sol4Contract.buildImage(id);
    console.log(image);
    let myPositionSize = await sol4Contract.getpositionSize(colFactor, intRate);
    let valueOfInvriant = await sol4Contract.getValueofInvariant(
      colFactor,
      intRate
    );
    let utilisationRate = await sol4Contract.getUtilisationRate(
      colFactor,
      intRate
    );
    console.log("lll");
    setImage(image);
    setUtilisationRate(utilisationRate.toString() + "%");
    setValueOfInvariant(valueOfInvriant.toString() + "k");
    setMyPositionSize(myPositionSize.toString() + "k");
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
    setApproving(true);
    setAmount(e.target.value);
    setApproved(true);
    setApproving(false);
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
  /*useEffect(() => {
    getAllMarketHandler();
  }, []);*/
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
        BorrowHandler,
        gettAllLocusesUnderPool,
        LocuseUnderPoolItem,
        image,
        getNftData,
        approving,
        getPoolDataHandler,
        air,
        colValue,
        tmcr,
        availableLiquidity,
        debt,
        utilisationRate,
        myPositionSize,
        valueOfInvriant,
      }}
    >
      {children}
    </PoolContext.Provider>
  );
};
