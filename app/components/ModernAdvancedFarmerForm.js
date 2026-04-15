'use client';

import { motion } from 'framer-motion';
import React, { useState } from 'react';
import { Cloud, Thermometer, Droplets, Leaf, Sparkles, Zap, CheckCircle, AlertCircle } from 'lucide-react';
import { ModernLayout, GlassmorphicCard, GradientButton } from './ModernLayout';
import { ModernInput, ModernSlider, ModernSelect } from './ModernInputs';
import { ModernRiskDisplay } from './ModernRiskDisplay';
import { ModernClimateSimulator } from './ModernClimateSimulator';

export default function ModernAdvancedFarmerForm() {
  const [formData, setFormData] = useState({
    cropType: 'Rice',
    landSize: 10,
    rainfall: 75,
    temperature: 23,
    soilMoisture: 60,
  });

  const [riskData, setRiskData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [senderAddress, setSenderAddress] = useState('');
  const [testAddress, setTestAddress] = useState(null);
  const [blockchainLoading, setBlockchainLoading] = useState(false);
  const [txStatus, setTxStatus] = useState(null);
  const [simulationMode, setSimulationMode] = useState(false);

  // Fetch test address on mount
  React.useEffect(() => {
    const fetchTestAddress = async () => {
      try {
        const response = await fetch('/api/blockchain');
        const data = await response.json();
        console.log('Blockchain API response:', data);
        if (data.success && data.address) {
          const addressStr = typeof data.address === 'string' ? data.address : String(data.address);
          console.log('Setting address to:', addressStr);
          setTestAddress(addressStr);
          setSenderAddress(addressStr);
        }
      } catch (error) {
        console.error('Error fetching test address:', error);
      }
    };
    fetchTestAddress();
  }, []);

  const handleGenerateRiskScore = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/advanced-risk', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (data.success) {
        setRiskData(data);
        setSimulationMode(false);
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to calculate risk score');
    } finally {
      setLoading(false);
    }
  };

  const handleStoreOnBlockchain = async () => {
    if (!senderAddress.trim()) {
      alert('Please enter an Algorand address');
      return;
    }

    setBlockchainLoading(true);
    setTxStatus(null);
    try {
      const response = await fetch('/api/blockchain', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          senderAddress,
          riskScore: riskData.riskScore,
          riskLevel: riskData.riskLevel,
          predictedYield: riskData.predictedYield,
          cropType: formData.cropType,
        }),
      });

      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Failed to store on blockchain');
      }

      if (data.success) {
        setTxStatus({
          transactionId: data.txId || data.txid || 'Transaction stored',
          success: true,
          message: data.message || '✓ Successfully stored on Algorand testnet!',
        });
      } else {
        throw new Error(data.error || 'Transaction failed');
      }
    } catch (error) {
      console.error('Blockchain error:', error);
      setTxStatus({
        success: false,
        error: error.message,
        message: '❌ ' + (error.message || 'Failed to store on blockchain'),
      });
    } finally {
      setBlockchainLoading(false);
    }
  };

  return (
    <ModernLayout 
      title="Agricultural Risk Intelligence" 
      subtitle="AI-Powered Risk Assessment with Climate Simulation"
    >
      {/* Main content - Vertical stack layout */}
      <div className="flex flex-col gap-6 lg:gap-8 max-w-4xl mx-auto w-full">
        {/* Form Section - Full width at top */}
        <motion.div>
          <div className="space-y-6 lg:space-y-7">
            <GlassmorphicCard>
              {/* Section header with better typography */}
              <h2 className="text-lg lg:text-xl font-black text-white mb-6 lg:mb-7 flex items-center gap-2 tracking-tight">
                <div className="p-2 bg-gradient-to-br from-cyan-400/20 to-blue-400/20 rounded-xl">
                  <Sparkles size={28} className="text-cyan-400" />
                </div>
                Farm Details
              </h2>

              {/* Form fields with consistent spacing */}
              <div className="space-y-5 lg:space-y-6">
                {/* Crop Type Dropdown */}
                <div>
                  <ModernSelect
                    label="Crop Type"
                    value={formData.cropType}
                    onChange={(value) => setFormData({ ...formData, cropType: value })}
                    options={['Wheat', 'Rice', 'Corn', 'Soybean', 'Cotton']}
                    icon={Leaf}
                  />
                </div>

                {/* Land Size Input */}
                <div>
                  <ModernInput
                    label="Land Size"
                    value={formData.landSize}
                    onChange={(e) =>
                      setFormData({ ...formData, landSize: Number(e.target.value) || 0 })
                    }
                    placeholder="Enter hectares"
                    icon={Leaf}
                    type="number"
                    hint="ha"
                  />
                </div>

                {/* Rainfall Slider */}
                <div>
                  <ModernSlider
                    label="Rainfall"
                    value={formData.rainfall}
                    onChange={(value) => setFormData({ ...formData, rainfall: value })}
                    min={0}
                    max={200}
                    unit="mm"
                    icon={Cloud}
                  />
                </div>

                {/* Temperature Slider */}
                <div>
                  <ModernSlider
                    label="Temperature"
                    value={formData.temperature}
                    onChange={(value) => setFormData({ ...formData, temperature: value })}
                    min={-10}
                    max={50}
                    unit="°C"
                    icon={Thermometer}
                  />
                </div>

                {/* Soil Moisture Slider */}
                <div>
                  <ModernSlider
                    label="Soil Moisture"
                    value={formData.soilMoisture}
                    onChange={(value) => setFormData({ ...formData, soilMoisture: value })}
                    min={0}
                    max={100}
                    unit="%"
                    icon={Droplets}
                  />
                </div>
              </div>

              {/* Action Buttons - Improved spacing and sizing */}
              <div className="mt-6 lg:mt-7 space-y-2 lg:space-y-3">
                <GradientButton
                  onClick={handleGenerateRiskScore}
                  loading={loading}
                  variant="primary"
                  customClass="w-full h-12 lg:h-14 text-base lg:text-lg"
                >
                  <Zap size={20} />
                  Generate Risk Score
                </GradientButton>

                {riskData && (
                  <GradientButton
                    onClick={handleStoreOnBlockchain}
                    loading={blockchainLoading}
                    variant="success"
                    customClass="w-full h-12 lg:h-14 text-base lg:text-lg"
                  >
                    Store on Blockchain
                  </GradientButton>
                )}
              </div>
            </GlassmorphicCard>
          </div>
        </motion.div>

        {/* Results Section - Appears below form when data exists */}
        {riskData && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="space-y-6 lg:space-y-8 xl:space-y-10">
              {/* Modern Risk Display */}
              <ModernRiskDisplay riskData={riskData} />

              {/* Climate Simulator */}
              {!simulationMode && (
                <GlassmorphicCard delay={0.4}>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    onClick={() => setSimulationMode(true)}
                    className="w-full py-6 lg:py-8 text-center text-cyan-400 hover:text-cyan-300 font-bold text-lg lg:text-xl transition-colors duration-200 tracking-wide"
                  >
                    🌍 Simulate Climate Scenarios
                  </motion.button>
                </GlassmorphicCard>
              )}

              {simulationMode && (
                <ModernClimateSimulator
                  formData={formData}
                  onClose={() => setSimulationMode(false)}
                />
              )}

              {/* Blockchain Section - Enhanced */}
              {riskData && (
                <GlassmorphicCard delay={0.5}>
                  <h3 className="text-xl lg:text-2xl font-bold text-white mb-6 lg:mb-8 flex items-center gap-2">
                    <div className="p-2 bg-gradient-to-br from-blue-400/20 to-cyan-400/20 rounded-lg">
                      <Zap size={24} className="text-blue-400" />
                    </div>
                    Store on Blockchain
                  </h3>
                  <div className="space-y-5">
                    {/* Address Input with Button */}
                    <div>
                      <label className="block text-sm lg:text-base font-semibold text-slate-300 mb-3">
                        Algorand Address (Auto-filled for testing)
                      </label>
                      <div className="flex gap-3">
                        <input
                          type="text"
                          value={senderAddress}
                          onChange={(e) => setSenderAddress(e.target.value)}
                          placeholder="Test address will appear here..."
                          readOnly={!!testAddress}
                          className="flex-1 bg-gradient-to-r from-white/6 to-white/12 border-2 border-white/15 rounded-lg px-4 py-2 text-white placeholder-slate-500 placeholder-opacity-60 focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/30 text-sm transition-all duration-300"
                        />
                        <motion.button
                          whileHover={{ scale: 1.03 }}
                          whileTap={{ scale: 0.97 }}
                          onClick={handleStoreOnBlockchain}
                          disabled={blockchainLoading || !senderAddress || typeof senderAddress !== 'string' || !senderAddress.trim()}
                          className="px-5 py-2 bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white font-semibold rounded-lg text-sm transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 whitespace-nowrap h-10"
                        >
                          {blockchainLoading ? (
                            <>
                              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                              Storing...
                            </>
                          ) : (
                            <>
                              <Zap size={16} />
                              Store
                            </>
                          )}
                        </motion.button>
                      </div>
                      {testAddress && typeof testAddress === 'string' && (
                        <p className="text-xs text-cyan-400/80 mt-2">
                          ✓ Using test account: {testAddress.substring(0, 10)}...{testAddress.substring(-10)}
                        </p>
                      )}
                    </div>

                    {/* Success Message with Explorer Link */}
                    {txStatus && txStatus.success && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-green-500/15 border-2 border-green-500/60 rounded-lg p-5 lg:p-6 space-y-4"
                      >
                        <div className="flex items-center gap-3">
                          <CheckCircle size={24} className="text-green-400 flex-shrink-0" />
                          <div>
                            <p className="text-green-400 font-bold text-base lg:text-lg">✓ Successfully Stored!</p>
                            <p className="text-green-300/70 text-xs lg:text-sm">Your risk assessment has been saved</p>
                          </div>
                        </div>
                        
                        <div className="space-y-3 bg-black/40 rounded-lg p-4">
                          <div>
                            <p className="text-green-300/80 text-xs lg:text-sm font-semibold mb-2">
                              📋 Transaction ID:
                            </p>
                            <div className="bg-black/60 border border-green-500/30 rounded p-3 select-all">
                              <p className="text-green-300 font-mono text-sm lg:text-base break-all">
                                {txStatus.transactionId || 'Processing...'}
                              </p>
                            </div>
                          </div>
                          
                          <div>
                            <p className="text-green-300/80 text-xs lg:text-sm font-semibold mb-2">
                              🌐 Network: Algorand Testnet
                            </p>
                            <p className="text-green-300/70 text-xs lg:text-sm">
                              Demo Mode - Transaction recorded locally
                            </p>
                          </div>
                        </div>

                        <div className="flex flex-col gap-2">
                          <div className="bg-blue-600/20 border border-blue-500/30 rounded-lg p-3">
                            <p className="text-blue-300/80 text-xs lg:text-sm font-semibold">
                              ✓ Transaction submitted to Algorand Testnet
                            </p>
                          </div>
                          <div className="flex gap-2">
                            <button
                              onClick={() => {
                                navigator.clipboard.writeText(txStatus.transactionId);
                                alert('Transaction ID copied to clipboard!');
                              }}
                              className="flex-1 inline-flex items-center justify-center gap-2 bg-cyan-600/20 hover:bg-cyan-600/30 text-cyan-400 hover:text-cyan-300 px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200 border border-cyan-500/30"
                            >
                              📋 Copy Transaction ID
                            </button>
                            <a
                              href={`https://testnet.algoexplorer.io/tx/${txStatus.transactionId}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex-1 inline-flex items-center justify-center gap-2 bg-purple-600/20 hover:bg-purple-600/30 text-purple-400 hover:text-purple-300 px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200 border border-purple-500/30"
                            >
                              🔗 View on Explorer
                            </a>
                          </div>
                        </div>
                      </motion.div>
                    )}

                    {/* Error Message */}
                    {txStatus && !txStatus.success && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-red-500/15 border border-red-500/40 rounded-lg p-4 lg:p-5 space-y-2"
                      >
                        <div className="flex items-center gap-2">
                          <AlertCircle size={20} className="text-red-400 flex-shrink-0" />
                          <p className="text-red-400 font-semibold text-sm lg:text-base">
                            Failed to Store
                          </p>
                        </div>
                        <p className="text-red-300/80 text-xs lg:text-sm pl-6">
                          {txStatus.message || 'Failed to store on blockchain'}
                        </p>
                      </motion.div>
                    )}

                    {/* Info Text */}
                    <p className="text-xs lg:text-sm text-slate-400 leading-relaxed">
                      Your risk assessment will be permanently stored on Algorand testnet with full verification and transparency.
                    </p>
                  </div>
                </GlassmorphicCard>
              )}
            </div>
          </motion.div>
        )}

        {/* Empty State - Shows when no results yet */}
        {!riskData && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
              <GlassmorphicCard className="h-full min-h-96 lg:min-h-[500px] flex items-center justify-center">
                <div className="text-center">
                  <motion.div
                    animate={{ y: [0, -10, 0] }}
                    transition={{ duration: 3, repeat: Infinity }}
                    className="w-20 h-20 lg:w-24 lg:h-24 mx-auto mb-6 lg:mb-8 rounded-full bg-gradient-to-br from-cyan-400/25 to-blue-400/25 flex items-center justify-center"
                  >
                    <Sparkles size={44} className="text-cyan-400" />
                  </motion.div>
                  <h3 className="text-2xl lg:text-3xl font-bold text-white mb-3 lg:mb-4 tracking-tight">
                    Ready to Assess
                  </h3>
                  <p className="text-slate-400 text-base lg:text-lg font-light leading-relaxed max-w-sm">
                    Fill in your farm details and click "Generate Risk Score" to get started with AI-powered risk analysis.
                  </p>
                </div>
              </GlassmorphicCard>
            </motion.div>
        )}
      </div>

      {/* Navigation footer */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="mt-12 flex justify-center gap-4"
      >
        <a
          href="/bank"
          className="px-6 py-2 text-sm font-semibold text-slate-300 hover:text-white transition-colors duration-200"
        >
          → Bank Dashboard
        </a>
        <a
          href="/dashboard"
          className="px-6 py-2 text-sm font-semibold text-slate-300 hover:text-white transition-colors duration-200"
        >
          → Full Dashboard
        </a>
      </motion.div>
    </ModernLayout>
  );
}
