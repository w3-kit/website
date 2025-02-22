import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Gas Calculator - Components | W3-Kit",
  description: "Learn about W3-Kit's Gas Calculator component for estimating transaction fees. Built with React and Tailwind CSS for modern Web3 applications.",
  authors: [{ name: "W3-Kit Team" }],
  openGraph: {
    title: "Gas Calculator - Components | W3-Kit",
    description: "Learn about W3-Kit's Gas Calculator component for estimating transaction fees.",
    type: "website",
    siteName: "W3-Kit",
    locale: "en_US",
  },
};

export default function GasCalculatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}