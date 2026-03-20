import { Metadata } from "next";
import { BreadcrumbJsonLd } from "@/components/BreadcrumbJsonLd";
import { ComponentJsonLd } from "@/components/ComponentJsonLd";

export const metadata: Metadata = {
  title: "Wallet Balance - Components",
  description: "Learn about W3-Kit's Wallet Balance component for displaying cryptocurrency balances. Built with React and Tailwind CSS for modern Web3 applications.",
  authors: [{ name: "W3-Kit Team" }],
  openGraph: {
    title: "Wallet Balance - Components",
    description: "Learn about W3-Kit's Wallet Balance component for displaying cryptocurrency balances.",
    type: "website",
    siteName: "W3-Kit",
    locale: "en_US",
    images: [
      {
        url: "/OpenGraphImage.png",
        width: 1200,
        height: 628,
        alt: "W3-Kit Wallet Balance Component",
      },
    ],
  },
};

export default function WalletBalanceLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <BreadcrumbJsonLd path="/docs/components/wallet-balance" />
      <ComponentJsonLd
        name="Wallet Balance"
        description="Learn about W3-Kit's Wallet Balance component for displaying cryptocurrency balances. Built with React and Tailwind CSS for modern Web3 applications."
      />
      {children}
    </>
  );
}
