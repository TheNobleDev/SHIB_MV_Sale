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
  const LANDAUCTIONV1 = constants.LANDAUCTIONV1;
  const LANDAUCTIONV2 = constants.LANDAUCTIONV2;

  const XFUNDROUTER = constants.XFUNDROUTER;
  const XFUNDTOKEN = constants.XFUNDTOKEN;

  let SHIB;

  const signers = await ethers.getSigners();
  const deployer = signers[0];
  console.log("Deployer address:", deployer.address);

  const LandRegistry = await hre.ethers.getContractFactory("contracts/LandRegistryV3.sol:LandRegistry");
  const landRegistry = await LandRegistry.attach(LANDREGISTRY);

  const LandAuction = await hre.ethers.getContractFactory("LandAuction");
  const landAuction = await LandAuction.attach(LANDAUCTIONV1);

  if(network.name == "rinkeby") {
    const Shib = await hre.ethers.getContractFactory("Shib");
    const shib = await Shib.deploy();

    SHIB = shib.address;
  } else {
    SHIB = constants.SHIB;
  }

  const LandAuctionV3 = await hre.ethers.getContractFactory("LandAuctionV3");
  const landAuctionV3 = await LandAuctionV3.deploy(
    SHIB,
    LANDAUCTIONV1,
    LANDAUCTIONV2,
    LANDREGISTRY,
    XFUNDROUTER,
    XFUNDTOKEN
  );
  await landAuctionV3.deployed();
  console.log("LandAuctionV3 deployed to:", landAuctionV3.address);

  console.log("Waiting for 1 minutes before verifying the contracts");
  await new Promise(r => setTimeout(r, 60 * 1000));

  if(network.name == "rinkeby") {
    await hre.run("verify:verify", {
      address: SHIB,
      constructorArguments: [],
    });
    console.log("Shib verified");
  }

  await hre.run("verify:verify", {
    address: landAuctionV3.address,
    constructorArguments: [
    SHIB, LANDAUCTIONV1, LANDAUCTIONV2, LANDREGISTRY, XFUNDROUTER, XFUNDTOKEN
    ],
  });
  console.log("LandAuctionV3 verified");

  let nonce = await ethers.provider.getTransactionCount(deployer.address);
  console.log("Deployer nonce:", nonce);
  console.log("");

  let MINTER_ROLE = await landRegistry.MINTER_ROLE();
  console.log("Minter role is", MINTER_ROLE);
  await landRegistry.grantRole(MINTER_ROLE, landAuctionV3.address, {nonce: nonce++});
  console.log("Minter role granted to LandAuctionV3 contract");

  await landAuctionV3.increaseRouterAllowance("115792089237316195423570985008687907853269984665640564039457584007913129639935", {nonce: nonce++});
  console.log("Set router allowance in LandAuctionV3 contract");
  return;
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
