import React from "react";
import Lottie from "react-lottie";
import * as loading from "../assets/animation/128706-3-seconds-loader-beeboard.json";

const defaultOptions = {
  loop: true,
  autoplay: true,
  animationData: loading.default,
  rendererSettings: {
    preserveAspectRatio: "xMidYMid slice",
  },
};

const ApprovalLoading = ({ loading }) => {
  return (
    <div className="-mt-[450px] h-full w-full  ">
      <Lottie
        options={defaultOptions}
        height={500}
        width={500}
        isClickToPauseDisabled={true}
      />
      <div className="flex justify-center items-center">
        <p className="-mt-[450px] text-3xl shadow-2xl animate-pulse">
          Approving ...
        </p>
      </div>
    </div>
  );
};

export default ApprovalLoading;
