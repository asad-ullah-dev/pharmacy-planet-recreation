import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Forgot Password - OZ Medicine Store",
  description: "Forgot Password Page.",
  keywords: ["forgot password", "pharmacy", "ozempo"],
};

export default function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div>{children}</div>;
}
