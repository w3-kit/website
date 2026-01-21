import React, { useState, useEffect, useMemo } from 'react';
import { NFTCard } from '../nft-card/component';
import { NFTCollectionGridProps } from './types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';

// Custom debounce function without lodash
function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}

// Add this CSS class for grid transitions
const gridTransitionClass = "transition-all duration-500 ease-in-out transform";

export const NFTCollectionGrid: React.FC<NFTCollectionGridProps> = ({
  nfts,
  onNFTClick,
  onOwnerClick,
  className = '',
  variant = 'default',
}) => {
  // State for search and filters
  const [searchInput, setSearchInput] = useState('');
  const debouncedSearchTerm = useDebounce(searchInput, 300);
  const [selectedChain, setSelectedChain] = useState<number | null>(null);
  const [sortBy, setSortBy] = useState<'name' | 'recent'>('recent');
  const [isLoading, setIsLoading] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  // Get unique chains from NFTs
  const availableChains = useMemo(() => {
    const chains = new Map();
    nfts.forEach(nft => {
      if (nft.chainId && !chains.has(nft.chainId)) {
        chains.set(nft.chainId, {
          id: nft.chainId,
          name: getChainName(nft.chainId)
        });
      }
    });
    return Array.from(chains.values());
  }, [nfts]);

  // Handle search input change
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInput(e.target.value);
    setIsLoading(true);
  };

  // Effect to handle loading state when search term changes
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 300);

    return () => clearTimeout(timer);
  }, [debouncedSearchTerm]);

  // Filter and sort NFTs
  const filteredNFTs = useMemo(() => {
    let result = [...nfts];

    // Apply search filter
    if (debouncedSearchTerm) {
      const lowerSearch = debouncedSearchTerm.toLowerCase();
      result = result.filter(nft =>
        nft.name.toLowerCase().includes(lowerSearch) ||
        nft.collection?.toLowerCase().includes(lowerSearch) ||
        nft.description?.toLowerCase().includes(lowerSearch)
      );
    }

    // Apply chain filter
    if (selectedChain !== null) {
      result = result.filter(nft => nft.chainId === selectedChain);
    }

    // Apply sorting
    if (sortBy === 'name') {
      result.sort((a, b) => a.name.localeCompare(b.name));
    } else {
      // Assuming there's a timestamp or id that can be used for "recent" sorting
      result.sort((a, b) => parseInt(b.id) - parseInt(a.id));
    }

    return result;
  }, [nfts, debouncedSearchTerm, selectedChain, sortBy]);

  // Reset filters
  const handleResetFilters = () => {
    setSearchInput('');
    setSelectedChain(null);
    setSortBy('recent');
    // Reset the search input value
    const searchInput = document.getElementById('nft-search') as HTMLInputElement;
    if (searchInput) searchInput.value = '';
  };

  return (
    <div className={`w-full ${className}`}>
      {/* Search and Filters */}
      <div className="mb-6 space-y-4">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <svg className="w-4 h-4 text-muted-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <Input
            id="nft-search"
            type="search"
            className="pl-10"
            placeholder="Search by name, collection or description..."
            onChange={handleSearchChange}
            value={searchInput}
          />
        </div>

        <div className="flex flex-wrap gap-3 items-center justify-between">
          <div className="flex flex-wrap gap-3 items-center">
            {/* Chain Filter */}
            <Select
              value={selectedChain?.toString() || 'all'}
              onValueChange={(value) => setSelectedChain(value === 'all' ? null : Number(value))}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="All Chains" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Chains</SelectItem>
                {availableChains.map(chain => (
                  <SelectItem key={chain.id} value={chain.id.toString()}>
                    {chain.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Sort By */}
            <Select
              value={sortBy}
              onValueChange={(value) => setSortBy(value as 'name' | 'recent')}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="recent">Most Recent</SelectItem>
                <SelectItem value="name">Name (A-Z)</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {/* Enhanced Filter Information */}
      <Card className="mb-6">
        <CardContent className="pt-6">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-sm font-medium text-foreground">
              Active Filters:
            </span>

            {/* Show active filters as tags */}
            <div className="flex flex-wrap gap-2">
              {debouncedSearchTerm && (
                <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                  Search: {debouncedSearchTerm}
                  <button
                    onClick={() => {
                      setSearchInput('');
                      const searchInput = document.getElementById('nft-search') as HTMLInputElement;
                      if (searchInput) searchInput.value = '';
                    }}
                    className="ml-1.5 text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300"
                  >
                    <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </span>
              )}

              {selectedChain !== null && (
                <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200">
                  Chain: {getChainName(selectedChain)}
                  <button
                    onClick={() => setSelectedChain(null)}
                    className="ml-1.5 text-purple-600 dark:text-purple-400 hover:text-purple-800 dark:hover:text-purple-300"
                  >
                    <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </span>
              )}

              {sortBy !== 'recent' && (
                <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                  Sort: {sortBy === 'name' ? 'Name (A-Z)' : 'Most Recent'}
                  <button
                    onClick={() => setSortBy('recent')}
                    className="ml-1.5 text-green-600 dark:text-green-400 hover:text-green-800 dark:hover:text-green-300"
                  >
                    <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </span>
              )}

              {/* If no filters are active */}
              {!debouncedSearchTerm && selectedChain === null && sortBy === 'recent' && (
                <span className="text-sm text-muted-foreground">
                  No filters applied
                </span>
              )}
            </div>

            {/* Clear all filters button */}
            {(debouncedSearchTerm || selectedChain !== null || sortBy !== 'recent') && (
              <Button
                onClick={handleResetFilters}
                variant="ghost"
                size="sm"
                className="ml-auto text-destructive hover:text-destructive"
              >
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
                Clear All
              </Button>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Results Count and View Mode Toggle */}
      <div className="mb-4 flex flex-wrap items-center justify-between">
        <div className="text-sm text-muted-foreground">
          Showing <span className="font-medium text-foreground">{filteredNFTs.length}</span> of <span className="font-medium text-foreground">{nfts.length}</span> NFTs
          {filteredNFTs.length < nfts.length && (
            <span className="ml-1">
              (filtered from {nfts.length})
            </span>
          )}
        </div>

        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <span>View:</span>
          <div className="flex items-center border border-border rounded-lg overflow-hidden">
            <Button
              onClick={() => setViewMode('grid')}
              variant={viewMode === 'grid' ? 'default' : 'ghost'}
              size="sm"
              className="rounded-none"
              aria-label="Grid view"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
              </svg>
            </Button>
            <Button
              onClick={() => setViewMode('list')}
              variant={viewMode === 'list' ? 'default' : 'ghost'}
              size="sm"
              className="rounded-none"
              aria-label="List view"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </Button>
          </div>
        </div>
      </div>

      {/* Loading State */}
      {isLoading && (
        <div className="flex justify-center items-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        </div>
      )}

      {/* Empty State */}
      {!isLoading && filteredNFTs.length === 0 && (
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <svg className="w-16 h-16 text-muted-foreground mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <h3 className="text-lg font-medium text-foreground mb-1">No NFTs Found</h3>
          <p className="text-muted-foreground max-w-md">
            We couldn&apos;t find any NFTs matching your search criteria. Try adjusting your filters or search term.
          </p>
          <Button
            onClick={handleResetFilters}
            className="mt-4"
          >
            Clear Filters
          </Button>
        </div>
      )}

      {/* NFT Grid with Transitions */}
      {!isLoading && filteredNFTs.length > 0 && (
        <div
          className={`${gridTransitionClass} ${
            viewMode === 'grid'
              ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6'
              : 'flex flex-col space-y-4'
          }`}
        >
          {filteredNFTs.map((nft) => (
          <div
            key={nft.id}
              className={`${gridTransitionClass} ${
                viewMode === 'list'
                  ? 'w-full'
                  : 'w-full aspect-square hover:-translate-y-1 hover:shadow-lg'
            }`}
          >
            <NFTCard
              nft={nft}
                variant={viewMode === 'list' ? 'expanded' : variant}
              onOwnerClick={onOwnerClick}
                onNFTClick={onNFTClick}
                className={`h-full ${viewMode === 'list' ? 'max-w-full' : ''}`}
            />
          </div>
        ))}
      </div>
      )}
    </div>
  );
};

// Helper function to get chain name
function getChainName(chainId: number): string {
  const chains: Record<number, string> = {
    1: 'Ethereum',
    137: 'Polygon',
    56: 'BSC',
    43114: 'Avalanche',
    42161: 'Arbitrum',
    10: 'Optimism',
    // Add more chains as needed
  };
  return chains[chainId] || `Chain ${chainId}`;
}
