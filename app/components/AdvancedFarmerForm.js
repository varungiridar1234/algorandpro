'use client';

import { useState } from 'react';
import AdvancedRiskDisplay from './AdvancedRiskDisplay';
import ClimateSimulator from './ClimateSimulator';
import TransactionStatus from './TransactionStatus';

export default function AdvancedFarmerForm() {
  const [formData, setFormData] = useState({
    cropType: 'wheat',
    landSize: '',
    rainfall: '',
    temperature: '',
    soilMoisture: '',
  });

  const [riskData, setRiskData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [txStatus, setTxStatus] = useState(null);
  const [blockchainLoading, setBlockchainLoading] = useState(false);
  const [senderAddress, setSenderAddress] = useState('');
  const [simulationMode, setSimulationMode] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleGenerateRiskScore = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSimulationMode(false);

    try {
      const response = await fetch('/api/advanced-risk', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          cropType: formData.cropType,
          landSize: formData.landSize,
          rainfall: formData.rainfall,
          temperature: formData.temperature,
          soilMoisture: formData.soilMoisture,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setRiskData(data);
        setTxStatus(null);
      } else {
        alert('Error: ' + data.error);
      }
    } catch (error) {
      alert('Error calculating risk: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleStoreOnBlockchain = async () => {
    if (!senderAddress) {
      alert(
        'Please enter your Algorand address (or use test address: AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAY5HVY for demo)'
      );
      return;
    }

    setBlockchainLoading(true);
    setTxStatus({ status: 'pending', message: 'Submitting to blockchain...' });

    try {
      const response = await fetch('/api/blockchain', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          cropType: riskData.cropType,
          landSize: riskData.landSize,
          rainfall: riskData.rainfall,
          temperature: riskData.temperature,
          soilMoisture: riskData.soilMoisture,
          riskScore: riskData.riskScore,
          riskLevel: riskData.riskLevel,
          predictedYield: riskData.predictedYield,
          confidenceScore: riskData.confidenceScore,
          factors: riskData.factors,
          explanations: riskData.explanations,
          senderAddress: senderAddress,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        const dataToStore = { ...riskData, txId: data.txId, round: data.round };
        localStorage.setItem('riskData', JSON.stringify(dataToStore));

        setTxStatus({
          status: 'success',
          message: 'Data stored on blockchain!',
          txId: data.txId,
          round: data.round,
        });
      } else {
        setTxStatus({
          status: 'error',
          message: 'Failed to store on blockchain: ' + (data.error || 'Unknown error'),
        });
      }
    } catch (error) {
      setTxStatus({
        status: 'error',
        message: 'Error: ' + error.message,
      });
    } finally {
      setBlockchainLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Agri Risk AI - Advanced</h1>
          <p className="text-gray-600">Multi-factor risk assessment with climate simulation</p>
        </div>

        {/* Form */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">Crop & Environmental Data</h2>

          <form onSubmit={handleGenerateRiskScore} className="space-y-6">
            {/* Crop Type */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Crop Type
              </label>
              <select
                name="cropType"
                value={formData.cropType}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
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
                onChange={handleInputChange}
                placeholder="Enter land size"
                min="0"
                step="0.1"
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
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
                onChange={handleInputChange}
                placeholder="Enter annual rainfall"
                min="0"
                step="1"
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
              />
            </div>

            {/* Temperature */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Average Temperature (°C)
              </label>
              <input
                type="number"
                name="temperature"
                value={formData.temperature}
                onChange={handleInputChange}
                placeholder="Enter average temperature"
                min="-10"
                max="50"
                step="0.1"
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
              />
            </div>

            {/* Soil Moisture */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Soil Moisture (%)
              </label>
              <input
                type="number"
                name="soilMoisture"
                value={formData.soilMoisture}
                onChange={handleInputChange}
                placeholder="Enter soil moisture percentage"
                min="0"
                max="100"
                step="1"
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
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
        </div>

        {/* Results */}
        {riskData && (
          <>
            <AdvancedRiskDisplay riskData={riskData} />

            {/* Climate Simulator */}
            <ClimateSimulator
              riskData={riskData}
              onSimulation={(newData) => setRiskData(newData)}
              simulationMode={simulationMode}
              onModeChange={setSimulationMode}
            />

            {/* Blockchain Storage Section */}
            <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-6">Store on Blockchain</h2>

              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Algorand Address (optional for demo)
                </label>
                <input
                  type="text"
                  value={senderAddress}
                  onChange={(e) => setSenderAddress(e.target.value)}
                  placeholder="Enter Algorand address or leave for test account"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <button
                onClick={handleStoreOnBlockchain}
                disabled={blockchainLoading}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition duration-200 disabled:bg-gray-400"
              >
                {blockchainLoading ? 'Storing on Blockchain...' : 'Store on Blockchain'}
              </button>
            </div>

            {/* Transaction Status */}
            {txStatus && <TransactionStatus txStatus={txStatus} />}

            {/* Bank Dashboard Navigation */}
            {txStatus?.status === 'success' && (
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                <p className="text-blue-900 mb-4">Data successfully stored on blockchain!</p>
                <div className="flex gap-3">
                  <a
                    href="/bank"
                    className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg"
                  >
                    Bank Decision
                  </a>
                  <a
                    href="/dashboard"
                    className="inline-block bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-6 rounded-lg"
                  >
                    Full Dashboard
                  </a>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
