import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Bridge - Components | W3-Kit",
  description: "Learn about W3-Kit's Bridge component for cross-chain token transfers. Built with React and Tailwind CSS for modern Web3 applications.",
  authors: [{ name: "W3-Kit Team" }],
  openGraph: {
    title: "Bridge - Components | W3-Kit",
    description: "Learn about W3-Kit's Bridge component for cross-chain token transfers.",
    type: "website",
    siteName: "W3-Kit",
    locale: "en_US",
    images: [
      {
        url: "/OpenGraphImage.png",
        width: 1200,
        height: 628,
        alt: "W3-Kit Bridge Component"
      }
    ]
  },
};

export default function BridgeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}