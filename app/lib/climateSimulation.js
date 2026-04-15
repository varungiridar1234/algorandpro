/**
 * Climate Change Simulation Engine
 * Simulates various climate scenarios
 */

/**
 * Apply climate change scenarios
 * @param {object} currentData - Current climate data
 * @param {string} scenario - Type of scenario (drought, heatwave, flood)
 * @returns {object} Modified climate data
 */
export function simulateClimateChange(currentData, scenario = 'drought') {
  const { rainfall, temperature, soilMoisture } = currentData;
  let modified = { ...currentData };

  switch (scenario) {
    case 'drought':
      // Severe drought scenario
      modified.rainfall = Math.max(10, rainfall * 0.4); // Reduce rainfall by 60%
      modified.temperature = temperature + 3; // Increase temp by 3°C
      modified.soilMoisture = Math.max(20, soilMoisture * 0.6); // Reduce soil moisture by 40%
      modified.scenario = 'Severe Drought Scenario';
      modified.scenarioDescription =
        'Rainfall reduced 60%, temperature up 3°C, soil moisture down 40%';
      break;

    case 'heatwave':
      // Extreme heat scenario
      modified.temperature = temperature + 5; // Increase by 5°C
      modified.soilMoisture = Math.max(20, soilMoisture * 0.7); // Reduce by 30%
      modified.rainfall = Math.max(30, rainfall * 0.8); // Slight reduction
      modified.scenario = 'Extreme Heat Wave Scenario';
      modified.scenarioDescription = 'Temperature up 5°C, soil moisture down 30%';
      break;

    case 'flood':
      // Flooding scenario
      modified.rainfall = Math.min(200, rainfall * 2); // Double rainfall
      modified.soilMoisture = Math.min(90, soilMoisture + 30); // Increase moisture
      modified.temperature = temperature - 2; // Slightly cooler due to cloud cover
      modified.scenario = 'Heavy Rainfall & Flood Scenario';
      modified.scenarioDescription = 'Rainfall doubled, soil moisture high, temperature down 2°C';
      break;

    case 'optimal':
      // Optimal conditions
      modified.rainfall = 75;
      modified.temperature = 23;
      modified.soilMoisture = 60;
      modified.scenario = 'Optimal Conditions Scenario';
      modified.scenarioDescription = 'Perfect growing conditions';
      break;

    default:
      // Mild change
      modified.rainfall = rainfall * 0.9;
      modified.temperature = temperature + 1;
      modified.soilMoisture = soilMoisture * 0.95;
      modified.scenario = 'Mild Climate Change';
      modified.scenarioDescription = 'Gradual change scenario';
  }

  return modified;
}

/**
 * Get available climate scenarios
 */
export function getClimateScenarios() {
  return [
    {
      id: 'drought',
      label: '🏜️ Severe Drought',
      description: 'Rainfall -60%, Temp +3°C, Soil -40%',
    },
    {
      id: 'heatwave',
      label: '🔥 Heat Wave',
      description: 'Temperature +5°C, Soil -30%',
    },
    {
      id: 'flood',
      label: '💧 Heavy Rainfall',
      description: 'Rainfall x2, High soil moisture',
    },
    {
      id: 'optimal',
      label: '✨ Optimal Conditions',
      description: 'Perfect growing conditions',
    },
  ];
}

/**
 * Calculate impact of climate change on risk
 * Compares original vs simulated
 */
export function calculateClimateImpact(originalRisk, simulatedRisk) {
  const riskChange = simulatedRisk - originalRisk;
  const percentChange = ((riskChange / originalRisk) * 100).toFixed(1);

  let impact = 'No change';
  if (riskChange > 0) {
    impact = `Risk increased by ${parseInt(riskChange)} points (${percentChange}%)`;
  } else if (riskChange < 0) {
    impact = `Risk decreased by ${Math.abs(parseInt(riskChange))} points (${percentChange}%)`;
  }

  return {
    originalRisk,
    simulatedRisk,
    riskChange,
    percentChange,
    impact,
  };
}
