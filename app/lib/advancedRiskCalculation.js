/**
 * Advanced AI Risk Calculation Engine
 * Multi-factor risk assessment with explainability
 */

/**
 * Normalize value to 0-100 scale
 * @param {number} value - Input value
 * @param {number} min - Minimum expected value
 * @param {number} max - Maximum expected value
 * @returns {number} Normalized value (0-100)
 */
function normalizeValue(value, min, max) {
  if (value <= min) return 100;
  if (value >= max) return 0;
  return ((max - value) / (max - min)) * 100;
}

/**
 * Calculate risk factors and explanations
 * Returns detailed risk breakdown
 */
function calculateRiskFactors(rainfall, temperature, soilMoisture, cropType) {
  const factors = {};
  const explanations = [];

  // Rainfall factor (0-100 risk scale)
  // Optimal: 60-100mm, too low (<50mm) = high risk, too high (>150mm) = moderate risk
  factors.rainfall = normalizeValue(rainfall, 40, 150);
  if (rainfall < 50) {
    explanations.push(`Low rainfall (${rainfall}mm) increases drought risk significantly`);
  } else if (rainfall > 120) {
    explanations.push(`High rainfall (${rainfall}mm) may cause flooding or waterlogging`);
  } else {
    explanations.push(`Rainfall (${rainfall}mm) is within acceptable range`);
  }

  // Temperature factor (0-100 risk scale)
  // Optimal: 18-28°C, too low (<15°C) = moderate risk, too high (>35°C) = high risk
  factors.temperature = normalizeValue(temperature, 10, 40);
  if (temperature < 15) {
    explanations.push(`Low temperature (${temperature}°C) may slow crop growth`);
  } else if (temperature > 32) {
    explanations.push(`High temperature (${temperature}°C) increases heat stress risk`);
  } else {
    explanations.push(`Temperature (${temperature}°C) is favorable for growth`);
  }

  // Soil Moisture factor (0-100 risk scale)
  // Optimal: 50-70%, too low (<40%) = high risk, too high (>80%) = moderate risk
  factors.soilMoisture = normalizeValue(soilMoisture, 35, 85);
  if (soilMoisture < 40) {
    explanations.push(`Low soil moisture (${soilMoisture}%) increases water stress`);
  } else if (soilMoisture > 75) {
    explanations.push(`High soil moisture (${soilMoisture}%) may cause root problems`);
  } else {
    explanations.push(`Soil moisture (${soilMoisture}%) is within optimal range`);
  }

  // Crop-specific risk factor
  const cropFactors = {
    wheat: { factor: 0.8, stress: 'Moderate heat sensitivity' },
    rice: { factor: 1.2, stress: 'High water requirements' },
    corn: { factor: 0.9, stress: 'Heat and water sensitive' },
    soybean: { factor: 0.75, stress: 'Drought tolerant' },
    cotton: { factor: 1.1, stress: 'High temperature tolerance' },
  };

  const cropInfo = cropFactors[cropType.toLowerCase()] || { factor: 1.0, stress: 'Standard crop' };
  factors.cropFactor = cropInfo.factor * 20; // Scale to 0-100
  explanations.push(`${capitalize(cropType)}: ${cropInfo.stress}`);

  return { factors, explanations };
}

/**
 * Calculate weighted risk score
 * Weights: Rainfall 0.4, Soil 0.2, Temperature 0.2, Crop 0.2
 */
export function calculateAdvancedRiskScore(rainfall, temperature, soilMoisture, cropType) {
  const { factors, explanations } = calculateRiskFactors(
    rainfall,
    temperature,
    soilMoisture,
    cropType
  );

  // Weighted calculation
  const riskScore =
    factors.rainfall * 0.4 +
    factors.soilMoisture * 0.2 +
    factors.temperature * 0.2 +
    factors.cropFactor * 0.2;

  // Determine risk level
  let riskLevel;
  if (riskScore < 35) {
    riskLevel = 'Low';
  } else if (riskScore < 65) {
    riskLevel = 'Medium';
  } else {
    riskLevel = 'High';
  }

  return {
    riskScore: Math.round(riskScore),
    riskLevel,
    factors,
    explanations: explanations.slice(0, 3), // Top 3 explanations
  };
}

/**
 * Calculate predicted yield
 * Based on all environmental factors
 */
