'use client';

export default function RiskDisplay({ riskData }) {
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
    if (score < 70) return 'from-yellow-500 to-yellow-600';
    return 'from-red-500 to-red-600';
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">Risk Assessment Results</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Risk Score Circle */}
        <div className="flex flex-col items-center">
          <div
            className={`w-32 h-32 rounded-full bg-gradient-to-br ${getRiskScoreColor(
              riskData.riskScore
            )} flex items-center justify-center text-white mb-4`}
          >
            <span className="text-4xl font-bold">{riskData.riskScore}</span>
          </div>
          <p className="text-gray-600 text-sm">Risk Score (0-100)</p>
        </div>

        {/* Risk Level Card */}
        <div className="flex flex-col justify-center">
          <div className={`border-2 rounded-lg p-6 ${getRiskColor(riskData.riskLevel)}`}>
            <p className="text-sm font-semibold mb-2">Risk Level</p>
            <h3 className="text-3xl font-bold">{riskData.riskLevel}</h3>
          </div>
        </div>
      </div>

      {/* Details Table */}
      <div className="mt-8 border-t pt-8">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Details</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-gray-50 rounded-lg p-4">
            <p className="text-sm text-gray-600">Predicted Yield</p>
            <p className="text-2xl font-bold text-gray-900">{riskData.predictedYield} units</p>
          </div>
          <div className="bg-gray-50 rounded-lg p-4">
            <p className="text-sm text-gray-600">Crop Type</p>
            <p className="text-2xl font-bold text-gray-900 capitalize">{riskData.cropType}</p>
          </div>
          <div className="bg-gray-50 rounded-lg p-4">
            <p className="text-sm text-gray-600">Land Size</p>
            <p className="text-2xl font-bold text-gray-900">{riskData.landSize} ha</p>
          </div>
          <div className="bg-gray-50 rounded-lg p-4">
            <p className="text-sm text-gray-600">Rainfall</p>
            <p className="text-2xl font-bold text-gray-900">{riskData.rainfall} mm</p>
          </div>
        </div>
      </div>

      {/* Risk Interpretation */}
      <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
        <h3 className="font-semibold text-blue-900 mb-2">Risk Interpretation</h3>
        <p className="text-blue-800 text-sm">
          {getRiskInterpretation(riskData.riskLevel, riskData.rainfall)}
        </p>
      </div>
    </div>
  );
}

function getRiskInterpretation(riskLevel, rainfall) {
  if (riskLevel === 'High') {
    return `With rainfall of ${rainfall}mm, your crop faces significant risk of drought stress. Consider irrigation systems or drought-resistant varieties. Banks may require additional collateral or reject loan applications.`;
  } else if (riskLevel === 'Medium') {
    return `With moderate rainfall of ${rainfall}mm, your crop has acceptable conditions but should be monitored. Banks will review your application carefully and may require additional documentation.`;
  } else {
    return `With excellent rainfall conditions of ${rainfall}mm, your crop shows strong growth potential. Banks are likely to approve your loan application favorably.`;
  }
}
