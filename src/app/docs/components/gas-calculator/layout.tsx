import { Metadata } from "next";
import { BreadcrumbJsonLd } from "@/components/BreadcrumbJsonLd";
import { ComponentJsonLd } from "@/components/ComponentJsonLd";

export const metadata: Metadata = {
  title: "Gas Calculator - Components",
  description: "Learn about W3-Kit's Gas Calculator component for estimating transaction fees. Built with React and Tailwind CSS for modern Web3 applications.",
  authors: [{ name: "W3-Kit Team" }],
  openGraph: {
    title: "Gas Calculator - Components",
    description: "Learn about W3-Kit's Gas Calculator component for estimating transaction fees.",
    type: "website",
    siteName: "W3-Kit",
    locale: "en_US",
    images: [
      {
        url: "/OpenGraphImage.png",
        width: 1200,
        height: 628,
        alt: "W3-Kit Gas Calculator Component"
      }
    ]
  },
};

export default function GasCalculatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <BreadcrumbJsonLd path="/docs/components/gas-calculator" />
      <ComponentJsonLd
        name="Gas Calculator"
        description="Learn about W3-Kit's Gas Calculator component for estimating transaction fees. Built with React and Tailwind CSS for modern Web3 applications."
      />
      {children}
    </>
  );
}
