import { Metadata } from "next";
import { BreadcrumbJsonLd } from "@/components/BreadcrumbJsonLd";
import { ComponentJsonLd } from "@/components/ComponentJsonLd";

export const metadata: Metadata = {
  title: "NFT Collection Grid - Components",
  description: "Learn about W3-Kit's NFT Collection Grid component for displaying NFT collections. Built with React and Tailwind CSS for modern Web3 applications.",
  authors: [{ name: "W3-Kit Team" }],
  openGraph: {
    title: "NFT Collection Grid - Components",
    description: "Learn about W3-Kit's NFT Collection Grid component for displaying NFT collections.",
    type: "website",
    siteName: "W3-Kit",
    locale: "en_US",
    images: [
      {
        url: "/OpenGraphImage.png",
        width: 1200,
        height: 628,
        alt: "W3-Kit NFT Collection Grid Component"
      }
    ]
  },
};

export default function NFTCollectionGridLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <BreadcrumbJsonLd path="/docs/components/nft-collection-grid" />
      <ComponentJsonLd
        name="NFT Collection Grid"
        description="Learn about W3-Kit's NFT Collection Grid component for displaying NFT collections. Built with React and Tailwind CSS for modern Web3 applications."
      />
      {children}
    </>
  );
}
