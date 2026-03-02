import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Bventy - Auth",
  description: "Bventy Authentication",
};

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
