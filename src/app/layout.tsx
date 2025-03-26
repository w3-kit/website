import type { Metadata } from "next";
import { Inter } from "next/font/google";
import React from "react";
import { ThemeProvider } from "@/providers/ThemeProvider";
import "./globals.css";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import GoogleAnalytics from "@/components/GoogleAnalytics";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Web3 UI Component Library | W3-Kit",
  description:
    "A modern, accessible UI component library for Web3 applications",
  authors: [{ name: "W3-Kit Team" }],
  openGraph: {
    title: "Web3 UI Component Library | W3-Kit",
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
    <body
        className={`${inter.className} antialiased bg-white dark:bg-gray-950`}
      >
        <ThemeProvider>

          <Navbar />
          <main className="min-h-screen">{children}</main>
          <Footer />

        </ThemeProvider>
        <GoogleAnalytics />
      </body>
    </html>
  );
}
