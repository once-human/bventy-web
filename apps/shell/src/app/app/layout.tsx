import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Bventy - App",
  description: "Bventy Web Application",
};

export default function AppLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
