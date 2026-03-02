import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Bventy - Vendor",
  description: "Bventy Vendor Dashboard",
};

export default function VendorLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
