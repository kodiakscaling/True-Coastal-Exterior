import { BUSINESS } from "@/lib/constants";

export function StickyCallBar() {
  return (
    <div className="fixed bottom-0 inset-x-0 z-40 md:hidden border-t-2 border-navy-900 bg-cream-50 shadow-[0_-4px_0_0_rgba(11,23,46,0.15)]">
      <div className="grid grid-cols-2">
        <a
          href={BUSINESS.phoneHref}
          className="flex items-center justify-center gap-2 py-4 font-display text-navy-900 border-r-2 border-navy-900/20"
        >
          <span aria-hidden>📞</span> Call
        </a>
        <a
          href="#quote"
          className="flex items-center justify-center gap-2 py-4 font-display text-cream-50 bg-sunset-gradient"
        >
          <span aria-hidden>✍️</span> Free Quote
        </a>
      </div>
    </div>
  );
}
