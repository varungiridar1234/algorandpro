/**
 * AI Risk Calculation Logic
 * Determines crop risk based on rainfall and land size
 */

export function calculateRiskScore(rainfall, landSize) {
  // Validate inputs
  if (!rainfall || !landSize) {
    return null;
  }

  let riskLevel = 'Unknown';
  let riskScore = 50; // 0-100 scale

  if (rainfall < 50) {
    riskLevel = 'High';
    riskScore = 80 + Math.random() * 20; // 80-100
  } else if (rainfall >= 50 && rainfall <= 100) {
    riskLevel = 'Medium';
    riskScore = 40 + Math.random() * 30; // 40-70
  } else if (rainfall > 100) {
    riskLevel = 'Low';
    riskScore = Math.random() * 40; // 0-40
  }

  // Adjust risk based on land size (smaller land = higher risk)
  if (landSize < 5) {
    riskScore += 10;
  } else if (landSize > 20) {
    riskScore -= 5;
  }

  // Cap risk score between 0-100
  riskScore = Math.min(100, Math.max(0, riskScore));

  return {
    riskLevel,
    riskScore: Math.round(riskScore),
  };
}

export function calculateYield(rainfall, landSize, cropType) {
  // Simple yield calculation based on rainfall and land size
  let baseYield = landSize * 100; // Base: 100 units per hectare

  // Adjust based on rainfall
  if (rainfall < 50) {
    baseYield *= 0.5; // 50% reduction
  } else if (rainfall >= 50 && rainfall <= 100) {
    baseYield *= 0.8; // 20% reduction
  } else if (rainfall > 100) {
    baseYield *= 1.2; // 20% boost
  }

  // Crop-specific adjustments
  const cropMultipliers = {
    wheat: 1.0,
    rice: 1.1,
    corn: 0.95,
    soybean: 0.9,
    cotton: 0.85,
  };

  const multiplier = cropMultipliers[cropType.toLowerCase()] || 1.0;
  baseYield *= multiplier;

  return Math.round(baseYield);
}
