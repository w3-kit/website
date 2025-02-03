"use client"

import React from 'react'
import Link from 'next/link'
import { Search, Github, Moon, Sun } from 'lucide-react'
import { useThemeContext } from '@/providers/ThemeProvider'

export function Navbar() {
  const { theme, toggleTheme, mounted } = useThemeContext()

  // Prevent hydration mismatch
  if (!mounted) {
    return null
  }

  const handleThemeToggle = () => {
    console.log('Current theme before toggle:', theme)
    toggleTheme()
    console.log('Theme toggled')
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950">
      <div className="flex h-16 items-center px-4 sm:px-6 lg:px-20">
        <div className="flex items-center space-x-8">
          <Link href="/docs" className="font-semibold text-xl dark:text-white">
            w3-kit
          </Link>
          <nav className="hidden md:flex items-center space-x-6">
            <Link href="/docs" className="text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white">
              Docs
            </Link>
            <Link href="/docs/components" className="text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white">
              Components
            </Link>
            <Link href="/docs/examples" className="text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white">
              Examples
            </Link>
          </nav>
        </div>
        <div className="ml-auto flex items-center space-x-4">
          <button className="inline-flex items-center justify-center rounded-md text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white">
            <Search className="h-5 w-5" />
            <span className="sr-only">Search documentation</span>
          </button>
          <a
            href="https://github.com/w3-kit/w3-kit"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center rounded-md text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
          >
            <Github className="h-5 w-5" />
            <span className="sr-only">GitHub</span>
          </a>
          <button
            onClick={handleThemeToggle}
            className="inline-flex items-center justify-center rounded-md text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
          >
            {theme === 'light' ? (
              <Moon className="h-5 w-5" />
            ) : (
              <Sun className="h-5 w-5" />
            )}
            <span className="sr-only">Toggle theme</span>
          </button>
        </div>
      </div>
    </header>
  )
} 