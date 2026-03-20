import { Metadata } from "next";
import { BreadcrumbJsonLd } from "@/components/BreadcrumbJsonLd";
import { ComponentJsonLd } from "@/components/ComponentJsonLd";

export const metadata: Metadata = {
  title: "Contract Interaction - Components",
  description: "Learn about W3-Kit's Contract Interaction component for interacting with smart contracts. Built with React and Tailwind CSS for modern Web3 applications.",
  authors: [{ name: "W3-Kit Team" }],
  openGraph: {
    title: "Contract Interaction - Components",
    description: "Learn about W3-Kit's Contract Interaction component for interacting with smart contracts.",
    type: "website",
    siteName: "W3-Kit",
    locale: "en_US",
    images: [
      {
        url: "/OpenGraphImage.png",
        width: 1200,
        height: 628,
        alt: "W3-Kit Contract Interaction Component"
      }
    ]
  },
};

export default function ContractInteractionLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <BreadcrumbJsonLd path="/docs/components/contract-interaction" />
      <ComponentJsonLd
        name="Contract Interaction"
        description="Learn about W3-Kit's Contract Interaction component for interacting with smart contracts. Built with React and Tailwind CSS for modern Web3 applications."
      />
      {children}
    </>
  );
}
