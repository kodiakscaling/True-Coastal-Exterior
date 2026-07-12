import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CITIES, getCity } from "@/lib/cities";
import { BUSINESS, SERVICES } from "@/lib/constants";
import { Nav } from "@/app/components/Nav";
import { Footer } from "@/app/components/Footer";
import { StickyCallBar } from "@/app/components/StickyCallBar";
import { QuoteForm } from "@/app/components/QuoteForm";
import { Testimonials } from "@/app/components/Testimonials";
import { FAQ } from "@/app/components/FAQ";
import { Breadcrumb } from "@/app/components/Breadcrumb";

export function generateStaticParams() {
  return CITIES.map((c) => ({ city: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ city: string }>;
}): Promise<Metadata> {
  const { city: slug } = await params;
  const city = getCity(slug);
  if (!city) return {};
  const title = `Pressure Washing in ${city.name}, CA | House, Roof & Window Cleaning`;
  const description = `Local exterior cleaning in ${city.name}, ${city.county}. Pressure washing, house & roof washing & streak-free window cleaning. Free on-site quotes within 48 hours — call ${BUSINESS.phone}.`;
  return {
    title,
    description,
    alternates: { canonical: `/service-areas/${city.slug}` },
    openGraph: {
      title,
      description,
      url: `https://${BUSINESS.domain}/service-areas/${city.slug}`,
    },
  };
}

export default async function CityPage({
  params,
}: {
  params: Promise<{ city: string }>;
}) {
  const { city: slug } = await params;
  const city = getCity(slug);
  if (!city) notFound();

  const nearby = city.nearby
    .map((slug) => getCity(slug))
    .filter((c): c is NonNullable<typeof c> => Boolean(c));

  // LocalBusiness + areaServed structured data
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "HomeAndConstructionBusiness",
    name: `${BUSINESS.name} — ${city.name}`,
    description: `Pressure washing, soft washing, and window cleaning serving ${city.name}, California.`,
    telephone: BUSINESS.phone,
    email: BUSINESS.email,
    url: `https://${BUSINESS.domain}/service-areas/${city.slug}`,
    areaServed: {
      "@type": "City",
      name: city.name,
      containedInPlace: { "@type": "AdministrativeArea", name: city.county },
    },
    address: {
      "@type": "PostalAddress",
      addressLocality: city.name,
      addressRegion: "CA",
      postalCode: city.zips[0],
      addressCountry: "US",
    },
    priceRange: "$$",
    makesOffer: SERVICES.map((s) => ({
      "@type": "Offer",
      itemOffered: { "@type": "Service", name: `${s.title} in ${city.name}` },
    })),
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
          items={[
            { label: "Home", href: "/" },
            { label: "Service Areas", href: "/service-areas" },
            { label: city.name },
          ]}
        />

        {/* Hero */}
        <section className="relative overflow-hidden px-6 pt-8 pb-16 md:pt-12 md:pb-20">
          <div className="absolute -top-24 -right-24 w-[380px] h-[380px] rounded-full bg-sunset-gradient-v opacity-60 blur-3xl pointer-events-none" />
          <div className="container-tc relative">
            <span className="eyebrow">
              {city.coastal ? "Coastal service area" : "Service area"} · {city.county}
            </span>
            <h1 className="mt-3 font-display text-4xl sm:text-5xl md:text-6xl leading-[0.95] text-navy-900 max-w-4xl">
              Exterior Cleaning in{" "}
              <span className="bg-sunset-gradient bg-clip-text text-transparent">
                {city.name}, CA
              </span>
            </h1>
            <p className="mt-6 text-lg text-navy-900/80 max-w-3xl">{city.intro}</p>
            <div className="mt-7 flex flex-wrap items-center gap-4">
              <a href="#quote" className="btn-sunset">
                Get a Free {city.name} Quote <span aria-hidden>→</span>
              </a>
              <a href={BUSINESS.phoneHref} className="btn-outline">
                <span aria-hidden>📞</span> {BUSINESS.phone}
              </a>
            </div>
            <div className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-navy-900/70">
              <span className="flex items-center gap-2"><span aria-hidden>⭐</span> 5-star rated</span>
              <span className="flex items-center gap-2"><span aria-hidden>🌊</span> Clean homes &amp; coasts</span>
              <span className="flex items-center gap-2"><span aria-hidden>🏡</span> On-site quotes within 48 hrs</span>
            </div>
          </div>
        </section>

        {/* Local challenge */}
        <section className="section bg-cream-100 border-y-2 border-navy-900/10 !py-16">
          <div className="container-tc grid md:grid-cols-2 gap-10 items-center">
            <div>
              <span className="eyebrow">why it matters here</span>
              <h2 className="mt-3 text-3xl md:text-4xl text-navy-900">
                Cleaning built for {city.name} homes.
              </h2>
              <p className="mt-4 text-lg text-navy-900/80">{city.challenge}</p>
            </div>
            <div className="card-chunky">
              <h3 className="text-xl text-navy-900">Neighborhoods we serve in {city.name}</h3>
              <div className="mt-4 flex flex-wrap gap-2">
                {city.neighborhoods.map((n) => (
                  <span
                    key={n}
                    className="rounded-full border-2 border-navy-900/15 bg-cream-50 px-3 py-1.5 text-sm text-navy-900/80"
                  >
                    {n}
                  </span>
                ))}
              </div>
              <h3 className="mt-6 text-xl text-navy-900">Near</h3>
              <p className="mt-2 text-navy-900/70">{city.landmarks.join(" · ")}</p>
              <p className="mt-4 text-sm text-navy-900/50">
                ZIP codes served: {city.zips.join(", ")}
              </p>
            </div>
          </div>
        </section>

        {/* Services recap */}
        <section className="section">
          <div className="container-tc">
            <div className="text-center mb-12">
              <span className="eyebrow">what we do in {city.name}</span>
              <h2 className="mt-3 text-3xl md:text-4xl text-navy-900">
                Six services, done right.
              </h2>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {SERVICES.map((s, i) => (
                <div key={s.slug} className="card-chunky hover:-translate-y-1 transition-transform">
                  <div className="flex items-center gap-3">
                    <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-sunset-gradient text-white font-display border-2 border-navy-900">
                      {i + 1}
                    </span>
                    <h3 className="text-2xl text-navy-900">{s.title}</h3>
                  </div>
                  <p className="mt-1 font-script text-xl text-sunset-coral -rotate-1">{s.tagline}</p>
                  <p className="mt-3 text-navy-900/80">{s.blurb}</p>
                  <ul className="mt-4 space-y-1.5">
                    {s.bullets.map((b) => (
                      <li key={b} className="flex items-start gap-2 text-navy-900/85">
                        <span aria-hidden className="mt-1 h-2 w-2 rounded-full bg-sunset-coral shrink-0" />
                        {b}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        <Testimonials />

        {/* Nearby areas */}
        {nearby.length > 0 && (
          <section className="section !py-16">
            <div className="container-tc text-center">
              <span className="eyebrow">nearby</span>
              <h2 className="mt-3 text-3xl md:text-4xl text-navy-900">
                We also serve these areas.
              </h2>
              <div className="mt-8 flex flex-wrap justify-center gap-3">
                {nearby.map((n) => (
                  <Link
                    key={n.slug}
                    href={`/service-areas/${n.slug}`}
                    className="rounded-full border-2 border-navy-900 bg-cream-50 px-5 py-2.5 font-display text-navy-900 shadow-chunky-sm hover:-translate-y-0.5 transition-transform"
                  >
                    {n.name} →
                  </Link>
                ))}
                <Link
                  href="/service-areas"
                  className="rounded-full border-2 border-navy-900 bg-navy-900 text-cream-50 px-5 py-2.5 font-display shadow-chunky-sm hover:-translate-y-0.5 transition-transform"
                >
                  All service areas
                </Link>
              </div>
            </div>
          </section>
        )}

        <QuoteForm source={`${city.name} service-area page`} />
        <FAQ />
      </main>
      <Footer />
      <StickyCallBar />
    </>
  );
}
