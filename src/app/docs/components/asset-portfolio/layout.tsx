import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Asset Portfolio - Components | W3-Kit",
  description: "Learn about W3-Kit's Asset Portfolio component for displaying and managing crypto asset holdings. Built with React and Tailwind CSS for modern Web3 applications.",
  authors: [{ name: "W3-Kit Team" }],
  openGraph: {
    title: "Asset Portfolio - Components | W3-Kit",
    description: "Learn about W3-Kit's Asset Portfolio component for displaying and managing crypto asset holdings.",
    type: "website",
    siteName: "W3-Kit",
    locale: "en_US",
  },
};

export default function AssetPortfolioLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}