import { Metadata } from "next";
import { BreadcrumbJsonLd } from "@/components/BreadcrumbJsonLd";
import { ComponentJsonLd } from "@/components/ComponentJsonLd";

export const metadata: Metadata = {
  title: "Network Switcher - Components",
  description: "Learn about W3-Kit's Network Switcher component for managing blockchain network connections. Built with React and Tailwind CSS for modern Web3 applications.",
  authors: [{ name: "W3-Kit Team" }],
  openGraph: {
    title: "Network Switcher - Components",
    description: "Learn about W3-Kit's Network Switcher component for managing blockchain network connections.",
    type: "website",
    siteName: "W3-Kit",
    locale: "en_US",
    images: [
      {
        url: "/OpenGraphImage.png",
        width: 1200,
        height: 628,
        alt: "W3-Kit Network Switcher Component"
      }
    ]
  },
};

export default function NetworkSwitcherLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <BreadcrumbJsonLd path="/docs/components/network-switcher" />
      <ComponentJsonLd
        name="Network Switcher"
        description="Learn about W3-Kit's Network Switcher component for managing blockchain network connections. Built with React and Tailwind CSS for modern Web3 applications."
      />
      {children}
    </>
  );
}
