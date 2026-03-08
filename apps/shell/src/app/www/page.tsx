import { Navbar } from "@bventy/ui";
import { Footer } from "@bventy/ui";
import { Hero } from "@/components/www/landing/Hero";
import { SearchPreview } from "@/components/www/landing/SearchPreview";
import { CategoryGrid } from "@/components/www/landing/CategoryGrid";
import { TrustSection } from "@/components/www/landing/TrustSection";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">
        <Hero />
        <SearchPreview />
        <CategoryGrid />
        <TrustSection />
      </main>
      <Footer />
      {/* Explicit hidden link for Google verification botanical crawler */}
      <div className="sr-only">
        <a href="/privacy">Privacy Policy</a>
        <a href="/terms">Terms of Service</a>
      </div>
    </div>
  );
}
