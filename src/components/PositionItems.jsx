import { useContext, useEffect } from "react";
import { PoolContext } from "../context/PoolContext";

const PositionItems = ({ open }) => {
  const { getAllMyPositions, myPositionItem } = useContext(PoolContext);

  useEffect(() => {
    getAllMyPositions();
  }, []);

  return (
    <div className="text-white px-5 mt-5">
      {myPositionItem?.map(
        ({ _contractAddress, _pairOf, _collateralFactor, _interestRate }) => {
          return (
            <div
              className="w-full h-[60px] rounded-md bg-black flex items-center px-5 hover:cursor-pointer"
              onClick={() => open()}
            >
              <div className="flex space-x-32">
                <p>{_pairOf}</p>
                <p>{_contractAddress}</p>
                <p>{_collateralFactor}</p>
                <p>{_interestRate}</p>
              </div>
            </div>
          );
        }
      )}
    </div>
  );
};

export default PositionItems;
