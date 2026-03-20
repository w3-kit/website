import { Metadata } from "next";
import { BreadcrumbJsonLd } from "@/components/BreadcrumbJsonLd";
import { ComponentJsonLd } from "@/components/ComponentJsonLd";

export const metadata: Metadata = {
  title: "Token Swap - Components",
  description: "Learn about W3-Kit's Token Swap component for decentralized token exchanges. Built with React and Tailwind CSS for modern Web3 applications.",
  authors: [{ name: "W3-Kit Team" }],
  openGraph: {
    title: "Token Swap - Components",
    description: "Learn about W3-Kit's Token Swap component for decentralized token exchanges.",
    type: "website",
    siteName: "W3-Kit",
    locale: "en_US",
    images: [
      {
        url: "/OpenGraphImage.png",
        width: 1200,
        height: 628,
        alt: "W3-Kit Token Swap Component"
      }
    ]
  },
};

export default function TokenSwapLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <BreadcrumbJsonLd path="/docs/components/token-swap" />
      <ComponentJsonLd
        name="Token Swap"
        description="Learn about W3-Kit's Token Swap component for decentralized token exchanges. Built with React and Tailwind CSS for modern Web3 applications."
      />
      {children}
    </>
  );
}
