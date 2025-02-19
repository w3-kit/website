import type { Metadata } from "next";
import { Inter } from "next/font/google";
import React from "react";
import { ThemeProvider } from "@/providers/ThemeProvider";
import "./globals.css";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import GoogleAnalytics from '@/components/GoogleAnalytics'
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "W3-Kit | Web3 UI Component Library",
  description:
    "A modern, accessible UI component library for Web3 applications",
  keywords: ["web3", "ui library", "components", "blockchain", "dapp"],
  authors: [{ name: "W3-Kit Team" }],
  openGraph: {
    title: "W3-Kit | Web3 UI Component Library",
    description:
      "A modern, accessible UI component library for Web3 applications",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning className="light scroll-smooth">
      <head>
        <title>Web3 React Components | W3-Kit</title>
        <meta name="description" content="A comprehensive library of accessible React components for building high-quality Web3 applications and dApps" />
      </head>
      <body
        className={`${inter.className} antialiased bg-white dark:bg-gray-950`}
      >
        <ThemeProvider>
          <Navbar />
          <main className="min-h-screen">
            {children}
          </main>
          <Footer />
        </ThemeProvider>
        <GoogleAnalytics />
      </body>
    </html>
  );
}
