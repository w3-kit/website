import { Metadata } from "next";
import { BreadcrumbJsonLd } from "@/components/BreadcrumbJsonLd";
import { ComponentJsonLd } from "@/components/ComponentJsonLd";

export const metadata: Metadata = {
  title: "Transaction History - Components",
  description: "Learn about W3-Kit's Transaction History component for displaying blockchain transactions. Built with React and Tailwind CSS for modern Web3 applications.",
  authors: [{ name: "W3-Kit Team" }],
  openGraph: {
    title: "Transaction History - Components",
    description: "Learn about W3-Kit's Transaction History component for displaying blockchain transactions.",
    type: "website",
    siteName: "W3-Kit",
    locale: "en_US",
    images: [
      {
        url: "/OpenGraphImage.png",
        width: 1200,
        height: 628,
        alt: "W3-Kit Transaction History Component"
      }
    ]
  },
};

export default function TransactionHistoryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <BreadcrumbJsonLd path="/docs/components/transaction-history" />
      <ComponentJsonLd
        name="Transaction History"
        description="Learn about W3-Kit's Transaction History component for displaying blockchain transactions. Built with React and Tailwind CSS for modern Web3 applications."
      />
      {children}
    </>
  );
}
