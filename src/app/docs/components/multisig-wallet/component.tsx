import React, { useState } from 'react';
import { MultisigWalletProps } from './types';
import { formatAddress, formatEther, formatTimestamp } from './untils';	

export const MultisigWallet: React.FC<MultisigWalletProps> = ({
  walletAddress,
  signers,
  transactions,
  requiredApprovals,
  onPropose,
  onApprove,
  onReject,
  className = ''
}) => {
  const [isProposing, setIsProposing] = useState(false);
  const [activeTab, setActiveTab] = useState<'pending' | 'executed' | 'all'>('pending');
  const [hoveredTx, setHoveredTx] = useState<string | null>(null);
  const [newTx, setNewTx] = useState({
    description: '',
    to: '',
    value: '',
    data: ''
  });

  const filteredTransactions = transactions.filter(tx => 
    activeTab === 'all' || tx.status === activeTab
  );

  const handlePropose = () => {
    onPropose?.({
      ...newTx,
      proposer: '',
      approvals: 0,
      requiredApprovals,
      signers: signers.map(s => ({ ...s, hasApproved: false }))
    });
    setIsProposing(false);
    setNewTx({ description: '', to: '', value: '', data: '' });
  };

  return (
    <div className={`bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm 
      transition-all duration-300 hover:shadow-lg ${className}`}>
      {/* Header */}
      <div className="p-6 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Multi-Signature Wallet</h2>
            <div className="flex items-center mt-2 space-x-2">
              <span className="text-sm text-gray-500 dark:text-gray-400">Address:</span>
              <code className="text-sm bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded text-gray-900 dark:text-white
                transition-colors duration-200 hover:bg-gray-200 dark:hover:bg-gray-600 cursor-pointer group">
                {formatAddress(walletAddress)}
                <span className="text-xs text-blue-500 ml-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  Copy
                </span>
              </code>
            </div>
          </div>
          <div className="text-right">
            <div className="text-sm text-gray-500 dark:text-gray-400">Required Approvals</div>
            <div className="text-2xl font-semibold text-gray-900 dark:text-white">
              {requiredApprovals}/{signers.length}
            </div>
          </div>
        </div>
      </div>

      {/* Signers */}
      <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50">
        <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-3">Signers</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
          {signers.map((signer) => (
            <div
              key={signer.address}
              className="flex items-center space-x-2 bg-white dark:bg-gray-800 p-2 rounded border border-gray-200 
                dark:border-gray-700 transition-all duration-200 hover:shadow-md hover:border-gray-300 
                dark:hover:border-gray-600 group"
            >
              <div className="w-6 h-6 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center
                transition-transform duration-200 group-hover:scale-110">
                <span className="text-sm font-medium text-gray-900 dark:text-white">
                  {signer.name?.[0] || 'S'}
                </span>
              </div>
              <div className="min-w-0">
                {signer.name && (
                  <p className="text-sm font-medium text-gray-900 dark:text-white truncate">{signer.name}</p>
                )}
                <code className="text-xs text-gray-500 dark:text-gray-400 truncate group-hover:text-blue-500 
                  transition-colors">
                  {formatAddress(signer.address)}
                </code>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Transactions */}
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <div className="flex space-x-1 bg-gray-100 dark:bg-gray-800 rounded-lg p-1">
            {(['pending', 'executed', 'all'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-3 py-1.5 text-sm font-medium rounded transition-all duration-200
                  ${activeTab === tab 
                    ? 'bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 shadow-sm'
                    : 'text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700'
                  }`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>
          <button
            onClick={() => setIsProposing(true)}
            className="inline-flex items-center px-3 py-1.5 bg-gray-900 dark:bg-gray-100 text-white 
              dark:text-gray-900 rounded hover:bg-gray-800 dark:hover:bg-gray-200 transition-all 
              duration-200 text-sm hover:shadow-md active:scale-95"
          >
            <svg className="w-4 h-4 mr-2 transition-transform duration-200 group-hover:scale-110" 
              fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            New Transaction
          </button>
        </div>

        <div className="space-y-3">
          {filteredTransactions.map((tx) => (
            <div
              key={tx.id}
              onMouseEnter={() => setHoveredTx(tx.id)}
              onMouseLeave={() => setHoveredTx(null)}
              className={`border border-gray-200 dark:border-gray-700 rounded-lg transition-all duration-200
                ${hoveredTx === tx.id ? 'shadow-md border-gray-300 dark:border-gray-600' : 'hover:shadow-sm'}`}
            >
              <div className="p-4">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-white">{tx.description}</h4>
                    <div className="flex items-center mt-1 space-x-4">
                      <code className="text-sm text-gray-500 dark:text-gray-400">
                        To: {formatAddress(tx.to)}
                      </code>
                      <span className="text-sm text-gray-500 dark:text-gray-400">
                        Value: {formatEther(tx.value)} ETH
                      </span>
                    </div>
                  </div>
                  <span className={`px-2 py-1 text-xs rounded-full
                    ${tx.status === 'executed' ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400' :
                      tx.status === 'rejected' ? 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400' :
                      'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300'}`}
                  >
                    {tx.status.charAt(0).toUpperCase() + tx.status.slice(1)}
                  </span>
                </div>

                {/* Progress Bar */}
                <div className="w-full bg-gray-100 dark:bg-gray-700 rounded-full h-1.5 mb-3">
                  <div
                    className="bg-gray-900 dark:bg-gray-100 h-1.5 rounded-full transition-all duration-500"
                    style={{ width: `${(tx.approvals / tx.requiredApprovals) * 100}%` }}
                  />
                </div>

                <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
                  <div>
                    {tx.approvals} of {tx.requiredApprovals} approvals
                  </div>
                  <div>
                    Proposed {formatTimestamp(tx.timestamp)}
                  </div>
                </div>

                {tx.status === 'pending' && (
                  <div className="mt-4 flex space-x-2">
                    <button
                      onClick={() => onApprove?.(tx.id)}
                      className="flex-1 px-3 py-1.5 bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 rounded text-sm
                        hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors disabled:opacity-50 
                        disabled:cursor-not-allowed"
                      disabled={tx.signers.find(s => s.address === '')?.hasApproved}
                    >
                      Approve
                    </button>
                    <button
                      onClick={() => onReject?.(tx.id)}
                      className="flex-1 px-3 py-1.5 border border-gray-200 dark:border-gray-700 rounded text-sm
                        text-gray-900 dark:text-white hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                    >
                      Reject
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal with backdrop blur and fade */}
      {isProposing && (
        <div 
          className="fixed inset-0 bg-black/50 dark:bg-black/70 backdrop-blur-sm flex items-center 
            justify-center z-50 animate-fade-in"
          onClick={() => setIsProposing(false)}
        >
          <div 
            className="bg-white dark:bg-gray-800 rounded-lg w-full max-w-md mx-4 shadow-2xl 
              animate-slide-up"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between p-6 border-b">
              <h3 className="text-lg font-semibold">New Transaction</h3>
              <button
                onClick={() => setIsProposing(false)}
                className="rounded-full p-1.5 hover:bg-gray-100 transition-colors"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="p-6 space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">
                  Description
                </label>
                <input
                  type="text"
                  value={newTx.description}
                  onChange={(e) => setNewTx({ ...newTx, description: e.target.value })}
                  className="w-full px-3 py-2 text-sm border rounded-md 
                    focus:outline-none focus:ring-1 focus:ring-black"
                  placeholder="Enter transaction description"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">
                  To Address
                </label>
                <input
                  type="text"
                  value={newTx.to}
                  onChange={(e) => setNewTx({ ...newTx, to: e.target.value })}
                  className="w-full px-3 py-2 text-sm border rounded-md font-mono
                    focus:outline-none focus:ring-1 focus:ring-black"
                  placeholder="0x..."
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">
                  Value (ETH)
                </label>
                <input
                  type="number"
                  value={newTx.value}
                  onChange={(e) => setNewTx({ ...newTx, value: e.target.value })}
                  className="w-full px-3 py-2 text-sm border rounded-md
                    focus:outline-none focus:ring-1 focus:ring-black"
                  placeholder="0.0"
                  step="0.0001"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">
                  Data (hex)
                </label>
                <input
                  type="text"
                  value={newTx.data}
                  onChange={(e) => setNewTx({ ...newTx, data: e.target.value })}
                  className="w-full px-3 py-2 text-sm border rounded-md font-mono
                    focus:outline-none focus:ring-1 focus:ring-black"
                  placeholder="0x"
                />
              </div>
            </div>

            <div className="p-6 border-t bg-gray-50 flex space-x-3">
              <button
                onClick={handlePropose}
                className="flex-1 px-4 py-2 bg-black text-white rounded-md text-sm
                  hover:bg-gray-800 transition-colors"
              >
                Confirm
              </button>
              <button
                onClick={() => setIsProposing(false)}
                className="flex-1 px-4 py-2 border border-gray-200 rounded-md text-sm
                  hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}; 