export function calculateAdvancedYield(rainfall, temperature, soilMoisture, cropType, landSize) {
  // Base yield per hectare
  const baseYields = {
    wheat: 3000,
    rice: 4500,
    corn: 6000,
    soybean: 2500,
    cotton: 2000,
  };

  let yield_value = baseYields[cropType.toLowerCase()] || 3000;
  yield_value *= landSize;

  // Apply environmental adjustments
  // Rainfall adjustment (optimal 60-100mm)
  if (rainfall < 40) {
    yield_value *= 0.4; // 60% reduction
  } else if (rainfall < 60) {
    yield_value *= 0.7;
  } else if (rainfall > 120) {
    yield_value *= 0.8;
  } else {
    yield_value *= 1.0;
  }

  // Temperature adjustment (optimal 18-28°C)
  if (temperature < 15) {
    yield_value *= 0.6;
  } else if (temperature < 18) {
    yield_value *= 0.8;
  } else if (temperature > 35) {
    yield_value *= 0.5;
  } else if (temperature > 32) {
    yield_value *= 0.75;
  } else {
    yield_value *= 1.0;
  }

  // Soil moisture adjustment (optimal 50-70%)
  if (soilMoisture < 35) {
    yield_value *= 0.4;
  } else if (soilMoisture < 50) {
    yield_value *= 0.7;
  } else if (soilMoisture > 80) {
    yield_value *= 0.8;
  } else {
    yield_value *= 1.0;
  }

  return Math.round(yield_value);
}

/**
 * Calculate confidence score (0-100)
 * Based on:
 * - Completeness of inputs (all 4 factors provided)
 * - Stability of factors (less variability = higher confidence)
 * - Factor consistency (factors aligned = higher confidence)
 */
export function calculateConfidenceScore(rainfall, temperature, soilMoisture, cropType) {
  let confidence = 100;

  // Base confidence: all inputs provided = 100 points
  if (!rainfall || !temperature || !soilMoisture || !cropType) {
    confidence -= 30;
  }

  // Factor stability check
  const variance = calculateVariance([rainfall, temperature, soilMoisture]);
  if (variance > 50) {
    confidence -= 15; // High variance = less predictable
  } else if (variance > 30) {
    confidence -= 8;
  }

  // Factor alignment (Are conditions coordinated or conflicting?)
  const alignment = checkFactorAlignment(rainfall, temperature, soilMoisture);
  confidence += alignment; // +10 to -10 based on alignment

  // Normalize to 0-100
  confidence = Math.max(0, Math.min(100, confidence));

  return Math.round(confidence);
}

/**
 * Helper: Calculate variance of factors
 */
function calculateVariance(values) {
  const nonZeroValues = values.filter((v) => v > 0);
  if (nonZeroValues.length === 0) return 0;

  const mean = nonZeroValues.reduce((a, b) => a + b) / nonZeroValues.length;
  const variance = nonZeroValues.reduce((sum, val) => sum + Math.pow(val - mean, 2), 0) / nonZeroValues.length;

  return Math.sqrt(variance);
}

/**
 * Helper: Check if factors are well-aligned
 * Returns -10 to +10
 */
function checkFactorAlignment(rainfall, temperature, soilMoisture) {
  let alignment = 0;

  // All factors optimal = +10
  if (rainfall >= 60 && rainfall <= 100 && temperature >= 18 && temperature <= 28 && soilMoisture >= 50 && soilMoisture <= 70) {
    return 10;
  }

  // Some factors off = -5
  if (
    (rainfall < 40 || rainfall > 120) &&
    (temperature < 15 || temperature > 35) &&
    soilMoisture < 40
  ) {
    return -8;
  }

  // Mixed conditions = 0
  return 0;
}

/**
 * Helper: Capitalize string
 */
function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

/**
 * Generate risk summary with all metrics
 */
export function generateRiskSummary(rainfall, temperature, soilMoisture, cropType, landSize) {
  const riskAssessment = calculateAdvancedRiskScore(rainfall, temperature, soilMoisture, cropType);
  const yield_value = calculateAdvancedYield(rainfall, temperature, soilMoisture, cropType, landSize);
  const confidence = calculateConfidenceScore(rainfall, temperature, soilMoisture, cropType);

  return {
    riskScore: riskAssessment.riskScore,
    riskLevel: riskAssessment.riskLevel,
    predictedYield: yield_value,
    confidenceScore: confidence,
    explanations: riskAssessment.explanations,
    factors: riskAssessment.factors,
    rainfall,
    temperature,
    soilMoisture,
    cropType,
    landSize,
  };
}
