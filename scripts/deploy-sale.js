// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
const hre = require("hardhat");
const { Addresses } = require("../constants");
var fs = require('fs');

async function setupMap(landAuction) {

  // ---tier4----
  console.log("Starting tier4");
  await landAuction.setGridVal(-96,99,96,-99, 1);

  // ---tier3----
  console.log("Starting tier3");
  await landAuction.setGridVal(-46,71,46,-71, 1);

  // ---tier2----
  console.log("Starting tier2");
  await landAuction.setGridVal(-21,63,21,-63, 1);
  await landAuction.setGridVal(-15,99,15,69, 2);
  await landAuction.setGridVal(47,79,77,49, 2);
  await landAuction.setGridVal(66,15,96,-15, 2);
  await landAuction.setGridVal(47,-49,77,-79, 2);
  await landAuction.setGridVal(-15,-69,15,-99, 2);
  await landAuction.setGridVal(-77,-49,-47,-79, 2);
  await landAuction.setGridVal(-96,15,-66,-15, 2);
  await landAuction.setGridVal(-77,79,-47,49, 2);

  // ---tier1----
  console.log("Starting tier1");
  await landAuction.setGridVal(-9,50,9,32, 1);
  await landAuction.setGridVal(-13,13,13,-13, 1);
  await landAuction.setGridVal(-9,-32,9,-50, 1);
  await landAuction.setGridVal(-13,97,13,71, 1);
  await landAuction.setGridVal(49,77,75,51, 1);
  await landAuction.setGridVal(68,13,94,-13, 1);
  await landAuction.setGridVal(49,-51,75,-77, 1);
  await landAuction.setGridVal(-13,-71,13,-97, 1);
  await landAuction.setGridVal(-75,-51,-49,-77, 1);
  await landAuction.setGridVal(-94,13,-68,-13, 1);
  await landAuction.setGridVal(-75,77,-49,51, 1);

  // ---roads----
  console.log("Starting roads");
  await landAuction.setGridVal(-7,48,7,34, 1);
  await landAuction.setGridVal(-11,11,11,-11, 1);
  await landAuction.setGridVal(-7,-34,7,-48, 1);
  await landAuction.setGridVal(-11,95,11,73, 1);
  await landAuction.setGridVal(51,75,73,53, 1);
  await landAuction.setGridVal(70,11,92,-11, 1);
  await landAuction.setGridVal(51,-53,73,-75, 1);
  await landAuction.setGridVal(-11,-73,11,-95, 1);
  await landAuction.setGridVal(-73,-53,-51,-75, 1);
  await landAuction.setGridVal(-92,11,-70,-11, 1);
  await landAuction.setGridVal(-73,75,-51,53, 1);
  await landAuction.setGridVal(-50,64,50,64, 4);
  await landAuction.setGridVal(-69,0,69,0, 4);
  await landAuction.setGridVal(-50,-64,50,-64, 4);
  await landAuction.setGridVal(-62,52,-62,1, 4);
  await landAuction.setGridVal(-62,-1,-62,-52, 4);
  await landAuction.setGridVal(-22,63,-22,1, 4);
  await landAuction.setGridVal(-22,-1,-22,-63, 4);
  await landAuction.setGridVal(0,72,0,65, 4);
  await landAuction.setGridVal(0,63,0,49, 4);
  await landAuction.setGridVal(0,33,0,12, 4);
  await landAuction.setGridVal(0,-12,0,-33, 4);
  await landAuction.setGridVal(0,-49,0,-63, 4);
  await landAuction.setGridVal(0,-65,0,-72, 4);
  await landAuction.setGridVal(22,63,22,1, 4);
  await landAuction.setGridVal(22,-1,22,-63, 4);
  await landAuction.setGridVal(62,52,62,1, 4);
  await landAuction.setGridVal(62,-1,62,-52, 4);

  // ---reserved lands----
  console.log("Starting reserved lands");
  await landAuction.setGridVal(12,4,12,1, 1);
  await landAuction.setGridVal(12,-1,12,-4, 1);
  await landAuction.setGridVal(1,-12,1,-12, 1);
  await landAuction.setGridVal(1,12,2,12, 1);
  await landAuction.setGridVal(-1,12,-1,12, 1);
  await landAuction.setGridVal(-1,-33,-1,-33, 1);
  await landAuction.setGridVal(1,-33,1,-33, 1);
  await landAuction.setGridVal(1,33,1,33, 1);

  // tier 4 : 1
  // tier 3 : 2
  // tier 2 : 3
  // tier 1 : 4
  // roads  : 5
  // hubs   : 5

  let pointOneETH = ethers.utils.parseUnits("1", 18).div(10);

  await landAuction.setPriceOfCategory(1, pointOneETH.mul(2));
  await landAuction.setPriceOfCategory(2, pointOneETH.mul(3));
  await landAuction.setPriceOfCategory(3, pointOneETH.mul(5));
  await landAuction.setPriceOfCategory(4, pointOneETH.mul(10));

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

  const LandRegistry = await hre.ethers.getContractFactory("LandRegistry");
  const landRegistry = await hre.upgrades.deployProxy(LandRegistry, { kind: 'uups', timeout: 0 });
  await landRegistry.deployed();
  console.log("LandRegistry deployed to:", landRegistry.address);

  console.log("Waiting for 1 minute before getting the implementation address");
  await new Promise(r => setTimeout(r, 60 * 1000));

  const implementationAddress = await hre.upgrades.erc1967.getImplementationAddress(landRegistry.address);
  console.log("Implementation address is:", implementationAddress);

  const LandAuction = await hre.ethers.getContractFactory("LandAuction");
  const landAuction = await LandAuction.deploy(WETH, landRegistry.address, LOCKLEASH, LOCKSHIBOSHI);

  console.log("LandAuction deployed to:", landAuction.address);

  await landAuction.deployed();

  console.log("Waiting for 1 minute before verifying the contracts");
  await new Promise(r => setTimeout(r, 60 * 1000));

  await hre.run("verify:verify", {
    address: implementationAddress,
    constructorArguments: [],
  });

  console.log("Implementation verified");

  await hre.run("verify:verify", {
    address: landAuction.address,
    constructorArguments: [WETH, landRegistry.address, LOCKLEASH, LOCKSHIBOSHI],
  });

  console.log("Land Auction verified");

  await setupMap(landAuction);
  return;
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
