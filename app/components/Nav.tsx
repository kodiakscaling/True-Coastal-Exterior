"use client";

import { useState } from "react";
import { BUSINESS } from "@/lib/constants";
import { Logo } from "./Logo";
import { TopBar } from "./TopBar";

const links = [
  { href: "/#services", label: "Services" },
  { href: "/#reviews", label: "Reviews" },
  { href: "/service-areas", label: "Service Areas" },
  { href: "/#faq", label: "FAQ" },
];

export function Nav() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <TopBar />
      <header
        id="top"
        className="sticky top-0 z-40 bg-cream-50/85 backdrop-blur border-b-2 border-navy-900/10"
      >
        <div className="container-tc flex items-center justify-between py-3 px-4">
          <Logo />
          <nav className="hidden lg:flex items-center gap-7 font-body text-navy-900">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="text-sm font-semibold uppercase tracking-wide hover:text-sunset-coral transition-colors"
              >
                {l.label}
              </a>
            ))}
          </nav>
          <div className="flex items-center gap-2">
            <a
              href={BUSINESS.phoneHref}
              className="hidden sm:inline-flex font-display text-navy-900 items-center gap-2 text-base"
            >
              <span aria-hidden>📞</span> {BUSINESS.phone}
            </a>
            <a
              href="#quote"
              className="hidden sm:inline-flex btn-sunset !py-2.5 !px-4 !text-sm shadow-chunky-sm"
            >
              Free Quote
            </a>
            {/* Hamburger — mobile / tablet only */}
            <button
              type="button"
              onClick={() => setOpen((o) => !o)}
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              className="lg:hidden inline-flex h-11 w-11 items-center justify-center rounded-xl border-2 border-navy-900/15 text-navy-900"
            >
              <svg
                className="h-6 w-6"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
                aria-hidden
              >
                {open ? (
                  <path d="M6 6l12 12M18 6L6 18" />
                ) : (
                  <>
                    <path d="M4 7h16" />
                    <path d="M4 12h16" />
                    <path d="M4 17h16" />
                  </>
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile menu panel */}
        {open && (
          <nav className="lg:hidden border-t-2 border-navy-900/10 bg-cream-50 px-5 pb-3">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="block border-b border-navy-900/10 py-3.5 font-display text-lg text-navy-900"
              >
                {l.label}
              </a>
            ))}
            <div className="mt-4 grid grid-cols-2 gap-3">
              <a
                href={BUSINESS.phoneHref}
                onClick={() => setOpen(false)}
                className="btn-outline !py-3 !text-sm justify-center"
              >
                📞 Call
              </a>
              <a
                href="#quote"
                onClick={() => setOpen(false)}
                className="btn-sunset !py-3 !text-sm justify-center"
              >
                Free Quote
              </a>
            </div>
          </nav>
        )}
      </header>
    </>
  );
}
