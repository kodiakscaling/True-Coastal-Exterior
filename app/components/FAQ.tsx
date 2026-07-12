"use client";

import { useState } from "react";
import { FAQS } from "@/lib/constants";

export function FAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="section bg-cream-100 border-y-2 border-navy-900/10">
      <div className="container-tc grid md:grid-cols-3 gap-10">
        <div>
          <span className="eyebrow">questions</span>
          <h2 className="mt-3 text-4xl md:text-5xl text-navy-900">
            Answered, straight up.
          </h2>
          <p className="mt-4 text-navy-900/70">
            Anything not here? Text us at{" "}
            <a href="tel:+18605081161" className="underline decoration-sunset-coral decoration-2 underline-offset-4 font-semibold">
              860-508-1161
            </a>{" "}
            and we&apos;ll answer.
          </p>
        </div>
        <div className="md:col-span-2 space-y-3">
          {FAQS.map((f, i) => (
            <details
              key={i}
              open={open === i}
              onToggle={(e) => {
                if ((e.target as HTMLDetailsElement).open) setOpen(i);
                else if (open === i) setOpen(null);
              }}
              className="group rounded-2xl border-2 border-navy-900 bg-cream-50 overflow-hidden"
            >
              <summary className="flex items-center justify-between cursor-pointer p-5 font-display text-lg md:text-xl text-navy-900 list-none">
                {f.q}
                <span
                  aria-hidden
                  className="ml-4 flex h-9 w-9 items-center justify-center rounded-full bg-sunset-gradient text-white text-xl border-2 border-navy-900 transition-transform group-open:rotate-45"
                >
                  +
                </span>
              </summary>
              <div className="px-5 pb-5 text-navy-900/80 leading-relaxed">
                {f.a}
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
