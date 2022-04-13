// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
const hre = require("hardhat");
const { Addresses } = require("../constants");
var fs = require('fs');

async function setupMap(landAuction, nonce) {

  // ---tier4----
  console.log("Starting tier4");
  await landAuction.setGridVal(-96,99,96,-99, 1, {nonce: nonce++});

  // ---tier3----
  console.log("Starting tier3");
  await landAuction.setGridVal(-46,71,46,-71, 1, {nonce: nonce++});

  // ---tier2----
  console.log("Starting tier2");
  await landAuction.setGridVal(-21,63,21,-63, 1, {nonce: nonce++});
  await landAuction.setGridVal(-15,99,15,69, 2, {nonce: nonce++});
  await landAuction.setGridVal(47,79,77,49, 2, {nonce: nonce++});
  await landAuction.setGridVal(66,15,96,-15, 2, {nonce: nonce++});
  await landAuction.setGridVal(47,-49,77,-79, 2, {nonce: nonce++});
  await landAuction.setGridVal(-15,-69,15,-99, 2, {nonce: nonce++});
  await landAuction.setGridVal(-77,-49,-47,-79, 2, {nonce: nonce++});
  await landAuction.setGridVal(-96,15,-66,-15, 2, {nonce: nonce++});
  await landAuction.setGridVal(-77,79,-47,49, 2, {nonce: nonce++});

  // ---tier1----
  console.log("Starting tier1");
  await landAuction.setGridVal(-9,50,9,32, 1, {nonce: nonce++});
  await landAuction.setGridVal(-13,13,13,-13, 1, {nonce: nonce++});
  await landAuction.setGridVal(-9,-32,9,-50, 1, {nonce: nonce++});
  await landAuction.setGridVal(-13,97,13,71, 1, {nonce: nonce++});
  await landAuction.setGridVal(49,77,75,51, 1, {nonce: nonce++});
  await landAuction.setGridVal(68,13,94,-13, 1, {nonce: nonce++});
  await landAuction.setGridVal(49,-51,75,-77, 1, {nonce: nonce++});
  await landAuction.setGridVal(-13,-71,13,-97, 1, {nonce: nonce++});
  await landAuction.setGridVal(-75,-51,-49,-77, 1, {nonce: nonce++});
  await landAuction.setGridVal(-94,13,-68,-13, 1, {nonce: nonce++});
  await landAuction.setGridVal(-75,77,-49,51, 1, {nonce: nonce++});

  // ---roads----
  console.log("Starting roads");
  await landAuction.setGridVal(-7,48,7,34, 1, {nonce: nonce++});
  await landAuction.setGridVal(-11,11,11,-11, 1, {nonce: nonce++});
  await landAuction.setGridVal(-7,-34,7,-48, 1, {nonce: nonce++});
  await landAuction.setGridVal(-11,95,11,73, 1, {nonce: nonce++});
  await landAuction.setGridVal(51,75,73,53, 1, {nonce: nonce++});
  await landAuction.setGridVal(70,11,92,-11, 1, {nonce: nonce++});
  await landAuction.setGridVal(51,-53,73,-75, 1, {nonce: nonce++});
  await landAuction.setGridVal(-11,-73,11,-95, 1, {nonce: nonce++});
  await landAuction.setGridVal(-73,-53,-51,-75, 1, {nonce: nonce++});
  await landAuction.setGridVal(-92,11,-70,-11, 1, {nonce: nonce++});
  await landAuction.setGridVal(-73,75,-51,53, 1, {nonce: nonce++});
  await landAuction.setGridVal(-50,64,50,64, 4, {nonce: nonce++});
  await landAuction.setGridVal(-69,0,69,0, 4, {nonce: nonce++});
  await landAuction.setGridVal(-50,-64,50,-64, 4, {nonce: nonce++});
  await landAuction.setGridVal(-62,52,-62,1, 4, {nonce: nonce++});
  await landAuction.setGridVal(-62,-1,-62,-52, 4, {nonce: nonce++});
  await landAuction.setGridVal(-22,63,-22,1, 4, {nonce: nonce++});
  await landAuction.setGridVal(-22,-1,-22,-63, 4, {nonce: nonce++});
  await landAuction.setGridVal(0,72,0,65, 4, {nonce: nonce++});
  await landAuction.setGridVal(0,63,0,49, 4, {nonce: nonce++});
  await landAuction.setGridVal(0,33,0,12, 4, {nonce: nonce++});
  await landAuction.setGridVal(0,-12,0,-33, 4, {nonce: nonce++});
  await landAuction.setGridVal(0,-49,0,-63, 4, {nonce: nonce++});
  await landAuction.setGridVal(0,-65,0,-72, 4, {nonce: nonce++});
  await landAuction.setGridVal(22,63,22,1, 4, {nonce: nonce++});
  await landAuction.setGridVal(22,-1,22,-63, 4, {nonce: nonce++});
  await landAuction.setGridVal(62,52,62,1, 4, {nonce: nonce++});
  await landAuction.setGridVal(62,-1,62,-52, 4, {nonce: nonce++});

  // ---reserved lands----
  console.log("Starting reserved lands");
  await landAuction.setGridVal(12,4,12,1, 1, {nonce: nonce++});
  await landAuction.setGridVal(12,-1,12,-4, 1, {nonce: nonce++});
  await landAuction.setGridVal(1,-12,1,-12, 1, {nonce: nonce++});
  await landAuction.setGridVal(1,12,2,12, 1, {nonce: nonce++});
  await landAuction.setGridVal(-1,12,-1,12, 1, {nonce: nonce++});
  await landAuction.setGridVal(-1,-33,-1,-33, 1, {nonce: nonce++});
  await landAuction.setGridVal(1,-33,1,-33, 1, {nonce: nonce++});
  await landAuction.setGridVal(1,33,1,33, 1, {nonce: nonce++});

  // tier 4 : 1
  // tier 3 : 2
  // tier 2 : 3
  // tier 1 : 4
  // roads  : 5
  // hubs   : 5

  let pointOneETH = ethers.utils.parseUnits("1", 18).div(10);

  await landAuction.setPriceOfCategory(1, pointOneETH.mul(2), {nonce: nonce++});
  await landAuction.setPriceOfCategory(2, pointOneETH.mul(3), {nonce: nonce++});
  await landAuction.setPriceOfCategory(3, pointOneETH.mul(5), {nonce: nonce++});
  await landAuction.setPriceOfCategory(4, pointOneETH.mul(10), {nonce: nonce++});

  console.log("Map is setup");
}

