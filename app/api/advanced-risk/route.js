/**
 * API Route: Advanced Risk Calculation
 * Calculates advanced risk score with multiple factors, confidence, and explanations
 */

import { generateRiskSummary } from '@/lib/advancedRiskCalculation';
import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const { cropType, landSize, rainfall, temperature, soilMoisture } = await request.json();

    // Validate inputs
    if (!cropType || !landSize || rainfall === undefined || temperature === undefined || soilMoisture === undefined) {
      return NextResponse.json(
        {
          error: 'Missing required fields: cropType, landSize, rainfall, temperature, soilMoisture',
        },
        { status: 400 }
      );
    }

    // Generate comprehensive risk summary
    const summary = generateRiskSummary(
      parseFloat(rainfall),
      parseFloat(temperature),
      parseFloat(soilMoisture),
      cropType,
      parseFloat(landSize)
    );

    return NextResponse.json({
      success: true,
      ...summary,
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal server error: ' + error.message },
      { status: 500 }
    );
  }
}
