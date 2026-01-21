"use client";

import React, { useState, useMemo, useCallback, memo, useEffect } from "react";
import { Token, TokenListProps, SortField, SortDirection } from "./token-list-types";
import { formatBalance, formatCurrency, animationStyles } from "./token-list-utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";

// Memoized token image component with fallback
const TokenImage = memo(
  ({
    logoURI,
    symbol,
    size = "md",
  }: {
    logoURI?: string;
    symbol: string;
    size?: "sm" | "md" | "lg";
  }) => {
    const [hasError, setHasError] = useState(false);
    const [isLoaded, setIsLoaded] = useState(false);

    const sizeClasses = {
      sm: "w-6 h-6 min-w-[1.5rem]",
      md: "w-8 h-8 min-w-[2rem]",
      lg: "w-10 h-10 min-w-[2.5rem]",
    };

    if (!logoURI || hasError) {
      return (
        <div
          className={`${sizeClasses[size]} rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center text-blue-600 dark:text-blue-300 font-medium overflow-hidden flex-shrink-0 animate-fadeIn`}
        >
          <span className="text-xs sm:text-sm">
            {symbol.substring(0, 2).toUpperCase()}
          </span>
        </div>
      );
    }

    return (
      <div
        className={`${sizeClasses[size]} rounded-full overflow-hidden flex-shrink-0 bg-muted border border-gray-200 dark:border-gray-600 relative`}
      >
        <img
          src={logoURI}
          alt={symbol}
          width={32}
          height={32}
          className={`w-full h-full object-contain transition-opacity duration-300 ${isLoaded ? "opacity-100" : "opacity-0"}`}
          onError={() => setHasError(true)}
          onLoad={() => setIsLoaded(true)}
          style={{ width: "100%", height: "100%" }}
        />
        {!isLoaded && (
          <div className="absolute inset-0 flex items-center justify-center bg-muted animate-pulse">
            <span className="text-xs text-muted-foreground">
              {symbol.substring(0, 1)}
            </span>
          </div>
        )}
      </div>
    );
  }
);
TokenImage.displayName = "TokenImage";

