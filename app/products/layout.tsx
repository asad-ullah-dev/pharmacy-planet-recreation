import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Products - Ozempo",
  description: "Browse our selection of pharmaceutical products and medications.",
  keywords: ["products", "medications", "pharmacy", "ozempo"],
};

export default function ProductsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div>{children}</div>;
} 