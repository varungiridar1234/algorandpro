'use client';

import { useState } from 'react';

export default function SimpleForm() {
  const [formData, setFormData] = useState({
    cropType: 'wheat',
    landSize: '',
    rainfall: '',
  });

  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('/api/risk-calculation', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          cropType: formData.cropType,
          landSize: parseFloat(formData.landSize),
          rainfall: parseFloat(formData.rainfall),
        }),
      });

      const data = await response.json();
      setResult(data);
    } catch (error) {
      alert('Error: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 p-8">
      <div className="max-w-md mx-auto bg-white rounded-lg shadow-lg p-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Risk Score Calculator</h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Crop Type */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Crop Type
            </label>
            <select
              name="cropType"
              value={formData.cropType}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            >
              <option value="wheat">Wheat</option>
              <option value="rice">Rice</option>
              <option value="corn">Corn</option>
              <option value="soybean">Soybean</option>
              <option value="cotton">Cotton</option>
            </select>
          </div>

          {/* Land Size */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Land Size (hectares)
            </label>
            <input
              type="number"
              name="landSize"
              value={formData.landSize}
              onChange={handleChange}
              placeholder="Enter land size"
              min="0"
              step="0.1"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
          </div>

          {/* Rainfall */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Annual Rainfall (mm)
            </label>
            <input
              type="number"
              name="rainfall"
              value={formData.rainfall}
              onChange={handleChange}
              placeholder="Enter annual rainfall"
              min="0"
              step="1"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-lg transition duration-200 disabled:bg-gray-400"
          >
            {loading ? 'Calculating...' : 'Generate Risk Score'}
          </button>
        </form>

        {/* Results */}
        {result && (
          <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
            <h2 className="font-bold text-lg text-blue-900 mb-3">Results</h2>
            <div className="space-y-2 text-sm">
              <p>
                <span className="font-semibold">Risk Score:</span> {result.riskScore}/100
              </p>
              <p>
                <span className="font-semibold">Risk Level:</span>{' '}
                <span
                  className={`font-bold ${
                    result.riskLevel === 'Low'
                      ? 'text-green-600'
                      : result.riskLevel === 'Medium'
                      ? 'text-yellow-600'
                      : 'text-red-600'
                  }`}
                >
                  {result.riskLevel}
                </span>
              </p>
              <p>
                <span className="font-semibold">Predicted Yield:</span> {result.predictedYield} units
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
