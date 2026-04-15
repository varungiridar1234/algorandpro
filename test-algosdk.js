/**
 * Clean Working Example: Send Transaction with Algorand SDK
 * 
 * This script demonstrates how to:
 * 1. Convert mnemonic to account
 * 2. Create a payment transaction
 * 3. Sign and submit to testnet
 * 4. Wait for confirmation
 */

const algosdk = require('algosdk');

// Configuration
const TESTNET_SERVER = 'https://testnet-api.algonode.cloud';
const TESTNET_PORT = '';
const TESTNET_TOKEN = '';

// Your mnemonic from .env.local
const MNEMONIC = 'poet gown piano floor equip taxi organ equal divert quarter buffalo smoke discover ask forget depart dad age language matrix side virus armor absent present';

/**
 * Main execution function
 */
async function main() {
  try {
    console.log('=== Algorand Transaction Test ===\n');

    // Step 1: Create client
    console.log('1. Creating Algorand client...');
    const client = new algosdk.Algodv2(TESTNET_TOKEN, TESTNET_SERVER, TESTNET_PORT);
    console.log('✓ Client created\n');

    // Step 2: Convert mnemonic to account
    console.log('2. Converting mnemonic to account...');
    let accountInfo;
    try {
      accountInfo = algosdk.mnemonicToSecretKey(MNEMONIC);
    } catch (err) {
      throw new Error(`Failed to convert mnemonic: ${err.message}`);
    }
    
    const senderAddress = String(accountInfo.addr);
    const senderSecretKey = accountInfo.sk;
    
    console.log(`✓ Account derived`);
    console.log(`  Address: ${senderAddress}`);
    console.log(`  Address length: ${senderAddress.length} chars\n`);

    if (!senderAddress || senderAddress.length !== 58) {
      throw new Error(`Invalid address: expected 58 chars, got ${senderAddress?.length}`);
    }

    // Step 3: Get transaction params from network
    console.log('3. Getting suggested transaction params from network...');
    let params;
    try {
      params = await client.getTransactionParams().do();
      
      // Ensure fee is set correctly (use minFee if fee is 0)
      if (!params.fee || params.fee === 0n || params.fee === 0) {
        params.fee = params.minFee;
      }
    } catch (err) {
      throw new Error(`Failed to get params: ${err.message}`);
    }
    
    console.log(`✓ Params received`);
    console.log(`  First round: ${params.firstValid || params.firstRound}`);
    console.log(`  Last round: ${params.lastValid || params.lastRound}`);
    console.log(`  Fee: ${params.fee}\n`);

    // Step 4: Create note (JSON data)
    console.log('4. Creating transaction note...');
    const noteData = {
      risk: 72,
      yield: 4.5,
      message: 'AgriRisk'
    };
    
    // Encode note as UTF-8 bytes
    const noteBytes = new TextEncoder().encode(JSON.stringify(noteData));
    console.log(`✓ Note created: ${JSON.stringify(noteData)}`);
    console.log(`  Note bytes: ${noteBytes.length} bytes\n`);

    // Step 5: Create transaction 
    console.log('5. Creating payment transaction...');
    let txn;
    try {
      // Use makePaymentTxnWithSuggestedParamsFromObject with correct field names
      txn = algosdk.makePaymentTxnWithSuggestedParamsFromObject({
        sender: senderAddress,        // NOT "from" - must be "sender"!
        receiver: senderAddress,      // NOT "to" - must be "receiver"!
        amount: 1000,                 // 1000 microAlgos
        note: noteBytes,              // Note as bytes
        suggestedParams: params       // Pass raw params directly
      });
    } catch (err) {
      console.error('Transaction creation error:', err.message);
      throw err;
    }
    
    console.log(`✓ Transaction created`);
    console.log(`  Type: Payment`);
    console.log(`  From: ${txn.sender || txn.from}`);
    console.log(`  To: ${txn.receiver || txn.to}`);
    console.log(`  Amount: ${txn.amount} microAlgos\n`);

    // Step 6: Sign the transaction
    console.log('6. Signing transaction...');
    let signedTxn;
    try {
      signedTxn = txn.signTxn(senderSecretKey);
    } catch (err) {
      throw new Error(`Failed to sign transaction: ${err.message}`);
    }
    
    console.log(`✓ Transaction signed\n`);

    // Step 7: Submit to network
    console.log('7. Submitting transaction to testnet...');
    let txId;
    try {
      const response = await client.sendRawTransaction(signedTxn).do();
      txId = response.txId;
    } catch (err) {
      throw new Error(`Failed to send transaction: ${err.message}`);
    }
    
    console.log(`✓ Transaction submitted`);
    console.log(`  Transaction ID: ${txId}\n`);

    // Step 8: Wait for confirmation
    console.log('8. Waiting for confirmation...');
    let confirmedTxn;
    try {
      confirmedTxn = await algosdk.waitForConfirmation(client, txId, 10);
    } catch (err) {
      throw new Error(`Failed waiting for confirmation: ${err.message}`);
    }
    
    console.log(`✓ Transaction confirmed!`);
    console.log(`  Confirmed round: ${confirmedTxn['confirmed-round']}`);
    console.log(`  Transaction ID: ${txId}`);
    console.log(`\n✓ SUCCESS - Transaction completed!\n`);

    // Step 9: Display explorer link
    console.log('View transaction:');
    console.log(`https://lora.algoindex.org/tx/${txId}`);

  } catch (error) {
    console.error('\n❌ ERROR:', error.message);
    console.error('Stack:', error.stack);
    process.exit(1);
  }
}

// Run the script
main();
