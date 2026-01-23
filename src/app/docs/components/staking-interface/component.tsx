import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { ArrowRight, Lock, Unlock, Info, ChevronDown, ChevronUp, AlertCircle, Check, Percent, Calendar, Coins, TrendingUp, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';

// Define CSS keyframes for animations
const keyframes = `
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes slideDown {
  from { max-height: 0; opacity: 0; }
  to { max-height: 1000px; opacity: 1; }
}

@keyframes slideUp {
  from { max-height: 1000px; opacity: 1; }
  to { max-height: 0; opacity: 0; }
}

@keyframes pulse {
  0% { transform: scale(1); }
  50% { transform: scale(1.05); }
  100% { transform: scale(1); }
}
`;

interface StakingPool {
  id: string;
  name: string;
  token: {
    symbol: string;
    logoURI: string;
    decimals: number;
  };
  apr: number;
  minStake: string;
  lockPeriod: number; // in days
  totalStaked: string;
  isStaked?: boolean; // New property to track if user has staked this token
}

interface StakingInterfaceProps {
  pools: StakingPool[];
  userBalance?: string;
  onStake?: (poolId: string, amount: string) => void;
  onUnstake?: (poolId: string, amount: string) => void;
  className?: string;
  variant?: 'default' | 'compact';
}

export const StakingInterface: React.FC<StakingInterfaceProps> = ({
  pools,
  userBalance = '0',
  onStake,
  onUnstake,
  className = '',
  variant = 'default'
}) => {
  const [selectedPool, setSelectedPool] = useState<StakingPool | null>(null);
  const [amount, setAmount] = useState('');
  const [isStaking, setIsStaking] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [expandedPoolId, setExpandedPoolId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showAllCompactPools, setShowAllCompactPools] = useState(false);
  const [compactStakingView, setCompactStakingView] = useState<string | null>(null);

  // Refs for measuring dropdown content height
  const dropdownRefs = useRef<{[key: string]: HTMLDivElement | null}>({});

  // Add style tag for keyframes
  useEffect(() => {
    const styleTag = document.createElement('style');
    styleTag.innerHTML = keyframes;
    document.head.appendChild(styleTag);

    return () => {
      document.head.removeChild(styleTag);
    };
  }, []);

  // Reset error when amount or selected pool changes
  useEffect(() => {
    setError(null);
  }, [amount, selectedPool, isStaking]);

  const togglePoolExpansion = (poolId: string) => {
    setExpandedPoolId(expandedPoolId === poolId ? null : poolId);
  };

  const toggleCompactStakingView = (poolId: string) => {
    setCompactStakingView(compactStakingView === poolId ? null : poolId);
    if (compactStakingView !== poolId) {
      setSelectedPool(pools.find(p => p.id === poolId) || null);
      setIsStaking(true);
      setAmount('');
    }
  };

  const validateAmount = (): boolean => {
    if (!selectedPool) return false;

    const amountNum = parseFloat(amount);
    if (isNaN(amountNum) || amountNum <= 0) {
      setError('Please enter a valid amount');
      return false;
    }

    if (isStaking) {
      const minStakeNum = parseFloat(selectedPool.minStake);
      const balanceNum = parseFloat(userBalance);

      if (amountNum < minStakeNum) {
        setError(`Minimum stake amount is ${formatNumber(selectedPool.minStake)} ${selectedPool.token.symbol}`);
        return false;
      }

      if (amountNum > balanceNum) {
        setError('Insufficient balance');
        return false;
      }
    }

    return true;
  };

  const handleAction = async () => {
    if (!selectedPool || !amount) return;

    if (!validateAmount()) return;

    setIsLoading(true);

    try {
      if (isStaking) {
        onStake?.(selectedPool.id, amount);
        setSuccess(`Successfully staked ${formatNumber(amount)} ${selectedPool.token.symbol}`);

        // Update the pool to show it's staked (in a real app, this would come from the backend)
        // const updatedPools = pools.map(p =>
        //   p.id === selectedPool.id ? { ...p, isStaked: true } : p
        // );
        // In a real app, you would update the pools state here
      } else {
        onUnstake?.(selectedPool.id, amount);
        setSuccess(`Successfully unstaked ${formatNumber(amount)} ${selectedPool.token.symbol}`);

        // Update the pool to show it's unstaked (in a real app, this would come from the backend)
        // const updatedPools = pools.map(p =>
        //   p.id === selectedPool.id ? { ...p, isStaked: false } : p
        // );
        // In a real app, you would update the pools state here
      }
      setAmount('');

      // Clear success message after 3 seconds
      setTimeout(() => {
        setSuccess(null);
      }, 3000);
    } catch {
      setError('Transaction failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const formatNumber = (value: string | number, decimals: number = 2) => {
    const num = typeof value === 'string' ? parseFloat(value) : value;
    return new Intl.NumberFormat('en-US', {
      minimumFractionDigits: 0,
      maximumFractionDigits: decimals,
    }).format(num);
  };

  const getAPRColorClass = (apr: number) => {
    if (apr >= 20) return 'text-green-600 dark:text-green-400';
    if (apr >= 10) return 'text-emerald-600 dark:text-emerald-400';
    return 'text-blue-600 dark:text-blue-400';
  };

  // Get the appropriate status icon for a pool
  const getStatusIcon = (pool: StakingPool, size: 'small' | 'medium') => {
    const iconSize = size === 'small' ? 'w-2.5 h-2.5' : 'w-3 h-3';
    const bgSize = size === 'small' ? 'w-4 h-4' : 'w-5 h-5';

    if (pool.isStaked) {
      return (
        <div className={`absolute -top-1 -right-1 ${bgSize} bg-green-500 rounded-full flex items-center justify-center`}>
          <Check className={`${iconSize} text-white`} />
        </div>
      );
    } else if (pool.lockPeriod > 0) {
      return (
        <div className={`absolute -top-1 -right-1 ${bgSize} bg-amber-500 rounded-full flex items-center justify-center`}>
          <Clock className={`${iconSize} text-white`} />
        </div>
      );
    }

    return null;
  };

  // Render a pool item (used in both variants)
  const renderPoolItem = (pool: StakingPool, isCompact: boolean = false) => {
    const isExpanded = isCompact ? compactStakingView === pool.id : expandedPoolId === pool.id;
    const toggleFunction = isCompact ? toggleCompactStakingView : togglePoolExpansion;
    const iconSize = isCompact ? 24 : 28; // Smaller icons

    return (
      <Card
        key={pool.id}
        className={`transition-all duration-300 overflow-hidden ${
          selectedPool?.id === pool.id && !isCompact
            ? 'border-blue-500 dark:border-blue-400 ring-1 ring-blue-500 dark:ring-blue-400'
            : 'hover:border-blue-300 dark:hover:border-blue-700 hover:shadow-md'
        }`}
      >
        <div
          className="p-3 cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between"
          onClick={() => {
            if (!isCompact) setSelectedPool(pool);
            toggleFunction(pool.id);
          }}
        >
          <div className="flex items-center space-x-3 mb-3 sm:mb-0">
            <div className="relative flex-shrink-0">
              <Image
                src={pool.token.logoURI}
                alt={pool.token.symbol}
                width={iconSize}
                height={iconSize}
                className="rounded-full transition-transform duration-300 hover:scale-110"
              />
              {getStatusIcon(pool, isCompact ? 'small' : 'medium')}
            </div>
            <div>
              <h3 className={`font-medium text-foreground ${isCompact ? 'text-sm' : ''}`}>{pool.name}</h3>
              <p className={`${isCompact ? 'text-xs' : 'text-sm'} text-muted-foreground flex items-center`}>
                <Percent className={`${isCompact ? 'w-3 h-3 mr-1' : 'w-3.5 h-3.5 mr-1'}`} />
                <span className={getAPRColorClass(pool.apr)}>
                  {formatNumber(pool.apr)}% APR
                </span>
              </p>
            </div>
          </div>

          <div className="flex items-center justify-between sm:justify-end w-full sm:w-auto sm:space-x-6">
            <div className="flex flex-col items-end">
              <span className={`${isCompact ? 'text-xs' : 'text-sm'} font-medium ${getAPRColorClass(pool.apr)}`}>
                {formatNumber(pool.apr)}%
              </span>
              <span className={`${isCompact ? 'text-xs' : 'text-xs'} text-muted-foreground`}>APR</span>
            </div>

            <Button
              variant="ghost"
              size="icon"
              className="p-1 rounded-full"
              onClick={(e) => {
                e.stopPropagation();
                toggleFunction(pool.id);
              }}
              aria-expanded={isExpanded}
              aria-label={isExpanded ? "Collapse details" : "Expand details"}
            >
              <div className={`transform transition-transform duration-300 ${isExpanded ? 'rotate-180' : 'rotate-0'}`}>
                <ChevronDown className={`${isCompact ? 'w-4 h-4' : 'w-5 h-5'}`} />
              </div>
            </Button>
          </div>
        </div>

        {/* Expandable details section with smooth height transition */}
        <div
          className={`overflow-hidden transition-all duration-300 ease-in-out ${
            isExpanded ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'
          }`}
          ref={(el) => {
            if (el) {
              dropdownRefs.current[pool.id] = el;
            }
          }}
        >
          <div className={`px-3 pb-3 pt-0 border-t border-gray-100 dark:border-gray-700`}>
            {isCompact ? (
              // Compact variant dropdown content
              <>
                <div className="grid grid-cols-2 gap-2 mt-3 text-xs">
                  <div className="flex items-center justify-between bg-muted p-2 rounded">
                    <span className="text-muted-foreground">Lock Period:</span>
                    <span className="font-medium text-foreground">{pool.lockPeriod} days</span>
                  </div>
                  <div className="flex items-center justify-between bg-muted p-2 rounded">
                    <span className="text-muted-foreground">Min Stake:</span>
                    <span className="font-medium text-foreground">{formatNumber(pool.minStake)}</span>
                  </div>
                </div>

                <div className="mt-3 space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-muted-foreground">Your Balance:</span>
                    <span className="font-medium text-foreground">
                      {formatNumber(userBalance)} {pool.token.symbol}
                    </span>
                  </div>

                  <div className="relative">
                    <Input
                      type="number"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      placeholder={`Enter amount to stake`}
                      className={`text-xs ${
                        error ? 'border-red-300 dark:border-red-700' : ''
                      }`}
                    />
                    <Button
                      variant="secondary"
                      size="sm"
                      onClick={() => setAmount(userBalance)}
                      className="absolute right-2 top-1/2 -translate-y-1/2 px-1.5 py-0.5 text-xs h-auto"
                    >
                      MAX
                    </Button>
                  </div>

                  {error && (
                    <div className="flex items-center space-x-1 text-red-500 dark:text-red-400 text-xs animate-[fadeIn_0.3s_ease-in-out]">
                      <AlertCircle className="w-3 h-3 flex-shrink-0" />
                      <span>{error}</span>
                    </div>
                  )}

                  <Button
                    onClick={handleAction}
                    disabled={!amount || Number(amount) <= 0 || isLoading}
                    className="w-full text-xs font-medium transform hover:scale-[1.01] active:scale-[0.99]"
                  >
                    {isLoading ? (
                      <div className="flex items-center justify-center space-x-2">
                        <div className="animate-spin w-3 h-3 border-2 border-white border-t-transparent rounded-full" />
                        <span>Processing...</span>
                      </div>
                    ) : (
                      <>
                        {pool.isStaked ? (
                          <><Unlock className="w-3 h-3 mr-1.5" /> Unstake</>
                        ) : (
                          <><Lock className="w-3 h-3 mr-1.5" /> Stake</>
                        )} {pool.token.symbol}
                      </>
                    )}
                  </Button>
                </div>
              </>
            ) : (
              // Default variant dropdown content
              <>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-3">
                  <div className="flex flex-col">
                    <div className="flex items-center text-muted-foreground text-xs mb-1">
                      <Calendar className="w-3.5 h-3.5 mr-1" />
                      Lock Period
                    </div>
                    <span className="text-sm font-medium text-foreground">
                      {pool.lockPeriod} days
                    </span>
                  </div>

                  <div className="flex flex-col">
                    <div className="flex items-center text-muted-foreground text-xs mb-1">
                      <ArrowRight className="w-3.5 h-3.5 mr-1" />
                      Min. Stake
                    </div>
                    <span className="text-sm font-medium text-foreground">
                      {formatNumber(pool.minStake)} {pool.token.symbol}
                    </span>
                  </div>

                  <div className="flex flex-col col-span-2 sm:col-span-1">
                    <div className="flex items-center text-muted-foreground text-xs mb-1">
                      <TrendingUp className="w-3.5 h-3.5 mr-1" />
                      Total Staked
                    </div>
                    <span className="text-sm font-medium text-foreground">
                      {formatNumber(pool.totalStaked)} {pool.token.symbol}
                    </span>
                  </div>
                </div>

                <Button
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedPool(pool);
                    setIsStaking(!pool.isStaked);
                    document.getElementById('staking-action-section')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className={`w-full mt-4 ${
                    pool.isStaked
                      ? 'bg-amber-500 hover:bg-amber-600'
                      : ''
                  } text-sm font-medium flex items-center justify-center
                    hover:shadow-md active:scale-[0.98]`}
                >
                  {pool.isStaked ? (
                    <><Unlock className="w-4 h-4 mr-2" /> Unstake {pool.token.symbol}</>
                  ) : (
                    <><Lock className="w-4 h-4 mr-2" /> Stake {pool.token.symbol}</>
                  )}
                </Button>
              </>
            )}
          </div>
        </div>
      </Card>
    );
  };

  if (variant === 'compact') {
    // Determine which pools to display
    const displayPools = showAllCompactPools ? pools : pools.slice(0, 3);

    return (
      <Card className={`shadow-sm p-4 ${className}`}>
        <h2 className="text-lg font-semibold text-foreground mb-4 flex items-center">
          <Coins className="w-5 h-5 mr-2 text-blue-500" />
          Staking Pools
        </h2>

        {/* Success message */}
        {success && (
          <div className="mb-4 p-3 bg-green-50 dark:bg-green-900/30 border border-green-200 dark:border-green-800
            rounded-lg flex items-start space-x-2 animate-[fadeIn_0.3s_ease-in-out]">
            <Check className="w-5 h-5 text-green-500 dark:text-green-400 flex-shrink-0 mt-0.5" />
            <p className="text-sm text-green-700 dark:text-green-400">{success}</p>
          </div>
        )}

        <div className="space-y-3">
          {displayPools.map((pool) => renderPoolItem(pool, true))}

          {pools.length > 3 && (
            <Button
              variant="outline"
              className="w-full text-center text-sm py-2 hover:shadow-sm"
              onClick={() => setShowAllCompactPools(!showAllCompactPools)}
            >
              {showAllCompactPools ? (
                <span className="flex items-center justify-center">
                  Show Less <ChevronUp className="w-4 h-4 ml-1 transition-transform duration-300" />
                </span>
              ) : (
                <span className="flex items-center justify-center">
                  View {pools.length - 3} More Pools <ChevronDown className="w-4 h-4 ml-1 transition-transform duration-300" />
                </span>
              )}
            </Button>
          )}
        </div>
      </Card>
    );
  }

  return (
    <Card className={`shadow-lg ${className}`}>
      <div className="p-4 sm:p-6 border-b border-gray-200 dark:border-gray-700">
        <h2 className="text-xl font-semibold text-foreground mb-4 flex items-center">
          <Coins className="w-5 h-5 mr-2 text-blue-500" />
          Staking Pools
        </h2>

        {/* Success message */}
        {success && (
          <div className="mb-4 p-3 bg-green-50 dark:bg-green-900/30 border border-green-200 dark:border-green-800
            rounded-lg flex items-start space-x-2 animate-[fadeIn_0.3s_ease-in-out]">
            <Check className="w-5 h-5 text-green-500 dark:text-green-400 flex-shrink-0 mt-0.5" />
            <p className="text-sm text-green-700 dark:text-green-400">{success}</p>
          </div>
        )}

        {/* Changed from grid to list layout */}
        <div className="space-y-3">
          {pools.map((pool) => renderPoolItem(pool))}
        </div>
      </div>

      {selectedPool && (
        <div id="staking-action-section" className="p-4 sm:p-6 animate-[fadeIn_0.3s_ease-in-out]">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 gap-4">
            <div className="flex items-center space-x-2">
              <Button
                variant={isStaking ? "default" : "ghost"}
                onClick={() => setIsStaking(true)}
                className={`text-sm font-medium transition-all duration-300 ${
                  isStaking ? 'shadow-md transform scale-105' : ''
                }`}
              >
                <Lock className="w-4 h-4 inline-block mr-2" />
                Stake
              </Button>
              <Button
                variant={!isStaking ? "default" : "ghost"}
                onClick={() => setIsStaking(false)}
                className={`text-sm font-medium transition-all duration-300 ${
                  !isStaking ? 'shadow-md transform scale-105' : ''
                }`}
              >
                <Unlock className="w-4 h-4 inline-block mr-2" />
                Unstake
              </Button>
            </div>
            <div className="flex items-center text-sm text-muted-foreground bg-muted px-3 py-1.5 rounded-lg">
              <Coins className="w-4 h-4 mr-2 text-gray-400 dark:text-gray-500" />
              Balance: <span className="font-medium ml-1">{formatNumber(userBalance)} {selectedPool.token.symbol}</span>
            </div>
          </div>

          <div className="space-y-4">
            <div className="relative">
              <Input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder={`Enter amount to ${isStaking ? 'stake' : 'unstake'}`}
                className={`text-sm ${
                  error ? 'border-red-300 dark:border-red-700' : ''
                }`}
              />
              <Button
                variant="secondary"
                size="sm"
                onClick={() => setAmount(userBalance)}
                className="absolute right-2 top-1/2 -translate-y-1/2 px-2 py-1 text-xs h-auto"
              >
                MAX
              </Button>
            </div>

            {error && (
              <div className="flex items-center space-x-2 text-red-500 dark:text-red-400 text-sm animate-[fadeIn_0.3s_ease-in-out]">
                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                <span>{error}</span>
              </div>
            )}

            <div className="flex items-center justify-between text-xs text-muted-foreground px-1">
              <div className="flex items-center">
                <Info className="w-3.5 h-3.5 mr-1" />
                <span>
                  {isStaking
                    ? `Min. stake: ${formatNumber(selectedPool.minStake)} ${selectedPool.token.symbol}`
                    : 'Unstaking may have withdrawal fees'}
                </span>
              </div>
              <div>
                Lock period: {selectedPool.lockPeriod} days
              </div>
            </div>

            <Button
              onClick={handleAction}
              disabled={!amount || Number(amount) <= 0 || isLoading}
              className={`w-full ${
                isStaking ? '' : 'bg-amber-500 hover:bg-amber-600'
              } text-sm font-medium transform hover:scale-[1.02] active:scale-[0.98] hover:shadow-md`}
            >
              {isLoading ? (
                <div className="flex items-center justify-center space-x-2">
                  <div className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full" />
                  <span>Processing...</span>
                </div>
              ) : (
                <>
                  {isStaking ? (
                    <><Lock className="w-4 h-4 inline-block mr-2" /> Stake</>
                  ) : (
                    <><Unlock className="w-4 h-4 inline-block mr-2" /> Unstake</>
                  )} {selectedPool.token.symbol}
                </>
              )}
            </Button>
          </div>
        </div>
      )}
    </Card>
  );
};
