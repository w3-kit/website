"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Search, Github, Moon, Sun, ChevronDown } from "lucide-react";
import { useThemeContext } from "@/providers/ThemeProvider";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { getComponentList } from "@/config/docs";
import { useGitHubStars } from "@/hooks/useGitHubStars";

// Organize components into categories
function getComponentsMenu() {
  const components = getComponentList();

  return [
    {
      title: "Data Display",
      items: components
        .filter((comp) =>
          [
            "NFT Card",
            "Token Card",
            "Price Ticker",
            "NFT Collection Grid",
            "Token List",
            "Wallet Balance",
            "Transaction History",
          ].includes(comp.title)
        )
        .map((comp) => ({
          name: comp.title,
          href: comp.href,
        })),
    },
    {
      title: "Inputs & Actions",
      items: components
        .filter((comp) =>
          [
            "Token Swap",
            "Bridge",
            "Network Switcher",
            "Connect Wallet",
            "Contract Interaction",
            "Address Book",
            "Token Airdrop",
            "Subscription Payments",
          ].includes(comp.title)
        )
        .map((comp) => ({
          name: comp.title,
          href: comp.href,
        })),
    },
    {
      title: "DeFi Tools",
      items: components
        .filter((comp) =>
          [
            "DeFi Position Manager",
            "Limit Order & Stop-Loss Manager",
            "Flash Loan Executor",
            "Token Vesting",
            "Staking Interface",
            "Liquidity Pool Stats",
          ].includes(comp.title)
        )
        .map((comp) => ({
          name: comp.title,
          href: comp.href,
        })),
    },
    {
      title: "Analytics",
      items: components
        .filter((comp) =>
          [
            "Asset Portfolio",
            "Gas Calculator",
            "Smart Contract Scanner",
            "NFT Marketplace Aggregator",
          ].includes(comp.title)
        )
        .map((comp) => ({
          name: comp.title,
          href: comp.href,
        })),
    },
    {
      title: "Advanced",
      items: components
        .filter((comp) =>
          [
            "Multisignature Wallets",
            "ENS Resolver",
          ].includes(comp.title)
        )
        .map((comp) => ({
          name: comp.title,
          href: comp.href,
        })),
    },
  ];
}

// Replace static COMPONENTS_MENU with dynamic function
const COMPONENTS_MENU = getComponentsMenu();

const DOCS_MENU = [
  {
    title: "Getting Started",
    items: [
      { name: "Installation", href: "/docs/installation" },
      { name: "Quick Start", href: "/docs/quick-start" },
    ],
  },
  // {
  //   title: "Core Concepts",
  //   items: [
  //     { name: "Architecture", href: "/docs/architecture" },
  //     { name: "Theming", href: "/docs/theming" },
  //     { name: "Web3 Integration", href: "/docs/web3-integration" },
  //   ],
  // },
];

interface SearchResult {
  name: string;
  href: string;
  category: string;
}

