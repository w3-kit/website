import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Price Ticker - Components | W3-Kit",
  description: "Learn about W3-Kit's Price Ticker component for displaying real-time cryptocurrency prices. Built with React and Tailwind CSS for modern Web3 applications.",
  authors: [{ name: "W3-Kit Team" }],
  openGraph: {
    title: "Price Ticker - Components | W3-Kit",
    description: "Learn about W3-Kit's Price Ticker component for displaying real-time cryptocurrency prices.",
    type: "website",
    siteName: "W3-Kit",
    locale: "en_US",
  },
};

export default function PriceTickerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}