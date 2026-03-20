import { Metadata } from "next";
import { BreadcrumbJsonLd } from "@/components/BreadcrumbJsonLd";
import { ComponentJsonLd } from "@/components/ComponentJsonLd";

export const metadata: Metadata = {
  title: "DeFi Position Manager - Components",
  description: "Learn about W3-Kit's DeFi Position Manager component for managing decentralized finance positions. Built with React and Tailwind CSS for modern Web3 applications.",
  authors: [{ name: "W3-Kit Team" }],
  openGraph: {
    title: "DeFi Position Manager - Components",
    description: "Learn about W3-Kit's DeFi Position Manager component for managing decentralized finance positions.",
    type: "website",
    siteName: "W3-Kit",
    locale: "en_US",
    images: [
      {
        url: "/OpenGraphImage.png",
        width: 1200,
        height: 628,
        alt: "W3-Kit DeFi Position Manager Component"
      }
    ]
  },
};

export default function DefiPositionManagerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <BreadcrumbJsonLd path="/docs/components/defi-position-manager" />
      <ComponentJsonLd
        name="DeFi Position Manager"
        description="Learn about W3-Kit's DeFi Position Manager component for managing decentralized finance positions. Built with React and Tailwind CSS for modern Web3 applications."
      />
      {children}
    </>
  );
}
