import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Consultation - Ozempo",
  description: "Get professional medical consultation and advice from our pharmacy experts.",
  keywords: ["consultation", "medical advice", "pharmacy", "ozempo"],
};

export default function ConsultationLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div>{children}</div>;
} 