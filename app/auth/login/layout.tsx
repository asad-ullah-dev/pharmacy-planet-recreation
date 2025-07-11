import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Login - OZ Medicine Store",
  description: "Login Page.",
  keywords: ["login", "pharmacy", "ozempo"],
};

export default function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div>{children}</div>;
}
 