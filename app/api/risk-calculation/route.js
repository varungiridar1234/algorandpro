/**
 * API Route: Risk Calculation
 * Calculates risk score and predicted yield based on farmer inputs
 */

import { calculateRiskScore, calculateYield } from '@/lib/riskCalculation';
import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const { cropType, landSize, rainfall } = await request.json();

    // Validate inputs
    if (!cropType || !landSize || rainfall === undefined) {
      return NextResponse.json(
        {
          error: 'Missing required fields: cropType, landSize, rainfall',
        },
        { status: 400 }
      );
    }

    // Calculate risk and yield
    const riskData = calculateRiskScore(parseFloat(rainfall), parseFloat(landSize));
    const yield_amount = calculateYield(
      parseFloat(rainfall),
      parseFloat(landSize),
      cropType
    );

    if (!riskData) {
      return NextResponse.json(
        { error: 'Invalid input values' },
        { status: 400 }
      );
    }

    return NextResponse.json({
      success: true,
      riskScore: riskData.riskScore,
      riskLevel: riskData.riskLevel,
      predictedYield: yield_amount,
      cropType,
      landSize: parseFloat(landSize),
      rainfall: parseFloat(rainfall),
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal server error: ' + error.message },
      { status: 500 }
    );
  }
}
