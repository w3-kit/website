import { Metadata } from "next";
import { BreadcrumbJsonLd } from "@/components/BreadcrumbJsonLd";
import { ComponentJsonLd } from "@/components/ComponentJsonLd";

export const metadata: Metadata = {
  title: "Address Book - Components",
  description: "Learn about W3-Kit's Address Book component for managing Web3 wallet addresses and contacts. Built with React and Tailwind CSS for modern Web3 applications.",
  authors: [{ name: "W3-Kit Team" }],
  openGraph: {
    title: "Address Book - Components",
    description: "Learn about W3-Kit's Address Book component for managing Web3 wallet addresses and contacts.",
    type: "website",
    siteName: "W3-Kit",
    locale: "en_US",
    images: [
      {
        url: "/OpenGraphImage.png",
        width: 1200,
        height: 628,
        alt: "W3-Kit Address Book Component"
      }
    ]
  },
};

export default function AddressBookLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <BreadcrumbJsonLd path="/docs/components/address-book" />
      <ComponentJsonLd
        name="Address Book"
        description="Learn about W3-Kit's Address Book component for managing Web3 wallet addresses and contacts. Built with React and Tailwind CSS for modern Web3 applications."
      />
      {children}
    </>
  );
}
