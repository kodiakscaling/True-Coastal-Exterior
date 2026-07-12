const TRUST = [
  { icon: "⭐", stat: "5.0", label: "Google rating" },
  { icon: "🏡", stat: "300+", label: "Homes serviced" },
  { icon: "🗓️", stat: "3+", label: "Years in business" },
  { icon: "🌊", stat: "100%", label: "Satisfaction guarantee" },
];

export function TrustBar() {
  return (
    <section className="relative py-10 bg-navy-900 text-cream-50 border-y-2 border-navy-900">
      <div className="container-tc grid grid-cols-2 md:grid-cols-4 gap-8 px-4">
        {TRUST.map((t) => (
          <div key={t.label} className="text-center">
            <div className="text-3xl mb-1" aria-hidden>{t.icon}</div>
            <div className="font-display text-3xl md:text-4xl bg-sunset-gradient bg-clip-text text-transparent">
              {t.stat}
            </div>
            <div className="text-sm uppercase tracking-widest opacity-80 mt-1">
              {t.label}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
