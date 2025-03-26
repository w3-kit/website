import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Limit Order Manager - Components | W3-Kit",
  description: "Learn about W3-Kit's Limit Order Manager component for managing limit orders in DeFi. Built with React and Tailwind CSS for modern Web3 applications.",
  authors: [{ name: "W3-Kit Team" }],
  openGraph: {
    title: "Limit Order Manager - Components | W3-Kit",
    description: "Learn about W3-Kit's Limit Order Manager component for managing limit orders in DeFi.",
    type: "website",
    siteName: "W3-Kit",
    locale: "en_US",
    images: [
      {
        url: "/OpenGraphImage.png",
        width: 1200,
        height: 628,
        alt: "W3-Kit Limit Order Manager Component"
      }
    ]
  },
}; 

export default function LimitOrderManagerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
} 