'use client';

export default function TransactionStatus({ txStatus }) {
  const getStatusStyles = () => {
    switch (txStatus.status) {
      case 'success':
        return {
          bgColor: 'bg-green-50',
          borderColor: 'border-green-200',
          textColor: 'text-green-900',
          badgeColor: 'bg-green-200 text-green-800',
          statusText: 'Success',
        };
      case 'pending':
        return {
          bgColor: 'bg-blue-50',
          borderColor: 'border-blue-200',
          textColor: 'text-blue-900',
          badgeColor: 'bg-blue-200 text-blue-800',
          statusText: 'Processing',
        };
      case 'error':
        return {
          bgColor: 'bg-red-50',
          borderColor: 'border-red-200',
          textColor: 'text-red-900',
          badgeColor: 'bg-red-200 text-red-800',
          statusText: 'Error',
        };
      default:
        return {
          bgColor: 'bg-gray-50',
          borderColor: 'border-gray-200',
          textColor: 'text-gray-900',
          badgeColor: 'bg-gray-200 text-gray-800',
          statusText: 'Unknown',
        };
    }
  };

  const styles = getStatusStyles();

  return (
    <div className={`border border-2 rounded-lg p-6 mb-8 ${styles.borderColor} ${styles.bgColor}`}>
      <div className="flex items-center justify-between mb-4">
        <span className={`inline-block px-3 py-1 rounded-full text-sm font-semibold ${styles.badgeColor}`}>
          {styles.statusText}
        </span>
        {txStatus.status === 'pending' && (
          <div className="flex space-x-2">
            <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce"></div>
            <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
            <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
          </div>
        )}
      </div>

      <p className={`font-semibold ${styles.textColor} mb-4`}>{txStatus.message}</p>

      {txStatus.txId && (
        <div className="mt-4 space-y-2">
          <div>
            <p className={`text-sm font-medium ${styles.textColor}`}>Transaction ID</p>
            <p className="text-xs font-mono text-gray-600 break-all bg-white bg-opacity-50 p-2 rounded border border-current border-opacity-20">
              {txStatus.txId}
            </p>
          </div>

          {txStatus.round && (
            <div>
              <p className={`text-sm font-medium ${styles.textColor}`}>Confirmed Round</p>
              <p className="text-lg font-semibold text-gray-900">{txStatus.round}</p>
            </div>
          )}

          {/* Algorand Testnet Explorer Link */}
          <div className="mt-4 pt-4 border-t border-current border-opacity-20">
            <a
              href={`https://testnet.algoexplorer.io/tx/${txStatus.txId}`}
              target="_blank"
              rel="noopener noreferrer"
              className={`inline-block text-sm font-semibold ${styles.textColor} hover:underline`}
            >
              View on Algorand Testnet Explorer →
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
