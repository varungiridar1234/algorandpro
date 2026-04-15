/**
 * Algorand SDK Integration
 * Handles connection to Algorand testnet and transaction submission
 */

import algosdk from 'algosdk';

// Algorand Testnet Configuration
const ALGORAND_TESTNET_CONFIG = {
  server: 'https://testnet-api.algonode.cloud',
  port: '',
  token: '',
  network: 'testnet',
};

// Alternative testnet endpoints to try if primary fails
const ALTERNATIVE_TESTNET_ENDPOINTS = [
  'https://testnet-algorand.api.purestake.io/ps2',
  'https://testnet-algonode.algoexplorerapi.io',
];

// Initialize Algorand client with fallback support
export function getAlgorandClient() {
  const client = new algosdk.Algodv2(
    ALGORAND_TESTNET_CONFIG.token,
    ALGORAND_TESTNET_CONFIG.server,
    ALGORAND_TESTNET_CONFIG.port
  );
  return client;
}

/**
 * Send transaction to store risk data on blockchain
 * @param {string} senderAddress - Sender's Algorand address
 * @param {string} senderPrivateKey - Sender's private key (for testing only)
 * @param {object} data - Data to store (riskScore, yield, confidenceScore, etc.)
 * @returns {object} - Transaction ID and status
 */
export async function submitRiskDataToBlockchain(
  senderAddress,
  senderPrivateKey,
  data
) {
  try {
    // Validate inputs
    if (!senderAddress) {
      throw new Error('Sender address is required');
    }
    if (!senderPrivateKey) {
      throw new Error('Sender private key (mnemonic) is required');
    }

    const client = getAlgorandClient();

    // Get suggested params first (doesn't need account info)
    let suggestedParams;
    try {
      const paramsResponse = await client.getTransactionParams().do();
      
      console.log('DEBUG: Received raw suggestedParams:', {
        keys: paramsResponse ? Object.keys(paramsResponse) : null,
        type: paramsResponse?.constructor?.name,
        firstValid: paramsResponse?.firstValid,
        lastValid: paramsResponse?.lastValid,
        fee: paramsResponse?.fee?.toString(),
        genesisHash: paramsResponse?.genesisHash,
        genesisID: paramsResponse?.genesisID,
      });

      // The API response is already a TransactionSuggestedParams instance
      // Use it directly without remapping - the SDK expects this format
      if (!paramsResponse.firstValid && !paramsResponse.firstRound) {
        throw new Error('Missing round number from network response');
      }

      // Store the params object directly as returned from API
      suggestedParams = paramsResponse;

      console.log('DEBUG: TransactionSuggestedParams received from network:', {
        fee: suggestedParams.fee?.toString?.() || suggestedParams.fee,
        firstValid: suggestedParams.firstValid,
        lastValid: suggestedParams.lastValid,
        genesisID: suggestedParams.genesisID,
      });

    } catch (paramsError) {
      console.error('Error getting transaction params:', {
        message: paramsError.message,
        type: paramsError.constructor.name
      });
      throw new Error(`Failed to get transaction params: ${paramsError.message}`);
    }

    // Prepare transaction note with advanced risk data
    const txnNote = JSON.stringify({
      type: 'agri-risk-data-v2',
      timestamp: new Date().toISOString(),
      version: '2.0',
      data: {
        crop: data.cropType,
        rainfall: data.rainfall,
        temperature: data.temperature,
        soil: data.soilMoisture,
        landSize: data.landSize,
        yield: data.predictedYield,
        riskScore: data.riskScore,
        riskLevel: data.riskLevel,
        confidenceScore: data.confidenceScore,
        factors: data.factors,
        explanations: data.explanations,
        scenario: data.scenario || 'current',
      },
    });

    // Create transaction
    try {
      // Validate address format
      if (!senderAddress || senderAddress.length !== 58) {
        throw new Error(`Invalid address length: expected 58 characters, got ${senderAddress?.length}`);
      }

      console.log('DEBUG: Creating transaction with address:', senderAddress);

      // Create transaction params object for algosdk function
      const txnParams = {
        sender: senderAddress,                      // Must use "sender", NOT "from"!
        receiver: senderAddress,                    // Must use "receiver", NOT "to"!
        amount: 0,
        note: new TextEncoder().encode(txnNote),
        suggestedParams: suggestedParams            // Pass raw params directly
      };

      console.log('DEBUG: Transaction params:', {
        sender: txnParams.sender,
        receiver: txnParams.receiver,
        amount: txnParams.amount,
      });

      // Use the proper algosdk function to create the transaction
      const txn = algosdk.makePaymentTxnWithSuggestedParamsFromObject(txnParams);
      
      console.log('DEBUG: Transaction created successfully');
      
      // Get account info from mnemonic for signing
      const senderAccount = algosdk.mnemonicToSecretKey(senderPrivateKey);
      
      // Sign transaction
      const signedTxn = txn.signTxn(senderAccount.sk);

      console.log('DEBUG: Transaction signed successfully');

      // Submit transaction
      const response = await client.sendRawTransaction(signedTxn).do();

      console.log('DEBUG: sendRawTransaction response type:', typeof response);
      console.log('DEBUG: sendRawTransaction response:', response);
      console.log('DEBUG: response.txid =', response.txid);
      console.log('DEBUG: response.txId =', response.txId);
      console.log('DEBUG: Object.keys =', Object.keys(response));

      let txId;
      if (response.txid) {
        txId = response.txid;
      } else if (response.txId) {
        txId = response.txId;
      } else if (response.tx) {
        txId = response.tx;
      } else {
        // Try to parse if it's a string
        if (typeof response === 'string') {
          const parsed = JSON.parse(response);
          txId = parsed.txid || parsed.txId;
        }
      }

      if (!txId) {
        console.error('FATAL: Could not find txId in response:', {
          type: typeof response,
          keys: Object.keys(response),
          txid: response.txid,
          txId: response.txId,
          tx: response.tx,
          full: JSON.stringify(response)
        });
        throw new Error(`No txId in response: ${JSON.stringify(response)}`);
      }

      console.log('DEBUG: Successfully extracted txId:', txId);

      // Wait for confirmation (increased timeout for testnet)
      const confirmation = await algosdk.waitForConfirmation(
        client,
        txId,
        1000
      );

      return {
        success: true,
        txId: txId,
        round: confirmation['confirmed-round'],
        message: 'Data successfully stored on blockchain',
      };
    } catch (txError) {
      console.error('DEBUG: Transaction error:', {
        message: txError.message,
        code: txError.code
      });
      throw txError;
    }
  } catch (error) {
    return {
      success: false,
      error: error.message,
      message: 'Failed to submit data to blockchain',
    };
  }
}

/**
 * Get risk data from blockchain transaction
 * @param {string} txId - Transaction ID
 * @returns {object} - Retrieved data
 */
export async function getRiskDataFromBlockchain(txId) {
  try {
    const client = getAlgorandClient();
    const txnInfo = await client.pendingTransactionInformation(txId).do();

    if (txnInfo['txn']['txn']['note']) {
      const decodedNote = Buffer.from(
        txnInfo['txn']['txn']['note'],
        'base64'
      ).toString();
      return {
        success: true,
        data: JSON.parse(decodedNote),
      };
    }

    return {
      success: false,
      message: 'No data found in transaction',
    };
  } catch (error) {
    return {
      success: false,
      error: error.message,
    };
  }
}