async function main() {
  const constants = Addresses[network.name];

  const LEASH = constants.LEASH;
  const BONE = constants.BONE;
  const SHIBOSHI = constants.SHIBOSHI;
  const WETH = constants.WETH;
  const LOCKLEASH = constants.LOCKLEASH;
  const LOCKSHIBOSHI = constants.LOCKSHIBOSHI;

  const signers = await ethers.getSigners();
  const deployer = signers[0];
  console.log("Deployer address:", deployer.address);

  const LandRegistry = await hre.ethers.getContractFactory("LandRegistry");
  const landRegistry = await LandRegistry.attach("0xEfAEd650f1a94801806BB110019d9B0dc79531A8");

  const LandAuction = await hre.ethers.getContractFactory("LandAuction");
  const landAuction = await LandAuction.attach("0x9ed0F787223FF1FeB0cFB33a9207c646d182E918");

  let nonce = await ethers.provider.getTransactionCount(deployer.address);
  console.log("Deployer nonce:", nonce);
  console.log("");

  let MINTER_ROLE = await landRegistry.MINTER_ROLE();
  console.log("Minter role is", MINTER_ROLE);
  await landRegistry.grantRole(MINTER_ROLE, landAuction.address, {nonce: nonce++});
  console.log("Minter role granted");

  await setupMap(landAuction, nonce);
  return;
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
