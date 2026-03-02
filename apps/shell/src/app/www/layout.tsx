import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Bventy - Marketplace",
  description: "Bventy Event Vendor Marketplace",
};

export default function WWWLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
