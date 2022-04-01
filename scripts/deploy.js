// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
const hre = require("hardhat");
const { Addresses } = require("../constants");

async function main() {
  const constants = Addresses[network.name];
  const LEASH = constants.LEASH;
  const BONE = constants.BONE;
  const SHIBOSHI = constants.SHIBOSHI;

  const LockLeash = await hre.ethers.getContractFactory("LockLeash");
  const LockShiboshi = await hre.ethers.getContractFactory("LockShiboshi");

  const lowAmount = ethers.utils.parseUnits("1", 18).div(5);
  const highAmount = ethers.utils.parseUnits("5", 18);

  const lockLeash = await LockLeash.deploy(LEASH, BONE, lowAmount, highAmount, 45, 90);
  await lockLeash.deployed();
  console.log("LockLeash deployed to:", lockLeash.address);

  const lockShiboshi = await LockShiboshi.deploy(SHIBOSHI, 1, 10, 45, 90);
  await lockShiboshi.deployed();
  console.log("LockShiboshi deployed to:", lockShiboshi.address);

  console.log("Waiting for 1 minute before verifying the contracts");
  await new Promise(r => setTimeout(r, 60 * 1000));

  await hre.run("verify:verify", {
    address: lockLeash.address,
    constructorArguments: [
      LEASH, BONE, lowAmount, highAmount, 45, 90
    ],
  });

  console.log("LockLeash verified");

  await hre.run("verify:verify", {
    address: lockShiboshi.address,
    constructorArguments: [
      SHIBOSHI, 1, 10, 45, 90
    ],
  });
  console.log("LockShiboshi verified");
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
