import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@bventy/services";
import {
  Toaster,
  PostHogProvider,
  BackendWarmup,
  ProgressProvider,
  UmamiAnalytics,
  PostHogPageView
} from "@bventy/ui";
import Script from "next/script";
import { Suspense } from "react";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Bventy | The Ultimate Marketplace for Event Planners",
    template: "%s | Bventy"
  },
  description: "Bventy connects you with premium event vendors, venues, and tools to make your next celebration unforgettable. Plan with confidence.",
  keywords: ["event planning", "marketplace", "vendors", "venues", "bventy", "quotes"],
  authors: [{ name: "Bventy Team" }],
  creator: "Bventy",
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://bventy.in",
    siteName: "Bventy",
    title: "Bventy | The Ultimate Marketplace for Event Planners",
    description: "Connect with the best event vendors and plan your celebrations seamlessly.",
    images: [
      {
        url: "https://bventy.in/og-image.png",
        width: 1200,
        height: 630,
        alt: "Bventy - Plan Your Events Better",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Bventy | The Ultimate Marketplace for Event Planners",
    description: "Connect with the best event vendors and plan your celebrations seamlessly.",
    creator: "@bventy",
    images: ["https://bventy.in/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "https://bventy.in",
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#000000",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Suspense fallback={null}>
          <ProgressProvider />
        </Suspense>
        <PostHogProvider>
          <AuthProvider>
            <BackendWarmup />
            {children}
            <Toaster />
            {process.env.NODE_ENV === 'production' && (
              <Script
                src="/vercel-relay/s.js"
                strategy="lazyOnload"
                data-debug="false"
              />
            )}
            {process.env.NEXT_PUBLIC_UMAMI_WEBSITE_ID && <UmamiAnalytics />}
            <Suspense fallback={null}>
              <PostHogPageView />
            </Suspense>
          </AuthProvider>
        </PostHogProvider>
      </body>
    </html>
  );
}
