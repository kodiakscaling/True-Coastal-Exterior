import { BUSINESS } from "@/lib/constants";
import { LeadForm } from "./LeadForm";

export function QuoteForm({ source }: { source?: string }) {
  return (
    <section
      id="quote"
      className="section relative bg-navy-900 text-cream-50 overflow-hidden"
    >
      {/* Decorative sunset background */}
      <div className="absolute inset-0 opacity-30 pointer-events-none">
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[800px] h-[800px] rounded-full bg-sunset-gradient-v blur-3xl" />
      </div>

      <div className="container-tc relative grid lg:grid-cols-5 gap-10 items-start">
        <div className="lg:col-span-2">
          <span className="font-script text-3xl text-sunset-orange -rotate-2 inline-block">
            free quote
          </span>
          <h2 className="mt-3 text-4xl md:text-5xl text-cream-50">
            Tell us about your place.
          </h2>
          <p className="mt-4 text-lg text-cream-50/80 max-w-md">
            Drop your info and we&apos;ll find a time to come out and take a look
            at your project and property in person — usually within 48 hours. No
            spam, no pressure.
          </p>

          <div className="mt-8 space-y-4 text-cream-50/90">
            <ContactRow icon="📞" label="Call or text" value={BUSINESS.phone} href={BUSINESS.phoneHref} />
            <ContactRow icon="✉️" label="Email" value={BUSINESS.email} href={BUSINESS.emailHref} />
            <ContactRow icon="🕒" label="Availability" value={BUSINESS.hours} />
            <ContactRow icon="🌊" label="Area" value={BUSINESS.serviceArea} />
          </div>
        </div>

        <div className="lg:col-span-3">
          <LeadForm idPrefix="quote" source={source} />
        </div>
      </div>
    </section>
  );
}

function ContactRow({
  icon,
  label,
  value,
  href,
}: {
  icon: string;
  label: string;
  value: string;
  href?: string;
}) {
  const content = (
    <div className="flex items-start gap-3">
      <span className="text-xl leading-tight" aria-hidden>{icon}</span>
      <div className="min-w-0">
        <div className="text-xs uppercase tracking-widest opacity-70">{label}</div>
        <div className="font-display text-base sm:text-lg break-words">{value}</div>
      </div>
    </div>
  );
  return href ? (
    <a href={href} className="block hover:text-sunset-orange transition-colors">
      {content}
    </a>
  ) : (
    content
  );
}
