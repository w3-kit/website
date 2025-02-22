import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Multisig Wallet - Components | W3-Kit",
  description: "Learn about W3-Kit's Multisig Wallet component for managing multi-signature transactions. Built with React and Tailwind CSS for modern Web3 applications.",
  authors: [{ name: "W3-Kit Team" }],
  openGraph: {
    title: "Multisig Wallet - Components | W3-Kit",
    description: "Learn about W3-Kit's Multisig Wallet component for managing multi-signature transactions.",
    type: "website",
    siteName: "W3-Kit",
    locale: "en_US",
  },
};

export default function MultisigWalletLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}