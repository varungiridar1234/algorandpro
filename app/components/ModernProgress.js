'use client';

import { motion } from 'framer-motion';
import React from 'react';

export const CircularProgress = ({ value = 0, max = 100, label = '', color = 'blue', size = 'large' }) => {
  const circumference = 2 * Math.PI * 45;
  const strokeDashoffset = circumference - (value / max) * circumference;
  
  const sizeClasses = {
    small: { container: 'w-24 h-24', text: 'text-lg' },
    medium: { container: 'w-32 h-32', text: 'text-2xl' },
    large: { container: 'w-40 h-40', text: 'text-4xl' },
  };

  const colorConfig = {
    blue: { gradient: 'from-blue-500 to-cyan-400', ring: 'text-blue-400' },
    green: { gradient: 'from-green-500 to-emerald-400', ring: 'text-green-400' },
    yellow: { gradient: 'from-yellow-500 to-orange-400', ring: 'text-yellow-400' },
    red: { gradient: 'from-red-500 to-orange-400', ring: 'text-red-400' },
    purple: { gradient: 'from-purple-500 to-pink-400', ring: 'text-purple-400' },
  };

  const config = colorConfig[color];
  const sizeConfig = sizeClasses[size];

  // Determine color based on value (if color not explicitly set)
  let displayColor = color;
  if (color === 'auto' && label === 'Risk Score') {
    if (value < 35) displayColor = 'green';
    else if (value < 65) displayColor = 'yellow';
    else displayColor = 'red';
  }
  
  if (color === 'auto' && label.includes('Confidence')) {
    if (value >= 80) displayColor = 'green';
    else if (value >= 60) displayColor = 'yellow';
    else displayColor = 'red';
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6 }}
      className="flex flex-col items-center gap-4"
    >
      {/* SVG Circle with animation */}
      <div className={`${sizeConfig.container} relative`}>
        <svg className="transform -rotate-90" viewBox="0 0 100 100">
          {/* Background circle */}
          <circle
            cx="50"
            cy="50"
            r="45"
            fill="none"
            stroke="rgba(255,255,255,0.1)"
            strokeWidth="8"
          />

          {/* Animated gradient circle */}
          <defs>
            <linearGradient id={`gradient-${label}`} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor={color === 'green' ? '#10b981' : color === 'red' ? '#ef4444' : color === 'yellow' ? '#f59e0b' : color === 'purple' ? '#a855f7' : '#0ea5e9'} />
              <stop offset="100%" stopColor={color === 'green' ? '#06b6d4' : color === 'red' ? '#f97316' : color === 'yellow' ? '#f97316' : color === 'purple' ? '#ec4899' : '#06b6d4'} />
            </linearGradient>
          </defs>

          <motion.circle
            cx="50"
            cy="50"
            r="45"
            fill="none"
            stroke={`url(#gradient-${label})`}
            strokeWidth="8"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset: strokeDashoffset }}
            transition={{ duration: 1.5, ease: 'easeOut' }}
            strokeLinecap="round"
          />

          {/* Glow effect */}
          <circle
            cx="50"
            cy="50"
            r="45"
            fill="none"
            stroke={color === 'green' ? '#10b981' : color === 'red' ? '#ef4444' : color === 'yellow' ? '#f59e0b' : color === 'purple' ? '#a855f7' : '#0ea5e9'}
            strokeWidth="8"
            opacity="0.15"
            filter="url(#blur)"
          />
          <filter id="blur">
            <feGaussianBlur in="SourceGraphic" stdDeviation="3" />
          </filter>
        </svg>

        {/* Center content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <motion.div
            key={value}
            initial={{ scale: 1.2, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.3 }}
            className={`${sizeConfig.text} font-bold bg-gradient-to-r ${config.gradient} bg-clip-text text-transparent`}
          >
            {Math.round(value)}
          </motion.div>
          <div className="text-xs text-slate-400 mt-1">
            {label.includes('Confidence') ? '%' : ''}
          </div>
        </div>
      </div>

      {/* Label */}
      {label && (
        <div className="text-center">
          <p className="text-slate-300 font-semibold">{label}</p>
        </div>
      )}
    </motion.div>
  );
};

export const GradientBar = ({ value = 0, max = 100, label = '', color = 'blue', showValue = true }) => {
  const percentage = (value / max) * 100;

  const colorConfig = {
    blue: 'from-blue-500 to-cyan-400',
    green: 'from-green-500 to-emerald-400',
    yellow: 'from-yellow-500 to-orange-400',
    red: 'from-red-500 to-orange-400',
    purple: 'from-purple-500 to-pink-400',
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="w-full"
    >
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm font-semibold text-slate-300">{label}</span>
        {showValue && (
          <motion.span
            key={value}
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
            className="text-sm font-bold text-cyan-400"
          >
            {Math.round(value)}
          </motion.span>
        )}
      </div>

      {/* Bar container */}
      <div className="relative h-3 bg-gradient-to-r from-white/5 to-white/10 rounded-full overflow-hidden border border-white/10">
        {/* Fill */}
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 1.5, ease: 'easeOut' }}
          className={`h-full bg-gradient-to-r ${colorConfig[color]} rounded-full`}
        />

        {/* Glow */}
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 1.5, ease: 'easeOut' }}
          className={`absolute h-full bg-gradient-to-r ${colorConfig[color]} rounded-full blur-lg opacity-50`}
        />
      </div>
    </motion.div>
  );
};
