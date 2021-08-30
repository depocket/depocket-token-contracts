const { deployProxy } = require('@openzeppelin/truffle-upgrades');
const DePocket = artifacts.require("DePocket");

module.exports = async function (deployer) {
  const instance = await deployProxy(DePocket, ["DePocket Token", "DEPO", "21000000000000000000000000", 18], { deployer });
  
  console.log('Deployed', instance.address);
};
