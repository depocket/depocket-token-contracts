const HDWalletProvider = require('@truffle/hdwallet-provider');
const mnemonic = require('./.secret.json');

const fs = require('fs');

module.exports = {
  networks: {
    development: {
      host: "127.0.0.1",     // Localhost (default: none)
      port: 8545,            // Standard BSC port (default: none)
      network_id: "*",       // Any network (default: none)
    },
    testnet: {
      provider: () => new HDWalletProvider(mnemonic.testnet, `https://data-seed-prebsc-1-s2.binance.org:8545`),
      network_id: 97,
      confirmations: 10,
      timeoutBlocks: 400,
      skipDryRun: true
    },
    bsc: {
      provider: () => new HDWalletProvider(mnemonic.bsc, `https://bsc-dataseed1.binance.org`),
      network_id: 56,
      confirmations: 15,
      timeoutBlocks: 400,
      skipDryRun: true
    },
  },

  compilers: {
    solc: {
      version: "0.8.6"
    }
  },

  db: {
    enabled: false
  },
  plugins: [
    'truffle-plugin-verify'
  ],
  api_keys: {
    bscscan: "ZDFPQFY2R498EXKG6TCW5ZWNNFQYH3EZBA"
  }
};
