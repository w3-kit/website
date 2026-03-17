"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  Search,
  Github,
  Moon,
  Sun,
  ChevronDown,
  Menu,
  X,
} from "lucide-react";
import { useThemeContext } from "@/providers/ThemeProvider";
import { getComponentList } from "@/config/docs";
import { useGitHubStars } from "@/hooks/useGitHubStars";
import { ComponentsMegaMenu, ResourcesMegaMenu } from "./mega-menu";

// --- Search data (carried over from old navbar) ---

function getComponentsMenu() {
  const components = getComponentList();
  return [
    { title: "Data Display", items: components.filter((c) => ["NFT Card","Token Card","Price Ticker","NFT Collection Grid","Token List","Wallet Balance","Transaction History"].includes(c.title)).map((c) => ({ name: c.title, href: c.href })) },
    { title: "Inputs & Actions", items: components.filter((c) => ["Token Swap","Bridge","Network Switcher","Connect Wallet","Contract Interaction","Address Book","Token Airdrop","Subscription Payments"].includes(c.title)).map((c) => ({ name: c.title, href: c.href })) },
    { title: "DeFi Tools", items: components.filter((c) => ["DeFi Position Manager","Limit Order & Stop-Loss Manager","Flash Loan Executor","Token Vesting","Staking Interface","Liquidity Pool Stats"].includes(c.title)).map((c) => ({ name: c.title, href: c.href })) },
    { title: "Analytics", items: components.filter((c) => ["Asset Portfolio","Gas Calculator","Smart Contract Scanner","NFT Marketplace Aggregator"].includes(c.title)).map((c) => ({ name: c.title, href: c.href })) },
    { title: "Advanced", items: components.filter((c) => ["Multisignature Wallets","ENS Resolver"].includes(c.title)).map((c) => ({ name: c.title, href: c.href })) },
  ];
}

const COMPONENTS_MENU = getComponentsMenu();

const DOCS_MENU = [
  {
    title: "Getting Started",
    items: [
      { name: "Installation", href: "/docs/installation" },
      { name: "Quick Start", href: "/docs/quick-start" },
    ],
  },
];

interface SearchResult {
  name: string;
  href: string;
  category: string;
}

// --- Navbar Component ---

