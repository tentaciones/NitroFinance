import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { WagmiConfig, createClient, chain } from "wagmi";
import { ConnectKitProvider, getDefaultClient } from "connectkit";
import {
  MarketPage,
  DashBoardPage,
  CreatePositionPage,
  PositionPage,
  MyPositionPage,
  DecreaseLiquidityPage,
  IncreaseLiquidityPage,
  CreateNewMarketPage,
  LandingPage,
  NftListPage,
} from "./pages";
import { Logic } from "./context/PoolContext";

const alchemyId = process.env.ALCHEMY_ID;
const GoerliTestNet = {
  id: 421613,
  name: "Arbitrum Testnet",
  nativeCurrency: {
    decimals: 18,
    name: "Arbitrum Eth",
    symbol: "AGOR",
  },
  rpcUrls: {
    default:
      "https://arb-goerli.g.alchemy.com/v2/578_3ySP48q9acSytjWIODKW7T6DDRz7",
  },
  blockExplorers: {
    default: {
      name: "Goerli",
      url: "https://goerli-rollup-explorer.arbitrum.io",
    },
    snowtrace: {
      name: "Goerli",
      url: "https://goerli-rollup-explorer.arbitrum.io",
    },
  },
  testnet: true,
};

const chains = [GoerliTestNet, chain.arbitrum, chain.goerli];
const client = createClient(
  getDefaultClient({
    appName: "NitroFinance",
    alchemyId,
    chains,
  })
);

function App() {
  return (
    <WagmiConfig client={client}>
      <ConnectKitProvider>
        <Logic>
          <Router>
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/market" element={<MarketPage />} />
              <Route
                path="/market/:token0/:token1/:address"
                element={<MarketPage />}
              />
              <Route
                path="/market/:token0/:token1/:address/:colFactor/:intRate"
                element={<MarketPage />}
              />
              <Route path="/dashboard" element={<DashBoardPage />} />
              <Route path="/dashboard/:address" element={<DashBoardPage />} />
              <Route
                path="/createPosition/:token0/:token1/:address"
                element={<CreatePositionPage />}
              />

              <Route path="/positions" element={<PositionPage />} />
              <Route
                path="/positions/:token0/:token1/:market/:colFactor/:intRate/:nftId"
                element={<PositionPage />}
              />

              <Route
                path="/myPosition/:token0/:token1/:market/:colFactor/:intRate/:nftId"
                element={<MyPositionPage />}
              />
              <Route path="/myPosition" element={<MyPositionPage />} />
              <Route
                path="/removeLiquidity/:token0/:token1/:address/:colFactor/:intRate"
                element={<DecreaseLiquidityPage />}
              />
              <Route path="/MyNftPositions" element={<NftListPage />} />
              <Route
                path="/increaseLiquidity/:token0/:token1/:address"
                element={<IncreaseLiquidityPage />}
              />
              <Route path="/createMarket" element={<CreateNewMarketPage />} />
            </Routes>
          </Router>
        </Logic>
      </ConnectKitProvider>
    </WagmiConfig>
  );
}

export default App;
