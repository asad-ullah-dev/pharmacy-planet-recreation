import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Treatments - Ozempo",
  description: "Explore our medical treatments and therapeutic solutions.",
  keywords: ["treatments", "therapy", "medical", "pharmacy", "ozempo"],
};

export default function TreatmentsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div>{children}</div>;
} 