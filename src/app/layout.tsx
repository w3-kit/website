import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import React from 'react'
import { ThemeProvider } from '@/providers/ThemeProvider'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'W3-Kit | Web3 UI Component Library',
  description: 'A modern, accessible UI component library for Web3 applications',
  keywords: ['web3', 'ui library', 'components', 'blockchain', 'dapp'],
  authors: [{ name: 'W3-Kit Team' }],
  openGraph: {
    title: 'W3-Kit | Web3 UI Component Library',
    description: 'A modern, accessible UI component library for Web3 applications',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning className="light">
      <body className={`${inter.className} antialiased bg-white dark:bg-gray-950`}>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  )
} 