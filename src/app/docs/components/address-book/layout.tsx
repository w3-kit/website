import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Address Book - Components | W3-Kit",
  description: "Learn about W3-Kit's Address Book component for managing Web3 wallet addresses and contacts. Built with React and Tailwind CSS for modern Web3 applications.",
  authors: [{ name: "W3-Kit Team" }],
  openGraph: {
    title: "Address Book - Components | W3-Kit",
    description: "Learn about W3-Kit's Address Book component for managing Web3 wallet addresses and contacts.",
    type: "website",
    siteName: "W3-Kit",
    locale: "en_US",
  },
};

export default function AddressBookLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}