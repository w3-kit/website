import { Metadata } from "next";

export const metadata: Metadata = {
  title: "NFT Collection Grid - Components | W3-Kit",
  description: "Learn about W3-Kit's NFT Collection Grid component for displaying NFT collections. Built with React and Tailwind CSS for modern Web3 applications.",
  authors: [{ name: "W3-Kit Team" }],
  openGraph: {
    title: "NFT Collection Grid - Components | W3-Kit",
    description: "Learn about W3-Kit's NFT Collection Grid component for displaying NFT collections.",
    type: "website",
    siteName: "W3-Kit",
    locale: "en_US",
  },
};

export default function NFTCollectionGridLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}