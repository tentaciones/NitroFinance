import React from "react";
import Lottie from "react-lottie";
import * as loading from "../assets/animation/loading.json";

const defaultOptions = {
  loop: true,
  autoplay: true,
  animationData: loading.default,
  rendererSettings: {
    preserveAspectRatio: "xMidYMid slice",
  },
};

const Loading = ({ loading }) => {
  return (
    <div className="">
      <Lottie
        options={defaultOptions}
        height={250}
        width={250}
        isClickToPauseDisabled={true}
      />
    </div>
  );
};

export default Loading;
