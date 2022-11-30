import React from "react";
import { Footer, Market, Navbar } from "../components";

const MarketPage = () => {
  return (
    <div
      style={{
        background:
          "linear-gradient(302.5deg, #0F0F1B 71.86%, #00FFF0 286.23%)",
        paddingTop: "45px",
      }}
    >
      <Navbar />
      <Market />
      <Footer />
    </div>
  );
};

export default MarketPage;
