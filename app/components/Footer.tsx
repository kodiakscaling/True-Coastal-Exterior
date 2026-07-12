import Link from "next/link";
import { BUSINESS, SERVICES } from "@/lib/constants";
import { COASTAL_CITIES } from "@/lib/cities";
import { Logo } from "./Logo";

export function Footer() {
  const popularAreas = COASTAL_CITIES.slice(0, 8);
  return (
    <footer className="relative bg-navy-900 text-cream-50 pt-16 pb-24 md:pb-16 px-6 border-t-2 border-navy-900">
      <div className="container-tc grid md:grid-cols-4 gap-10">
        <div className="md:col-span-2">
          <Logo dark className="[&_img]:h-20 md:[&_img]:h-24" />
          <p className="mt-4 max-w-sm text-cream-50/75">
            Locally owned and operated exterior cleaning for LA County and
            Orange County. Proud advocates and donors for coastline restoration
            and aquatic-life safety.
          </p>
          <div className="mt-6 flex flex-col gap-2 text-cream-50/90">
            <a href={BUSINESS.phoneHref} className="hover:text-sunset-orange transition-colors">
              📞 {BUSINESS.phone}
            </a>
            <a href={BUSINESS.emailHref} className="hover:text-sunset-orange transition-colors">
              ✉️ {BUSINESS.email}
            </a>
            <span>🕒 {BUSINESS.hours}</span>
            <span>🌊 {BUSINESS.serviceArea}</span>
          </div>
        </div>

        <div>
          <h4 className="font-display text-xl mb-4 text-cream-50">Services</h4>
          <ul className="space-y-2 text-cream-50/80">
            {SERVICES.map((s) => (
              <li key={s.slug}>
                <a href="#services" className="hover:text-sunset-orange transition-colors">
                  {s.title}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="font-display text-xl mb-4 text-cream-50">Company</h4>
          <ul className="space-y-2 text-cream-50/80">
            <li><a href="#reviews" className="hover:text-sunset-orange transition-colors">Reviews</a></li>
            <li><a href="#area" className="hover:text-sunset-orange transition-colors">Service Area</a></li>
            <li><a href="#faq" className="hover:text-sunset-orange transition-colors">FAQ</a></li>
            <li><a href="#quote" className="hover:text-sunset-orange transition-colors">Free Quote</a></li>
          </ul>
        </div>
      </div>

      <div className="container-tc mt-12 pt-8 border-t border-cream-50/15">
        <h4 className="font-display text-lg mb-4 text-cream-50">Popular service areas</h4>
        <div className="flex flex-wrap gap-x-5 gap-y-2 text-cream-50/75">
          {popularAreas.map((c) => (
            <Link
              key={c.slug}
              href={`/service-areas/${c.slug}`}
              className="hover:text-sunset-orange transition-colors"
            >
              {c.name}
            </Link>
          ))}
          <Link href="/service-areas" className="font-semibold text-sunset-orange hover:underline">
            See all areas →
          </Link>
        </div>
      </div>

      <div className="container-tc mt-8 pt-6 border-t border-cream-50/15 flex flex-wrap gap-4 justify-between items-center text-sm text-cream-50/60">
        <div>© {new Date().getFullYear()} {BUSINESS.name}. All rights reserved.</div>
        <div className="font-script text-sunset-orange text-xl -rotate-2">
          made on the coast 🌊
        </div>
      </div>
    </footer>
  );
}
