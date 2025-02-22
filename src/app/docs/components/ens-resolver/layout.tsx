import { Metadata } from "next";

export const metadata: Metadata = {
  title: "ENS Resolver - Components | W3-Kit",
  description: "Learn about W3-Kit's ENS Resolver component for resolving Ethereum Name Service addresses. Built with React and Tailwind CSS for modern Web3 applications.",
  authors: [{ name: "W3-Kit Team" }],
  openGraph: {
    title: "ENS Resolver - Components | W3-Kit",
    description: "Learn about W3-Kit's ENS Resolver component for resolving Ethereum Name Service addresses.",
    type: "website",
    siteName: "W3-Kit",
    locale: "en_US",
  },
};

export default function ENSResolverLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}