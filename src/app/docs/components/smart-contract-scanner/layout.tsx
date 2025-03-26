import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Smart Contract Scanner - Components | W3-Kit",
  description: "Learn about W3-Kit's Smart Contract Scanner component for analyzing and verifying smart contracts. Built with React and Tailwind CSS for modern Web3 applications.",
  authors: [{ name: "W3-Kit Team" }],
  openGraph: {
    title: "Smart Contract Scanner - Components | W3-Kit",
    description: "Learn about W3-Kit's Smart Contract Scanner component for analyzing and verifying smart contracts.",
    type: "website",
    siteName: "W3-Kit",
    locale: "en_US",
    images: [
      {
        url: "/OpenGraphImage.png",
        width: 1200,
        height: 628,
        alt: "W3-Kit Smart Contract Scanner Component"
      }
    ]
  },
};

export default function SmartContractScannerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}