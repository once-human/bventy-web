import type { Metadata } from "next";
import { VendorLayout } from "@bventy/ui";

export const metadata: Metadata = {
  title: "Bventy - Vendor",
  description: "Bventy Vendor Dashboard",
};

export default function RootVendorLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <VendorLayout>{children}</VendorLayout>;
}
