import { Metadata } from "next";
import { BreadcrumbJsonLd } from "@/components/BreadcrumbJsonLd";
import { ComponentJsonLd } from "@/components/ComponentJsonLd";

export const metadata: Metadata = {
  title: "NFT Card - Components",
  description: "Learn about W3-Kit's NFT Card component for displaying non-fungible tokens. Built with React and Tailwind CSS for modern Web3 applications.",
  authors: [{ name: "W3-Kit Team" }],
  openGraph: {
    title: "NFT Card - Components",
    description: "Learn about W3-Kit's NFT Card component for displaying non-fungible tokens.",
    type: "website",
    siteName: "W3-Kit",
    locale: "en_US",
    images: [
      {
        url: "/OpenGraphImage.png",
        width: 1200,
        height: 628,
        alt: "W3-Kit NFT Card Component"
      }
    ]
  },
};

export default function NFTCardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <BreadcrumbJsonLd path="/docs/components/nft-card" />
      <ComponentJsonLd
        name="NFT Card"
        description="Learn about W3-Kit's NFT Card component for displaying non-fungible tokens. Built with React and Tailwind CSS for modern Web3 applications."
      />
      {children}
    </>
  );
}
