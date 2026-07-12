import type { Metadata } from "next";
import Link from "next/link";
import { CITIES, citiesByCounty, COASTAL_CITIES } from "@/lib/cities";
import { BUSINESS } from "@/lib/constants";
import { Nav } from "@/app/components/Nav";
import { Footer } from "@/app/components/Footer";
import { StickyCallBar } from "@/app/components/StickyCallBar";
import { QuoteForm } from "@/app/components/QuoteForm";
import { Breadcrumb } from "@/app/components/Breadcrumb";

export const metadata: Metadata = {
  title: "Service Areas | Pressure Washing Across LA & Orange County",
  description:
    "True Coastal Exterior serves the coast and high-value neighborhoods of Los Angeles County and Orange County — from Malibu to San Clemente. Find your city.",
  alternates: { canonical: "/service-areas" },
};

function CityGrid({ county }: { county: "Los Angeles County" | "Orange County" }) {
  const cities = citiesByCounty(county);
  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {cities.map((c) => (
        <Link
          key={c.slug}
          href={`/service-areas/${c.slug}`}
          className="group card-chunky !p-5 hover:-translate-y-1 transition-transform"
        >
          <h3 className="text-2xl text-navy-900">{c.name}</h3>
          <span className="mt-4 inline-flex items-center gap-1 font-display text-sm text-navy-900 group-hover:text-sunset-coral transition-colors">
            View {c.name} services <span aria-hidden>→</span>
          </span>
        </Link>
      ))}
    </div>
  );
}

export default function ServiceAreasPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "HomeAndConstructionBusiness",
    name: BUSINESS.name,
    telephone: BUSINESS.phone,
    email: BUSINESS.email,
    url: `https://${BUSINESS.domain}/service-areas`,
    areaServed: CITIES.map((c) => ({ "@type": "City", name: c.name })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Nav />
      <main>
        <Breadcrumb
          items={[{ label: "Home", href: "/" }, { label: "Service Areas" }]}
        />

        <section className="relative overflow-hidden px-6 pt-8 pb-14">
          <div className="absolute -top-20 -right-20 w-[360px] h-[360px] rounded-full bg-sunset-gradient-v opacity-50 blur-3xl pointer-events-none" />
          <div className="container-tc relative">
            <span className="eyebrow">where we work</span>
            <h1 className="mt-3 font-display text-4xl sm:text-5xl md:text-6xl text-navy-900 max-w-3xl leading-[0.95]">
              Serving the{" "}
              <span className="bg-sunset-gradient bg-clip-text text-transparent">
                LA &amp; Orange County
              </span>{" "}
              coast.
            </h1>
            <p className="mt-5 text-lg text-navy-900/80 max-w-2xl">
              We&apos;re on the road across both counties every day — from the
              beach cities to the hilltop estates. Pick your city for details,
              or just{" "}
              <a href="#quote" className="font-semibold underline decoration-sunset-coral decoration-2 underline-offset-4">
                request a free quote
              </a>
              . Don&apos;t see your town? Call us at{" "}
              <a href={BUSINESS.phoneHref} className="font-semibold underline decoration-sunset-coral decoration-2 underline-offset-4">
                {BUSINESS.phone}
              </a>{" "}
              — we probably cover it.
            </p>
            <div className="mt-6 flex flex-wrap gap-3 text-sm">
              <span className="rounded-full bg-navy-900 text-cream-50 px-4 py-2 font-display">
                {CITIES.length} cities served
              </span>
              <span className="rounded-full border-2 border-navy-900/20 px-4 py-2 font-display text-navy-900">
                🌊 {COASTAL_CITIES.length} coastal communities
              </span>
            </div>
          </div>
        </section>

        <section className="section !pt-4">
          <div className="container-tc space-y-14">
            <div>
              <h2 className="text-3xl md:text-4xl text-navy-900 mb-6">
                Los Angeles County
              </h2>
              <CityGrid county="Los Angeles County" />
            </div>
            <div>
              <h2 className="text-3xl md:text-4xl text-navy-900 mb-6">Orange County</h2>
              <CityGrid county="Orange County" />
            </div>
          </div>
        </section>

        <QuoteForm source="Service Areas hub page" />
      </main>
      <Footer />
      <StickyCallBar />
    </>
  );
}
