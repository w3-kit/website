import { Metadata } from "next";
import { BreadcrumbJsonLd } from "@/components/BreadcrumbJsonLd";
import { ComponentJsonLd } from "@/components/ComponentJsonLd";

export const metadata: Metadata = {
  title: "Price Ticker - Components",
  description: "Learn about W3-Kit's Price Ticker component for displaying real-time cryptocurrency prices. Built with React and Tailwind CSS for modern Web3 applications.",
  authors: [{ name: "W3-Kit Team" }],
  openGraph: {
    title: "Price Ticker - Components",
    description: "Learn about W3-Kit's Price Ticker component for displaying real-time cryptocurrency prices.",
    type: "website",
    siteName: "W3-Kit",
    locale: "en_US",
    images: [
      {
        url: "/OpenGraphImage.png",
        width: 1200,
        height: 628,
        alt: "W3-Kit Price Ticker Component"
      }
    ]
  },
};

export default function PriceTickerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <BreadcrumbJsonLd path="/docs/components/price-ticker" />
      <ComponentJsonLd
        name="Price Ticker"
        description="Learn about W3-Kit's Price Ticker component for displaying real-time cryptocurrency prices. Built with React and Tailwind CSS for modern Web3 applications."
      />
      {children}
    </>
  );
}
