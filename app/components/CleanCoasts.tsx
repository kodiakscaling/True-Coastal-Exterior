const PILLARS = [
  {
    icon: "🌊",
    title: "Coastline restoration",
    body: "We donate to and champion the groups restoring Southern California's beaches, wetlands, and shoreline habitats.",
  },
  {
    icon: "🐟",
    title: "Aquatic-life safety",
    body: "We advocate for the organizations protecting marine and aquatic life up and down our coast.",
  },
  {
    icon: "💙",
    title: "Real support",
    body: "We back it with real donations, not just talk — funding the people doing the hands-on work to protect our coast.",
  },
];

export function CleanCoasts() {
  return (
    <section
      id="mission"
      className="section relative overflow-hidden bg-navy-900 text-cream-50"
    >
      {/* Soft ocean glow */}
      <div className="absolute -bottom-32 -left-20 w-[460px] h-[460px] rounded-full bg-seafoam opacity-20 blur-3xl pointer-events-none" />

      <div className="container-tc relative">
        <div className="text-center mb-12 max-w-3xl mx-auto">
          <span className="font-script text-3xl text-seafoam -rotate-2 inline-block">
            our mission
          </span>
          <h2 className="mt-3 text-4xl md:text-5xl text-cream-50">
            Clean homes, clean coasts.
          </h2>
          <p className="mt-5 text-lg text-cream-50/80">
            We got into this to make homes shine — but we care just as much
            about the coastline that makes Southern California special. That&apos;s
            why True Coastal is a proud advocate and donor for coastline
            restoration and aquatic-life safety.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {PILLARS.map((p) => (
            <div
              key={p.title}
              className="rounded-3xl border-2 border-seafoam/40 bg-navy-700/40 p-6 hover:-translate-y-1 transition-transform"
            >
              <div className="text-4xl mb-3" aria-hidden>
                {p.icon}
              </div>
              <h3 className="text-2xl text-cream-50">{p.title}</h3>
              <p className="mt-2 text-cream-50/75 leading-relaxed">{p.body}</p>
            </div>
          ))}
        </div>

        <p className="mt-10 text-center font-script text-2xl md:text-3xl text-seafoam -rotate-1">
          we love a clean home — and a cleaner coast even more.
        </p>
      </div>
    </section>
  );
}
