import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import React from "react";
import { ThemeProvider } from "@/providers/ThemeProvider";
import "./globals.css";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import GoogleAnalytics from "@/components/GoogleAnalytics";

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
        className={`${GeistSans.className} antialiased bg-white dark:bg-gray-950`}
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
