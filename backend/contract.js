const Web3 = require('web3');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

const RPC_URL = process.env.RPC_URL;
const PRIVATE_KEY = process.env.PRIVATE_KEY;
const CONTRACT_ADDRESS = process.env.CONTRACT_ADDRESS;

const ABI_PATH = path.join(__dirname, 'abi', 'DabbaSystem.json');
const abi = JSON.parse(fs.readFileSync(ABI_PATH)).abi;

// ✅ Fix: Use direct URL instead of HttpProvider object
const web3 = new Web3(RPC_URL);

const account = web3.eth.accounts.privateKeyToAccount(PRIVATE_KEY);
web3.eth.accounts.wallet.add(account);
web3.eth.defaultAccount = account.address;

const contract = new web3.eth.Contract(abi, CONTRACT_ADDRESS);

module.exports = { web3, contract, account };
