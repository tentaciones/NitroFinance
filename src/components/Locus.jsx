import { BiSearch } from "react-icons/bi";
import { MdOutlineArrowBackIos } from "react-icons/md";
import { LocusItem } from ".";
import { useState } from "react";
import { Link, useParams } from "react-router-dom";
const Locus = ({ show }) => {
  const [showLocusItemExpanded, setShowLocusItemExpanded] = useState(false);
  const { token0, token1, address } = useParams();
  const [query, setQuery] = useState("");
  const onShowLocusItemExpanded = () => {
    setShowLocusItemExpanded(true);
  };
  const onShowLocusItemNotExpanded = () => {
    setShowLocusItemExpanded(false);
  };
  return (
    <div className="transition ease-in-out delay-150 ">
      <div className="w-full laptop:h-[500px] h-[500px] tablet:h-[700px] bg-[#101D28] mt-10 rounded-lg ">
        {" "}
        {showLocusItemExpanded ? (
          <></>
        ) : (
          <div className="flex px-5 py-5 space-x-3 laptop:justify-between">
            <MdOutlineArrowBackIos
              onClick={() => show()}
              className="hover:cursor-pointer"
            />
            <p className="">
              {token0}/{token1}
            </p>

            <div className="flex items-center pl-8">
              <input
                type="text"
                className=" relative  tablet:h-[30px] h-[30px] outline-none bg-[#121E28] tablet:px-20 laptop:w-[300px] px-[30px] tablet:rounded-3xl rounded-xl tablet:w-[50px] w-full tablet:mr-0 mr-[10px]  placeholder:text-[#BEBEBE] outline-indigo-600 "
                placeholder="search"
                onChange={(e) => setQuery(e.target.value)}
              />
              <BiSearch className=" absolute text-xl tablet:mx-10 mx-2" />
            </div>
          </div>
        )}
        <LocusItem
          expanded={onShowLocusItemExpanded}
          close={onShowLocusItemNotExpanded}
          isExpanded={showLocusItemExpanded}
          query={query}
        />
      </div>
    </div>
  );
};

export default Locus;
