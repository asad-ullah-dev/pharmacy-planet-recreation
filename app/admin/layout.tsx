import { Metadata } from "next";
import WithAuth from "@/components/auth/WithAuth";

export const metadata: Metadata = {
  title: "Admin Dashboard - Ozempo",
  description: "Admin dashboard for managing Ozempo pharmacy operations, products, orders, and users.",
  keywords: ["admin", "dashboard", "pharmacy", "management", "ozempo"],
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <WithAuth requiredRole="admin" redirectTo="/auth/login">
      <div>{children}</div>
    </WithAuth>
  );
} 