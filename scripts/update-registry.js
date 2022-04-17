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
  const LANDREGISTRY = constants.LANDREGISTRY;

  const signers = await ethers.getSigners();
  const deployer = signers[0];
  console.log("Deployer address:", deployer.address);

  const LandRegistry = await hre.ethers.getContractFactory("contracts\\LandRegistryV3.sol:LandRegistry");

  await upgrades.upgradeProxy(LANDREGISTRY, LandRegistry);
  console.log("Upgraded the LandRegistry contract");

  const landRegistry = await LandRegistry.attach(LANDREGISTRY);

  console.log("Waiting for 1 minute before verifying the contracts");
  await new Promise(r => setTimeout(r, 60 * 1000));

  const implementationAddress = await hre.upgrades.erc1967.getImplementationAddress(landRegistry.address);
  console.log("Implementation address is:", implementationAddress);

  await hre.run("verify:verify", {
    address: implementationAddress,
    constructorArguments: [],
  });
  console.log("Implementation verified");

  return;
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
