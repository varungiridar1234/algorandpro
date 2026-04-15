'use client';

export default function AdvancedRiskDisplay({ riskData }) {
  const getRiskColor = (riskLevel) => {
    switch (riskLevel) {
      case 'Low':
        return 'bg-green-100 border-green-300 text-green-900';
      case 'Medium':
        return 'bg-yellow-100 border-yellow-300 text-yellow-900';
      case 'High':
        return 'bg-red-100 border-red-300 text-red-900';
      default:
        return 'bg-gray-100 border-gray-300 text-gray-900';
    }
  };

  const getRiskScoreColor = (score) => {
    if (score < 40) return 'from-green-500 to-green-600';
    if (score < 65) return 'from-yellow-500 to-yellow-600';
    return 'from-red-500 to-red-600';
  };

  const getConfidenceColor = (confidence) => {
    if (confidence >= 80) return 'from-green-400 to-green-500';
    if (confidence >= 60) return 'from-yellow-400 to-yellow-500';
    return 'from-orange-400 to-orange-500';
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">Advanced Risk Assessment</h2>

      {/* Main Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {/* Risk Score */}
        <div className="flex flex-col items-center">
          <div
            className={`w-32 h-32 rounded-full bg-gradient-to-br ${getRiskScoreColor(
              riskData.riskScore
            )} flex items-center justify-center text-white mb-4 shadow-lg`}
          >
            <div className="text-center">
              <span className="text-4xl font-bold">{riskData.riskScore}</span>
              <span className="text-xs block mt-1">Risk Score</span>
            </div>
          </div>
          <p className="text-gray-600 text-sm">0-100 Scale</p>
        </div>

        {/* Risk Level */}
        <div className="flex flex-col items-center justify-center">
          <div className={`border-4 rounded-lg p-8 ${getRiskColor(riskData.riskLevel)} w-full text-center`}>
            <p className="text-sm font-semibold mb-2">Risk Level</p>
            <h3 className="text-3xl font-bold">{riskData.riskLevel}</h3>
          </div>
        </div>

        {/* Confidence Score */}
        <div className="flex flex-col items-center">
          <div
            className={`w-32 h-32 rounded-full bg-gradient-to-br ${getConfidenceColor(
              riskData.confidenceScore
            )} flex items-center justify-center text-white mb-4 shadow-lg`}
          >
            <div className="text-center">
              <span className="text-4xl font-bold">{riskData.confidenceScore}</span>
              <span className="text-xs block mt-1">Confidence</span>
            </div>
          </div>
          <p className="text-gray-600 text-sm">Reliability Score</p>
        </div>
      </div>

      {/* Environmental Factors */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-4 rounded-lg">
          <p className="text-sm text-gray-600">Rainfall</p>
          <p className="text-2xl font-bold text-gray-900">{riskData.rainfall} mm</p>
          <p className="text-xs text-blue-600 mt-1">Factor: {Math.round(riskData.factors.rainfall)}/100</p>
        </div>
        <div className="bg-gradient-to-br from-orange-50 to-orange-100 p-4 rounded-lg">
          <p className="text-sm text-gray-600">Temperature</p>
          <p className="text-2xl font-bold text-gray-900">{riskData.temperature}°C</p>
          <p className="text-xs text-orange-600 mt-1">Factor: {Math.round(riskData.factors.temperature)}/100</p>
        </div>
        <div className="bg-gradient-to-br from-green-50 to-green-100 p-4 rounded-lg">
          <p className="text-sm text-gray-600">Soil Moisture</p>
          <p className="text-2xl font-bold text-gray-900">{riskData.soilMoisture}%</p>
          <p className="text-xs text-green-600 mt-1">Factor: {Math.round(riskData.factors.soilMoisture)}/100</p>
        </div>
        <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-4 rounded-lg">
          <p className="text-sm text-gray-600">Predicted Yield</p>
          <p className="text-2xl font-bold text-gray-900">{riskData.predictedYield}</p>
          <p className="text-xs text-purple-600 mt-1">Units</p>
        </div>
      </div>

      {/* Crop Info and Land Size */}
      <div className="grid grid-cols-2 gap-4 mb-8">
        <div className="bg-gray-50 p-4 rounded-lg">
          <p className="text-sm text-gray-600">Crop Type</p>
          <p className="text-xl font-bold text-gray-900 capitalize">{riskData.cropType}</p>
        </div>
        <div className="bg-gray-50 p-4 rounded-lg">
          <p className="text-sm text-gray-600">Land Size</p>
          <p className="text-xl font-bold text-gray-900">{riskData.landSize} ha</p>
        </div>
      </div>

      {/* Explainable AI - Risk Breakdown */}
      <div className="bg-blue-50 border-l-4 border-blue-500 rounded-lg p-6 mb-8">
        <h3 className="font-semibold text-blue-900 mb-4 flex items-center">
          <span className="text-lg mr-2">🔍</span> Risk Factors & Explanations
        </h3>
        <ul className="space-y-3">
          {riskData.explanations && riskData.explanations.length > 0 ? (
            riskData.explanations.map((explanation, idx) => (
              <li key={idx} className="flex items-start text-blue-800">
                <span className="inline-flex items-center justify-center flex-shrink-0 w-5 h-5 rounded-full bg-blue-200 text-blue-600 text-xs font-bold mr-3 mt-0.5">
                  {idx + 1}
                </span>
                <span>{explanation}</span>
              </li>
            ))
          ) : (
            <li className="text-blue-700">No explanations generated</li>
          )}
        </ul>
      </div>

      {/* Confidence Score Explanation */}
      <div className="bg-purple-50 border-l-4 border-purple-500 rounded-lg p-6">
        <h3 className="font-semibold text-purple-900 mb-2 flex items-center">
          <span className="text-lg mr-2">📊</span> Confidence Score
        </h3>
        <p className="text-purple-800 text-sm">
          {riskData.confidenceScore >= 80
            ? '✅ High confidence - All factors present and aligned for accurate prediction'
            : riskData.confidenceScore >= 60
            ? '⚠️ Moderate confidence - Some variability in factors'
            : '❌ Low confidence - High variability; use with caution'}
        </p>
      </div>
    </div>
  );
}
