import React, { useEffect, useState, useCallback } from 'react';
import { PriceTickerProps, TokenPrice } from './types';
import { formatCurrency, formatPercentage } from './untils';
import { TOKEN_CONFIGS } from '../../../../config/tokens';
import Image from 'next/image';

export const PriceTicker: React.FC<PriceTickerProps> = ({
  tokens,
  className = '',
  refreshInterval = 10000, // 10 seconds default
  onPriceUpdate,
  variant = 'detailed'
}) => {
  const [prices, setPrices] = useState<TokenPrice[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchPrices = useCallback(async () => {
    try {
      // In a real implementation, you would fetch from a price API
      // This is a mock implementation
      const newPrices = tokens.map(symbol => ({
        symbol,
        price: Math.random() * 1000, // Mock price
        change24h: (Math.random() * 20) - 10, // Mock 24h change (-10% to +10%)
        logoURI: TOKEN_CONFIGS[symbol as keyof typeof TOKEN_CONFIGS]?.logoURI
      }));

      setPrices(newPrices);
      onPriceUpdate?.(newPrices);
      setError(null);
    } catch (err) {
      setError('Failed to fetch prices');
      console.error('Price fetch error:', err);
    } finally {
      setLoading(false);
    }
  }, [tokens, onPriceUpdate]);

  useEffect(() => {
    fetchPrices();
    const interval = setInterval(fetchPrices, refreshInterval);
    return () => clearInterval(interval);
  }, [fetchPrices, refreshInterval]);

  if (loading) {
    return (
      <div className="animate-pulse flex space-x-4">
        <div className="flex-1 space-y-4 py-1">
          <div className="h-4 bg-gray-200 rounded w-3/4"></div>
          <div className="space-y-3">
            <div className="h-4 bg-gray-200 rounded"></div>
            <div className="h-4 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-red-500 bg-red-50 p-4 rounded-lg">
        {error}
      </div>
    );
  }

  if (variant === 'compact') {
    return (
      <div className={`flex space-x-4 overflow-x-auto ${className}`}>
        {prices.map((token) => (
          <div
            key={token.symbol}
            className="flex items-center space-x-2 bg-white rounded-lg shadow px-4 py-2 min-w-[150px]"
          >
            {token.logoURI && (
              <Image
                src={token.logoURI}
                alt={token.symbol}
                width={24}
                height={24}
                className="rounded-full"
              />
            )}
            <div>
              <div className="font-medium">{token.symbol}</div>
              <div className={`text-sm ${token.change24h >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                {formatPercentage(token.change24h)}
              </div>
            </div>
            <div className="ml-auto font-medium">
              {formatCurrency(token.price)}
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className={`bg-white rounded-lg shadow-lg overflow-hidden ${className}`}>
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Token
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Price
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              24h Change
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {prices.map((token) => (
            <tr key={token.symbol}>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center">
                  {token.logoURI && (
                    <Image
                      src={token.logoURI}
                      alt={token.symbol}
                      width={24}
                      height={24}
                      className="rounded-full mr-3"
                    />
                  )}
                  <div className="font-medium text-gray-900">{token.symbol}</div>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-900">
                  {formatCurrency(token.price)}
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-sm font-medium
                  ${token.change24h >= 0 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                  {token.change24h >= 0 ? '↑' : '↓'} {formatPercentage(Math.abs(token.change24h))}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}; 