// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const hre =require("hardhat")

async function main() {
  
  const tokenAdd="0x5722f59ceAa2B3a121F497557cE7e790A95Cd749"
  
  //const Token = await hre.ethers.getContractFactory("erc20");
 // const token=await Token.deploy()
 // await token.waitForDeployment();
  const Lock = await hre.ethers.getContractFactory("Staking");
  const lock=await Lock.deploy(tokenAdd)
  await lock.waitForDeployment();

 // console.log("Token Contract is ", await token.getAddress());
  console.log("Staking Contract is ", await lock.getAddress());
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
