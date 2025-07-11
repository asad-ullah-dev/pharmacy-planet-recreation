import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Authentication - Ozempo",
  description: "Secure login and registration for Ozempo online pharmacy services.",
  keywords: ["login", "register", "authentication", "pharmacy", "ozempo"],
};

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div>{children}</div>;
} 