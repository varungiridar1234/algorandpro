'use client';

import { useState } from 'react';
import { getClimateScenarios } from '@/lib/climateSimulation';

export default function ClimateSimulator({ riskData, onSimulation, onModeChange }) {
  const [loading, setLoading] = useState(false);
  const [simulationResult, setSimulationResult] = useState(null);

  const scenarios = getClimateScenarios();

  const handleSimulateScenario = async (scenarioId) => {
    setLoading(true);
    try {
      const response = await fetch('/api/climate-simulation', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          cropType: riskData.cropType,
          landSize: riskData.landSize,
          rainfall: riskData.rainfall,
          temperature: riskData.temperature,
          soilMoisture: riskData.soilMoisture,
          scenario: scenarioId,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setSimulationResult(data);
        onModeChange(true);
      } else {
        alert('Error: ' + data.error);
      }
    } catch (error) {
      alert('Error simulating: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">🌍 Climate Scenarios</h2>

      <p className="text-gray-600 mb-6">
        Simulate how different climate conditions would affect your crop risk and yield.
      </p>

      {/* Scenario Buttons */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        {scenarios.map((scenario) => (
          <button
            key={scenario.id}
            onClick={() => handleSimulateScenario(scenario.id)}
            disabled={loading}
            className="p-4 border-2 border-gray-300 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition text-left disabled:opacity-50"
          >
            <h3 className="font-bold text-gray-900">{scenario.label}</h3>
            <p className="text-sm text-gray-600 mt-1">{scenario.description}</p>
          </button>
        ))}
      </div>

      {/* Simulation Results */}
      {simulationResult && (
        <div className="border-2 border-blue-300 rounded-lg p-6 bg-blue-50">
          <div className="mb-6">
            <h3 className="text-xl font-bold text-gray-900 mb-2">{simulationResult.scenario}</h3>
            <p className="text-gray-700">{simulationResult.scenarioDescription}</p>
          </div>

          {/* Comparison Table */}
          <div className="overflow-x-auto mb-6">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b-2 border-gray-400">
                  <th className="text-left py-2 px-2">Metric</th>
                  <th className="text-center py-2 px-2">Current</th>
                  <th className="text-center py-2 px-2">Simulated</th>
                  <th className="text-center py-2 px-2">Change</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-200">
                  <td className="py-2 px-2 font-semibold">Risk Score</td>
                  <td className="text-center py-2 px-2 bg-green-50">{simulationResult.original.riskScore}</td>
                  <td className="text-center py-2 px-2 bg-red-50">{simulationResult.simulated.riskScore}</td>
                  <td className="text-center py-2 px-2 font-bold text-red-600">
                    {simulationResult.impact.riskChange > 0 ? '+' : ''}{simulationResult.impact.riskChange}
                  </td>
                </tr>
                <tr className="border-b border-gray-200">
                  <td className="py-2 px-2 font-semibold">Risk Level</td>
                  <td className="text-center py-2 px-2">{simulationResult.original.riskLevel}</td>
                  <td className="text-center py-2 px-2">{simulationResult.simulated.riskLevel}</td>
                  <td className="text-center py-2 px-2">
                    {simulationResult.original.riskLevel !== simulationResult.simulated.riskLevel ? '⚠️ Changed' : '✓ Same'}
                  </td>
                </tr>
                <tr className="border-b border-gray-200">
                  <td className="py-2 px-2 font-semibold">Predicted Yield</td>
                  <td className="text-center py-2 px-2">{simulationResult.original.predictedYield}</td>
                  <td className="text-center py-2 px-2">{simulationResult.simulated.predictedYield}</td>
                  <td className="text-center py-2 px-2 font-bold">
                    {simulationResult.simulated.predictedYield - simulationResult.original.predictedYield}
                  </td>
                </tr>
                <tr className="border-b border-gray-200">
                  <td className="py-2 px-2 font-semibold">Confidence Score</td>
                  <td className="text-center py-2 px-2">{simulationResult.original.confidenceScore}%</td>
                  <td className="text-center py-2 px-2">{simulationResult.simulated.confidenceScore}%</td>
                  <td className="text-center py-2 px-2">
                    {simulationResult.simulated.confidenceScore - simulationResult.original.confidenceScore > 0 ? '📈' : '📉'}
                  </td>
                </tr>
                <tr>
                  <td className="py-2 px-2 font-semibold">Rainfall</td>
                  <td className="text-center py-2 px-2">{simulationResult.original.rainfall}mm</td>
                  <td className="text-center py-2 px-2">{simulationResult.simulated.rainfall.toFixed(1)}mm</td>
                  <td className="text-center py-2 px-2 text-blue-600">
                    {(simulationResult.simulated.rainfall - simulationResult.original.rainfall).toFixed(1)}mm
                  </td>
                </tr>
                <tr>
                  <td className="py-2 px-2 font-semibold">Temperature</td>
                  <td className="text-center py-2 px-2">{simulationResult.original.temperature}°C</td>
                  <td className="text-center py-2 px-2">{simulationResult.simulated.temperature.toFixed(1)}°C</td>
                  <td className="text-center py-2 px-2 text-orange-600">
                    {(simulationResult.simulated.temperature - simulationResult.original.temperature).toFixed(1)}°C
                  </td>
                </tr>
                <tr>
                  <td className="py-2 px-2 font-semibold">Soil Moisture</td>
                  <td className="text-center py-2 px-2">{simulationResult.original.soilMoisture}%</td>
                  <td className="text-center py-2 px-2">{simulationResult.simulated.soilMoisture.toFixed(1)}%</td>
                  <td className="text-center py-2 px-2 text-green-600">
                    {(simulationResult.simulated.soilMoisture - simulationResult.original.soilMoisture).toFixed(1)}%
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Impact Summary */}
          <div className="bg-white p-4 rounded-lg border-l-4 border-blue-500">
            <h4 className="font-semibold text-gray-900 mb-2">Impact Assessment</h4>
            <p className="text-gray-700">{simulationResult.impact.impact}</p>
          </div>

          {/* Clear Simulation */}
          <button
            onClick={() => {
              setSimulationResult(null);
              onModeChange(false);
            }}
            className="mt-4 px-4 py-2 bg-gray-300 hover:bg-gray-400 text-gray-900 rounded-lg transition"
          >
            Clear Simulation
          </button>
        </div>
      )}

      {loading && (
        <div className="text-center py-4">
          <p className="text-gray-600">Simulating climate scenarios...</p>
          <div className="flex justify-center mt-2">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
          </div>
        </div>
      )}
    </div>
  );
}
