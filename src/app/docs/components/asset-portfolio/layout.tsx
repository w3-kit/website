import { Metadata } from "next";
import { BreadcrumbJsonLd } from "@/components/BreadcrumbJsonLd";
import { ComponentJsonLd } from "@/components/ComponentJsonLd";

export const metadata: Metadata = {
  title: "Asset Portfolio - Components",
  description: "Learn about W3-Kit's Asset Portfolio component for displaying and managing crypto asset holdings. Built with React and Tailwind CSS for modern Web3 applications.",
  authors: [{ name: "W3-Kit Team" }],
  openGraph: {
    title: "Asset Portfolio - Components",
    description: "Learn about W3-Kit's Asset Portfolio component for displaying and managing crypto asset holdings.",
    type: "website",
    siteName: "W3-Kit",
    locale: "en_US",
    images: [
      {
        url: "/OpenGraphImage.png",
        width: 1200,
        height: 628,
        alt: "W3-Kit Asset Portfolio Component"
      }
    ]
  },
};

export default function AssetPortfolioLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <BreadcrumbJsonLd path="/docs/components/asset-portfolio" />
      <ComponentJsonLd
        name="Asset Portfolio"
        description="Learn about W3-Kit's Asset Portfolio component for displaying and managing crypto asset holdings. Built with React and Tailwind CSS for modern Web3 applications."
      />
      {children}
    </>
  );
}
