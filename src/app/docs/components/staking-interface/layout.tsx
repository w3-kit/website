import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Staking Interface - Components | W3-Kit",
  description: "Learn about W3-Kit's Staking Interface component for managing token staking operations. Built with React and Tailwind CSS for modern Web3 applications.",
  authors: [{ name: "W3-Kit Team" }],
  openGraph: {
    title: "Staking Interface - Components | W3-Kit",
    description: "Learn about W3-Kit's Staking Interface component for managing token staking operations.",
    type: "website",
    siteName: "W3-Kit",
    locale: "en_US",
  },
};

export default function StakingInterfaceLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}