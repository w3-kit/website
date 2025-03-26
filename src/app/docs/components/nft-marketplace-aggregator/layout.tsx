import { Metadata } from "next";
export const metadata: Metadata = {
  title: "NFT Marketplace Aggregator - Components | W3-Kit",
  description: "Learn about W3-Kit's NFT Marketplace Aggregator component for browsing and comparing NFT listings across multiple marketplaces. Built with React and Tailwind CSS for modern Web3 applications.",
  authors: [{ name: "W3-Kit Team" }],
  openGraph: {
    title: "NFT Marketplace Aggregator - Components | W3-Kit",
    description: "Learn about W3-Kit's NFT Marketplace Aggregator component for browsing and comparing NFT listings across multiple marketplaces.",
    type: "website",
    siteName: "W3-Kit",
    locale: "en_US",
    images: [
      {
        url: "/OpenGraphImage.png",
        width: 1200,
        height: 628,
        alt: "W3-Kit NFT Marketplace Aggregator Component"
      }
    ]
  },
}; 

export default function NFTMarketplaceAggregatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
} 