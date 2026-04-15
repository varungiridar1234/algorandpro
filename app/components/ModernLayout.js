'use client';

import { motion } from 'framer-motion';
import React from 'react';

export const ModernLayout = ({ children, title, subtitle }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 overflow-hidden relative relative">
      {/* Animated gradient background elements */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-gradient-to-br from-blue-500/20 to-purple-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-gradient-to-br from-pink-500/20 to-orange-500/10 rounded-full blur-3xl animate-pulse animation-delay-2000" />
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-96 h-96 bg-gradient-to-br from-cyan-500/10 to-blue-500/10 rounded-full blur-3xl animate-pulse animation-delay-1000" />
      </div>

      {/* Grid pattern overlay */}
      <div className="fixed inset-0 pointer-events-none opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: 'linear-gradient(0deg, transparent 24%, rgba(255,255,255,.02) 25%, rgba(255,255,255,.02) 26%, transparent 27%, transparent 74%, rgba(255,255,255,.02) 75%, rgba(255,255,255,.02) 76%, transparent 77%, transparent), linear-gradient(90deg, transparent 24%, rgba(255,255,255,.02) 25%, rgba(255,255,255,.02) 26%, transparent 27%, transparent 74%, rgba(255,255,255,.02) 75%, rgba(255,255,255,.02) 76%, transparent 77%, transparent)',
          backgroundSize: '60px 60px'
        }} />
      </div>

      {/* Main content */}
      <div className="relative z-10 flex flex-col min-h-screen">
        {/* Header - Production Grade */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          className="text-center pt-8 md:pt-12 lg:pt-16 pb-6 md:pb-8 lg:pb-12 px-4"
        >
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black bg-gradient-to-r from-blue-400 via-cyan-400 to-purple-400 bg-clip-text text-transparent mb-4 lg:mb-5 leading-tight tracking-tight">
            {title}
          </h1>
          {subtitle && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="text-slate-400 text-sm sm:text-base md:text-lg lg:text-xl font-light tracking-normal max-w-3xl mx-auto leading-relaxed"
            >
              {subtitle}
            </motion.p>
          )}
        </motion.div>

        {/* Content container - Flex grow for proper spacing */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="flex-grow px-4 sm:px-6 md:px-8 lg:px-10 pb-12 md:pb-16 lg:pb-20 max-w-7xl mx-auto w-full"
        >
          {children}
        </motion.div>
      </div>

      {/* Bottom gradient fade */}
      <div className="fixed bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-slate-950 to-transparent pointer-events-none z-0" />
    </div>
  );
};

export const GlassmorphicCard = ({ children, className = '', hover = true, delay = 0 }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay, ease: 'easeOut' }}
      whileHover={hover ? { y: -6, transition: { duration: 0.3 } } : {}}
      className={`backdrop-blur-xl bg-white/8 border border-white/15 rounded-2xl p-6 md:p-8 shadow-2xl hover:shadow-cyan-500/20 hover:border-white/20 transition-all duration-300 ${className}`}
    >
      {children}
    </motion.div>
  );
};

export const GradientButton = ({ onClick, children, variant = 'primary', disabled = false, loading = false, className: customClass = '' }) => {
  const variants = {
    primary: 'bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50',
    secondary: 'bg-white/10 hover:bg-white/15 text-white border border-white/20 hover:border-white/30',
    success: 'bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white shadow-lg shadow-green-500/30 hover:shadow-green-500/50',
    outline: 'border-2 border-white/30 hover:border-white/50 text-white hover:bg-white/5',
  };

  return (
    <motion.button
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      onClick={onClick}
      disabled={disabled || loading}
      className={`${variants[variant]} px-5 md:px-6 lg:px-8 py-2 md:py-3 lg:py-3 rounded-lg lg:rounded-xl font-semibold text-sm md:text-base transition-all duration-300 backdrop-blur-sm border border-transparent disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center gap-2 ${customClass}`}
    >
      {loading && <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />}
      {children}
    </motion.button>
  );
};
