import React from 'react'

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-900 to-black text-white p-4">
      <div className="max-w-2xl text-center space-y-6">
        <h1 className="text-4xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600">
          W3-Kit
        </h1>
        
        <p className="text-xl md:text-2xl text-gray-300">
          A Modern Web3 UI Component Library
        </p>
        
        <div className="relative">
          <div className="animate-pulse bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-lg p-6">
            <h2 className="text-2xl font-semibold mb-2">🚧 Under Construction 🚧</h2>
            <p className="text-gray-400">
              We're building something amazing! Our comprehensive Web3 UI component library 
              is coming soon to make your dApp development faster and more efficient.
            </p>
          </div>
        </div>
        
        <div className="mt-8 text-sm text-gray-400">
          Expected Launch: Q2 2025
        </div>
      </div>
    </main>
  )
} 