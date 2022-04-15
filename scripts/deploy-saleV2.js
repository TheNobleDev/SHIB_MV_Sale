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

  const LOCKLEASHWRAPPER = constants.LOCKLEASHWRAPPER;
  const LOCKSHIBOSHIWRAPPER = constants.LOCKSHIBOSHIWRAPPER;
  const LANDREGISTRY = constants.LANDREGISTRY;
  const LANDAUCTIONV1 = constants.LANDAUCTIONV1;

  const signers = await ethers.getSigners();
  const deployer = signers[0];
  console.log("Deployer address:", deployer.address);

  const LandRegistry = await hre.ethers.getContractFactory("LandRegistry");
  const landRegistry = await LandRegistry.attach(LANDREGISTRY);

  const LandAuction = await hre.ethers.getContractFactory("LandAuction");
  const landAuction = await LandAuction.attach(LANDAUCTIONV1);

  
  const LandAuctionV2 = await hre.ethers.getContractFactory("LandAuctionV2");
  const landAuctionV2 = await LandAuctionV2.deploy(LANDAUCTIONV1, LANDREGISTRY, LOCKLEASHWRAPPER, LOCKSHIBOSHIWRAPPER);
  await landAuctionV2.deployed();
  console.log("LandAuctionV2 deployed to:", landAuctionV2.address);

  console.log("Waiting for 1 minutes before verifying the contracts");
  await new Promise(r => setTimeout(r, 60 * 1000));

  await hre.run("verify:verify", {
    address: landAuctionV2.address,
    constructorArguments: [
      LANDAUCTIONV1, LANDREGISTRY, LOCKLEASHWRAPPER, LOCKSHIBOSHIWRAPPER
    ],
  });
  console.log("LandAuctionV2 verified");

  let nonce = await ethers.provider.getTransactionCount(deployer.address);
  console.log("Deployer nonce:", nonce);
  console.log("");

  let MINTER_ROLE = await landRegistry.MINTER_ROLE();
  console.log("Minter role is", MINTER_ROLE);
  await landRegistry.grantRole(MINTER_ROLE, landAuctionV2.address, {nonce: nonce++});
  console.log("Minter role granted to LandAuctionV2 contract");
  return;
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
