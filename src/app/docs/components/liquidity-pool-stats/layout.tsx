import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Liquidity Pool Stats - Components | W3-Kit",
  description: "Learn about W3-Kit's Liquidity Pool Stats component for displaying DeFi pool information. Built with React and Tailwind CSS for modern Web3 applications.",
  authors: [{ name: "W3-Kit Team" }],
  openGraph: {
    title: "Liquidity Pool Stats - Components | W3-Kit",
    description: "Learn about W3-Kit's Liquidity Pool Stats component for displaying DeFi pool information.",
    type: "website",
    siteName: "W3-Kit",
    locale: "en_US",
  },
};

export default function LiquidityPoolStatsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}