import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contract Interaction - Components | W3-Kit",
  description: "Learn about W3-Kit's Contract Interaction component for interacting with smart contracts. Built with React and Tailwind CSS for modern Web3 applications.",
  authors: [{ name: "W3-Kit Team" }],
  openGraph: {
    title: "Contract Interaction - Components | W3-Kit",
    description: "Learn about W3-Kit's Contract Interaction component for interacting with smart contracts.",
    type: "website",
    siteName: "W3-Kit",
    locale: "en_US",
  },
};

export default function ContractInteractionLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}