const STEPS = [
  {
    n: "01",
    title: "Send us your details",
    body: "Text, call, or drop the quote form. Photos help but aren't required.",
  },
  {
    n: "02",
    title: "We come take a look",
    body: "We'll set up a time to come out and look at your project and property in person — usually within 48 hours.",
  },
  {
    n: "03",
    title: "We show up on time",
    body: "Uniformed crew, clean truck, and careful, tidy work from start to finish.",
  },
  {
    n: "04",
    title: "You love it — or we come back",
    body: "100% satisfaction guarantee. If something isn't right, we make it right.",
  },
];

export function Process() {
  return (
    <section className="section">
      <div className="container-tc">
        <div className="text-center mb-14">
          <span className="eyebrow">easy as low tide</span>
          <h2 className="mt-3 text-4xl md:text-5xl text-navy-900">
            Four steps to a fresh home.
          </h2>
        </div>
        <div className="grid md:grid-cols-4 gap-4">
          {STEPS.map((s, i) => (
            <div
              key={s.n}
              className="relative card-chunky hover:-translate-y-1 transition-transform"
            >
              <div
                className="font-display text-6xl bg-sunset-gradient bg-clip-text text-transparent leading-none"
                aria-hidden
              >
                {s.n}
              </div>
              <h3 className="mt-3 text-xl text-navy-900">{s.title}</h3>
              <p className="mt-2 text-navy-900/75 text-sm leading-relaxed">
                {s.body}
              </p>
              {i < STEPS.length - 1 && (
                <span
                  aria-hidden
                  className="hidden md:block absolute -right-3 top-1/2 -translate-y-1/2 text-3xl text-sunset-coral"
                >
                  →
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
