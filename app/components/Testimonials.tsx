import { TESTIMONIALS } from "@/lib/constants";

export function Testimonials() {
  return (
    <section
      id="reviews"
      className="section bg-cream-100 border-y-2 border-navy-900/10"
    >
      <div className="container-tc">
        <div className="text-center mb-12">
          <span className="eyebrow">what neighbors say</span>
          <h2 className="mt-3 text-4xl md:text-5xl text-navy-900">
            5-star reviews.
          </h2>
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          {TESTIMONIALS.map((t, i) => (
            <blockquote
              key={i}
              className={`card-chunky ${
                i % 2 === 0 ? "rotate-[-0.5deg]" : "rotate-[0.5deg]"
              }`}
            >
              <div
                className="flex gap-1 mb-3 text-sunset-orange"
                aria-label={`${t.rating} out of 5 stars`}
              >
                {Array.from({ length: t.rating }).map((_, i) => (
                  <span key={i} aria-hidden>★</span>
                ))}
              </div>
              <p className="text-lg text-navy-900/90 leading-snug">
                &ldquo;{t.quote}&rdquo;
              </p>
              <footer className="mt-4 flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-sunset-gradient border-2 border-navy-900 flex items-center justify-center font-display text-white">
                  {t.name.charAt(0)}
                </div>
                <div>
                  <div className="font-display text-navy-900">{t.name}</div>
                  <div className="text-sm text-navy-900/60">{t.city}</div>
                </div>
              </footer>
            </blockquote>
          ))}
        </div>
      </div>
    </section>
  );
}
