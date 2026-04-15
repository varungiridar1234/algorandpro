'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { ModernLayout, GlassmorphicCard, GradientButton } from '@/components/ModernLayout';
import { CheckCircle, XCircle, AlertCircle, TrendingUp, Share2 } from 'lucide-react';

export default function BankPage() {
  const [transaction, setTransaction] = useState(null);
  const [decision, setDecision] = useState(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const lastTx = localStorage.getItem('lastTransaction');
    if (lastTx) {
      const data = JSON.parse(lastTx);
      setTransaction(data);
      calculateDecision(data);
    }
  }, []);

  const calculateDecision = (txData) => {
    const riskScore = txData.riskScore || 50;
    const confidenceScore = txData.confidenceScore || 50;

    let status = 'UNDER_REVIEW';
    let message = '';
    let terms = {};

    if (riskScore < 35) {
      if (confidenceScore >= 80) {
        status = 'APPROVED';
        message = 'Your farm shows excellent conditions with high confidence. Loan approved!';
        terms = { rate: 4.5, amount: 75000, tenure: '5 years' };
      } else if (confidenceScore >= 60) {
        status = 'APPROVED';
        message = 'Your farm shows good conditions. Loan approved with standard terms.';
        terms = { rate: 5.5, amount: 50000, tenure: '5 years' };
      } else {
        status = 'UNDER_REVIEW';
        message = 'Good conditions but moderate prediction confidence. Manual review required.';
        terms = { rate: 6.5, amount: 30000, tenure: '3 years' };
      }
    } else if (riskScore < 65) {
      status = 'UNDER_REVIEW';
      message = 'Moderate risk detected. Application under review for special terms.';
      terms = { rate: 7.5, amount: 25000, tenure: '3 years' };
    } else {
      status = 'REJECTED';
      message = 'High risk detected. Application cannot be approved at this time.';
      terms = {};
    }

    setDecision({ status, message, terms });
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const statusConfig = {
    APPROVED: {
      icon: CheckCircle,
      color: 'from-green-500 to-emerald-500',
      textColor: 'text-green-400',
      bgColor: 'bg-green-500/10',
      borderColor: 'border-green-500/30',
    },
    REJECTED: {
      icon: XCircle,
      color: 'from-red-500 to-orange-500',
      textColor: 'text-red-400',
      bgColor: 'bg-red-500/10',
      borderColor: 'border-red-500/30',
    },
    UNDER_REVIEW: {
      icon: AlertCircle,
      color: 'from-yellow-500 to-orange-500',
      textColor: 'text-yellow-400',
      bgColor: 'bg-yellow-500/10',
      borderColor: 'border-yellow-500/30',
    },
  };

  if (!transaction || !decision) {
    return (
      <ModernLayout title="Bank Dashboard" subtitle="Load your assessment to see loan decision">
        <GlassmorphicCard className="max-w-2xl mx-auto h-64 flex items-center justify-center">
          <div className="text-center">
            <AlertCircle size={48} className="mx-auto mb-4 text-slate-500 animate-pulse" />
            <p className="text-slate-400">No assessment found. Generate a risk score first.</p>
            <a href="/advanced" className="mt-4 inline-block text-cyan-400 hover:text-cyan-300 font-semibold">
              → Go to Assessment
            </a>
          </div>
        </GlassmorphicCard>
      </ModernLayout>
    );
  }

  const config = statusConfig[decision.status];
  const Icon = config.icon;

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
    <ModernLayout title="Loan Decision" subtitle="Based on AI-Powered Agricultural Risk Assessment">
      <motion.div
        className="max-w-4xl mx-auto space-y-8"
        variants={container}
        initial="hidden"
        animate="show"
      >
        {/* Main Decision Card */}
        <motion.div variants={item}>
          <GlassmorphicCard className="overflow-hidden">
            {/* Status header with gradient */}
            <div className={`h-2 w-full bg-gradient-to-r ${config.color}`} />

            <div className="flex items-start gap-8 mb-8">
              {/* Status icon and score */}
              <div className="flex flex-col items-center gap-6">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', stiffness: 100 }}
                  className={`w-24 h-24 rounded-full ${config.bgColor} border-2 ${config.borderColor} flex items-center justify-center`}
                >
                  <Icon size={48} className={config.textColor} />
                </motion.div>

                <div>
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className={`text-2xl font-bold ${config.textColor}`}
                  >
                    {decision.status.replace('_', ' ')}
                  </motion.p>
                </div>
              </div>

              {/* Decision details */}
              <div className="flex-1">
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <h2 className="text-2xl font-bold text-white mb-4">{decision.message}</h2>

                  {/* Risk metrics */}
                  <div className="grid grid-cols-3 gap-4 mt-6">
                    <div className="p-3 rounded-lg bg-white/5">
                      <p className="text-slate-400 text-xs mb-1">Risk Score</p>
                      <p className="text-lg font-bold text-white">{transaction.riskScore}</p>
                    </div>
                    <div className="p-3 rounded-lg bg-white/5">
                      <p className="text-slate-400 text-xs mb-1">Risk Level</p>
                      <p className={`text-lg font-bold ${
                        transaction.riskLevel === 'Low' ? 'text-green-400' :
                        transaction.riskLevel === 'Medium' ? 'text-yellow-400' :
                        'text-red-400'
                      }`}>{transaction.riskLevel}</p>
                    </div>
                    <div className="p-3 rounded-lg bg-white/5">
                      <p className="text-slate-400 text-xs mb-1">Confidence</p>
                      <p className="text-lg font-bold text-cyan-400">{Math.round(transaction.confidenceScore)}%</p>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </GlassmorphicCard>
        </motion.div>

        {/* Loan Terms Card */}
        {decision.status === 'APPROVED' && (
          <motion.div variants={item}>
            <GlassmorphicCard>
              <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
                <TrendingUp size={20} className="text-cyan-400" />
                Loan Terms
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="p-6 rounded-xl bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border border-blue-500/20"
                >
                  <p className="text-slate-400 text-sm mb-2">Interest Rate</p>
                  <p className="text-4xl font-bold text-cyan-400 mb-2">{decision.terms.rate}%</p>
                  <p className="text-xs text-slate-500">Per Annum</p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="p-6 rounded-xl bg-gradient-to-br from-green-500/10 to-emerald-500/10 border border-green-500/20"
                >
                  <p className="text-slate-400 text-sm mb-2">Maximum Loan Amount</p>
                  <p className="text-3xl font-bold text-green-400">${decision.terms.amount.toLocaleString()}</p>
                  <p className="text-xs text-slate-500 mt-2">USD</p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                  className="p-6 rounded-xl bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-purple-500/20"
                >
                  <p className="text-slate-400 text-sm mb-2">Loan Tenure</p>
                  <p className="text-3xl font-bold text-purple-400">{decision.terms.tenure}</p>
                  <p className="text-xs text-slate-500 mt-2">Repayment Period</p>
                </motion.div>
              </div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7 }}
                className="mt-6 p-4 rounded-lg bg-green-500/10 border border-green-500/20"
              >
                <p className="text-green-400 text-sm font-semibold">
                  ✓ Terms are based on your farm's risk profile and AI assessment
                </p>
              </motion.div>
            </GlassmorphicCard>
          </motion.div>
        )}

        {/* Farm Assessment Details */}
        <motion.div variants={item}>
          <GlassmorphicCard>
            <h3 className="text-lg font-bold text-white mb-6">Assessment Details</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Environmental Factors */}
              <div className="space-y-4">
                <h4 className="font-semibold text-slate-300 mb-4">Environmental Factors</h4>
                <div className="space-y-3">
                  {[
                    { label: 'Crop Type', value: transaction.cropType },
                    { label: 'Land Size', value: `${transaction.landSize} hectares` },
                    { label: 'Rainfall', value: `${transaction.rainfall} mm` },
                    { label: 'Temperature', value: `${transaction.temperature}°C` },
                  ].map((item, idx) => (
                    <motion.div
                      key={item.label}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.7 + idx * 0.05 }}
                      className="flex justify-between items-center p-3 rounded-lg bg-white/5"
                    >
                      <span className="text-slate-400">{item.label}</span>
                      <span className="font-semibold text-white">{item.value}</span>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Risk Metrics */}
              <div className="space-y-4">
                <h4 className="font-semibold text-slate-300 mb-4">Risk Metrics</h4>
                <div className="space-y-3">
                  {[
                    { label: 'Risk Score', value: `${transaction.riskScore}/100`, color: 'text-cyan-400' },
                    { label: 'Confidence Score', value: `${Math.round(transaction.confidenceScore)}%`, color: 'text-green-400' },
                    { label: 'Predicted Yield', value: `${Math.round(transaction.predictedYield)} units`, color: 'text-purple-400' },
                  ].map((item, idx) => (
                    <motion.div
                      key={item.label}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.75 + idx * 0.05 }}
                      className="flex justify-between items-center p-3 rounded-lg bg-white/5"
                    >
                      <span className="text-slate-400">{item.label}</span>
                      <span className={`font-semibold ${item.color}`}>{item.value}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </GlassmorphicCard>
        </motion.div>

        {/* Blockchain Verification */}
        {transaction.transactionId && (
          <motion.div variants={item}>
            <GlassmorphicCard>
              <h3 className="text-lg font-bold text-white mb-4">Blockchain Verification</h3>

              <div className="p-4 rounded-lg bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border border-cyan-500/20">
                <p className="text-slate-400 text-sm mb-2">Transaction ID on Algorand Testnet</p>
                <div className="flex items-center gap-3">
                  <code className="flex-1 bg-black/30 p-3 rounded-lg text-cyan-400 font-mono text-sm overflow-x-auto">
                    {transaction.transactionId}
                  </code>
                  <button
                    onClick={() => copyToClipboard(transaction.transactionId)}
                    className="p-3 hover:bg-white/10 rounded-lg transition-colors duration-200"
                  >
                    {copied ? (
                      <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }} className="text-green-400 font-bold">
                        ✓
                      </motion.span>
                    ) : (
                      <Share2 size={18} className="text-slate-400" />
                    )}
                  </button>
                </div>

                <a
                  href={`https://allo.info/tx/${transaction.transactionId}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 inline-block text-cyan-400 hover:text-cyan-300 text-sm font-semibold"
                >
                  → View on Algorand Explorer
                </a>
              </div>
            </GlassmorphicCard>
          </motion.div>
        )}

        {/* Action Buttons */}
        <motion.div variants={item} className="flex flex-col md:flex-row gap-4 justify-center pt-4">
          <GradientButton onClick={() => window.location.href = '/advanced'} variant="secondary">
            ← Back to Assessment
          </GradientButton>
          <GradientButton onClick={() => window.location.href = '/dashboard'} variant="primary">
            Full Dashboard →
          </GradientButton>
        </motion.div>
      </motion.div>
    </ModernLayout>
  );
}
