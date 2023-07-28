
require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: {
    version: "0.8.9",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
        
      },
    },
  },
  defaultNetwork:"goerli",
  networks:{
    hardhat:{},
    goerli:{
      url:"https://goerli.infura.io/v3/",//add your project id here
      accounts:[""],//your private key
    }
  },
  paths:{
    sources:'./contracts',
    cache:'./cache',
    tests:'./test',
    artifacts:'./artifacts'
  }
};
