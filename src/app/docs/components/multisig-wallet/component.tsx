import React, { useState, useEffect, useRef } from 'react';
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
  const [expandedTx, setExpandedTx] = useState<string | null>(null);
  const [copiedAddress, setCopiedAddress] = useState<string | null>(null);
  const [newTransactions, setNewTransactions] = useState<Set<string>>(new Set());
  const [formErrors, setFormErrors] = useState<{
    description?: string;
    to?: string;
    value?: string;
    data?: string;
  }>({});
  const lastTransactionRef = useRef<HTMLDivElement>(null);
  const [newTx, setNewTx] = useState({
    description: '',
    to: '',
    value: '',
    data: ''
  });

  const filteredTransactions = transactions
    .sort((a, b) => b.timestamp - a.timestamp)
    .filter(tx => activeTab === 'all' || tx.status === activeTab);

  // Track new transactions
  useEffect(() => {
    if (transactions.length > 0) {
      const latestTx = transactions[0];
      if (latestTx && !newTransactions.has(latestTx.id)) {
        setNewTransactions(prev => new Set([...prev, latestTx.id]));
        // Remove animation class after animation completes
        setTimeout(() => {
          setNewTransactions(prev => {
            const updated = new Set(prev);
            updated.delete(latestTx.id);
            return updated;
          });
        }, 1000);
      }
    }
  }, [transactions]);

  // Validate Ethereum address
  const isValidAddress = (address: string) => {
    return /^0x[a-fA-F0-9]{40}$/.test(address);
  };

  // Validate form
  const validateForm = () => {
    const errors: typeof formErrors = {};

    if (!newTx.description.trim()) {
      errors.description = 'Description is required';
    }

    if (!newTx.to) {
      errors.to = 'Address is required';
    } else if (!isValidAddress(newTx.to)) {
      errors.to = 'Invalid Ethereum address';
    }

    if (!newTx.value) {
      errors.value = 'Value is required';
    } else if (isNaN(Number(newTx.value)) || Number(newTx.value) < 0) {
      errors.value = 'Invalid value';
    }

    if (newTx.data && !/^0x[a-fA-F0-9]*$/.test(newTx.data)) {
      errors.data = 'Invalid hex data';
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handlePropose = () => {
    try {
      if (!validateForm()) {
        return;
      }

      const newTxId = `tx-${Date.now()}`;
      const transaction = {
        ...newTx,
        id: newTxId,
        proposer: '',
        approvals: 0,
        status: 'pending' as const,
        timestamp: Date.now(),
        requiredApprovals,
        signers: signers.map(s => ({ ...s, hasApproved: false }))
      };

      setNewTransactions(prev => new Set([...prev, newTxId]));
      onPropose?.(transaction);
      setIsProposing(false);
      setNewTx({ description: '', to: '', value: '', data: '' });
      setFormErrors({});

      if (activeTab !== 'pending') {
        setActiveTab('pending');
      }

      setTimeout(() => {
        setNewTransactions(prev => {
          const updated = new Set(prev);
          updated.delete(newTxId);
          return updated;
        });
      }, 1000);
    } catch (error) {
      console.error('Error creating transaction:', error);
      // You could set a general error state here if needed
    }
  };

  // Handle copy address with error handling
  const handleCopyAddress = async (address: string) => {
    try {
      await navigator.clipboard.writeText(address);
      setCopiedAddress(address);
      setTimeout(() => setCopiedAddress(null), 2000);
    } catch (error) {
      console.error('Failed to copy address:', error);
      // You could show a toast/notification here
    }
  };

  // Scroll to new transaction
  useEffect(() => {
    if (lastTransactionRef.current) {
      lastTransactionRef.current.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  }, [transactions.length]);

  return (
    <div className={`bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 
      shadow-sm transition-all duration-300 hover:shadow-lg ${className}`}>
      {/* Header */}
      <div className="p-6 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Multi-Signature Wallet</h2>
            <div className="flex items-center mt-2 space-x-2">
              <span className="text-sm text-gray-500 dark:text-gray-400">Address:</span>
              <div className="group relative">
                <code 
                  onClick={() => handleCopyAddress(walletAddress)}
                  className="text-sm bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded text-gray-900 
                    dark:text-white cursor-pointer transition-colors duration-200 hover:bg-gray-200 
                    dark:hover:bg-gray-600"
                >
                  {formatAddress(walletAddress)}
                </code>
                <span className="invisible group-hover:visible absolute -top-8 left-1/2 transform 
                  -translate-x-1/2 px-2 py-1 text-xs bg-gray-900 dark:bg-gray-100 text-white 
                  dark:text-gray-900 rounded shadow-lg whitespace-nowrap transition-all duration-200">
                  {copiedAddress === walletAddress ? 'Copied!' : 'Click to copy'}
                </span>
              </div>
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
              className="flex items-center space-x-2 bg-white dark:bg-gray-800 p-2 rounded 
                border border-gray-200 dark:border-gray-700 transition-all duration-200 
                hover:shadow-md hover:border-gray-300 dark:hover:border-gray-600 group 
                cursor-pointer"
              onClick={() => handleCopyAddress(signer.address)}
            >
              <div className="w-6 h-6 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center 
                justify-center transition-transform duration-200 group-hover:scale-110">
                <span className="text-sm font-medium text-gray-900 dark:text-white">
                  {signer.name?.[0] || 'S'}
                </span>
              </div>
              <div className="min-w-0">
                {signer.name && (
                  <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                    {signer.name}
                  </p>
                )}
                <code className="text-xs text-gray-500 dark:text-gray-400 truncate 
                  group-hover:text-blue-500 transition-colors">
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
            className="inline-flex items-center px-3 py-1.5 bg-gray-900 dark:bg-gray-100 
              text-white dark:text-gray-900 rounded hover:bg-gray-800 dark:hover:bg-gray-200 
              transition-all duration-200 text-sm hover:shadow-md active:scale-95"
          >
            <svg className="w-4 h-4 mr-2 transition-transform duration-200 group-hover:scale-110" 
              fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            New Transaction
          </button>
        </div>

        <div className="space-y-3">
          {filteredTransactions.map((tx, index) => (
            <div
              key={tx.id}
              ref={index === 0 ? lastTransactionRef : null}
              className={`group border border-gray-200 dark:border-gray-700 rounded-lg bg-white 
                dark:bg-gray-800 overflow-hidden transition-all duration-300 ease-out hover:-translate-y-0.5 
                hover:shadow-md ${newTransactions.has(tx.id) ? 'animate-slide-up' : ''}`}
              onClick={() => setExpandedTx(expandedTx === tx.id ? null : tx.id)}
            >
              <div className="p-4 cursor-pointer">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-white flex items-center">
                      {tx.description}
                      <svg 
                        className={`w-4 h-4 ml-2 transition-transform duration-200 
                          ${expandedTx === tx.id ? 'rotate-180' : ''}`} 
                        fill="none" 
                        viewBox="0 0 24 24" 
                        stroke="currentColor"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                          d="M19 9l-7 7-7-7" />
                      </svg>
                    </h4>
                    <div className="flex items-center mt-1 space-x-4">
                      <div className="group">
                        <code 
                          onClick={(e) => {
                            e.stopPropagation();
                            handleCopyAddress(tx.to);
                          }}
                          className="text-sm text-gray-500 dark:text-gray-400 cursor-pointer 
                            hover:text-blue-500 transition-colors"
                        >
                          To: {formatAddress(tx.to)}
                        </code>
                      </div>
                      <span className="text-sm text-gray-500 dark:text-gray-400">
                        Value: {formatEther(tx.value)} ETH
                      </span>
                    </div>
                  </div>
                  <span className={`px-2 py-1 text-xs rounded-full
                    ${tx.status === 'executed' 
                      ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400'
                      : tx.status === 'rejected'
                      ? 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400'
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300'}`}
                  >
                    {tx.status.charAt(0).toUpperCase() + tx.status.slice(1)}
                  </span>
                </div>

                {/* Progress Bar */}
                <div className="w-full bg-gray-100 dark:bg-gray-700 rounded-full h-1.5 mb-3 overflow-hidden">
                  <div
                    className="bg-gray-900 dark:bg-gray-100 h-1.5 rounded-full transition-all 
                      duration-700 ease-out"
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
              </div>

              <div 
                className={`transition-all duration-300 ease-out overflow-hidden
                  ${expandedTx === tx.id ? 'max-h-96' : 'max-h-0'}`}
              >
                <div className="px-4 pb-4">
                  <div className="mt-4 pt-4 border-t border-gray-100 dark:border-gray-700">
                    <h5 className="text-sm font-medium text-gray-900 dark:text-white mb-2">
                      Approvals
                    </h5>
                    <div className="space-y-2">
                      {tx.signers.map((signer) => (
                        <div 
                          key={signer.address}
                          className="flex items-center justify-between text-sm"
                        >
                          <div className="flex items-center space-x-2">
                            <div className={`w-4 h-4 rounded-full flex items-center justify-center
                              transition-colors duration-200
                              ${signer.hasApproved 
                                ? 'bg-green-100 dark:bg-green-900/30' 
                                : 'bg-gray-100 dark:bg-gray-700'}`}
                            >
                              {signer.hasApproved && (
                                <svg className="w-3 h-3 text-green-700 dark:text-green-400" 
                                  fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" 
                                    strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                              )}
                            </div>
                            <span className="text-gray-900 dark:text-white">
                              {signer.name || formatAddress(signer.address)}
                            </span>
                          </div>
                          <span className={`text-sm transition-colors duration-200
                            ${signer.hasApproved 
                              ? 'text-green-700 dark:text-green-400' 
                              : 'text-gray-500 dark:text-gray-400'}`}
                          >
                            {signer.hasApproved ? 'Approved' : 'Pending'}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {tx.status === 'pending' && (
                    <div className="mt-4 flex space-x-2">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onApprove?.(tx.id);
                        }}
                        className="flex-1 px-3 py-1.5 bg-gray-900 dark:bg-gray-100 text-white 
                          dark:text-gray-900 rounded text-sm hover:bg-gray-800 dark:hover:bg-gray-200 
                          transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed 
                          transform hover:scale-[1.02] active:scale-[0.98]"
                        disabled={tx.signers.find(s => s.address === '')?.hasApproved}
                      >
                        Approve
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onReject?.(tx.id);
                        }}
                        className="flex-1 px-3 py-1.5 border border-gray-200 dark:border-gray-700 
                          rounded text-sm text-gray-900 dark:text-white hover:bg-gray-50 
                          dark:hover:bg-gray-700 transition-all duration-200 transform 
                          hover:scale-[1.02] active:scale-[0.98]"
                      >
                        Reject
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
          {filteredTransactions.length === 0 && (
            <div className="text-center py-8 text-gray-500 dark:text-gray-400">
              {activeTab === 'pending' 
                ? 'No pending transactions'
                : activeTab === 'executed'
                ? 'No executed transactions'
                : 'No transactions found'}
            </div>
          )}
        </div>
      </div>

      {/* Modal */}
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
                  onChange={(e) => {
                    setNewTx({ ...newTx, description: e.target.value });
                    setFormErrors(prev => ({ ...prev, description: undefined }));
                  }}
                  className={`w-full px-3 py-2 text-sm border rounded-md 
                    focus:outline-none focus:ring-1 focus:ring-black
                    ${formErrors.description ? 'border-red-500' : ''}`}
                  placeholder="Enter transaction description"
                />
                {formErrors.description && (
                  <p className="text-xs text-red-500 mt-1">{formErrors.description}</p>
                )}
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">
                  To Address
                </label>
                <input
                  type="text"
                  value={newTx.to}
                  onChange={(e) => {
                    setNewTx({ ...newTx, to: e.target.value });
                    setFormErrors(prev => ({ ...prev, to: undefined }));
                  }}
                  className={`w-full px-3 py-2 text-sm border rounded-md font-mono
                    focus:outline-none focus:ring-1 focus:ring-black
                    ${formErrors.to ? 'border-red-500' : ''}`}
                  placeholder="0x..."
                />
                {formErrors.to && (
                  <p className="text-xs text-red-500 mt-1">{formErrors.to}</p>
                )}
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">
                  Value (ETH)
                </label>
                <input
                  type="number"
                  value={newTx.value}
                  onChange={(e) => {
                    setNewTx({ ...newTx, value: e.target.value });
                    setFormErrors(prev => ({ ...prev, value: undefined }));
                  }}
                  className={`w-full px-3 py-2 text-sm border rounded-md
                    focus:outline-none focus:ring-1 focus:ring-black
                    ${formErrors.value ? 'border-red-500' : ''}`}
                  placeholder="0.0"
                  step="0.0001"
                  min="0"
                />
                {formErrors.value && (
                  <p className="text-xs text-red-500 mt-1">{formErrors.value}</p>
                )}
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">
                  Data (hex)
                </label>
                <input
                  type="text"
                  value={newTx.data}
                  onChange={(e) => {
                    setNewTx({ ...newTx, data: e.target.value });
                    setFormErrors(prev => ({ ...prev, data: undefined }));
                  }}
                  className={`w-full px-3 py-2 text-sm border rounded-md font-mono
                    focus:outline-none focus:ring-1 focus:ring-black
                    ${formErrors.data ? 'border-red-500' : ''}`}
                  placeholder="0x"
                />
                {formErrors.data && (
                  <p className="text-xs text-red-500 mt-1">{formErrors.data}</p>
                )}
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