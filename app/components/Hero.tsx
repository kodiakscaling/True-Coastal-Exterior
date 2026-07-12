import { BUSINESS } from "@/lib/constants";
import { LeadForm } from "./LeadForm";

export function Hero() {
  return (
    <section className="relative overflow-hidden pt-14 pb-24 md:pt-20 md:pb-32 px-6">
      {/* Soft sunset glow */}
      <div className="absolute -top-32 -right-24 w-[460px] h-[460px] rounded-full bg-sunset-gradient-v opacity-40 blur-3xl pointer-events-none" />
      {/* Retro surf-shop sunset */}
      <div
        className="absolute -top-24 -right-14 w-[210px] sm:w-[290px] lg:w-[360px] pointer-events-none select-none"
        aria-hidden
      >
        <svg viewBox="0 0 200 200" className="w-full h-auto drop-shadow-sm">
          <defs>
            <linearGradient id="tc-sun" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#F97316" />
              <stop offset="52%" stopColor="#EF4444" />
              <stop offset="100%" stopColor="#E11D74" />
            </linearGradient>
            <clipPath id="tc-sun-clip">
              <circle cx="100" cy="100" r="97" />
            </clipPath>
          </defs>
          <g clipPath="url(#tc-sun-clip)" fill="url(#tc-sun)">
            <rect x="0" y="0" width="200" height="118" />
            <rect x="0" y="124" width="200" height="11" />
            <rect x="0" y="141" width="200" height="9" />
            <rect x="0" y="156" width="200" height="7" />
            <rect x="0" y="169" width="200" height="6" />
            <rect x="0" y="181" width="200" height="5" />
            <rect x="0" y="191" width="200" height="4" />
          </g>
        </svg>
      </div>

      <div className="container-tc relative grid md:grid-cols-2 gap-12 items-center">
        <div>
          <span className="eyebrow">Coastal-tough clean</span>
          <h1 className="mt-4 font-display text-4xl sm:text-5xl md:text-6xl leading-[1.02] text-navy-900">
            A cleaner home.
            <br />
            <span className="bg-sunset-gradient bg-clip-text text-transparent">
              A cleaner coast.
            </span>
          </h1>
          <p className="mt-6 text-lg md:text-xl text-navy-900/80 max-w-xl font-body">
            Pressure washing, house &amp; roof washing, window, gutter, and solar
            panel cleaning, done right the first time. Mold, algae, dust, salt?
            Handled.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <a href="#hero-quote" className="btn-sunset md:hidden">
              Get a Free Quote
              <span aria-hidden>→</span>
            </a>
            <a href={BUSINESS.phoneHref} className="btn-outline">
              <span aria-hidden>📞</span> {BUSINESS.phone}
            </a>
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-6 text-sm text-navy-900/70">
            <TrustPill icon="⭐" label="5-star rated" />
            <TrustPill icon="💯" label="Satisfaction guaranteed" />
            <TrustPill icon="🌊" label="Clean homes & coasts" />
          </div>
        </div>

        {/* Lead form */}
        <div id="hero-quote" className="relative scroll-mt-24">
          {/* Floating badge */}
          <div className="absolute -top-5 -left-5 z-10 rotate-[-8deg] card-chunky !p-3 !bg-cream-50 hidden sm:block">
            <div className="font-script text-sunset-coral text-lg leading-none">free</div>
            <div className="font-display text-navy-900 text-xl leading-none">on-site</div>
            <div className="text-xs text-navy-900/70 mt-1">within 48 hrs</div>
          </div>

          <div className="rounded-[2rem] border-2 border-navy-900 shadow-chunky bg-cream-50">
            <div className="bg-navy-900 text-cream-50 px-6 py-5 text-center rounded-t-[2rem]">
              <h2 className="font-display text-2xl md:text-3xl">Get your free quote</h2>
              <p className="text-cream-50/80 text-sm mt-1">
                We&apos;ll come take a look in person, usually within 48 hours.
              </p>
            </div>
            <LeadForm
              idPrefix="hero"
              compact
              submitLabel="Get My Free Quote"
              source="Hero form"
              className="!border-0 !shadow-none !rounded-t-none !rounded-b-[2rem]"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

function TrustPill({ icon, label }: { icon: string; label: string }) {
  return (
    <div className="flex items-center gap-2">
      <span aria-hidden>{icon}</span>
      <span className="font-semibold">{label}</span>
    </div>
  );
}
