import React from "react";
import { MyNftPositionList, Navbar } from "../components";

const NftListPage = () => {
  return (
    <div
      style={{
        background:
          "linear-gradient(302.5deg, #0F0F1B 71.86%, #00FFF0 286.23%)",
        paddingTop: "45px",
      }}
    >
      <Navbar />
      <MyNftPositionList />
    </div>
  );
};

export default NftListPage;
