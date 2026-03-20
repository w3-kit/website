import { Metadata } from "next";
import { BreadcrumbJsonLd } from "@/components/BreadcrumbJsonLd";
import { ComponentJsonLd } from "@/components/ComponentJsonLd";

export const metadata: Metadata = {
  title: "Flash Loan Executor - Components",
  description: "Learn about W3-Kit's Flash Loan Executor component for executing flash loan transactions. Built with React and Tailwind CSS for modern Web3 applications.",
  authors: [{ name: "W3-Kit Team" }],
  openGraph: {
    title: "Flash Loan Executor - Components",
    description: "Learn about W3-Kit's Flash Loan Executor component for executing flash loan transactions.",
    type: "website",
    siteName: "W3-Kit",
    locale: "en_US",
    images: [
      {
        url: "/OpenGraphImage.png",
        width: 1200,
        height: 628,
        alt: "W3-Kit Flash Loan Executor Component"
      }
    ]
  },
};

export default function FlashLoanExecutorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <BreadcrumbJsonLd path="/docs/components/flash-loan-executor" />
      <ComponentJsonLd
        name="Flash Loan Executor"
        description="Learn about W3-Kit's Flash Loan Executor component for executing flash loan transactions. Built with React and Tailwind CSS for modern Web3 applications."
      />
      {children}
    </>
  );
}
