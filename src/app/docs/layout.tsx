"use client";

import React, { useState } from "react";
import { Navbar } from "@/components/docs/navbar";
import { Sidebar } from "@/components/docs/sidebar";
import { Breadcrumbs } from "@/components/docs/breadcrumbs";
import { Footer } from "@/components/docs/footer";
import { RightSidebar } from "@/components/docs/right-sidebar";
import { Menu } from "lucide-react";

export default function DocsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen max-w-7xl mx-auto bg-white dark:bg-gray-950">
      <Navbar />
      
      {/* Mobile Menu Button */}
      <button
        className="md:hidden fixed top-20 right-4 z-50 p-2 bg-white dark:bg-gray-800 rounded-md shadow-lg"
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
      >
        <Menu className="h-6 w-6 text-gray-600 dark:text-gray-300" />
      </button>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <>
          <div 
            className="md:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
            onClick={() => setIsMobileMenuOpen(false)}
          />
          <div className="md:hidden fixed right-0 top-0 h-full w-[280px] bg-white dark:bg-gray-950 z-50 overflow-y-auto">
            <div className="pt-20 px-4">
            
            </div>
          </div>
        </>
      )}

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
      
      <Footer />
    </div>
  );
}
