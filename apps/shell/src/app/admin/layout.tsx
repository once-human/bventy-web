import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Bventy - Admin",
  description: "Bventy Admin Dashboard",
};

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
