import React from "react";
import { LandingPageNav, LandingPageHeroSection } from "../components";

const LandingPage = () => {
  return (
    <div
      style={{
        background:
          "linear-gradient(302.5deg, #0F0F1B 71.86%, #00FFF0 286.23%)",
        paddingTop: "45px",
      }}
    >
      <LandingPageNav />
      <LandingPageHeroSection />
    </div>
  );
};

export default LandingPage;
