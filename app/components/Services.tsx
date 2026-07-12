import { SERVICES } from "@/lib/constants";

export function Services() {
  return (
    <section id="services" className="section bg-cream-100 border-y-2 border-navy-900/10">
      <div className="container-tc">
        <div className="text-center mb-14">
          <span className="eyebrow">what we do</span>
          <h2 className="mt-3 text-4xl md:text-5xl text-navy-900">
            Services built for the coast.
          </h2>
          <p className="mt-4 text-lg text-navy-900/70 max-w-2xl mx-auto">
            Six focused services, done right — no gimmicks. Every job uses the
            right method for the surface.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {SERVICES.map((s, i) => (
            <article
              key={s.slug}
              className="group card-chunky !p-0 overflow-hidden hover:-translate-y-1 transition-transform"
            >
              <div
                className="aspect-[16/10] bg-cover bg-center border-b-2 border-navy-900"
                style={{ backgroundImage: `url(${s.image})` }}
                aria-hidden
              />
              <div className="p-6">
                <div className="flex items-center gap-3">
                  <span
                    className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-sunset-gradient text-white font-display border-2 border-navy-900"
                    aria-hidden
                  >
                    {i + 1}
                  </span>
                  <h3 className="text-2xl text-navy-900">{s.title}</h3>
                </div>
                <p className="mt-1 font-script text-xl text-sunset-coral -rotate-1">
                  {s.tagline}
                </p>
                <p className="mt-3 text-navy-900/80">{s.blurb}</p>
                <ul className="mt-4 space-y-1.5">
                  {s.bullets.map((b) => (
                    <li
                      key={b}
                      className="flex items-start gap-2 text-navy-900/85"
                    >
                      <span
                        aria-hidden
                        className="mt-1 h-2 w-2 rounded-full bg-sunset-coral shrink-0"
                      />
                      {b}
                    </li>
                  ))}
                </ul>
                <a
                  href="#quote"
                  className="mt-6 inline-flex items-center gap-2 font-display text-navy-900 hover:text-sunset-coral transition-colors"
                >
                  Quote this service <span aria-hidden>→</span>
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
