import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Register - OZ Medicine Store",
  description: "Register Page.",
  keywords: ["register", "pharmacy", "ozempo"],
};

export default function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div>{children}</div>;
}
