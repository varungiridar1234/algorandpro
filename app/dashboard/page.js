'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function Dashboard() {
  const [applicationData, setApplicationData] = useState(null);
  const [loanDecision, setLoanDecision] = useState(null);

  useEffect(() => {
    // Get data from localStorage (passed from farmer form)
    const storedData = localStorage.getItem('riskData');
    if (storedData) {
      const data = JSON.parse(storedData);
      setApplicationData(data);

      // Determine loan decision based on risk level
      const decision = getLoanDecision(data.riskLevel);
      setLoanDecision(decision);
    }
  }, []);

  const getLoanDecision = (riskLevel) => {
    switch (riskLevel) {
      case 'Low':
        return {
          status: 'APPROVED',
          statusColor: 'text-green-700',
          bgColor: 'bg-green-50',
          borderColor: 'border-green-300',
          message: 'Low risk profile',
          details:
            'Your loan application has been APPROVED. With a low-risk crop prediction, you are eligible for favorable loan terms.',
          interestRate: '5.5% per annum',
          loanAmount: 'Up to $50,000',
          terms: '3-5 years',
          conditions: [
            'Bank will disburse 80% upfront',
            'Remaining 20% after harvest verification',
            'Crop insurance recommended',
          ],
        };
      case 'Medium':
        return {
          status: 'UNDER REVIEW',
          statusColor: 'text-yellow-700',
          bgColor: 'bg-yellow-50',
          borderColor: 'border-yellow-300',
          message: 'Medium risk profile',
          details:
            'Your loan application is UNDER REVIEW. Additional documentation is required to finalize your loan decision.',
          interestRate: '7.5% per annum',
          loanAmount: 'Up to $30,000',
          terms: '2-4 years',
          conditions: [
            'Bank requires additional collateral',
            'Irrigation system verification needed',
            'Crop insurance is mandatory',
            'Additional yield guarantee documentation',
          ],
        };
      case 'High':
        return {
          status: 'REJECTED',
          statusColor: 'text-red-700',
          bgColor: 'bg-red-50',
          borderColor: 'border-red-300',
          message: 'High risk profile',
          details:
            'Your loan application has been REJECTED due to high crop risk. Please consider drought-resistant crops or improved irrigation.',
          suggestions: [
            'Invest in irrigation infrastructure',
            'Switch to drought-resistant crop varieties',
            'Increase land size for better resource distribution',
            'Reapply after addressing risk factors',
          ],
        };
      default:
        return null;
    }
  };

  if (!applicationData || !loanDecision) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 py-12 px-4">
        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-lg shadow-lg p-8 text-center">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Bank Dashboard</h1>
            <p className="text-gray-600 mb-8">
              No loan application data found. Please generate a risk score first.
            </p>
            <Link
              href="/"
              className="inline-block bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-6 rounded-lg transition duration-200"
            >
              Generate Risk Score
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Bank Loan Dashboard</h1>
          <p className="text-gray-600">AI-Powered Loan Application Decision System</p>
        </div>

        {/* Decision Card */}
        <div
          className={`border-2 rounded-lg p-8 mb-8 ${loanDecision.bgColor} ${loanDecision.borderColor}`}
        >
          <div className="text-center mb-6">
            <div className="inline-block mb-4">
              <StatusBadge status={loanDecision.status} color={loanDecision.statusColor} />
            </div>
            <h2 className={`text-3xl font-bold ${loanDecision.statusColor} mb-2`}>
              {loanDecision.status}
            </h2>
            <p className="text-gray-700 font-medium">{loanDecision.message}</p>
          </div>

          <p className={`text-lg ${loanDecision.statusColor} mb-8`}>{loanDecision.details}</p>

          {/* Loan Terms (if approved or under review) */}
          {(loanDecision.status === 'APPROVED' || loanDecision.status === 'UNDER REVIEW') && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
              <div className="bg-white rounded-lg p-4 border border-gray-200">
                <p className="text-sm text-gray-600 mb-1">Interest Rate</p>
                <p className="text-2xl font-bold text-gray-900">{loanDecision.interestRate}</p>
              </div>
              <div className="bg-white rounded-lg p-4 border border-gray-200">
                <p className="text-sm text-gray-600 mb-1">Maximum Loan Amount</p>
                <p className="text-2xl font-bold text-gray-900">{loanDecision.loanAmount}</p>
              </div>
              <div className="bg-white rounded-lg p-4 border border-gray-200">
                <p className="text-sm text-gray-600 mb-1">Loan Terms</p>
                <p className="text-2xl font-bold text-gray-900">{loanDecision.terms}</p>
              </div>
              <div className="bg-white rounded-lg p-4 border border-gray-200">
                <p className="text-sm text-gray-600 mb-1">Risk Level</p>
                <p className="text-2xl font-bold text-gray-900">{applicationData.riskLevel}</p>
              </div>
            </div>
          )}

          {/* Conditions or Suggestions */}
          {loanDecision.conditions && (
            <div className="bg-white bg-opacity-60 rounded-lg p-6 border-l-4 border-blue-500">
              <h3 className="font-semibold text-gray-900 mb-4">Loan Conditions:</h3>
              <ul className="space-y-2">
                {loanDecision.conditions.map((condition, idx) => (
                  <li key={idx} className="flex items-start">
                    <span className="inline-flex items-center justify-center flex-shrink-0 w-5 h-5 rounded-full bg-blue-100 text-blue-600 text-xs font-bold mr-3 mt-0.5">
                      {idx + 1}
                    </span>
                    <span className="text-gray-700">{condition}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {loanDecision.suggestions && (
            <div className="bg-white bg-opacity-60 rounded-lg p-6 border-l-4 border-orange-500">
              <h3 className="font-semibold text-gray-900 mb-4">Recommendations to Improve Application:</h3>
              <ul className="space-y-2">
                {loanDecision.suggestions.map((suggestion, idx) => (
                  <li key={idx} className="flex items-start">
                    <span className="inline-flex items-center justify-center flex-shrink-0 w-5 h-5 rounded-full bg-orange-100 text-orange-600 text-xs font-bold mr-3 mt-0.5">
                      {idx + 1}
                    </span>
                    <span className="text-gray-700">{suggestion}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Application Details */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">Application Details</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="border-l-4 border-green-500 pl-4">
              <p className="text-sm text-gray-600 mb-1">Crop Type</p>
              <p className="text-xl font-semibold text-gray-900 capitalize">{applicationData.cropType}</p>
            </div>
            <div className="border-l-4 border-blue-500 pl-4">
              <p className="text-sm text-gray-600 mb-1">Land Size</p>
              <p className="text-xl font-semibold text-gray-900">{applicationData.landSize} hectares</p>
            </div>
            <div className="border-l-4 border-indigo-500 pl-4">
              <p className="text-sm text-gray-600 mb-1">Annual Rainfall</p>
              <p className="text-xl font-semibold text-gray-900">{applicationData.rainfall} mm</p>
            </div>
            <div className="border-l-4 border-purple-500 pl-4">
              <p className="text-sm text-gray-600 mb-1">Predicted Yield</p>
              <p className="text-xl font-semibold text-gray-900">{applicationData.predictedYield} units</p>
            </div>
            <div className="border-l-4 border-pink-500 pl-4">
              <p className="text-sm text-gray-600 mb-1">Risk Score</p>
              <p className="text-xl font-semibold text-gray-900">{applicationData.riskScore}/100</p>
            </div>
            <div className="border-l-4 border-red-500 pl-4">
              <p className="text-sm text-gray-600 mb-1">Risk Level</p>
              <p className="text-xl font-semibold text-gray-900">{applicationData.riskLevel}</p>
            </div>
          </div>

          {applicationData.txId && (
            <div className="mt-6 pt-6 border-t">
              <p className="text-sm text-gray-600 mb-2">Transaction ID (on Algorand Blockchain)</p>
              <p className="text-xs font-mono text-gray-500 break-all bg-gray-50 p-3 rounded border">
                {applicationData.txId}
              </p>
            </div>
          )}
        </div>

        {/* Blockchain Verification Info */}
        <div className="bg-indigo-50 border border-indigo-200 rounded-lg p-6 mb-8">
          <h3 className="font-semibold text-indigo-900 mb-3">🔗 Blockchain Verification</h3>
          <p className="text-indigo-800 text-sm mb-4">
            This risk assessment and loan decision is powered by AI and stored on the Algorand blockchain for transparency and immutability. The application data has been cryptographically verified.
          </p>
          {applicationData.txId && (
            <a
              href={`https://testnet.algoexplorer.io/tx/${applicationData.txId}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block text-sm font-semibold text-indigo-600 hover:text-indigo-800 hover:underline"
            >
              View on Algorand Explorer →
            </a>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/"
            className="inline-block bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-lg transition duration-200 text-center"
          >
            Generate New Risk Score
          </Link>
          <button
            onClick={() => {
              localStorage.removeItem('riskData');
              window.location.reload();
            }}
            className="inline-block bg-gray-600 hover:bg-gray-700 text-white font-semibold py-3 px-6 rounded-lg transition duration-200"
          >
            Clear Data
          </button>
        </div>
      </div>
    </div>
  );
}

function StatusBadge({ status, color }) {
  const bgColor = {
    'text-green-700': 'bg-green-200',
    'text-yellow-700': 'bg-yellow-200',
    'text-red-700': 'bg-red-200',
  }[color];

  return (
    <span className={`inline-block ${bgColor} ${color} font-bold py-2 px-6 rounded-full text-lg`}>
      {status}
    </span>
  );
}
