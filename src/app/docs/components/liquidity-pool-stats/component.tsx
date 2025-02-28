import React, { useState } from 'react';
import { formatCurrency, formatNumber, formatPercentage } from './utils';
import { LiquidityPoolStatsProps } from './types';
import { ArrowUpRight, ArrowDownRight, TrendingUp, Info, Activity } from 'lucide-react';
import Image from 'next/image';

export const LiquidityPoolStats: React.FC<LiquidityPoolStatsProps> = ({
  poolData,
  className = '',
  onTokenClick,
  variant = 'default'
}) => {
  const [showTooltip, setShowTooltip] = useState<string | null>(null);

  const getChangeColor = (value: number) => {
    if (value > 0) return 'text-green-600 dark:text-green-400';
    if (value < 0) return 'text-red-600 dark:text-red-400';
    return 'text-gray-600 dark:text-gray-400';
  };

  const ChangeIndicator = ({ value }: { value: number }) => (
    <span className={`
      flex items-center ${getChangeColor(value)} 
      transition-all duration-300 ease-out
      transform hover:translate-x-1
    `}>
      {value > 0 ? 
        <ArrowUpRight className="w-3 h-3 sm:w-4 sm:h-4" /> : 
        <ArrowDownRight className="w-3 h-3 sm:w-4 sm:h-4" />
      }
      {formatPercentage(Math.abs(value))}
    </span>
  );

  const tooltipContent = {
    tvl: {
      title: "Total Value Locked",
      description: "The total value of all assets deposited in this liquidity pool",
      stats: [
        { label: "24h High", value: formatCurrency(poolData.tvl * 1.1) },
        { label: "24h Low", value: formatCurrency(poolData.tvl * 0.9) }
      ]
    },
    volume: {
      title: "24h Trading Volume",
      description: "Total value of all trades in the last 24 hours",
      stats: [
        { label: "Trades", value: formatNumber(poolData.transactions24h) },
        { label: "Avg Trade", value: formatCurrency(poolData.volume24h / poolData.transactions24h) }
      ]
    },
    apr: {
      title: "Annual Percentage Rate",
      description: "Estimated yearly earnings based on current trading volume",
      stats: [
        { label: "Daily Rate", value: formatPercentage(poolData.apr / 365) },
        { label: "Monthly Rate", value: formatPercentage(poolData.apr / 12) }
      ]
    },
    fees: {
      title: "Trading Fees",
      description: "Fees earned by liquidity providers in the last 24 hours",
      stats: [
        { label: "Fee Tier", value: `${poolData.fee / 10000}%` },
        { label: "Per $1M", value: formatCurrency(10000 * (poolData.fee / 10000)) }
      ]
    }
  };

  const StatCard = ({ 
    title, 
    value, 
    change, 
    subtitle, 
    tooltipKey, 
    icon
  }: { 
    title: string;
    value: string;
    change?: number;
    subtitle?: string;
    tooltipKey: keyof typeof tooltipContent;
    icon?: React.ReactNode;
  }) => {
    const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });

    const handleMouseMove = (e: React.MouseEvent) => {
      const rect = e.currentTarget.getBoundingClientRect();
      setTooltipPosition({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      });
    };

    return (
      <div 
        className="bg-gray-50 dark:bg-gray-750 rounded-lg p-6 relative group"
        onMouseMove={handleMouseMove}
      >
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <span className="text-sm sm:text-base font-medium text-gray-900 dark:text-white">
              {title}
            </span>
            <button
              onMouseEnter={() => setShowTooltip(tooltipKey)}
              onMouseLeave={() => setShowTooltip(null)}
              className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
            >
              <Info className="w-4 h-4" />
            </button>
          </div>
          {icon}
        </div>
        <div className="transition-all duration-300 ease-out">
          <p className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mt-2">
            {value}
          </p>
          {change !== undefined && (
            <div className="flex items-center mt-2">
              <ChangeIndicator value={change} />
              <span className="ml-2 text-sm text-gray-500">24h change</span>
            </div>
          )}
          {subtitle && (
            <p className="text-sm text-gray-500 mt-2">{subtitle}</p>
          )}
        </div>
        {showTooltip === tooltipKey && (
          <div 
            className="absolute bg-gray-900 dark:bg-gray-700 text-white p-4 rounded-lg text-sm
              shadow-lg z-50 w-64 animate-fade-in pointer-events-none"
            style={{
              left: `${tooltipPosition.x}px`,
              top: `${tooltipPosition.y - 10}px`,
              transform: 'translate(-50%, -100%)'
            }}
          >
            <h4 className="font-medium mb-1">{tooltipContent[tooltipKey].title}</h4>
            <p className="text-gray-300 text-xs mb-3">{tooltipContent[tooltipKey].description}</p>
            <div className="grid grid-cols-2 gap-3 border-t border-gray-600 pt-2">
              {tooltipContent[tooltipKey].stats.map((stat, i) => (
                <div key={i} className="space-y-1">
                  <p className="text-xs text-gray-400">{stat.label}</p>
                  <p className="text-sm font-medium">{stat.value}</p>
                </div>
              ))}
            </div>
            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 
              border-8 border-transparent border-t-gray-900 dark:border-t-gray-700" />
          </div>
        )}
      </div>
    );
  };

  if (variant === 'compact') {
    return (
      <div
        className={`
          bg-white dark:bg-gray-800 rounded-lg border border-gray-200 
          dark:border-gray-700 shadow-sm hover:shadow-md 
          transition-all duration-300 ease-out hover:scale-[1.01] ${className}
        `}
      >
        <div className="p-4">
          {/* Header */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <div className="relative w-10 h-10 flex-shrink-0">
                <Image
                  src={poolData.token.logoURI}
                  alt={poolData.token.symbol}
                  fill
                  sizes="40px"
                  className="rounded-full object-contain"
                />
              </div>
              <div>
                <h3 className="text-base font-semibold text-gray-900 dark:text-white">
                  {poolData.token.symbol}
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {poolData.fee / 10000}% Fee Tier
                </p>
              </div>
            </div>
            <button
              onClick={() => onTokenClick?.(poolData.token.symbol)}
              className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            >
              <TrendingUp className="w-5 h-5" />
            </button>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 xs:grid-cols-2 gap-4">
            <div className="space-y-2">
              <span className="text-sm text-gray-500 dark:text-gray-400">TVL</span>
              <div className="flex flex-col">
                <span className="text-base font-medium text-gray-900 dark:text-white">
                  {formatCurrency(poolData.tvl)}
                </span>
                <ChangeIndicator value={poolData.tvlChange24h} />
              </div>
            </div>
            <div className="space-y-2">
              <span className="text-sm text-gray-500 dark:text-gray-400">APR</span>
              <div className="flex flex-col">
                <span className="text-base font-medium text-gray-900 dark:text-white">
                  {formatPercentage(poolData.apr)}
                </span>
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  {formatCurrency(poolData.feesEarned24h)} earned
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`
      bg-white dark:bg-gray-800 rounded-lg border border-gray-200 
      dark:border-gray-700 shadow-sm hover:shadow-md 
      transition-all duration-300 ease-out
      h-full ${className}
    `}>
      {/* Pool Header */}
      <div className="p-4 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="relative w-10 h-10 flex-shrink-0 group">
              <Image
                src={poolData.token.logoURI}
                alt={poolData.token.symbol}
                fill
                sizes="40px"
                className="rounded-full object-contain transition-transform duration-300 group-hover:scale-110"
              />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white group-hover:text-blue-500 transition-colors">
                {poolData.token.symbol}
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {poolData.fee / 10000}% Fee Tier
              </p>
            </div>
          </div>
          <button
            onClick={() => onTokenClick?.(`${poolData.token.symbol}`)}
            className="text-blue-600 dark:text-blue-400 hover:text-blue-700 
              dark:hover:text-blue-300 p-2 rounded-full hover:bg-gray-100 
              dark:hover:bg-gray-700 transition-all duration-200 
              hover:scale-110 active:scale-95"
          >
            <TrendingUp className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Main Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4">
        <StatCard
          title="TVL"
          value={formatCurrency(poolData.tvl)}
          change={poolData.tvlChange24h}
          tooltipKey="tvl"
          icon={<Activity className="w-5 h-5 text-blue-500" />}
        />

        <StatCard
          title="Volume (24h)"
          value={formatCurrency(poolData.volume24h)}
          change={poolData.volumeChange24h}
          tooltipKey="volume"
          icon={<Activity className="w-5 h-5 text-green-500" />}
        />

        <StatCard
          title="APR"
          value={formatPercentage(poolData.apr)}
          subtitle={`${formatCurrency(poolData.feesEarned24h)} earned`}
          tooltipKey="apr"
        />

        <StatCard
          title="Fees (24h)"
          value={formatCurrency(poolData.feesEarned24h)}
          subtitle={`${poolData.fee / 10000}% fee tier`}
          tooltipKey="fees"
        />
      </div>
    </div>
  );
};
