import { time } from "@nomicfoundation/hardhat-network-helpers";
import { ethers } from "hardhat";
const helpers = require("@nomicfoundation/hardhat-network-helpers");

async function main() {
  const [deployer, caller] = await ethers.getSigners();
  const DaiToken = "0x1AF3F329e8BE154074D8769D1FFa4eE058B1DBc3";
  const CakeToken = "0x0E09FaBB73Bd3Ade0a17ECC321fD13a19e81cE82";
  const IFO = await ethers.getContractFactory("IFO");
  const ifo = await IFO.deploy();

  await ifo.deployed();

  console.log(`IFO deployed at ${ifo.address}`);

  const currentBlockNumber = await (
    await ethers.provider.getBlock("latest")
  ).number;
  const endBlock =
    (await (await ethers.provider.getBlock(currentBlockNumber)).number) + 2;
  //getting current block number
  console.log(`Current block number = ${currentBlockNumber}`);
  //getting supposed end block number
  console.log(`Supposed end block number = ${endBlock}`);

  //calling initialize function
  const offerAmount = ethers.utils.parseUnits("18", 1000);
  const raiseAmount = ethers.utils.parseUnits("18", 2000);

  await ifo.initialize(
    DaiToken,
    CakeToken,
    currentBlockNumber,
    endBlock,
    offerAmount,
    raiseAmount,
    deployer.address
  );

  //////////////SKIPPING TIME/////////////////
  const currentTime = await time.latest();
  console.log("Your old time is\n", currentTime);
  await time.increaseTo(currentTime + 1665593228);
  const newCurrentTime = await time.latest();
  console.log("Your new time is\n", newCurrentTime);
  //getting block number after time skip
  console.log(
    `Current block number = ${await (
      await ethers.provider.getBlock("latest")
    ).number}`
  );
  await ifo.deposit("5000000000000000000");
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
