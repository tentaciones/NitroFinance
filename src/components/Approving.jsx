import React from "react";
import { AiOutlineLoading } from "react-icons/ai";

const Approving = () => {
  return (
    <div className="-mt-[570px] flex justify-center items-center text-white ">
      <div className="bg-black h-64 w-[400px] rounded-xl flex flex-col justify-center items-center">
        <div class="animate-spin  text-green-500 ">
          <AiOutlineLoading className="h-32 w-32" />
        </div>
        <p className="font-display animate-pulse text-xl">Approving</p>
      </div>
    </div>
  );
};

export default Approving;