export function Navbar() {
  const { theme, toggleTheme, mounted } = useThemeContext();
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const pathname = usePathname();
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const [isThemeTransitioning, setIsThemeTransitioning] = useState(false);
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);
  const { stars } = useGitHubStars("https://github.com/w3-kit/ui");

  // Preloaded popular components
  const popularComponents = [
    {
      name: "NFT Card",
      href: "/docs/components/nft-card",
      category: "Popular Components",
      description: "Display NFTs with rich metadata",
    },
    {
      name: "Token Swap",
      href: "/docs/components/token-swap",
      category: "Popular Components",
      description: "Swap tokens with real-time pricing",
    },
    {
      name: "Wallet Balance",
      href: "/docs/components/wallet-balance",
      category: "Popular Components",
      description: "Show wallet assets and balances",
    },
    {
      name: "Price Ticker",
      href: "/docs/components/price-ticker",
      category: "Popular Components",
      description: "Real-time crypto price updates",
    },
  ];

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (!(event.target as Element).closest(".dropdown-container")) {
        setIsSearchVisible(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Watch for pathname changes instead of router events
  useEffect(() => {
    setSearchQuery("");
    setSearchResults([]);
  }, [pathname]);

  // Search functionality
  useEffect(() => {
    if (searchQuery.length > 1) {
      // Combine all searchable items
      const allItems = [
        ...COMPONENTS_MENU.flatMap((section) =>
          section.items.map((item) => ({ ...item, category: section.title }))
        ),
        ...DOCS_MENU.flatMap((section) =>
          section.items.map((item) => ({ ...item, category: section.title }))
        ),
      ];

      const filtered = allItems.filter(
        (item) =>
          item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.category.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setSearchResults(filtered);
    } else {
      setSearchResults([]);
    }
  }, [searchQuery]);

  const handleMenuItemClick = () => {
    // Force close the dropdown by removing hover styles temporarily
    const dropdowns = document.querySelectorAll(".dropdown-container");
    dropdowns.forEach((dropdown) => {
      dropdown.classList.add("pointer-events-none");
      setTimeout(() => {
        dropdown.classList.remove("pointer-events-none");
      }, 100);
    });
  };

  const handleThemeSwitch = () => {
    setIsThemeTransitioning(true);
    toggleTheme();
    setTimeout(() => setIsThemeTransitioning(false), 300); // Match transition duration
  };

  if (!mounted) return null;

  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950">
      <div className="flex h-16 items-center px-4 sm:px-6 lg:px-20">
        <div className="flex items-center space-x-8">
          <Link
            href="/"
            className="font-semibold text-xl dark:text-white flex items-center gap-2"
          >
            <Image src="/w3-kit-logo.svg" alt="w3-kit" width={30} height={30} />
            w3-kit
          </Link>

          <nav className="hidden md:flex items-center space-x-6">
            {/* Docs Link */}
            <Link
              href="/docs/installation"
              className="text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
            >
              Docs
            </Link>

            {/* Components Dropdown */}
            <div className="relative dropdown-container group">
              <button className="flex items-center space-x-1 text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white">
                <span>Components</span>
                <ChevronDown className="h-4 w-4 transition-transform duration-200 group-hover:rotate-180" />
              </button>

              <div className="absolute top-full left-0 mt-2 w-[800px] max-w-[90vw] bg-white dark:bg-gray-900 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 p-4 invisible opacity-0 group-hover:visible group-hover:opacity-100 transition-all duration-200">
                <div className="pb-3 mb-3 border-b border-gray-200 dark:border-gray-700">
                  <h3 className="text-sm font-medium text-gray-900 dark:text-white">
                    Components
                  </h3>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    Explore our collection of Web3 UI components
                  </p>
                </div>
                <div className="flex flex-wrap gap-x-8 gap-y-6">
                  {COMPONENTS_MENU.map((section) => (
                    <div key={section.title} className="min-w-[200px]">
                      <div className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">
                        {section.title}
                      </div>
                      <div className="space-y-1">
                        {section.items.map((item) => (
                          <Link
                            key={item.name}
                            href={item.href}
                            onClick={() => {
                              handleMenuItemClick();
                              const dropdown = document.querySelector('.dropdown-container');
                              dropdown?.classList.remove('group-hover:visible', 'group-hover:opacity-100');
                            }}
                            className="block py-1 text-sm text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors duration-200"
                          >
                            {item.name}
                          </Link>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </nav>
        </div>

        <div className="ml-auto flex items-center space-x-4">
          {/* Updated Search Component */}
          <div className="md:relative flex-1 md:flex-initial">
            {/* Search Icon for Mobile */}
            <button
              className="md:hidden inline-flex items-center justify-center text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
              onClick={() => setIsSearchVisible(!isSearchVisible)}
            >
              <Search className="h-5 w-5" />
            </button>

            {/* Search Input and Results */}
            <div
              className={`
                absolute md:relative 
                md:top-0 
                left-0 right-0 
                md:right-auto
                p-4 md:p-0
                bg-white dark:bg-gray-950 md:bg-transparent
                border-b border-gray-200 dark:border-gray-800 md:border-0
                transition-all duration-300 ease-in-out
                transform md:transform-none
                ${isSearchVisible 
                  ? 'opacity-100 translate-y-16' 
                  : 'opacity-0 -translate-y-full md:opacity-100 md:translate-y-0'
                }
                ${isSearchVisible ? 'pointer-events-auto' : 'pointer-events-none md:pointer-events-auto'}
                md:block
                z-50
              `}
            >
              <div className="relative w-full md:w-auto">
                <div 
                  className={`
                    relative 
                    transition-all duration-300 ease-in-out 
                    w-full
                   
                    ${isSearchExpanded ? 'md:w-64' : 'md:w-40'}
                  `}
                >
                  <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400 pointer-events-none" />
                  <input
                    type="text"
                    placeholder="Search components..."
                    className="w-full pl-10 pr-4 py-2 bg-gray-50 dark:bg-gray-800 border border-gray-200 
                      dark:border-gray-700 rounded-full text-sm focus:outline-none focus:ring-2 
                      focus:ring-blue-500 dark:focus:ring-blue-400 text-gray-900 dark:text-white 
                      placeholder-gray-500 dark:placeholder-gray-400 transition-all duration-300"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onFocus={() => {
                      setIsSearchFocused(true);
                      setIsSearchExpanded(true);
                    }}
                    onBlur={(e) => {
                      if (!e.relatedTarget?.closest(".search-results")) {
                        setIsSearchFocused(false);
                        if (!searchQuery) {
                          setIsSearchExpanded(false);
                        }
                      }
                    }}
                  />

                  {/* Close button for mobile */}
                  <button
                    className="md:hidden absolute right-2 top-2 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
                    onClick={() => {
                      setIsSearchVisible(false);
                      setIsSearchFocused(false);
                      setSearchQuery("");
                      setSearchResults([]);
                    }}
                  >
                    <ChevronDown className="h-5 w-5 transform rotate-180" />
                  </button>
                </div>
              </div>

              {/* Search Results or Popular Components */}
              {(isSearchFocused || searchResults.length > 0) && (
                <div
                  className={`
                    search-results 
                    absolute 
                    left-0 right-0 md:left-auto md:right-0 
                    top-full
                    mt-2
                    w-full md:w-96 
                    bg-white dark:bg-gray-900 
                    rounded-lg shadow-lg 
                    border border-gray-200 dark:border-gray-700 
                    p-4
                    max-h-[60vh] md:max-h-96 
                    overflow-auto
                    mx-auto md:mx-0
                    z-50
                    transition-all duration-300 ease-in-out
                    ${isSearchFocused 
                      ? 'opacity-100 translate-y-0' 
                      : 'opacity-0 -translate-y-4 pointer-events-none'
                    }
                  `}
                >
                  {searchQuery.length > 0 ? (
                    // Show search results
                    <div className="overflow-auto">
                      {searchResults.map((result) => (
                        <Link
                          key={result.href}
                          href={result.href}
                          onClick={() => {
                            setSearchQuery("");
                            setSearchResults([]);
                            setIsSearchFocused(false);
                            setIsSearchVisible(false);
                          }}
                          className="block px-4 py-2 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-md"
                        >
                          <div className="text-sm font-medium text-gray-900 dark:text-white">
                            {result.name}
                          </div>
                          <div className="text-xs text-gray-500 dark:text-gray-400">
                            {result.category}
                          </div>
                        </Link>
                      ))}
                    </div>
                  ) : (
                    // Show popular components
                    <div>
                      <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-3">
                        Popular Components
                      </h3>
                      <div className="space-y-2">
                        {popularComponents.map((component) => (
                          <Link
                            key={component.href}
                            href={component.href}
                            onClick={() => setIsSearchFocused(false)}
                            className="block p-2 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-md transition-colors"
                          >
                            <div className="text-sm font-medium text-gray-900 dark:text-white">
                              {component.name}
                            </div>
                            <div className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                              {component.description}
                            </div>
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* GitHub and Theme Toggle buttons */}
          <a
            href="https://github.com/w3-kit/ui"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 justify-center rounded-md text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
          >
            <Github className="h-5 w-5" />
            {stars !== null && (
              <span className="text-xs font-medium">{stars}</span>
            )}
            <span className="sr-only">GitHub</span>
          </a>
          <button
            onClick={handleThemeSwitch}
            className="inline-flex items-center justify-center rounded-md text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
            disabled={isThemeTransitioning}
          >
            <div className="relative w-5 h-5">
              {theme === "light" ? (
                <Moon 
                  className={`h-5 w-5 absolute transition-all duration-300 
                    ${isThemeTransitioning ? 'scale-50 opacity-0' : 'scale-100 opacity-100'}`} 
                />
              ) : (
                <Sun 
                  className={`h-5 w-5 absolute transition-all duration-300 
                    ${isThemeTransitioning ? 'scale-50 opacity-0' : 'scale-100 opacity-100'}`} 
                />
              )}
            </div>
            <span className="sr-only">Toggle theme</span>
          </button>
        </div>
      </div>
    </header>
  );
}
