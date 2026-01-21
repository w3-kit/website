import React, { useState, useEffect, useCallback } from 'react';
import { GasCalculatorProps, GasPrice, GasEstimate } from './types';
import { fetchGasPrice, estimateTransactionCost, formatGwei } from './until';
import { Zap, Clock, Wallet, RefreshCw, AlertCircle, ChevronUp, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader } from '@/components/ui/card';

export const GasCalculator: React.FC<GasCalculatorProps> = ({
  className = '',
  onGasSelect,
  refreshInterval = 15000,
  chainId = 1
}) => {
  const [gasPrice, setGasPrice] = useState<GasPrice | null>(null);
  const [gasLimit, setGasLimit] = useState<number>(21000);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedSpeed, setSelectedSpeed] = useState<'low' | 'medium' | 'high'>('medium');
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [selectedPreset, setSelectedPreset] = useState<keyof typeof gasPresets>('Transfer');

  const updateGasPrice = useCallback(async (showRefreshAnimation = true) => {
    if (showRefreshAnimation) {
      setIsRefreshing(true);
    }

    try {
      const price = await fetchGasPrice(chainId);
      setGasPrice(price);
      setError(null);
    } catch (err) {
      setError('Failed to fetch gas prices');
      console.error('Gas price fetch error:', err);
    } finally {
      setLoading(false);
      if (showRefreshAnimation) {
        setTimeout(() => setIsRefreshing(false), 1000);
      }
    }
  }, [chainId]);

  useEffect(() => {
    updateGasPrice(false);
    const interval = setInterval(() => updateGasPrice(false), refreshInterval);
    return () => clearInterval(interval);
  }, [refreshInterval, updateGasPrice]);

  const estimate: GasEstimate | null = gasPrice
    ? estimateTransactionCost(gasPrice, gasLimit)
    : null;

  const handleSpeedSelect = (speed: 'low' | 'medium' | 'high') => {
    setSelectedSpeed(speed);
    if (gasPrice) {
      const price = gasPrice[speed];
      onGasSelect?.(gasLimit, price);
    }
  };

  const getSpeedConfig = (speed: 'low' | 'medium' | 'high') => {
    switch (speed) {
      case 'low':
        return {
          label: 'Economy',
          time: '5+ mins',
          icon: Clock,
          color: 'text-green-500',
          description: 'Best for non-urgent transactions'
        };
      case 'medium':
        return {
          label: 'Standard',
          time: '< 2 mins',
          icon: Wallet,
          color: 'text-blue-500',
          description: 'Recommended for most transactions'
        };
      case 'high':
        return {
          label: 'Fast',
          time: '< 30 secs',
          icon: Zap,
          color: 'text-purple-500',
          description: 'Priority transactions'
        };
    }
  };



  const gasPresets = {
    'Transfer': {
      value: 21000,
      description: 'Send ETH to another address'
    },
    'ERC20': {
      value: 65000,
      description: 'Send tokens like USDT, USDC'
    },
    'Swap': {
      value: 200000,
      description: 'Exchange tokens on DEX'
    }
  } as const;

  return (
    <Card className={`overflow-hidden ${className}`}>
      <CardHeader className="border-b">
        <div className="flex justify-between items-start">
          <div>
            <h2 className="text-xl font-semibold text-foreground">
              Gas Calculator
            </h2>
            <p className="text-sm text-muted-foreground mt-1">
              Current network gas prices and estimates
            </p>
          </div>
          <Button
            onClick={() => updateGasPrice()}
            disabled={loading || isRefreshing}
            variant="ghost"
            size="icon"
            className="transition-all duration-200"
          >
            <RefreshCw className={`w-5 h-5 ${isRefreshing ? 'animate-spin' : ''}`} />
          </Button>
        </div>

        <div className="mt-4">
          <div className="flex items-center gap-2 text-sm">
            <div className="flex items-center gap-1.5">
              <div className="w-2 h-2 rounded-full bg-green-500" />
              Low Traffic
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-2 h-2 rounded-full bg-blue-500" />
              Normal
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-2 h-2 rounded-full bg-purple-500" />
              High Priority
            </div>
          </div>
        </div>
      </CardHeader>

      <CardContent className="p-6 space-y-6">
        <div className="space-y-4">
          <label className="block text-sm font-medium text-foreground">
            Transaction Type
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
            {Object.entries(gasPresets).map(([name, { value, description }]) => (
              <Button
                key={name}
                onClick={() => {
                  setSelectedPreset(name as keyof typeof gasPresets);
                  setGasLimit(value);
                }}
                variant={selectedPreset === name ? "default" : "outline"}
                className="h-auto p-3 flex flex-col items-start text-left"
              >
                <div className="font-medium">{name}</div>
                <div className="text-xs mt-1 opacity-80">{description}</div>
                <div className="text-xs mt-1 opacity-60">Gas: {value.toLocaleString()}</div>
              </Button>
            ))}
          </div>
          <div className="relative">
            <Input
              type="number"
              value={gasLimit}
              onChange={(e) => {
                setGasLimit(Number(e.target.value));
                setSelectedPreset('' as keyof typeof gasPresets);
              }}
              className="pr-20 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
              placeholder="Custom gas limit"
            />
            <div className="absolute inset-y-0 right-0 flex items-center pr-4 gap-2">
              <span className="text-sm text-muted-foreground">Gas units</span>
              <div className="flex flex-col -space-y-1">
                <Button
                  onClick={() => setGasLimit(gasLimit + 1000)}
                  variant="ghost"
                  size="icon"
                  className="h-auto p-0.5"
                >
                  <ChevronUp className="w-3 h-3" />
                </Button>
                <Button
                  onClick={() => setGasLimit(Math.max(0, gasLimit - 1000))}
                  variant="ghost"
                  size="icon"
                  className="h-auto p-0.5"
                >
                  <ChevronDown className="w-3 h-3" />
                </Button>
              </div>
            </div>
          </div>
        </div>

        {loading ? (
          <div className="space-y-4 animate-pulse">
            <div className="h-[200px] bg-muted rounded-xl" />
          </div>
        ) : error ? (
          <div className="p-4 rounded-xl bg-red-50 dark:bg-red-900/30
            border border-red-100 dark:border-red-800
            flex items-center gap-3 animate-slideIn"
          >
            <AlertCircle className="w-5 h-5 text-red-500" />
            <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
          </div>
        ) : gasPrice && (
          <div className="space-y-4 animate-fadeIn">
            {(['low', 'medium', 'high'] as const).map((speed) => {
              const config = getSpeedConfig(speed);
              const Icon = config.icon;
              return (
                <Button
                  key={speed}
                  onClick={() => handleSpeedSelect(speed)}
                  variant={selectedSpeed === speed ? "outline" : "ghost"}
                  className={`w-full h-auto p-4 justify-start hover:shadow-md group ${
                    selectedSpeed === speed ? 'border-primary bg-accent' : ''
                  }`}
                >
                  <div className="flex items-start justify-between w-full">
                    <div className="flex items-center gap-3">
                      <div className={`${config.color} transition-transform duration-200
                        group-hover:scale-110`}>
                        <Icon className="w-6 h-6" />
                      </div>
                      <div className="text-left">
                        <div className="font-medium text-foreground">
                          {config.label}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {config.description}
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-xl font-bold text-foreground">
                        {formatGwei(gasPrice[speed])}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        Gwei • {config.time}
                      </div>
                    </div>
                  </div>
                  {estimate && (
                    <div className="mt-3 pt-3 border-t w-full
                      text-sm text-muted-foreground text-right"
                    >
                      Estimated cost: {estimate.estimatedCost[speed]} ETH
                    </div>
                  )}
                </Button>
              );
            })}

            <div className="mt-6 pt-6 border-t">
              <div className="flex justify-between items-center text-sm">
                <span className="text-muted-foreground">
                  Base Fee: {formatGwei(gasPrice.baseFee)} Gwei
                </span>
                <span className="text-muted-foreground">
                  Block #{gasPrice.lastBlock}
                </span>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
