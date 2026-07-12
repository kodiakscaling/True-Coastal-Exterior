import { BUSINESS } from "@/lib/constants";

export function TopBar() {
  return (
    <a
      href={BUSINESS.phoneHref}
      className="block bg-cream-100 border-b-2 border-navy-900/10 text-navy-900 hover:bg-cream-200 transition-colors"
      aria-label={`Open now — call or text ${BUSINESS.phone} any time`}
    >
      <div className="container-tc flex items-center justify-center gap-2 sm:gap-3 px-4 py-2 text-xs sm:text-sm text-center">
        {/* Live "open" indicator */}
        <span className="relative flex h-2 w-2 shrink-0" aria-hidden>
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500 opacity-75" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
        </span>
        <span className="font-display uppercase tracking-wide text-navy-900">
          Open Now
        </span>
        <span className="text-navy-900/25" aria-hidden>·</span>
        <span className="text-navy-900/70">
          <span className="hidden sm:inline">
            Call or text any time, day or night —{" "}
          </span>
          <span className="font-display text-navy-900 underline decoration-sunset-coral decoration-2 underline-offset-2 whitespace-nowrap">
            {BUSINESS.phone}
          </span>
        </span>
      </div>
    </a>
  );
}
