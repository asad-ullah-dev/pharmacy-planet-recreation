import { Metadata } from "next";
import WithAuth from "@/components/auth/WithAuth";

export const metadata: Metadata = {
  title: "User Dashboard - Ozempo",
  description: "Your personal dashboard for managing orders, account settings, and pharmacy services.",
  keywords: ["dashboard", "user", "account", "orders", "pharmacy", "ozempo"],
};

export default function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <WithAuth requiredRole="user" redirectTo="/auth/login">
      <div>{children}</div>
    </WithAuth>
  );
} 