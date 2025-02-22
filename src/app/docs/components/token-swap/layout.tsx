import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Token Swap - Components | W3-Kit",
  description: "Learn about W3-Kit's Token Swap component for decentralized token exchanges. Built with React and Tailwind CSS for modern Web3 applications.",
  authors: [{ name: "W3-Kit Team" }],
  openGraph: {
    title: "Token Swap - Components | W3-Kit",
    description: "Learn about W3-Kit's Token Swap component for decentralized token exchanges.",
    type: "website",
    siteName: "W3-Kit",
    locale: "en_US",
  },
};

export default function TokenSwapLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}