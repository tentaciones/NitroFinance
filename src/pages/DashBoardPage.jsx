import { Navbar, Footer, DashBoard } from "../components";

const DashBoardPage = () => {
  return (
    <div
      style={{
        background:
          "linear-gradient(302.5deg, #0F0F1B 71.86%, #00FFF0 286.23%)",
        paddingTop: "45px",
      }}
    >
      <Navbar />
      <DashBoard />

      <Footer />
    </div>
  );
};

export default DashBoardPage;
