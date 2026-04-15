/**
 * API Route: Climate Simulation
 * Simulates climate change effects on risk and yield
 */

import { generateRiskSummary } from '@/lib/advancedRiskCalculation';
import { simulateClimateChange, calculateClimateImpact } from '@/lib/climateSimulation';
import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const { cropType, landSize, rainfall, temperature, soilMoisture, scenario } = await request.json();

    // Validate inputs
    if (!cropType || !landSize || rainfall === undefined || temperature === undefined || soilMoisture === undefined) {
      return NextResponse.json(
        {
          error: 'Missing required fields',
        },
        { status: 400 }
      );
    }

    // Calculate original risk
    const originalSummary = generateRiskSummary(
      parseFloat(rainfall),
      parseFloat(temperature),
      parseFloat(soilMoisture),
      cropType,
      parseFloat(landSize)
    );

    // Simulate climate change
    const simulatedData = simulateClimateChange(
      {
        rainfall: parseFloat(rainfall),
        temperature: parseFloat(temperature),
        soilMoisture: parseFloat(soilMoisture),
      },
      scenario
    );

    // Calculate new risk with simulated data
    const simulatedSummary = generateRiskSummary(
      simulatedData.rainfall,
      simulatedData.temperature,
      simulatedData.soilMoisture,
      cropType,
      parseFloat(landSize)
    );

    // Calculate impact
    const impact = calculateClimateImpact(originalSummary.riskScore, simulatedSummary.riskScore);

    return NextResponse.json({
      success: true,
      original: originalSummary,
      simulated: simulatedSummary,
      scenario: simulatedData.scenario,
      scenarioDescription: simulatedData.scenarioDescription,
      impact,
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal server error: ' + error.message },
      { status: 500 }
    );
  }
}
