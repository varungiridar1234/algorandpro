/**
 * API Route: Blockchain Submission
 * Submits risk data to Algorand testnet
 */

import { submitRiskDataToBlockchain } from '@/lib/algorand';
import { NextResponse } from 'next/server';
import algosdk from 'algosdk';

export async function POST(request) {
  try {
    const { riskScore, riskLevel, predictedYield, cropType, senderAddress } =
      await request.json();

    console.log('DEBUG POST /api/blockchain:', {
      senderAddress,
      senderAddressType: typeof senderAddress,
      riskScore,
      riskLevel
    });

    // Validate sender address
    if (!senderAddress || typeof senderAddress !== 'string' || senderAddress.trim() === '') {
      return NextResponse.json(
        { error: 'Valid Algorand address is required' },
        { status: 400 }
      );
    }

    // Get funded testnet account mnemonic from environment
    const algorandMnemonic = process.env.ALGORAND_MNEMONIC;
    if (!algorandMnemonic) {
      return NextResponse.json(
        { error: 'Blockchain configuration missing' },
        { status: 500 }
      );
    }

    const data = {
      riskScore,
      riskLevel,
      predictedYield,
      cropType,
      timestamp: new Date().toISOString(),
    };

    // Try to submit to actual Algorand testnet
    try {
      const result = await submitRiskDataToBlockchain(
        senderAddress.trim(),
        algorandMnemonic,
        data
      );

      if (result.success) {
        return NextResponse.json({
          success: true,
          txId: result.txId,
          txid: result.txId,
          round: result.round,
          message: result.message,
          address: senderAddress.trim(),
        });
      } else {
        throw new Error(result.error || 'Blockchain submission failed');
      }
    } catch (blockchainError) {
      console.error('Blockchain submission error:', blockchainError.message);
      
      // Return the actual error for debugging
      return NextResponse.json(
        { 
          error: 'Failed to submit to blockchain: ' + blockchainError.message,
          code: 'BLOCKCHAIN_ERROR'
        },
        { status: 400 }
      );
    }
  } catch (error) {
    console.error('POST /api/blockchain error:', error);
    return NextResponse.json(
      { error: 'Failed to process blockchain request: ' + error.message },
      { status: 500 }
    );
  }
}

// GET endpoint to retrieve test address
export async function GET(request) {
  try {
    // Get funded testnet account mnemonic from environment
    const algorandMnemonic = process.env.ALGORAND_MNEMONIC;
    if (!algorandMnemonic) {
      return NextResponse.json(
        { error: 'Blockchain configuration missing' },
        { status: 500 }
      );
    }

    // Derive account from mnemonic to get valid address
    try {
      const accountInfo = algosdk.mnemonicToSecretKey(algorandMnemonic);
      const testAddress = accountInfo.addr.toString();

      return NextResponse.json({
        success: true,
        address: testAddress,
        message: 'Valid Algorand testnet account address',
      });
    } catch (derivationError) {
      console.error('Error deriving address:', derivationError.message);
      return NextResponse.json(
        { error: 'Could not derive address from mnemonic' },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('GET /api/blockchain error:', error);
    return NextResponse.json(
      { error: 'Failed to retrieve address: ' + error.message },
      { status: 500 }
    );
  }
}
