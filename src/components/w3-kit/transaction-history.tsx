"use client";

import React, { useState, useEffect } from "react";
import { TransactionHistoryProps, Transaction } from "./transaction-history-types";
import {
  formatAddress,
  formatTimestamp,
  formatEther,
  getStatusColor,
  animationStyles,
} from "./transaction-history-utils";

export const TransactionHistory: React.FC<TransactionHistoryProps> = ({
  transactions,
  onTransactionClick,
  className = "",
  itemsPerPage = 10,
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [expandedTransaction, setExpandedTransaction] = useState<string | null>(
    null
  );
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    status: "",
    from: "",
    to: "",
    minValue: "",
    maxValue: "",
    dateFrom: "",
    dateTo: "",
  });

  useEffect(() => {
    const styleTag = document.createElement("style");
    styleTag.innerHTML = animationStyles;
    document.head.appendChild(styleTag);

    return () => {
      document.head.removeChild(styleTag);
    };
  }, []);

  const applyFilters = (tx: Transaction) => {
    if (
      filters.status &&
      tx.status.toLowerCase() !== filters.status.toLowerCase()
    ) {
      return false;
    }
    if (
      filters.from &&
      !tx.from.toLowerCase().includes(filters.from.toLowerCase())
    ) {
      return false;
    }
    if (
      filters.to &&
      !tx.to.toLowerCase().includes(filters.to.toLowerCase())
    ) {
      return false;
    }
    if (filters.minValue && parseFloat(tx.value) < parseFloat(filters.minValue)) {
      return false;
    }
    if (filters.maxValue && parseFloat(tx.value) > parseFloat(filters.maxValue)) {
      return false;
    }
    if (filters.dateFrom) {
      const fromDate = new Date(filters.dateFrom);
      const txDate = new Date(tx.timestamp);
      if (txDate < fromDate) {
        return false;
      }
    }
    if (filters.dateTo) {
      const toDate = new Date(filters.dateTo);
      const txDate = new Date(tx.timestamp);
      if (txDate > toDate) {
        return false;
      }
    }
    return true;
  };

  const filteredTransactions = transactions.filter((tx) => {
    const matchesSearch =
      tx.hash.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tx.from.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tx.to.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesSearch && applyFilters(tx);
  });

  const resetFilters = () => {
    setFilters({
      status: "",
      from: "",
      to: "",
      minValue: "",
      maxValue: "",
      dateFrom: "",
      dateTo: "",
    });
  };

  const handleFilterChange = (field: string, value: string) => {
    setFilters((prev) => ({
      ...prev,
      [field]: value,
    }));
    setCurrentPage(1);
  };

  const uniqueStatuses = Array.from(
    new Set(transactions.map((tx) => tx.status))
  );

  const totalPages = Math.ceil(filteredTransactions.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedTransactions = filteredTransactions.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    setExpandedTransaction(null);
  };

  const toggleTransactionDetails = (txHash: string) => {
    setExpandedTransaction(expandedTransaction === txHash ? null : txHash);
  };

  const copyToClipboard = (text: string, field: string) => {
    if (typeof navigator !== "undefined") {
      navigator.clipboard.writeText(text).then(() => {
        setCopiedField(field);
        setTimeout(() => setCopiedField(null), 2000);
      });
    }
  };

  const viewOnExplorer = (txHash: string) => {
    if (typeof window !== "undefined") {
      window.open(`https://etherscan.io/tx/${txHash}`, "_blank");
    }
  };

  return (
    <div className={`w-full ${className}`}>
      {/* Search and Filter Controls */}
      <div className="mb-4 space-y-2">
        {/* Search Bar */}
        <div className="relative flex items-center">
          <input
            type="text"
            placeholder="Search by hash or address..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-2 pl-10 border border-gray-200 dark:border-gray-700 rounded-lg
              bg-white dark:bg-gray-800 text-gray-900 dark:text-white
              focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400
              placeholder-gray-500 dark:placeholder-gray-400 transition-all"
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
          {searchTerm && (
            <button
              onClick={() => setSearchTerm("")}
              className="absolute right-12 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          )}
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="ml-2 px-3 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors flex items-center"
            title={showFilters ? "Hide filters" : "Show filters"}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 mr-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
              />
            </svg>
            Filters
            {Object.values(filters).some((value) => value !== "") && (
              <span className="ml-1 w-2 h-2 bg-blue-500 rounded-full"></span>
            )}
          </button>
        </div>

        {/* Filters Panel */}
        {showFilters && (
          <div className="animate-slideDown bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {/* Status Filter */}
              <div className="relative">
                <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Status
                </label>
                <select
                  value={filters.status}
                  onChange={(e) => handleFilterChange("status", e.target.value)}
                  className="w-full appearance-none px-3 py-2 border border-gray-200 dark:border-gray-700 rounded-lg
                    bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm
                    focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
                >
                  <option value="">All Statuses</option>
                  {uniqueStatuses.map((status) => (
                    <option key={status} value={status}>
                      {status}
                    </option>
                  ))}
                </select>
              </div>

              {/* From Address Filter */}
              <div>
                <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
                  From Address
                </label>
                <input
                  type="text"
                  placeholder="Filter by sender"
                  value={filters.from}
                  onChange={(e) => handleFilterChange("from", e.target.value)}
                  className="w-full px-3 py-2 border border-gray-200 dark:border-gray-700 rounded-lg
                    bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm
                    focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
                />
              </div>

              {/* To Address Filter */}
              <div>
                <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
                  To Address
                </label>
                <input
                  type="text"
                  placeholder="Filter by recipient"
                  value={filters.to}
                  onChange={(e) => handleFilterChange("to", e.target.value)}
                  className="w-full px-3 py-2 border border-gray-200 dark:border-gray-700 rounded-lg
                    bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm
                    focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
                />
              </div>
            </div>

            {/* Filter Actions */}
            <div className="flex flex-col sm:flex-row sm:justify-end mt-4 space-y-2 sm:space-y-0 sm:space-x-2">
              <button
                onClick={resetFilters}
                className="w-full sm:w-auto px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors text-sm font-medium"
              >
                Reset Filters
              </button>
              <button
                onClick={() => setShowFilters(false)}
                className="w-full sm:w-auto px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors text-sm font-medium"
              >
                Apply Filters
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Transaction List */}
      <div className="overflow-x-auto bg-white dark:bg-gray-800 rounded-lg shadow border border-gray-200 dark:border-gray-700">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead className="bg-gray-50 dark:bg-gray-800/50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Transaction Hash
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                From
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                To
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Value (ETH)
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Timestamp
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
            {paginatedTransactions.map((tx) => (
              <React.Fragment key={tx.hash}>
                <tr
                  className={`hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors ${
                    expandedTransaction === tx.hash
                      ? "bg-gray-50 dark:bg-gray-700/50"
                      : ""
                  }`}
                  onClick={() => toggleTransactionDetails(tx.hash)}
                  style={{ cursor: "pointer" }}
                >
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-600 dark:text-blue-400 font-medium">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        copyToClipboard(tx.hash, `hash-${tx.hash}`);
                      }}
                      className="hover:text-blue-800 dark:hover:text-blue-300 transition-colors"
                      title="Copy hash"
                    >
                      {formatAddress(tx.hash)}
                      {copiedField === `hash-${tx.hash}` && (
                        <span className="ml-2 text-xs text-green-600 dark:text-green-400 animate-fadeIn">
                          Copied!
                        </span>
                      )}
                    </button>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(
                        tx.status
                      )}`}
                    >
                      {tx.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        copyToClipboard(tx.from, `from-${tx.hash}`);
                      }}
                      className="hover:text-gray-700 dark:hover:text-gray-300 transition-colors"
                      title="Copy address"
                    >
                      {formatAddress(tx.from)}
                      {copiedField === `from-${tx.hash}` && (
                        <span className="ml-2 text-xs text-green-600 dark:text-green-400 animate-fadeIn">
                          Copied!
                        </span>
                      )}
                    </button>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        copyToClipboard(tx.to, `to-${tx.hash}`);
                      }}
                      className="hover:text-gray-700 dark:hover:text-gray-300 transition-colors"
                      title="Copy address"
                    >
                      {formatAddress(tx.to)}
                      {copiedField === `to-${tx.hash}` && (
                        <span className="ml-2 text-xs text-green-600 dark:text-green-400 animate-fadeIn">
                          Copied!
                        </span>
                      )}
                    </button>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                    {formatEther(tx.value)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                    {formatTimestamp(tx.timestamp)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                    <div className="flex space-x-1">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleTransactionDetails(tx.hash);
                        }}
                        className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-colors"
                        aria-label="Toggle details"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className={`h-5 w-5 transition-transform duration-300 ${
                            expandedTransaction === tx.hash ? "rotate-180" : ""
                          }`}
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 9l-7 7-7-7"
                          />
                        </svg>
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onTransactionClick?.(tx);
                        }}
                        className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-colors ml-2"
                        title="View details"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                          />
                        </svg>
                      </button>
                    </div>
                  </td>
                </tr>
                {/* Expanded Transaction Details */}
                {expandedTransaction === tx.hash && (
                  <tr>
                    <td colSpan={7} className="px-0 py-0 border-0">
                      <div className="animate-slideDown bg-gray-50 dark:bg-gray-700/30 px-4 py-3 border-t border-gray-100 dark:border-gray-700">
                        <div className="flex flex-wrap gap-4">
                          <div className="flex-1 min-w-[250px]">
                            <h4 className="text-xs font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                              Transaction Details
                            </h4>
                            <div className="grid grid-cols-2 gap-x-4 gap-y-1.5 text-xs">
                              <div className="text-gray-500 dark:text-gray-400">
                                Block:
                              </div>
                              <div className="text-gray-800 dark:text-gray-200">
                                {tx.blockNumber || "Pending"}
                              </div>
                              <div className="text-gray-500 dark:text-gray-400">
                                Gas:
                              </div>
                              <div className="text-gray-800 dark:text-gray-200">
                                {tx.gasUsed || "N/A"}
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center ml-auto space-x-2 mt-1">
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                viewOnExplorer(tx.hash);
                              }}
                              className="px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 rounded text-xs hover:bg-blue-200 dark:hover:bg-blue-800 transition-colors"
                            >
                              View on Explorer
                            </button>
                          </div>
                        </div>
                      </div>
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))}
            {paginatedTransactions.length === 0 && (
              <tr>
                <td
                  colSpan={7}
                  className="px-6 py-10 text-center text-gray-500 dark:text-gray-400"
                >
                  {searchTerm
                    ? "No transactions found matching your search."
                    : "No transactions available."}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-4 space-x-2">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-3 py-1 border border-gray-200 dark:border-gray-700 rounded-md
              text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800
              hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50
              disabled:cursor-not-allowed transition-colors"
          >
            Previous
          </button>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              onClick={() => handlePageChange(page)}
              className={`px-3 py-1 border rounded-md transition-colors ${
                currentPage === page
                  ? "bg-blue-600 dark:bg-blue-500 text-white border-blue-600 dark:border-blue-500"
                  : "border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700"
              }`}
            >
              {page}
            </button>
          ))}
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="px-3 py-1 border border-gray-200 dark:border-gray-700 rounded-md
              text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800
              hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50
              disabled:cursor-not-allowed transition-colors"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default TransactionHistory;
