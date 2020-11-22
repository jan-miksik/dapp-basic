require("dotenv").config({ path: "./.env" });
const HDWalletProvider = require("truffle-hdwallet-provider-privkey");
const MetaMaskAccountIndex = 0;

const privateKey = process.env.PRIVATE_KEY;
const endpointUrl =
  "https://kovan.infura.io/v3/8c60776a21764e3d8f267e5b4a427332";

module.exports = {
  contracts_build_directory: "./src/abis/",
  networks: {
    development: {
      port: 7545,
      network_id: "*",
      host: "127.0.0.1",
    },
    kovan: {
      provider: function () {
        return new HDWalletProvider(
          //private keys array
          [privateKey],
          //url to ethereum node
          endpointUrl
        );
      },
      gas: 5000000,
      gasPrice: 25000000000,
      network_id: 42,
    },
    // ganache_local: {
    //   provider: function () {
    //     return new HDWalletProvider(
    //       `${process.env.MNEMONIC}`,
    //       'http://127.0.0.1:7545',
    //       MetaMaskAccountIndex,
    //     )
    //   },
    //   network_id: 5777,
    // },
    // goerli_infura: {
    //   provider: function () {
    //     return new HDWalletProvider(
    //       `${process.env.MNEMONIC}`,
    //       'https://goerli.infura.io/v3/a5c2bfdeeea04325b0a804121cea03f5',
    //       MetaMaskAccountIndex,
    //     )
    //   },
    //   network_id: 5,
    // },
    // ropsten_infura: {
    //   provider: function () {
    //     return new HDWalletProvider(
    //       `${process.env.MNEMONIC}`,
    //       'https://ropsten.infura.io/v3/a5c2bfdeeea04325b0a804121cea03f5',
    //       MetaMaskAccountIndex,
    //     )
    //   },
    //   network_id: 3,
    // },
  },
  compilers: {
    solc: {
      version: ">=0.7.0",
    },
  },
};
