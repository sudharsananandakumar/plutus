const Plutus = artifacts.require("Plutus");

module.exports = function(deployer) {
    deployer.deploy(Plutus);
};