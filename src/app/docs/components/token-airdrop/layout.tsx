import { Metadata } from "next";
import { BreadcrumbJsonLd } from "@/components/BreadcrumbJsonLd";
import { ComponentJsonLd } from "@/components/ComponentJsonLd";

export const metadata: Metadata = {
  title: "Token Airdrop - Components",
  description: "Learn about W3-Kit's Token Airdrop component for managing token airdrops. Built with React and Tailwind CSS for modern Web3 applications.",
  authors: [{ name: "W3-Kit Team" }],
  openGraph: {
    title: "Token Airdrop - Components",
    description: "Learn about W3-Kit's Token Airdrop component for managing token airdrops.",
    type: "website",
    siteName: "W3-Kit",
    locale: "en_US",
    images: [
      {
        url: "/OpenGraphImage.png",
        width: 1200,
        height: 628,
        alt: "W3-Kit Token Airdrop Component"
      }
    ]
  },
};

export default function TokenAirdropLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <BreadcrumbJsonLd path="/docs/components/token-airdrop" />
      <ComponentJsonLd
        name="Token Airdrop"
        description="Learn about W3-Kit's Token Airdrop component for managing token airdrops. Built with React and Tailwind CSS for modern Web3 applications."
      />
      {children}
    </>
  );
}
