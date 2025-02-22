import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Wallet Balance - Components | W3-Kit",
  description: "Learn about W3-Kit's Wallet Balance component for displaying cryptocurrency balances. Built with React and Tailwind CSS for modern Web3 applications.",
  authors: [{ name: "W3-Kit Team" }],
  openGraph: {
    title: "Wallet Balance - Components | W3-Kit",
    description: "Learn about W3-Kit's Wallet Balance component for displaying cryptocurrency balances.",
    type: "website",
    siteName: "W3-Kit",
    locale: "en_US",
  },
};

export default function WalletBalanceLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}