// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
const hre = require("hardhat");
const { Addresses } = require("../constants");
var fs = require('fs');

async function main() {
  const constants = Addresses[network.name];

  const signers = await ethers.getSigners();
  const deployer = signers[0];
  console.log("Deployer address:", deployer.address);

  const LandAuction = await hre.ethers.getContractFactory("LandAuction");
  const landAuction = await LandAuction.attach("0x9ed0F787223FF1FeB0cFB33a9207c646d182E918");

  let nonce = await ethers.provider.getTransactionCount(deployer.address);
  console.log("Setter nonce:", nonce);
  console.log("");

  
  console.log("Starting fixes");
  await landAuction.setGridVal(-15,-69, 15, -71, -1, {nonce: nonce++});
  await landAuction.setGridVal(0,-69, 0, -71, 1, {nonce: nonce++});
  await landAuction.setGridVal(-15,71, 15, 69, -1, {nonce: nonce++});
  await landAuction.setGridVal(0,71, 0, 69, 1, {nonce: nonce++});
  console.log("Done");
  return;
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
