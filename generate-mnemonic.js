const algosdk = require('algosdk');

// Generate a valid test account
const account = algosdk.generateAccount();
const mnemonic = algosdk.secretKeyToMnemonic(account.sk);

console.log('ALGORAND_MNEMONIC=' + mnemonic);
