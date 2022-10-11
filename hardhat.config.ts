import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";

const config: HardhatUserConfig = {
  solidity: "0.6.12",
  networks: {
    hardhat: {
      forking: {
        url: "https://eth-mainnet.g.alchemy.com/v2/ki5b66ScFmtc3mqVqjHH-NwWwA_8q1-x",
      },
    },
  },
};

export default config;