// Memoized token card for grid view
const TokenGridCard = memo(
  ({
    token,
    isSelected,
    onSelect,
    showBalances,
    showPrices,
  }: {
    token: Token;
    isSelected: boolean;
    onSelect: () => void;
    showBalances: boolean;
    showPrices: boolean;
  }) => {
    return (
      <Card
        onClick={onSelect}
        className={`cursor-pointer hover:shadow-md hover:border-blue-200 dark:hover:border-blue-800
        transform transition-all duration-200 hover:-translate-y-1 h-full
        ${isSelected ? "ring-2 ring-blue-500 dark:ring-blue-400 shadow-md" : ""}`}
      >
        <CardContent className="p-3 sm:p-4">
          <div className="flex items-center space-x-3">
            <TokenImage logoURI={token.logoURI} symbol={token.symbol} size="lg" />
            <div className="min-w-0 flex-1">
              <h3 className="font-medium text-foreground truncate">
                {token.name}
              </h3>
              <p className="text-sm text-muted-foreground truncate">
                {token.symbol}
              </p>
            </div>
            {isSelected && (
              <div className="flex-shrink-0 text-blue-500 dark:text-blue-400">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
            )}
          </div>

          <div className="mt-3 space-y-1">
            {showBalances && (
              <div className="flex justify-between items-center">
                <span className="text-xs text-muted-foreground">
                  Balance:
                </span>
                <p className="text-sm font-medium text-gray-700 dark:text-gray-300 ml-2 truncate">
                  {formatBalance(token.balance || "0", token.decimals)}
                </p>
              </div>
            )}

            {showPrices && (
              <div className="flex justify-between items-center">
                <span className="text-xs text-muted-foreground">
                  Price:
                </span>
                <p className="text-sm font-medium text-foreground ml-2 truncate">
                  {formatCurrency(token.price || 0)}
                </p>
              </div>
            )}

            {showPrices && showBalances && (
              <div className="flex justify-between items-center pt-1 border-t border-gray-100 dark:border-gray-700 mt-1">
                <span className="text-xs text-muted-foreground">
                  Value:
                </span>
                <p className="text-sm font-semibold text-foreground ml-2 truncate">
                  {token.price && token.balance
                    ? formatCurrency(Number(token.balance) * token.price)
                    : "-"}
                </p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    );
  }
);
TokenGridCard.displayName = "TokenGridCard";

// Memoized token row for list view
const TokenListRow = memo(
  ({
    token,
    isSelected,
    onSelect,
    showBalances,
    showPrices,
  }: {
    token: Token;
    isSelected: boolean;
    onSelect: () => void;
    showBalances: boolean;
    showPrices: boolean;
  }) => {
    return (
      <div
        onClick={onSelect}
        className={`flex items-center justify-between p-3 sm:p-4 cursor-pointer
        bg-white dark:bg-gray-800
        hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors
        ${isSelected ? "bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-500 dark:border-blue-400" : "border-l-4 border-transparent"}`}
      >
        <div className="flex items-center space-x-3 min-w-0 flex-1">
          <TokenImage logoURI={token.logoURI} symbol={token.symbol} size="md" />
          <div className="min-w-0 flex-1">
            <div className="font-medium text-foreground truncate">
              {token.name}
            </div>
            <div className="text-sm text-muted-foreground truncate">
              {token.symbol}
            </div>
          </div>
          {isSelected && (
            <div className="flex-shrink-0 text-blue-500 dark:text-blue-400 mr-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
          )}
        </div>

        <div className="flex items-center space-x-4 sm:space-x-6 flex-shrink-0">
          {showBalances && (
            <div className="flex flex-col items-end">
              <span className="text-xs text-muted-foreground">
                Balance
              </span>
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300 whitespace-nowrap">
                {formatBalance(token.balance || "0", token.decimals)}
              </span>
            </div>
          )}

          {showPrices && (
            <div className="flex flex-col items-end">
              <span className="text-xs text-muted-foreground">
                Value
              </span>
              <span className="text-sm font-medium text-foreground whitespace-nowrap">
                {token.price && token.balance
                  ? formatCurrency(Number(token.balance) * token.price)
                  : "-"}
              </span>
            </div>
          )}
        </div>
      </div>
    );
  }
);
TokenListRow.displayName = "TokenListRow";

export const TokenList: React.FC<TokenListProps> = ({
  tokens,
  onTokenSelect,
  className = "",
  showBalances = true,
  showPrices = true,
  variant = "table",
  selectedToken,
}) => {
  const [search, setSearch] = useState("");
  const [sortField, setSortField] = useState<SortField>("name");
  const [sortDirection, setSortDirection] = useState<SortDirection>("asc");
  const [isCompact, setIsCompact] = useState(
    variant === "grid" && tokens.length > 6
  );

  useEffect(() => {
    const styleTag = document.createElement("style");
    styleTag.innerHTML = animationStyles;
    document.head.appendChild(styleTag);

    return () => {
      document.head.removeChild(styleTag);
    };
  }, []);

  const handleSort = useCallback(
    (field: SortField) => {
      if (sortField === field) {
        setSortDirection((prev) => (prev === "asc" ? "desc" : "asc"));
      } else {
        setSortField(field);
        setSortDirection("asc");
      }
    },
    [sortField]
  );

  const filteredAndSortedTokens = useMemo(() => {
    let result = tokens;

    if (search) {
      const searchLower = search.toLowerCase();
      result = result.filter(
        (token) =>
          token.name.toLowerCase().includes(searchLower) ||
          token.symbol.toLowerCase().includes(searchLower)
      );
    }

    result = [...result].sort((a, b) => {
      let comparison = 0;
      switch (sortField) {
        case "name":
          comparison = a.name.localeCompare(b.name);
          break;
        case "symbol":
          comparison = a.symbol.localeCompare(b.symbol);
          break;
        case "balance":
          comparison = Number(b.balance || 0) - Number(a.balance || 0);
          break;
        case "value":
          comparison =
            Number(b.balance || 0) * (b.price || 0) -
            Number(a.balance || 0) * (a.price || 0);
          break;
      }
      return sortDirection === "asc" ? comparison : -comparison;
    });

    return result;
  }, [tokens, search, sortField, sortDirection]);

  const getGridCols = useCallback(() => {
    const count = filteredAndSortedTokens.length;
    if (count <= 2) return "grid-cols-1";
    if (count <= 4) return "grid-cols-1 sm:grid-cols-2";
    if (count <= 6) return "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3";
    return "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4";
  }, [filteredAndSortedTokens.length]);

  const renderVariant = () => {
    switch (variant) {
      case "grid":
        return (
          <>
            {tokens.length > 6 && (
              <div className="flex justify-end mb-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsCompact(!isCompact)}
                  className="text-xs"
                >
                  {isCompact ? "Show All" : "Compact View"}
                </Button>
              </div>
            )}
            <div className={`grid ${getGridCols()} gap-2 sm:gap-3 md:gap-4`}>
              {(isCompact
                ? filteredAndSortedTokens.slice(0, 6)
                : filteredAndSortedTokens
              ).map((token, index) => (
                <TokenGridCard
                  key={`${token.chainId}-${token.address}-${index}`}
                  token={token}
                  isSelected={selectedToken === token.symbol}
                  onSelect={() => onTokenSelect?.(token)}
                  showBalances={showBalances}
                  showPrices={showPrices}
                />
              ))}
            </div>
            {isCompact && filteredAndSortedTokens.length > 6 && (
              <Button
                variant="outline"
                onClick={() => setIsCompact(false)}
                className="w-full mt-3"
              >
                Show {filteredAndSortedTokens.length - 6} more tokens
              </Button>
            )}
          </>
        );

      case "list":
        return (
          <div className="divide-y divide-gray-200 dark:divide-gray-700 border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
            {filteredAndSortedTokens.length > 0 ? (
              filteredAndSortedTokens.map((token, index) => (
                <TokenListRow
                  key={`${token.chainId}-${token.address}-${index}`}
                  token={token}
                  isSelected={selectedToken === token.symbol}
                  onSelect={() => onTokenSelect?.(token)}
                  showBalances={showBalances}
                  showPrices={showPrices}
                />
              ))
            ) : (
              <div className="p-8 text-center text-muted-foreground">
                No tokens found matching your search.
              </div>
            )}
          </div>
        );

      default:
        return (
          <div className={`w-full ${className}`}>
            <div className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead className="bg-gray-50 dark:bg-gray-800/50">
                  <tr>
                    <th
                      className="px-3 sm:px-6 py-3 text-left text-xs font-medium
                        text-muted-foreground uppercase tracking-wider cursor-pointer"
                      onClick={() => handleSort("name")}
                    >
                      <span className="flex items-center gap-2">
                        Token
                        {sortField === "name" && (
                          <span className="text-gray-400">
                            {sortDirection === "asc" ? "↑" : "↓"}
                          </span>
                        )}
                      </span>
                    </th>
                    {showBalances && (
                      <th
                        className="px-3 sm:px-6 py-3 text-left text-xs font-medium
                          text-muted-foreground uppercase tracking-wider cursor-pointer"
                        onClick={() => handleSort("balance")}
                      >
                        <span className="flex items-center gap-2">
                          Balance
                          {sortField === "balance" && (
                            <span className="text-gray-400">
                              {sortDirection === "asc" ? "↑" : "↓"}
                            </span>
                          )}
                        </span>
                      </th>
                    )}
                    {showPrices && (
                      <>
                        <th className="hidden sm:table-cell px-3 sm:px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                          Price
                        </th>
                        <th
                          className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider cursor-pointer"
                          onClick={() => handleSort("value")}
                        >
                          <span className="flex items-center gap-2">
                            Value
                            {sortField === "value" && (
                              <span className="text-gray-400">
                                {sortDirection === "asc" ? "↑" : "↓"}
                              </span>
                            )}
                          </span>
                        </th>
                      </>
                    )}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-700 bg-white dark:bg-gray-800">
                  {filteredAndSortedTokens.map((token, index) => (
                    <tr
                      key={`${token.chainId}-${token.address}-${index}`}
                      onClick={() => onTokenSelect?.(token)}
                      className={`cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors
                        ${
                          selectedToken === token.symbol
                            ? "bg-blue-50 dark:bg-blue-900/20"
                            : ""
                        }`}
                    >
                      <td className="px-3 sm:px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-2 sm:gap-3">
                          <TokenImage
                            logoURI={token.logoURI}
                            symbol={token.symbol}
                            size="sm"
                          />
                          <div className="min-w-0 flex-1">
                            <div className="font-medium text-sm sm:text-base text-foreground truncate max-w-[150px] sm:max-w-[200px]">
                              {token.name}
                            </div>
                            <div className="text-xs sm:text-sm text-muted-foreground truncate">
                              {token.symbol}
                            </div>
                          </div>
                        </div>
                      </td>
                      {showBalances && (
                        <td className="px-3 sm:px-6 py-4 whitespace-nowrap text-sm sm:text-base text-foreground">
                          {formatBalance(token.balance || "0", token.decimals)}
                        </td>
                      )}
                      {showPrices && (
                        <>
                          <td className="hidden sm:table-cell px-3 sm:px-6 py-4 whitespace-nowrap text-sm sm:text-base text-foreground">
                            {token.price ? formatCurrency(token.price) : "-"}
                          </td>
                          <td className="px-3 sm:px-6 py-4 whitespace-nowrap text-sm sm:text-base text-foreground">
                            {token.price && token.balance
                              ? formatCurrency(
                                  Number(token.balance) * token.price
                                )
                              : "-"}
                          </td>
                        </>
                      )}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        );
    }
  };

  return (
    <div className={`w-full ${className}`}>
      <div className="mb-4 relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <svg
            className="h-5 w-5 text-gray-400"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
              clipRule="evenodd"
            />
          </svg>
        </div>
        <Input
          type="text"
          placeholder="Search tokens..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-10 pr-10"
        />
        {search && (
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setSearch("")}
            className="absolute inset-y-0 right-0 h-full"
          >
            <svg
              className="h-5 w-5"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                clipRule="evenodd"
              />
            </svg>
          </Button>
        )}
      </div>

      {filteredAndSortedTokens.length === 0 ? (
        <div className="text-center p-8 bg-gray-50 dark:bg-gray-800/50 rounded-lg border border-gray-200 dark:border-gray-700">
          <p className="text-muted-foreground">
            No tokens found matching your search.
          </p>
        </div>
      ) : (
        renderVariant()
      )}
    </div>
  );
};

export default TokenList;
