'use client';

import { motion } from 'framer-motion';
import React from 'react';
import { CircularProgress, GradientBar } from './ModernProgress';
import { GlassmorphicCard } from './ModernLayout';
import { Cloud, Thermometer, Droplets, Leaf, AlertCircle, CheckCircle, TrendingUp } from 'lucide-react';

export const ModernRiskDisplay = ({ riskData }) => {
  if (!riskData) return null;

  const getRiskColor = (score) => {
    if (score < 35) return 'green';
    if (score < 65) return 'yellow';
    return 'red';
  };

  const getConfidenceQuality = (score) => {
    if (score >= 80) return { text: 'High Confidence', color: 'green', icon: CheckCircle };
    if (score >= 60) return { text: 'Moderate Confidence', color: 'yellow', icon: AlertCircle };
    return { text: 'Low Confidence', color: 'red', icon: AlertCircle };
  };

  const confidenceQuality = getConfidenceQuality(riskData.confidenceScore);
  const ConfidenceIcon = confidenceQuality.icon;

  const factors = [
    { label: 'Rainfall', value: riskData.factors?.rainfall || 0, icon: Cloud },
    { label: 'Temperature', value: riskData.factors?.temperature || 0, icon: Thermometer },
    { label: 'Soil Moisture', value: riskData.factors?.soilMoisture || 0, icon: Droplets },
    { label: 'Crop Type', value: riskData.factors?.cropFactor || 0, icon: Leaf },
  ];

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };

  return (
    <motion.div className="space-y-6 lg:space-y-8" variants={container} initial="hidden" animate="show">
      {/* Main Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 lg:gap-6 xl:gap-8">
        {/* Risk Score */}
        <motion.div variants={item}>
          <GlassmorphicCard className="flex flex-col items-center justify-center h-full py-8 lg:py-10">
            <CircularProgress
              value={riskData.riskScore}
              max={100}
              label="Risk Score"
              color={getRiskColor(riskData.riskScore)}
              size="large"
            />
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="mt-6 lg:mt-8 text-center"
            >
              <p className={`text-xl lg:text-2xl font-black tracking-tight ${
                riskData.riskLevel === 'Low' ? 'text-green-400' :
                riskData.riskLevel === 'Medium' ? 'text-yellow-400' :
                'text-red-400'
              }`}>
                {riskData.riskLevel} Risk
              </p>
            </motion.div>
          </GlassmorphicCard>
        </motion.div>

        {/* Confidence Score */}
        <motion.div variants={item}>
          <GlassmorphicCard className="flex flex-col items-center justify-center h-full py-8 lg:py-10">
            <CircularProgress
              value={riskData.confidenceScore}
              max={100}
              label="Confidence"
              color={confidenceQuality.color}
              size="large"
            />
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="mt-6 lg:mt-8 text-center flex items-center gap-3 flex-col"
            >
              <ConfidenceIcon size={20} className={confidenceQuality.color === 'green' ? 'text-green-400' : confidenceQuality.color === 'yellow' ? 'text-yellow-400' : 'text-red-400'} />
              <p className={`text-base lg:text-lg font-bold ${
                confidenceQuality.color === 'green' ? 'text-green-400' :
                confidenceQuality.color === 'yellow' ? 'text-yellow-400' :
                'text-red-400'
              }`}>
                {confidenceQuality.text}
              </p>
            </motion.div>
          </GlassmorphicCard>
        </motion.div>

        {/* Predicted Yield */}
        <motion.div variants={item}>
          <GlassmorphicCard className="flex flex-col items-center justify-center h-full py-8 lg:py-10">
            <div className="flex items-center gap-3 mb-6 lg:mb-8">
              <div className="w-16 h-16 lg:w-20 lg:h-20 rounded-2xl bg-gradient-to-br from-purple-500/25 to-pink-500/15 flex items-center justify-center">
                <TrendingUp size={32} className="text-purple-400" />
              </div>
            </div>
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.5, type: 'spring' }}
              className="text-center"
            >
              <p className="text-5xl lg:text-6xl font-black text-purple-400 mb-3 lg:mb-4 tracking-tight">
                {Math.round(riskData.predictedYield)}
              </p>
              <p className="text-slate-400 text-sm lg:text-base font-semibold">Predicted Yield</p>
            </motion.div>
          </GlassmorphicCard>
        </motion.div>
      </div>

      {/* Environmental Factors */}
      <motion.div variants={item}>
        <GlassmorphicCard>
          <h3 className="text-2xl lg:text-3xl font-bold text-white mb-8 lg:mb-10 flex items-center gap-3">
            <Cloud size={28} className="text-cyan-400" />
            Environmental Factors
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-7 lg:gap-8">
            {factors.map((factor, idx) => {
              const FactorIcon = factor.icon;
              return (
                <motion.div
                  key={factor.label}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + idx * 0.1 }}
                  className="p-5 lg:p-6 rounded-2xl bg-gradient-to-br from-white/8 to-white/4 border border-white/15 hover:border-white/25 transition-all duration-300"
                >
                  <div className="flex items-center gap-3 mb-5 lg:mb-6">
                    <div className="p-3 lg:p-4 rounded-xl bg-cyan-500/20 flex-shrink-0">
                      <FactorIcon size={24} className="text-cyan-400" />
                    </div>
                    <span className="text-lg lg:text-xl font-bold text-white">{factor.label}</span>
                  </div>
                  <GradientBar
                    value={factor.value}
                    max={100}
                    label=""
                    color={factor.value < 35 ? 'green' : factor.value < 65 ? 'yellow' : 'red'}
                    showValue={true}
                  />
                </motion.div>
              );
            })}
          </div>
        </GlassmorphicCard>
      </motion.div>

      {/* Explainability Section */}
      <motion.div variants={item}>
        <GlassmorphicCard>
          <h3 className="text-2xl lg:text-3xl font-bold text-white mb-8 lg:mb-10 flex items-center gap-3">
            <AlertCircle size={28} className="text-cyan-400" />
            Why This Risk?
          </h3>

          <div className="space-y-4 lg:space-y-5">
            {riskData.explanations && riskData.explanations.map((explanation, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 + idx * 0.1 }}
                className="flex items-start gap-4 lg:gap-5 p-5 lg:p-6 rounded-2xl lg:rounded-3xl bg-gradient-to-r from-blue-500/8 to-cyan-500/6 border border-blue-500/25 hover:border-blue-500/50 transition-all duration-300"
              >
                <div className="flex items-center justify-center w-9 h-9 lg:w-10 lg:h-10 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex-shrink-0 mt-1 font-bold text-white text-sm lg:text-base">
                  {idx + 1}
                </div>
                <p className="text-slate-300 text-base lg:text-lg leading-relaxed font-medium">
                  {explanation}
                </p>
              </motion.div>
            ))}
          </div>
        </GlassmorphicCard>
      </motion.div>

      {/* Data Summary Card */}
      <motion.div variants={item}>
        <GlassmorphicCard>
          <h3 className="text-lg font-bold text-white mb-4">Assessment Summary</h3>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div className="p-3 rounded-lg bg-white/5">
              <p className="text-slate-400 text-xs mb-1">Crop Type</p>
              <p className="text-white font-semibold">{riskData.cropType}</p>
            </div>
            <div className="p-3 rounded-lg bg-white/5">
              <p className="text-slate-400 text-xs mb-1">Land Size</p>
              <p className="text-white font-semibold">{riskData.landSize} ha</p>
            </div>
            <div className="p-3 rounded-lg bg-white/5">
              <p className="text-slate-400 text-xs mb-1">Rainfall</p>
              <p className="text-white font-semibold">{riskData.rainfall} mm</p>
            </div>
            <div className="p-3 rounded-lg bg-white/5">
              <p className="text-slate-400 text-xs mb-1">Temperature</p>
              <p className="text-white font-semibold">{riskData.temperature}°C</p>
            </div>
          </div>
        </GlassmorphicCard>
      </motion.div>
    </motion.div>
  );
};
