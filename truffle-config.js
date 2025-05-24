module.exports = {
  networks: {
    development: {
      host: "127.0.0.1",     // Ganache RPC server
      port: 7545,            // Ganache default port (GUI)
      network_id: 5777,       // Match any network id
    }
  },

  compilers: {
    solc: {
      version: "0.8.6",      // Match your Solidity version
    }
  }
};
