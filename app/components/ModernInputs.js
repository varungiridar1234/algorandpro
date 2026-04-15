'use client';

import { motion } from 'framer-motion';
import React, { useState } from 'react';
import { Cloud, Thermometer, Droplets, Leaf } from 'lucide-react';

export const ModernInput = ({ label, value, onChange, placeholder, icon: Icon, type = 'text', disabled = false, hint = '' }) => {
  const [focused, setFocused] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="relative group w-full"
    >
      {/* Label with better spacing */}
      <div className="flex items-baseline justify-between mb-3 lg:mb-3">
        <label className="block text-sm lg:text-base font-semibold text-slate-200 tracking-normal">
          {label}
        </label>
        {hint && (
          <span className="text-xs text-slate-500 font-medium">{hint}</span>
        )}
      </div>

      <div className="relative group">
        {/* Icon with improved positioning */}
        {Icon && (
          <motion.div
            animate={{ color: focused ? '#06b6d4' : '#64748b' }}
            className="absolute left-4 lg:left-5 top-1/2 transform -translate-y-1/2 transition-all duration-300 pointer-events-none"
          >
            <Icon size={18} />
          </motion.div>
        )}

        {/* Input field with production spacing */}
        <input
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          disabled={disabled}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          className={`w-full bg-gradient-to-r from-white/6 to-white/12 border-2 transition-all duration-300 rounded-lg lg:rounded-xl py-3 lg:py-3 px-4 lg:px-5 ${
            Icon ? 'pl-12 lg:pl-14' : 'pl-4 lg:pl-5'
          } pr-4 lg:pr-5 text-white text-sm lg:text-base placeholder-slate-500 placeholder-opacity-60 focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/30 disabled:opacity-50 disabled:cursor-not-allowed font-medium ${
            focused ? 'border-cyan-400/60 shadow-lg shadow-cyan-500/15' : 'border-white/15'
          }`}
        />

        {/* Background blur effect on focus */}
        {focused && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute inset-0 bg-cyan-500/8 blur-xl rounded-lg lg:rounded-xl pointer-events-none" 
          />
        )}
      </div>
    </motion.div>
  );
};

export const ModernSlider = ({ label, value, onChange, min = 0, max = 100, unit = '', icon: Icon }) => {
  const percentage = ((value - min) / (max - min)) * 100;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="w-full"
    >
      {/* Label with better spacing and icon alignment */}
      <div className="flex items-center gap-2 mb-3 lg:mb-4">
        {Icon && <Icon size={18} className="text-cyan-400 flex-shrink-0" />}
        <label className="block text-sm lg:text-base font-semibold text-slate-200 tracking-normal">
          {label}
        </label>
      </div>

      <div className="space-y-4 lg:space-y-5">
        {/* Slider track with better visual hierarchy */}
        <div className="relative h-2 lg:h-3 bg-gradient-to-r from-white/5 to-white/10 rounded-full overflow-hidden border border-white/15 shadow-inner">
          {/* Progress fill gradient */}
          <motion.div
            layoutId={`slider-progress-${label}`}
            className="absolute h-full bg-gradient-to-r from-blue-500 via-cyan-500 to-blue-400 rounded-full shadow-lg shadow-cyan-500/30"
            style={{ width: `${percentage}%` }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
          />

          {/* Glow effect */}
          <motion.div
            className="absolute h-full bg-cyan-400/40 rounded-full blur-xl"
            style={{ width: `${percentage}%` }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
          />

          {/* Slider input (hidden) */}
          <input
            type="range"
            min={min}
            max={max}
            value={value}
            onChange={(e) => onChange(Number(e.target.value))}
            className="absolute inset-0 w-full opacity-0 cursor-pointer [&::-webkit-slider-thumb]:w-7 [&::-webkit-slider-thumb]:h-7 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:shadow-lg [&::-webkit-slider-thumb]:shadow-cyan-500/60 [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-cyan-400/30"
          />
        </div>

        {/* Value display with better spacing */}
        <div className="flex justify-between items-center px-1">
          <span className="text-xs lg:text-sm text-slate-500 font-semibold">{min}</span>
          <motion.div
            key={value}
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="text-center"
          >
            <p className="text-lg lg:text-xl font-bold text-cyan-400 tracking-wide">
              {value}
            </p>
            <p className="text-xs lg:text-sm text-slate-500 font-medium mt-1">{unit}</p>
          </motion.div>
          <span className="text-xs lg:text-sm text-slate-500 font-semibold">{max}</span>
        </div>
      </div>
    </motion.div>
  );
};

export const ModernSelect = ({ label, value, onChange, options, icon: Icon }) => {
  const [open, setOpen] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="w-full"
    >
      {/* Label with icon */}
      <div className="flex items-center gap-3 mb-4 lg:mb-5">
        {Icon && <Icon size={22} className="text-cyan-400 flex-shrink-0" />}
        <label className="block text-base lg:text-lg font-semibold text-slate-200 tracking-wide">
          {label}
        </label>
      </div>

      <div className="relative">
        <motion.button
          onClick={() => setOpen(!open)}
          whileHover={{ scale: 1.01 }}
          className="w-full bg-gradient-to-r from-white/6 to-white/12 border-2 border-white/15 hover:border-cyan-400/60 transition-all duration-300 rounded-2xl lg:rounded-3xl py-4 lg:py-5 px-6 lg:px-7 text-white text-base lg:text-lg text-left flex justify-between items-center cursor-pointer font-medium"
        >
          <span>{value}</span>
          <motion.svg
            className="w-6 h-6 flex-shrink-0 text-cyan-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            animate={{ rotate: open ? 180 : 0 }}
            transition={{ duration: 0.3 }}
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </motion.svg>
        </motion.button>

        {/* Dropdown menu with better spacing */}
        <motion.div
          initial={{ opacity: 0, y: -15, scaleY: 0.95 }}
          animate={open ? { opacity: 1, y: 0, scaleY: 1 } : { opacity: 0, y: -15, scaleY: 0.95 }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
          origin="top"
          className={`absolute top-full left-0 right-0 mt-3 bg-gradient-to-b from-slate-900/98 to-slate-950/98 backdrop-blur-xl border border-white/15 rounded-2xl lg:rounded-3xl overflow-hidden z-50 shadow-2xl shadow-black/50 ${
            !open && 'pointer-events-none'
          }`}
        >
          {options.map((option, idx) => (
            <motion.button
              key={option}
              onClick={() => {
                onChange(option);
                setOpen(false);
              }}
              whileHover={{ backgroundColor: 'rgba(34, 211, 238, 0.12)' }}
              className={`w-full text-left px-6 lg:px-8 py-4 lg:py-5 text-base lg:text-lg transition-colors duration-200 border-b border-white/8 last:border-b-0 font-medium ${
                value === option ? 'bg-cyan-500/25 text-cyan-300' : 'text-white hover:bg-white/5'
              }`}
            >
              {option}
            </motion.button>
          ))}
        </motion.div>

        {/* Backdrop to close menu */}
        {open && (
          <div
            className="fixed inset-0 z-40"
            onClick={() => setOpen(false)}
          />
        )}
      </div>
    </motion.div>
  );
};
