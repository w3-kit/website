import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Token Card - Components | W3-Kit",
  description: "Learn about W3-Kit's Token Card component for displaying token information and balances. Built with React and Tailwind CSS for modern Web3 applications.",
  authors: [{ name: "W3-Kit Team" }],
  openGraph: {
    title: "Token Card - Components | W3-Kit",
    description: "Learn about W3-Kit's Token Card component for displaying token information and balances.",
    type: "website",
    siteName: "W3-Kit",
    locale: "en_US",
  },
};

export default function TokenCardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}