export function Navbar() {
  const { theme, toggleTheme, mounted } = useThemeContext();
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const pathname = usePathname();
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const [isThemeTransitioning, setIsThemeTransitioning] = useState(false);
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openMegaMenu, setOpenMegaMenu] = useState<string | null>(null);
  const [expandedMobileSection, setExpandedMobileSection] = useState<string | null>(null);
  const { stars } = useGitHubStars("https://github.com/w3-kit/ui");

  const popularComponents = [
    { name: "NFT Card", href: "/docs/components/nft-card", category: "Popular Components", description: "Display NFTs with rich metadata" },
    { name: "Token Swap", href: "/docs/components/token-swap", category: "Popular Components", description: "Swap tokens with real-time pricing" },
    { name: "Wallet Balance", href: "/docs/components/wallet-balance", category: "Popular Components", description: "Show wallet assets and balances" },
    { name: "Price Ticker", href: "/docs/components/price-ticker", category: "Popular Components", description: "Real-time crypto price updates" },
  ];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (!(event.target as Element).closest(".dropdown-container")) {
        setIsSearchVisible(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    setSearchQuery("");
    setSearchResults([]);
    setIsMobileMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (searchQuery.length > 1) {
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

  const handleThemeSwitch = () => {
    setIsThemeTransitioning(true);
    toggleTheme();
    setTimeout(() => setIsThemeTransitioning(false), 300);
  };

  if (!mounted) return null;

  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-200 dark:border-gray-800 backdrop-blur-md bg-white/80 dark:bg-gray-950/80 relative">
      <div className="flex h-16 items-center px-4 sm:px-6 lg:px-20">
        {/* Logo */}
        <div className="flex items-center">
          <Link href="/" className="font-semibold text-xl dark:text-white flex items-center gap-2">
            <Image src="/w3-kit-logo.svg" alt="w3-kit" width={30} height={30} />
            w3-kit
          </Link>
        </div>

        {/* Desktop Navigation — CSS hover dropdowns */}
        <nav className="hidden md:flex ml-8 items-center space-x-1">
          {/* Components — hover mega menu (panel rendered below header) */}
          <div
            onMouseEnter={() => setOpenMegaMenu("components")}
            onMouseLeave={() => setOpenMegaMenu(null)}
          >
            <button className="flex items-center gap-1 px-3 py-2 text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors duration-150 ease-in-out rounded-md">
              Components
              <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${openMegaMenu === "components" ? "rotate-180" : ""}`} />
            </button>
          </div>

          {/* Docs — direct link */}
          <Link href="/docs/installation" className="px-3 py-2 text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors duration-150 ease-in-out rounded-md">
            Docs
          </Link>

          {/* Resources — hover mega menu */}
          <div className="relative group">
            <button className="flex items-center gap-1 px-3 py-2 text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors duration-150 ease-in-out rounded-md">
              Resources
              <ChevronDown className="h-4 w-4 transition-transform duration-200 group-hover:rotate-180" />
            </button>
            <div className="invisible opacity-0 group-hover:visible group-hover:opacity-100 transition-all duration-150 absolute left-0 top-full pt-2 z-50">
              <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 shadow-lg rounded-lg">
                <ResourcesMegaMenu />
              </div>
            </div>
          </div>
        </nav>

        {/* Right side actions */}
        <div className="ml-auto flex items-center space-x-4">
          {/* Search (carried over as-is from old navbar) */}
          <div className="md:relative flex-1 md:flex-initial dropdown-container">
            <button
              className="md:hidden inline-flex items-center justify-center text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
              onClick={() => setIsSearchVisible(!isSearchVisible)}
            >
              <Search className="h-5 w-5" />
            </button>

            <div
              className={`absolute md:relative md:top-0 left-0 right-0 md:right-auto p-4 md:p-0 bg-white dark:bg-gray-950 md:bg-transparent border-b border-gray-200 dark:border-gray-800 md:border-0 transition-all duration-300 ease-in-out transform md:transform-none ${
                isSearchVisible
                  ? "opacity-100 translate-y-16"
                  : "opacity-0 -translate-y-full md:opacity-100 md:translate-y-0"
              } ${
                isSearchVisible ? "pointer-events-auto" : "pointer-events-none md:pointer-events-auto"
              } md:block z-50`}
            >
              <div className="relative w-full md:w-auto">
                <div className={`relative transition-all duration-300 ease-in-out w-full ${isSearchExpanded ? "md:w-64" : "md:w-40"}`}>
                  <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400 pointer-events-none" />
                  <input
                    type="text"
                    placeholder="Search components..."
                    className="w-full pl-10 pr-4 py-2 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 transition-all duration-300"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onFocus={() => { setIsSearchFocused(true); setIsSearchExpanded(true); }}
                    onBlur={(e) => {
                      if (!e.relatedTarget?.closest(".search-results")) {
                        setIsSearchFocused(false);
                        if (!searchQuery) setIsSearchExpanded(false);
                      }
                    }}
                  />
                  <button
                    className="md:hidden absolute right-2 top-2 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
                    onClick={() => { setIsSearchVisible(false); setIsSearchFocused(false); setSearchQuery(""); setSearchResults([]); }}
                  >
                    <ChevronDown className="h-5 w-5 transform rotate-180" />
                  </button>
                </div>
              </div>

              {(isSearchFocused || searchResults.length > 0) && (
                <div className={`search-results absolute left-0 right-0 md:left-auto md:right-0 top-full mt-2 w-full md:w-96 bg-white dark:bg-gray-900 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 p-4 max-h-[60vh] md:max-h-96 overflow-auto mx-auto md:mx-0 z-50 transition-all duration-300 ease-in-out ${
                  isSearchFocused ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4 pointer-events-none"
                }`}>
                  {searchQuery.length > 0 ? (
                    <div className="overflow-auto">
                      {searchResults.map((result) => (
                        <Link key={result.href} href={result.href} onClick={() => { setSearchQuery(""); setSearchResults([]); setIsSearchFocused(false); setIsSearchVisible(false); }} className="block px-4 py-2 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-md">
                          <div className="text-sm font-medium text-gray-900 dark:text-white">{result.name}</div>
                          <div className="text-xs text-gray-500 dark:text-gray-400">{result.category}</div>
                        </Link>
                      ))}
                    </div>
                  ) : (
                    <div>
                      <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-3">Popular Components</h3>
                      <div className="space-y-2">
                        {popularComponents.map((component) => (
                          <Link key={component.href} href={component.href} onClick={() => setIsSearchFocused(false)} className="block p-2 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-md transition-colors">
                            <div className="text-sm font-medium text-gray-900 dark:text-white">{component.name}</div>
                            <div className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{component.description}</div>
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* GitHub */}
          <a href="https://github.com/w3-kit/ui" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 justify-center rounded-md text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors">
            <Github className="h-5 w-5" />
            {stars !== null && <span className="text-xs font-medium">{stars}</span>}
            <span className="sr-only">GitHub</span>
          </a>

          {/* Theme Toggle */}
          <button onClick={handleThemeSwitch} className="inline-flex items-center justify-center rounded-md text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white" disabled={isThemeTransitioning}>
            <div className="relative w-5 h-5">
              {theme === "light" ? (
                <Moon className={`h-5 w-5 absolute transition-all duration-300 ${isThemeTransitioning ? "scale-50 opacity-0" : "scale-100 opacity-100"}`} />
              ) : (
                <Sun className={`h-5 w-5 absolute transition-all duration-300 ${isThemeTransitioning ? "scale-50 opacity-0" : "scale-100 opacity-100"}`} />
              )}
            </div>
            <span className="sr-only">Toggle theme</span>
          </button>

          {/* Mobile hamburger */}
          <button className="md:hidden inline-flex items-center justify-center text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white" onClick={() => setIsMobileMenuOpen(true)}>
            <Menu className="h-6 w-6" />
            <span className="sr-only">Open menu</span>
          </button>
        </div>
      </div>

      {/* Components Mega Menu — full-width panel below header */}
      {openMegaMenu === "components" && (
        <div
          className="absolute left-0 right-0 top-full z-50 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 shadow-lg animate-slide-down"
          onMouseEnter={() => setOpenMegaMenu("components")}
          onMouseLeave={() => setOpenMegaMenu(null)}
        >
          <div className="mx-auto max-w-7xl">
            <ComponentsMegaMenu />
          </div>
        </div>
      )}

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <>
          {/* Backdrop */}
          <div className="fixed inset-0 z-50 bg-black/50" onClick={() => setIsMobileMenuOpen(false)} />

          {/* Slide-from-right panel */}
          <div className="fixed inset-y-0 right-0 z-50 w-full max-w-sm bg-white dark:bg-gray-950 shadow-xl animate-slide-in-right">
            <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-800">
              <Link href="/" className="font-semibold text-lg dark:text-white flex items-center gap-2" onClick={() => setIsMobileMenuOpen(false)}>
                <Image src="/w3-kit-logo.svg" alt="w3-kit" width={24} height={24} />
                w3-kit
              </Link>
              <button onClick={() => setIsMobileMenuOpen(false)} className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white">
                <X className="h-6 w-6" />
                <span className="sr-only">Close menu</span>
              </button>
            </div>

            <nav className="p-4 space-y-1 overflow-y-auto max-h-[calc(100vh-130px)]">
              {/* Components accordion */}
              <div>
                <button
                  onClick={() => setExpandedMobileSection(expandedMobileSection === "components" ? null : "components")}
                  className="flex items-center justify-between w-full py-3 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Components
                  <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${expandedMobileSection === "components" ? "rotate-180" : ""}`} />
                </button>
                {expandedMobileSection === "components" && (
                  <div className="pl-4 pb-2 space-y-4">
                    {COMPONENTS_MENU.map((section) => (
                      <div key={section.title}>
                        <div className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">{section.title}</div>
                        <div className="space-y-1">
                          {section.items.map((item) => (
                            <Link key={item.href} href={item.href} onClick={() => setIsMobileMenuOpen(false)} className="block py-1.5 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white">
                              {item.name}
                            </Link>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Docs direct link */}
              <Link href="/docs/installation" onClick={() => setIsMobileMenuOpen(false)} className="block py-3 text-sm font-medium text-gray-900 dark:text-white">
                Docs
              </Link>

              {/* Resources accordion */}
              <div>
                <button
                  onClick={() => setExpandedMobileSection(expandedMobileSection === "resources" ? null : "resources")}
                  className="flex items-center justify-between w-full py-3 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Resources
                  <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${expandedMobileSection === "resources" ? "rotate-180" : ""}`} />
                </button>
                {expandedMobileSection === "resources" && (
                  <div className="pl-4 pb-2 space-y-1">
                    <Link href="/docs/installation" onClick={() => setIsMobileMenuOpen(false)} className="block py-1.5 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white">Installation Guide</Link>
                    <Link href="/docs/components" onClick={() => setIsMobileMenuOpen(false)} className="block py-1.5 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white">Getting Started</Link>
                    <Link href="/docs/api" onClick={() => setIsMobileMenuOpen(false)} className="block py-1.5 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white">API Reference</Link>
                    <a href="https://github.com/w3-kit/ui" target="_blank" rel="noopener noreferrer" className="block py-1.5 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white">GitHub</a>
                    <a href="https://github.com/w3-kit/ui/releases" target="_blank" rel="noopener noreferrer" className="block py-1.5 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white">Changelog</a>
                  </div>
                )}
              </div>
            </nav>

            {/* Bottom actions */}
            <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 flex items-center justify-between">
              <a href="https://github.com/w3-kit/ui" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-sm text-gray-600 dark:text-gray-300">
                <Github className="h-5 w-5" />
                {stars !== null && <span className="text-xs">{stars}</span>}
              </a>
              <button onClick={handleThemeSwitch} className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white" disabled={isThemeTransitioning}>
                {theme === "light" ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
                <span className="sr-only">Toggle theme</span>
              </button>
            </div>
          </div>
        </>
      )}
    </header>
  );
}
