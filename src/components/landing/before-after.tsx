import React from "react";

const withoutW3Kit = `import { useState, useEffect } from 'react'

export default function WalletBalance({ address }) {
  const [balance, setBalance] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    async function fetchBalance() {
      try {
        setLoading(true)
        const provider = new ethers.JsonRpcProvider(
          process.env.NEXT_PUBLIC_RPC_URL
        )
        const raw = await provider.getBalance(address)
        const formatted = ethers.formatEther(raw)
        setBalance(formatted)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }
    fetchBalance()
  }, [address])

  if (loading) return <div>Loading...</div>
  if (error) return <div>Error: {error}</div>

  return (
    <div>
      <p>{parseFloat(balance).toFixed(4)} ETH</p>
      <p>\${(parseFloat(balance) * 3500).toFixed(2)}</p>
    </div>
  )
}`;

const withW3Kit = `import { WalletBalance } from 'w3-kit'

export default function App() {
  return <WalletBalance address="0x1234...abcd" />
}`;

export function BeforeAfterSection() {
  return (
    <section className="px-6 lg:px-8 py-24 bg-gray-50 dark:bg-gray-900/50">
      <div className="mx-auto max-w-7xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight leading-tight text-gray-900 dark:text-white">
            Building Web3 UI without W3-Kit
          </h2>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-5xl mx-auto">
          <div className="rounded-xl border border-gray-200 dark:border-gray-800 bg-gray-950 overflow-hidden">
            <div className="flex items-center gap-2 px-4 py-3 border-b border-gray-800 bg-red-950/20">
              <div className="h-2 w-2 rounded-full bg-red-500" />
              <span className="text-xs font-medium text-red-400">Without W3-Kit — 35 lines</span>
            </div>
            <pre className="p-6 overflow-x-auto text-xs sm:text-sm leading-relaxed font-mono text-gray-400">
              <code>{withoutW3Kit}</code>
            </pre>
          </div>
          <div className="rounded-xl border border-gray-200 dark:border-gray-800 bg-gray-950 overflow-hidden">
            <div className="flex items-center gap-2 px-4 py-3 border-b border-gray-800 bg-green-950/20">
              <div className="h-2 w-2 rounded-full bg-green-500" />
              <span className="text-xs font-medium text-green-400">With W3-Kit — 5 lines</span>
            </div>
            <pre className="p-6 overflow-x-auto text-xs sm:text-sm leading-relaxed font-mono text-gray-300">
              <code>{withW3Kit}</code>
            </pre>
          </div>
        </div>
      </div>
    </section>
  );
}
