import successIcon from "../assets/img/illus-1.png";
import { RiCloseFill } from "react-icons/ri";

const SuccessModal = ({ transactionHash, setShowSuccessModal }) => {
  const onCloseHandler = () => {
    setShowSuccessModal(false);
  };
  const ppp = 1;
  return (
    <div className=" flex justify-center items-center -mt-[450px]">
      <div className="  text-white bg-[#10101C] h-[415px] w-[515px] shadow shadow-white rounded-3xl">
        <div
          className="flex justify-end px-10 pt-5 hover:cursor-pointer"
          onClick={() => onCloseHandler()}
        >
          <RiCloseFill className="text-3xl shadow shadow-white text-white " />
        </div>

        <div className="flex flex-col items-center justify-center h-full">
          <img
            src={successIcon}
            alt="successIcon"
            className="hover:cursor-pointer"
          />
          <p className="text-3xl font-display font-bold">
            Transaction Successful
          </p>
          <a
            href={"https://goerli.etherscan.io/" + transactionHash.toString()}
            className="text-[#0987D3] border-b border-[#0987D3]"
          >
            view on Arbitrum scan
          </a>
        </div>
      </div>
    </div>
  );
};

export default SuccessModal;
