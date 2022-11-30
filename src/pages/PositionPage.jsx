import React from "react";
import { Navbar, Footer, Position } from "../components";
const PositionPage = () => {
  return (
    <div
      style={{
        background:
          "linear-gradient(302.5deg, #0F0F1B 71.86%, #00FFF0 286.23%)",
        paddingTop: "45px",
      }}
    >
      <Navbar />
      <Position />
      <Footer />
    </div>
  );
};

export default PositionPage;
