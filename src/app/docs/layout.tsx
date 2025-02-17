"use client";

import React, { useState, useEffect } from "react";
import { Sidebar } from "@/components/docs/sidebar";
import { Breadcrumbs } from "@/components/docs/breadcrumbs";
import { RightSidebar } from "@/components/docs/right-sidebar";
import { Menu, X } from "lucide-react";

export default function DocsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Handle body scroll lock
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    // Cleanup function
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  return (
    <div className="min-h-screen max-w-7xl mx-auto bg-white dark:bg-gray-950">
      {/* Mobile Menu Button */}
      <button
        className="md:hidden fixed top-20 right-4 z-50 p-2 bg-white dark:bg-gray-800 rounded-md shadow-lg transition-colors"
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
      >
        {isMobileMenuOpen ? (
          <X className="h-6 w-6 text-gray-600 dark:text-gray-300" />
        ) : (
          <Menu className="h-6 w-6 text-gray-600 dark:text-gray-300" />
        )}
      </button>

      {/* Mobile Menu Backdrop */}
      <div
        className={`md:hidden fixed inset-0 bg-black transition-opacity duration-300 ${
          isMobileMenuOpen ? "opacity-50 z-40" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setIsMobileMenuOpen(false)}
      />

      {/* Mobile Menu */}
      <div
        className={`md:hidden fixed right-0 top-0 h-screen w-[280px] bg-white dark:bg-gray-950 z-50 
          flex flex-col transform transition-transform duration-300 ease-in-out
          ${isMobileMenuOpen ? "translate-x-0" : "translate-x-full"}`}
      >
        {/* Fixed Header */}
        <div className="h-20 flex-shrink-0 border-b border-gray-200 dark:border-gray-800" />
        
        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto overscroll-y-contain">
          <div className="h-full px-4 pb-20">
            <Sidebar />
          </div>
        </div>
      </div>

      <div className="container mx-auto">
        <div className="flex relative">
          {/* Desktop Sidebar */}
          <aside className="hidden md:block sticky top-14 h-[calc(100vh-3.5rem)] w-[280px] lg:w-[20%] bg-white dark:bg-gray-950">
            <Sidebar />
          </aside>

          {/* Main Content */}
          <main className="flex-1 min-w-0 px-4 md:px-6 py-6 w-full md:w-auto lg:w-[60%]">
            <div className="max-w-full">
              <Breadcrumbs />
              {children}
            </div>
          </main>

          {/* Right Sidebar */}
          <aside className="hidden lg:block sticky top-14 h-[calc(100vh-3.5rem)] w-[20%] shrink-0">
            <RightSidebar className="h-full" />
          </aside>
        </div>
      </div>
    </div>
  );
}
