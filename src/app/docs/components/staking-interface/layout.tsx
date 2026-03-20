import { Metadata } from "next";
import { BreadcrumbJsonLd } from "@/components/BreadcrumbJsonLd";
import { ComponentJsonLd } from "@/components/ComponentJsonLd";

export const metadata: Metadata = {
  title: "Staking Interface - Components",
  description: "Learn about W3-Kit's Staking Interface component for managing token staking operations. Built with React and Tailwind CSS for modern Web3 applications.",
  authors: [{ name: "W3-Kit Team" }],
  openGraph: {
    title: "Staking Interface - Components",
    description: "Learn about W3-Kit's Staking Interface component for managing token staking operations.",
    type: "website",
    siteName: "W3-Kit",
    locale: "en_US",
    images: [
      {
        url: "/OpenGraphImage.png",
        width: 1200,
        height: 628,
        alt: "W3-Kit Staking Interface Component"
      }
    ]
  },
};

export default function StakingInterfaceLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <BreadcrumbJsonLd path="/docs/components/staking-interface" />
      <ComponentJsonLd
        name="Staking Interface"
        description="Learn about W3-Kit's Staking Interface component for managing token staking operations. Built with React and Tailwind CSS for modern Web3 applications."
      />
      {children}
    </>
  );
}
