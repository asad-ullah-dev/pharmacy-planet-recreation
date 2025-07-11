import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Checkout - OZ Medicine Store",
  description: "Checkout Page.",
  keywords: ["checkout", "pharmacy", "ozempo"],
};

export default function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div>{children}</div>;
}
