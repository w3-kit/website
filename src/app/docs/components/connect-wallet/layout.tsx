import { Metadata } from "next";
import { BreadcrumbJsonLd } from "@/components/BreadcrumbJsonLd";
import { ComponentJsonLd } from "@/components/ComponentJsonLd";

export const metadata: Metadata = {
  title: "Connect Wallet - Components",
  description: "Learn about W3-Kit's Connect Wallet component for Web3 wallet integration. Built with React and Tailwind CSS for modern Web3 applications.",
  authors: [{ name: "W3-Kit Team" }],
  openGraph: {
    title: "Connect Wallet - Components",
    description: "Learn about W3-Kit's Connect Wallet component for Web3 wallet integration.",
    type: "website",
    siteName: "W3-Kit",
    locale: "en_US",
    images: [
      {
        url: "/OpenGraphImage.png",
        width: 1200,
        height: 628,
        alt: "W3-Kit Connect Wallet Component"
      }
    ]
  },
};

export default function ConnectWalletLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <BreadcrumbJsonLd path="/docs/components/connect-wallet" />
      <ComponentJsonLd
        name="Connect Wallet"
        description="Learn about W3-Kit's Connect Wallet component for Web3 wallet integration. Built with React and Tailwind CSS for modern Web3 applications."
      />
      {children}
    </>
  );
}
