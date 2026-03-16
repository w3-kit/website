import React, { useState, useEffect, useRef } from 'react';
import { MultisigWalletProps } from './types';
import { formatAddress, formatTimestamp } from './utils';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";


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
    submit?: string;
  }>({});
  const lastTransactionRef = useRef<HTMLDivElement>(null);
  const [newTx, setNewTx] = useState({
    description: '',
    to: '',
    value: '',
    data: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isApproving, setIsApproving] = useState<string | null>(null);
  const [isRejecting, setIsRejecting] = useState<string | null>(null);

  // Add state to manage transactions locally
  const [localTransactions, setLocalTransactions] = useState(transactions);

  // Update transactions when prop changes
  useEffect(() => {
    setLocalTransactions(transactions);
  }, [transactions]);

  // Track new transactions
  useEffect(() => {
    if (transactions.length > 0) {
      const latestTx = transactions[0];
      if (latestTx && !newTransactions.has(latestTx.id)) {
        setNewTransactions(prev => new Set([...prev, latestTx.id]));
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

  const handlePropose = async () => {
    try {
      if (!validateForm()) {
        return;
      }

      setIsSubmitting(true);

      const newTxId = `tx-${Date.now()}`;
      const transaction = {
        ...newTx,
        id: newTxId,
        proposer: signers[0]?.address || '',
        approvals: 0,
        status: 'pending' as const,
        timestamp: Date.now(),
        requiredApprovals,
        signers: signers.map(s => ({ ...s, hasApproved: false }))
      };

      await onPropose?.(transaction);
      setIsProposing(false);
      setNewTx({ description: '', to: '', value: '', data: '' });
      setFormErrors({});

      // Only switch to pending if we're in executed tab
      if (activeTab === 'executed') {
        setActiveTab('pending');
      }
      // Stay in current tab otherwise (all or pending)

    } catch (error) {
      console.error('Error creating transaction:', error);
      setFormErrors(prev => ({
        ...prev,
        submit: 'Failed to create transaction. Please try again.'
      }));
    } finally {
      setIsSubmitting(false);
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



  // Update the approve handler
  const handleApprove = async (txId: string) => {
    try {
      setIsApproving(txId);

      const tx = localTransactions.find(t => t.id === txId);
      if (!tx) return;

      // Check if current signer has already approved
      const currentSigner = signers[0]?.address;
      const hasAlreadyApproved = tx.signers.find(s => s.address === currentSigner)?.hasApproved;

      if (hasAlreadyApproved) {
        return; // Already approved, do nothing
      }

      const updatedTransactions = localTransactions.map(tx => {
        if (tx.id === txId) {
          const newApprovals = tx.approvals + 1;
          const newStatus = newApprovals >= tx.requiredApprovals ? 'executed' as const : 'pending' as const;

          return {
            ...tx,
            approvals: newApprovals,
            status: newStatus,
            signers: tx.signers.map(s =>
              s.address === currentSigner ? { ...s, hasApproved: true } : s
            )
          };
        }
        return tx;
      });

      setLocalTransactions(updatedTransactions);
      await onApprove?.(txId);
      setExpandedTx(null); // Close the card
    } catch (error) {
      console.error('Error approving transaction:', error);
    } finally {
      setIsApproving(null);
    }
  };

  // Update the reject handler
  const handleReject = async (txId: string) => {
    try {
      setIsRejecting(txId);

      const tx = localTransactions.find(t => t.id === txId);
      if (!tx) return;

      const hasAlreadyRejected = tx.status === 'rejected';

      if (hasAlreadyRejected) {
        return; // Already rejected, do nothing
      }

      const updatedTransactions = localTransactions.map(tx => {
        if (tx.id === txId) {
          return {
            ...tx,
            status: 'rejected' as const,
            approvals: 0, // Reset approvals
            signers: tx.signers.map(s => ({
              ...s,
              hasApproved: false // Set all signers to not approved
            }))
          };
        }
        return tx;
      });

      setLocalTransactions(updatedTransactions);
      await onReject?.(txId);
      setExpandedTx(null);
    } catch (error) {
      console.error('Error rejecting transaction:', error);
    } finally {
      setIsRejecting(null);
    }
  };

  // Update the filtered transactions to use local state
  const filteredTransactions = localTransactions
    .sort((a, b) => b.timestamp - a.timestamp)
    .filter(tx => activeTab === 'all' || tx.status === activeTab);

  return (
    <Card className={`transition-all duration-300 hover:shadow-lg ${className}`}>
      {/* Header */}
      <CardHeader className="border-b">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold text-foreground">Multi-Signature Wallet</h2>
            <div className="flex items-center mt-2 space-x-2">
              <span className="text-sm text-muted-foreground">Address:</span>
              <div className="group relative">
                <code
                  onClick={() => handleCopyAddress(walletAddress)}
                  className="text-sm bg-muted px-2 py-1 rounded text-foreground cursor-pointer transition-colors duration-200 hover:bg-muted/80"
                >
                  {formatAddress(walletAddress)}
                </code>
                <span className="invisible group-hover:visible absolute -top-8 left-1/2 transform
                  -translate-x-1/2 px-2 py-1 text-xs bg-popover text-popover-foreground rounded shadow-lg whitespace-nowrap transition-all duration-200">
                  {copiedAddress === walletAddress ? 'Copied!' : 'Click to copy'}
                </span>
              </div>
            </div>
          </div>
          <div className="text-right">
            <div className="text-sm text-muted-foreground">Required Approvals</div>
            <div className="text-2xl font-semibold text-foreground">
              {requiredApprovals}/{signers.length}
            </div>
          </div>
        </div>
      </CardHeader>

      {/* Signers */}
      <div className="px-6 py-4 border-b bg-muted/50">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-medium text-foreground">Signers</h3>
          <span className="text-xs text-muted-foreground">
            {signers.length} signer{signers.length !== 1 ? 's' : ''}
          </span>
        </div>
        <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
          {signers.map((signer) => (
            <Card
              key={signer.address}
              className="flex items-center space-x-3 p-3 transition-all duration-200
                hover:shadow-md group"
            >
              <div className="w-8 h-8 bg-muted rounded-full flex items-center
                justify-center transition-transform duration-200 group-hover:scale-110 flex-shrink-0">
                <span className="text-sm font-medium text-foreground">
                  {signer.name?.[0] || 'S'}
                </span>
              </div>
              <div className="min-w-0 flex-1">
                {signer.name && (
                  <p className="text-sm font-medium text-foreground truncate">
                    {signer.name}
                  </p>
                )}
                <div className="flex items-center gap-2">
                  <code className="text-xs text-muted-foreground truncate
                    group-hover:text-primary transition-colors cursor-pointer"
                    onClick={() => handleCopyAddress(signer.address)}
                  >
                    {formatAddress(signer.address)}
                  </code>
                  {copiedAddress === signer.address && (
                    <span className="text-xs text-success">Copied!</span>
                  )}
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Transactions */}
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <div className="flex space-x-1 bg-muted rounded-lg p-1">
            {(['pending', 'executed', 'all'] as const).map((tab) => (
              <Button
                key={tab}
                variant={activeTab === tab ? "default" : "ghost"}
                size="sm"
                onClick={() => setActiveTab(tab)}
                className="transition-all duration-200"
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </Button>
            ))}
          </div>
          <Button
            onClick={() => setIsProposing(true)}
            size="sm"
            className="hover:shadow-md active:scale-95"
          >
            <svg className="w-4 h-4 mr-2 transition-transform duration-200 group-hover:scale-110"
              fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            New Transaction
          </Button>
        </div>

        <div className="space-y-3 max-h-[600px] overflow-y-auto scrollbar-thin
          scrollbar-thumb-gray-200 dark:scrollbar-thumb-gray-700
          scrollbar-track-transparent">
          {filteredTransactions.map((tx, index) => (
            <Card
              key={tx.id}
              ref={index === 0 ? lastTransactionRef : null}
              className={`group overflow-hidden transition-all duration-300
                hover:-translate-y-0.5 hover:shadow-md
                ${newTransactions.has(tx.id) ? 'animate-slide-up' : ''}`}
              onClick={() => setExpandedTx(expandedTx === tx.id ? null : tx.id)}
            >
              <div className="p-4 cursor-pointer">
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-3">
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium text-foreground flex items-center">
                      <span className="truncate">{tx.description}</span>
                      <svg
                        className={`w-4 h-4 ml-2 flex-shrink-0 transition-transform duration-200
                          ${expandedTx === tx.id ? 'rotate-180' : ''}`}
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                          d="M19 9l-7 7-7-7" />
                      </svg>
                    </h4>
                    <div className="flex flex-col sm:flex-row sm:items-center mt-1 space-y-2
                      sm:space-y-0 sm:space-x-4">
                      <div className="group">
                        <code
                          onClick={(e) => {
                            e.stopPropagation();
                            handleCopyAddress(tx.to);
                          }}
                          className="text-sm text-muted-foreground cursor-pointer
                            hover:text-primary transition-colors truncate block"
                        >
                          To: {formatAddress(tx.to)}
                        </code>
                      </div>
                      <span className="text-sm text-muted-foreground">
                        Value: {Number(tx.value).toLocaleString()} ETH
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`px-2 py-1 text-xs rounded-full whitespace-nowrap
                      ${tx.status === 'executed'
                        ? 'bg-success-muted text-success'
                        : tx.status === 'rejected'
                        ? 'bg-destructive/10 text-destructive'
                        : 'bg-muted text-foreground'}`}
                    >
                      {tx.status.charAt(0).toUpperCase() + tx.status.slice(1)}
                    </span>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="w-full bg-muted rounded-full h-1.5 mb-3 overflow-hidden">
                  <div
                    className="bg-primary h-1.5 rounded-full transition-all duration-700 ease-out"
                    style={{ width: `${(tx.approvals / tx.requiredApprovals) * 100}%` }}
                  />
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center justify-between
                  text-sm text-muted-foreground gap-2">
                  <div className="flex items-center gap-2">
                    <div className="flex -space-x-2">
                      {tx.signers.filter(s => s.hasApproved).map((signer) => (
                        <div
                          key={signer.address}
                          className="w-6 h-6 rounded-full bg-muted
                            flex items-center justify-center ring-2 ring-background"
                          title={signer.name || formatAddress(signer.address)}
                        >
                          <span className="text-xs font-medium">
                            {signer.name?.[0] || 'S'}
                          </span>
                        </div>
                      ))}
                    </div>
                    <span>{tx.approvals} of {tx.requiredApprovals} approvals</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-right">
                      Proposed {formatTimestamp(tx.timestamp)}
                    </span>
                    {tx.status === 'pending' && (
                      <div className="flex gap-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleApprove(tx.id);
                          }}
                          disabled={
                            isApproving === tx.id ||
                            isRejecting === tx.id ||
                            tx.signers.find(s => s.address === signers[0]?.address)?.hasApproved ||
                            tx.status as string !== 'pending'
                          }
                          className="h-auto w-auto p-1.5 rounded-full"
                          title="Approve"
                        >
                          {isApproving === tx.id ? (
                            <div className="w-4 h-4 border-2 border-green-500
                              border-t-transparent rounded-full animate-spin" />
                          ) : (
                            <svg className="w-4 h-4 text-success" fill="none" viewBox="0 0 24 24"
                              stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                d="M5 13l4 4L19 7" />
                            </svg>
                          )}
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleReject(tx.id);
                          }}
                          disabled={
                            isApproving === tx.id ||
                            isRejecting === tx.id ||
                            tx.status !== 'pending'
                          }
                          className="h-auto w-auto p-1.5 rounded-full"
                          title="Reject"
                        >
                          {isRejecting === tx.id ? (
                            <div className="w-4 h-4 border-2 border-red-500
                              border-t-transparent rounded-full animate-spin" />
                          ) : (
                            <svg className="w-4 h-4 text-destructive" fill="none" viewBox="0 0 24 24"
                              stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                d="M6 18L18 6M6 6l12 12" />
                            </svg>
                          )}
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div
                className={`transition-all duration-300 ease-out overflow-hidden
                  ${expandedTx === tx.id ? 'max-h-96' : 'max-h-0'}`}
              >
                <div className="px-4 pb-4">
                  <div className="mt-4 pt-4 border-t">
                    <h5 className="text-sm font-medium text-foreground mb-2">
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
                                ? 'bg-success-muted'
                                : 'bg-muted'}`}
                            >
                              {signer.hasApproved && (
                                <svg className="w-3 h-3 text-success"
                                  fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round"
                                    strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                              )}
                            </div>
                            <span className={`text-sm transition-colors duration-200
                              ${tx.status === 'rejected'
                                ? 'text-destructive'
                                : signer.hasApproved
                                  ? 'text-success'
                                  : 'text-muted-foreground'}`}
                            >
                              {tx.status === 'rejected'
                                ? 'Rejected'
                                : signer.hasApproved
                                  ? 'Approved'
                                  : 'Pending'}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="mt-4 flex space-x-2">
                    <Button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleApprove(tx.id);
                      }}
                      disabled={
                        isApproving === tx.id ||
                        isRejecting === tx.id ||
                        tx.signers.find(s => s.address === signers[0]?.address)?.hasApproved ||
                        !['pending'].includes(tx.status)
                      }
                      className="flex-1"
                      size="sm"
                    >
                      {isApproving === tx.id ? 'Approving...' : 'Approve'}
                    </Button>
                    <Button
                      variant="outline"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleReject(tx.id);
                      }}
                      disabled={
                        isApproving === tx.id ||
                        isRejecting === tx.id ||
                        tx.status !== 'pending'
                      }
                      className="flex-1"
                      size="sm"
                    >
                      {isRejecting === tx.id ? 'Rejecting...' : 'Reject'}
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          ))}
          {filteredTransactions.length === 0 && (
            <div className="text-center py-8 text-muted-foreground">
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
      <Dialog open={isProposing} onOpenChange={setIsProposing}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>New Transaction</DialogTitle>
          </DialogHeader>

          <div className="space-y-4">
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
                  focus:outline-none focus:ring-1 focus:ring-ring
                  ${formErrors.description ? 'border-red-500' : ''}`}
                placeholder="Enter transaction description"
              />
              {formErrors.description && (
                <p className="text-xs text-destructive mt-1">{formErrors.description}</p>
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
                  focus:outline-none focus:ring-1 focus:ring-ring
                  ${formErrors.to ? 'border-red-500' : ''}`}
                placeholder="0x..."
              />
              {formErrors.to && (
                <p className="text-xs text-destructive mt-1">{formErrors.to}</p>
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
                  focus:outline-none focus:ring-1 focus:ring-ring
                  ${formErrors.value ? 'border-red-500' : ''}`}
                placeholder="0.0"
                step="0.0001"
                min="0"
              />
              {formErrors.value && (
                <p className="text-xs text-destructive mt-1">{formErrors.value}</p>
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
                  focus:outline-none focus:ring-1 focus:ring-ring
                  ${formErrors.data ? 'border-red-500' : ''}`}
                placeholder="0x"
              />
              {formErrors.data && (
                <p className="text-xs text-destructive mt-1">{formErrors.data}</p>
              )}
            </div>
          </div>

          <DialogFooter className="border-t bg-muted/50 flex space-x-3 sm:space-x-3">
            <Button
              onClick={handlePropose}
              disabled={isSubmitting}
              className="flex-1 transform hover:scale-[1.02] active:scale-[0.98]"
            >
              {isSubmitting ? (
                <div className="w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin" />
              ) : (
                'Confirm'
              )}
            </Button>
            <Button
              variant="outline"
              onClick={() => setIsProposing(false)}
              disabled={isSubmitting}
              className="flex-1 transform hover:scale-[1.02] active:scale-[0.98]"
            >
              Cancel
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Card>
  );
};
