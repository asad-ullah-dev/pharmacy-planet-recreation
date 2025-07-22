import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact - Ozempo",
  description: "Contact us for any questions or inquiries.",
  keywords: ["contact", "inquiries", "ozempo"],
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div>{children}</div>;
}
