import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Token List - Components | W3-Kit",
  description: "Learn about W3-Kit's Token List component for displaying and managing token lists. Built with React and Tailwind CSS for modern Web3 applications.",
  authors: [{ name: "W3-Kit Team" }],
  openGraph: {
    title: "Token List - Components | W3-Kit",
    description: "Learn about W3-Kit's Token List component for displaying and managing token lists.",
    type: "website",
    siteName: "W3-Kit",
    locale: "en_US",
  },
};

export default function TokenListLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}