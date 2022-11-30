import React from "react";
import { NewMarket, Navbar, Footer } from "../components";
const CreateNewMarketPage = () => {
  return (
    <div
      style={{
        background:
          "linear-gradient(302.5deg, #0F0F1B 71.86%, #00FFF0 286.23%)",
        paddingTop: "45px",
      }}
    >
      <Navbar />
      <NewMarket />
      <Footer />
    </div>
  );
};

export default CreateNewMarketPage;
