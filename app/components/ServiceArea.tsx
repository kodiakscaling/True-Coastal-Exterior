import Link from "next/link";
import { BUSINESS } from "@/lib/constants";
import { citiesByCounty } from "@/lib/cities";
import { MapEmbed } from "./MapEmbed";

const COUNTIES = [
  {
    name: "Los Angeles County",
    mapSrc:
      "https://maps.google.com/maps?q=Los%20Angeles%20County%2C%20CA&z=9&output=embed",
    cities: citiesByCounty("Los Angeles County"),
  },
  {
    name: "Orange County",
    mapSrc:
      "https://maps.google.com/maps?q=Orange%20County%2C%20CA&z=10&output=embed",
    cities: citiesByCounty("Orange County"),
  },
];

export function ServiceArea() {
  return (
    <section id="area" className="section">
      <div className="container-tc">
        <div className="text-center mb-16">
          <span className="eyebrow">where we work</span>
          <h2 className="mt-2 font-display text-5xl md:text-7xl text-navy-900 uppercase tracking-tight leading-none">
            Proudly Serving
          </h2>
          <p className="mt-4 text-xl md:text-2xl font-bold text-sunset-coral">
            Professional exterior cleaning across LA &amp; Orange County
          </p>
        </div>

        <div className="space-y-20">
          {COUNTIES.map((county) => (
            <div
              key={county.name}
              className="grid md:grid-cols-2 gap-8 md:gap-12 items-start"
            >
              {/* Embedded Google Map of the service area */}
              <div className="rounded-3xl overflow-hidden border-2 border-navy-900 shadow-chunky bg-cream-100">
                <MapEmbed
                  src={county.mapSrc}
                  title={`Map of our ${county.name} service area`}
                />
              </div>

              {/* County name + expandable city list */}
              <div>
                <h3 className="font-display text-4xl md:text-5xl text-navy-900 text-center md:text-left uppercase tracking-tight mb-5">
                  {county.name}
                </h3>
                <ul className="border-t-2 border-navy-900/10">
                  {county.cities.map((city) => (
                    <li key={city.slug} className="border-b-2 border-navy-900/10">
                      <details className="group">
                        <summary className="flex items-center justify-between gap-4 py-4 cursor-pointer list-none font-display text-lg md:text-xl uppercase tracking-wide text-navy-900 hover:text-sunset-coral transition-colors">
                          <span>{city.name}</span>
                          <svg
                            className="w-4 h-4 shrink-0 transition-transform group-open:rotate-180"
                            viewBox="0 0 12 8"
                            fill="none"
                            aria-hidden
                          >
                            <path
                              d="M1 1l5 5 5-5"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </summary>
                        <div className="pb-5">
                          <p className="text-sm text-navy-900/70 leading-relaxed">
                            <span className="font-semibold text-navy-900/80">
                              Neighborhoods:{" "}
                            </span>
                            {city.neighborhoods.join(" · ")}
                          </p>
                          <Link
                            href={`/service-areas/${city.slug}`}
                            className="mt-3 inline-flex items-center gap-1 font-display text-sm text-sunset-coral hover:text-navy-900 transition-colors"
                          >
                            View {city.name} services <span aria-hidden>→</span>
                          </Link>
                        </div>
                      </details>
                    </li>
                  ))}
                </ul>
                <Link
                  href="/service-areas"
                  className="mt-6 inline-flex btn-outline !py-3 !text-base"
                >
                  All service areas →
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Closing CTA */}
        <div className="mt-16 text-center">
          <p className="text-lg text-navy-900/75 mb-5">
            Don&apos;t see your city? We likely still cover it — just ask.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a href={BUSINESS.phoneHref} className="btn-navy">
              📞 {BUSINESS.phone}
            </a>
            <a href="#quote" className="btn-sunset">
              Get a Free Quote
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
