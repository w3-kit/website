import { Metadata } from "next";
import { BreadcrumbJsonLd } from "@/components/BreadcrumbJsonLd";
import { ComponentJsonLd } from "@/components/ComponentJsonLd";

export const metadata: Metadata = {
  title: "Multisig Wallet - Components",
  description: "Learn about W3-Kit's Multisig Wallet component for managing multi-signature transactions. Built with React and Tailwind CSS for modern Web3 applications.",
  authors: [{ name: "W3-Kit Team" }],
  openGraph: {
    title: "Multisig Wallet - Components",
    description: "Learn about W3-Kit's Multisig Wallet component for managing multi-signature transactions.",
    type: "website",
    siteName: "W3-Kit",
    locale: "en_US",
    images: [
      {
        url: "/OpenGraphImage.png",
        width: 1200,
        height: 628,
        alt: "W3-Kit Multisig Wallet Component"
      }
    ]
  },
};

export default function MultisigWalletLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <BreadcrumbJsonLd path="/docs/components/multisig-wallet" />
      <ComponentJsonLd
        name="Multisig Wallet"
        description="Learn about W3-Kit's Multisig Wallet component for managing multi-signature transactions. Built with React and Tailwind CSS for modern Web3 applications."
      />
      {children}
    </>
  );
}
