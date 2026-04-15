'use client';

import { motion } from 'framer-motion';
import React, { useState } from 'react';
import { GlassmorphicCard, GradientButton } from './ModernLayout';
import { Cloud, Flame, Droplets, Sun, ArrowRight, X } from 'lucide-react';

export const ModernClimateSimulator = ({ formData, onClose }) => {
  const [selectedScenario, setSelectedScenario] = useState(null);
  const [simResults, setSimResults] = useState(null);
  const [loading, setLoading] = useState(false);

  const scenarios = [
    {
      id: 'drought',
      name: '🏜️ Severe Drought',
      description: 'Rainfall -60%, Temp +3°C, Soil -40%',
      icon: Cloud,
      color: 'from-orange-500 to-red-500',
    },
    {
      id: 'heatwave',
      name: '🔥 Extreme Heat Wave',
      description: 'Temp +5°C, Soil -30%, Rainfall -20%',
      icon: Flame,
      color: 'from-red-500 to-pink-500',
    },
    {
      id: 'flood',
      name: '💧 Heavy Rainfall/Flood',
      description: 'Rainfall ×2, Soil +30%, Temp -2°C',
      icon: Droplets,
      color: 'from-blue-500 to-cyan-500',
    },
    {
      id: 'optimal',
      name: '✨ Optimal Conditions',
      description: 'Perfect growing conditions',
      icon: Sun,
      color: 'from-green-500 to-emerald-500',
    },
  ];

  const handleSimulate = async (scenario) => {
    setSelectedScenario(scenario.id);
    setLoading(true);

    try {
      const response = await fetch('/api/climate-simulation', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          scenario: scenario.id,
        }),
      });

      const data = await response.json();
      if (data.success) {
        setSimResults(data);
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to simulate scenario');
    } finally {
      setLoading(false);
    }
  };

  return (
    <GlassmorphicCard>
      <div className="flex items-center justify-between mb-8 lg:mb-10">
        <h3 className="text-2xl lg:text-3xl font-bold text-white flex items-center gap-3">🌍 Climate Scenarios</h3>
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={onClose}
          className="p-3 hover:bg-white/15 rounded-xl transition-all duration-200 border border-white/10 hover:border-white/20"
        >
          <X size={24} className="text-slate-300" />
        </motion.button>
      </div>

      {!simResults ? (
        <div className="space-y-4">
          <p className="text-slate-400 text-sm mb-6">
            See how your farm risk changes under different climate scenarios
          </p>

          {/* Scenario buttons grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {scenarios.map((scenario, idx) => {
              const ScenarioIcon = scenario.icon;
              return (
                <motion.button
                  key={scenario.id}
                  onClick={() => handleSimulate(scenario)}
                  disabled={loading}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`p-4 rounded-xl border-2 transition-all duration-300 text-left ${
                    selectedScenario === scenario.id
                      ? 'border-cyan-400 bg-gradient-to-r ' + scenario.color + ' bg-opacity-20'
                      : 'border-white/10 hover:border-white/20 bg-white/5'
                  } disabled:opacity-50 disabled:cursor-not-allowed`}
                >
                  <h4 className="font-bold text-white mb-1">{scenario.name}</h4>
                  <p className="text-xs text-slate-400">{scenario.description}</p>
                </motion.button>
              );
            })}
          </div>
        </div>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          {/* Scenario header */}
          <div className="flex items-center justify-between">
            <h4 className="text-lg font-bold text-white">{simResults.scenario}</h4>
            <button
              onClick={() => setSimResults(null)}
              className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg text-sm font-semibold text-slate-300 transition-colors duration-200"
            >
              Clear
            </button>
          </div>

          {/* Comparison table */}
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="text-left py-3 px-4 text-slate-400 font-semibold">Metric</th>
                  <th className="text-center py-3 px-4 text-slate-300 font-semibold">Current</th>
                  <th className="text-center py-3 px-4 text-slate-300 font-semibold">Simulated</th>
                  <th className="text-center py-3 px-4 text-slate-300 font-semibold">Change</th>
                </tr>
              </thead>
              <tbody>
                {[
                  {
                    metric: 'Risk Score',
                    current: simResults.original?.riskScore,
                    simulated: simResults.simulated?.riskScore,
                  },
                  {
                    metric: 'Risk Level',
                    current: simResults.original?.riskLevel,
                    simulated: simResults.simulated?.riskLevel,
                  },
                  {
                    metric: 'Predicted Yield',
                    current: Math.round(simResults.original?.predictedYield),
                    simulated: Math.round(simResults.simulated?.predictedYield),
                  },
                  {
                    metric: 'Confidence',
                    current: simResults.original?.confidenceScore + '%',
                    simulated: simResults.simulated?.confidenceScore + '%',
                  },
                  {
                    metric: 'Rainfall',
                    current: simResults.original?.rainfall + ' mm',
                    simulated: simResults.simulated?.rainfall + ' mm',
                  },
                  {
                    metric: 'Temperature',
                    current: simResults.original?.temperature + '°C',
                    simulated: simResults.simulated?.temperature + '°C',
                  },
                  {
                    metric: 'Soil Moisture',
                    current: simResults.original?.soilMoisture + '%',
                    simulated: simResults.simulated?.soilMoisture + '%',
                  },
                ].map((row, idx) => {
                  const isDifferent = String(row.current) !== String(row.simulated);
                  return (
                    <motion.tr
                      key={row.metric}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.1 + idx * 0.05 }}
                      className="border-b border-white/5 hover:bg-white/5 transition-colors duration-200"
                    >
                      <td className="py-3 px-4 text-slate-300 font-medium">{row.metric}</td>
                      <td className="py-3 px-4 text-center text-green-400">{row.current}</td>
                      <td className={`py-3 px-4 text-center font-semibold ${
                        isDifferent ? 'text-red-400' : 'text-slate-400'
                      }`}>
                        {row.simulated}
                      </td>
                      <td className="py-3 px-4 text-center">
                        {isDifferent ? (
                          <motion.span
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="text-orange-400 font-bold"
                          >
                            ⚠️
                          </motion.span>
                        ) : (
                          <motion.span
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="text-slate-500"
                          >
                            ✓
                          </motion.span>
                        )}
                      </td>
                    </motion.tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Impact summary */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="p-4 rounded-lg bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border border-cyan-500/20"
          >
            <p className="text-slate-300 text-sm leading-relaxed">
              <span className="font-semibold text-cyan-400">Impact Analysis:</span> {simResults.impact?.impact}
            </p>
          </motion.div>

          {/* Back button */}
          <div className="flex justify-center pt-4">
            <GradientButton
              onClick={() => setSimResults(null)}
              variant="secondary"
            >
              Try Another Scenario
            </GradientButton>
          </div>
        </motion.div>
      )}
    </GlassmorphicCard>
  );
};
