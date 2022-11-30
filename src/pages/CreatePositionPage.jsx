import React from "react";
import { CreatePosition, Navbar, Footer } from "../components";

const CreatePositionPage = () => {
  return (
    <div
      style={{
        background:
          "linear-gradient(302.5deg, #0F0F1B 71.86%, #00FFF0 286.23%)",
        paddingTop: "45px",
      }}
    >
      <Navbar />
      <CreatePosition />
      <Footer />
    </div>
  );
};

export default CreatePositionPage;
