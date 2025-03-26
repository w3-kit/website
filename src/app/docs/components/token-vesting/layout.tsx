import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Token Vesting - Components | W3-Kit",
  description: "Learn about W3-Kit's Token Vesting component for managing token vesting schedules. Built with React and Tailwind CSS for modern Web3 applications.",
  authors: [{ name: "W3-Kit Team" }],
  openGraph: {
    title: "Token Vesting - Components | W3-Kit",
    description: "Learn about W3-Kit's Token Vesting component for managing token vesting schedules.",
    type: "website",
    siteName: "W3-Kit",
    locale: "en_US",
    images: [
      {
        url: "/OpenGraphImage.png",
        width: 1200,
        height: 628,
        alt: "W3-Kit Token Vesting Component"
      }
    ]
  },
};
export default function TokenVestingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}