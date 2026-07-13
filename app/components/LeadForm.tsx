"use client";

import { useState, useRef, useEffect } from "react";
import { BUSINESS, SERVICES } from "@/lib/constants";
import { AddressAutocomplete } from "./AddressAutocomplete";

type Status = "idle" | "submitting" | "success" | "error";

const SERVICE_OPTIONS = [
  ...SERVICES.map((s) => s.title),
  "Other",
];

export function LeadForm({
  idPrefix,
  compact = false,
  submitLabel = "Send Quote Request",
  source,
  className = "",
}: {
  /** Unique prefix so multiple forms can live on one page without id clashes */
  idPrefix: string;
  /** Tighter spacing + shorter notes field for above-the-fold placement */
  compact?: boolean;
  submitLabel?: string;
  /** Optional context (e.g. city name) sent with the lead */
  source?: string;
  className?: string;
}) {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);
  const [services, setServices] = useState<string[]>([]);
  const [otherText, setOtherText] = useState("");
  const [resetSignal, setResetSignal] = useState(0);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (services.length === 0) {
      setStatus("error");
      setError("Please pick at least one service you're interested in.");
      return;
    }
    if (services.includes("Other") && !otherText.trim()) {
      setStatus("error");
      setError("Please describe what you need under “Other.”");
      return;
    }

    setStatus("submitting");
    setError(null);

    const form = e.currentTarget;
    const fields = Object.fromEntries(new FormData(form).entries());
    const data = {
      ...fields,
      service: services
        .map((s) => (s === "Other" ? `Other: ${otherText.trim()}` : s))
        .join(", "),
      // Raw selections so the server can map them to Flyra's service slugs
      serviceList: services,
      otherText: otherText.trim(),
    };

    try {
      const res = await fetch("/api/quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Something went wrong. Please call us.");
      setStatus("success");
      form.reset();
      setServices([]);
      setOtherText("");
      setResetSignal((n) => n + 1);
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Please try again.");
    }
  }

  const id = (name: string) => `${idPrefix}-${name}`;

  return (
    <form
      onSubmit={handleSubmit}
      className={`rounded-3xl bg-cream-50 border-2 border-navy-900 shadow-chunky text-navy-900 ${
        compact ? "p-5 md:p-6 space-y-3" : "p-6 md:p-8 space-y-4"
      } ${className}`}
    >
      <div className="grid sm:grid-cols-2 gap-3 sm:gap-4">
        <Field id={id("first_name")} name="first_name" label="First name" placeholder="Alex" required />
        <Field id={id("last_name")} name="last_name" label="Last name" placeholder="Rivera" required />
      </div>
      <Field id={id("phone")} name="phone" label="Phone" placeholder="(555) 555-5555" type="tel" required />
      <Field id={id("email")} name="email" label="Email" placeholder="you@email.com" type="email" required />
      <AddressAutocomplete
        id={id("address")}
        name="address"
        label="Property address"
        placeholder="123 Ocean Ave, Long Beach"
        required
        resetSignal={resetSignal}
      />

      <div>
        <label
          id={id("service-label")}
          className="block text-sm font-semibold uppercase tracking-wide mb-1.5"
        >
          Services needed{" "}
          <span className="normal-case font-normal text-navy-900/50">
            (select all that apply)
          </span>
        </label>
        <MultiSelect
          labelId={id("service-label")}
          options={SERVICE_OPTIONS}
          selected={services}
          onToggle={(opt) =>
            setServices((prev) =>
              prev.includes(opt) ? prev.filter((s) => s !== opt) : [...prev, opt],
            )
          }
        />
        {services.includes("Other") && (
          <input
            id={id("other")}
            type="text"
            value={otherText}
            onChange={(e) => setOtherText(e.target.value)}
            placeholder="Tell us what you need…"
            aria-label="Describe the service you need"
            className="mt-2 w-full rounded-xl border-2 border-navy-900/20 bg-cream-100 px-4 py-3 font-body focus:border-sunset-coral focus:outline-none"
          />
        )}
      </div>

      <div>
        <label
          htmlFor={id("message")}
          className="block text-sm font-semibold uppercase tracking-wide mb-1.5"
        >
          Tell us about the job{" "}
          <span className="normal-case font-normal text-navy-900/50">(optional)</span>
        </label>
        <textarea
          id={id("message")}
          name="message"
          rows={compact ? 2 : 4}
          placeholder="One-story stucco house, driveway has oil stains, some algae on the north side…"
          className="w-full rounded-xl border-2 border-navy-900/20 bg-cream-100 px-4 py-3 font-body focus:outline-none focus:border-sunset-coral resize-none"
        />
      </div>

      {/* Honeypot — hidden from users, catches bots */}
      <input type="text" name="website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden />
      {source && <input type="hidden" name="source" value={source} />}

      <button
        type="submit"
        disabled={status === "submitting"}
        className={`btn-sunset w-full disabled:opacity-60 disabled:cursor-not-allowed ${
          compact ? "!text-lg !py-4" : "!text-xl !py-5"
        }`}
      >
        {status === "submitting" ? "Sending…" : submitLabel}
        <span aria-hidden>→</span>
      </button>

      {status === "success" && (
        <p className="text-center rounded-xl bg-seafoam/20 border-2 border-seafoam p-3 font-semibold text-navy-900">
          🌊 Got it! We&apos;ll reach out soon to set up a time to come take a
          look at your property in person.
        </p>
      )}
      {status === "error" && (
        <p className="text-center rounded-xl bg-sunset-coral/10 border-2 border-sunset-coral p-3 text-sunset-coral font-semibold">
          {error || "Something went wrong."} You can also call {BUSINESS.phone}.
        </p>
      )}
      <p className="text-xs text-navy-900/50 text-center">
        By submitting you agree to be contacted about your quote. We never sell your info.
      </p>
    </form>
  );
}

function MultiSelect({
  labelId,
  options,
  selected,
  onToggle,
}: {
  labelId: string;
  options: string[];
  selected: string[];
  onToggle: (opt: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    function onDoc(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("mousedown", onDoc);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDoc);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const summary =
    selected.length === 0
      ? "Choose services…"
      : selected.length <= 2
        ? selected.join(", ")
        : `${selected.length} services selected`;

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-labelledby={labelId}
        className="flex w-full items-center justify-between gap-2 rounded-xl border-2 border-navy-900/20 bg-cream-100 px-4 py-3 text-left font-body transition-colors focus:border-sunset-coral focus:outline-none aria-expanded:border-sunset-coral"
      >
        <span className={selected.length ? "truncate text-navy-900" : "text-navy-900/40"}>
          {summary}
        </span>
        <svg
          className={`h-4 w-4 shrink-0 text-navy-900/60 transition-transform ${open ? "rotate-180" : ""}`}
          viewBox="0 0 12 8"
          fill="none"
          aria-hidden
        >
          <path d="M1 1l5 5 5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      {open && (
        <ul
          role="listbox"
          aria-multiselectable
          className="absolute z-30 mt-2 max-h-64 w-full overflow-auto rounded-xl border-2 border-navy-900 bg-cream-50 p-1.5 shadow-chunky-sm"
        >
          {options.map((opt) => {
            const on = selected.includes(opt);
            return (
              <li key={opt}>
                <button
                  type="button"
                  role="option"
                  aria-selected={on}
                  onClick={() => onToggle(opt)}
                  className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left text-sm transition-colors hover:bg-cream-100"
                >
                  <span
                    className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-md border-2 transition-colors ${
                      on
                        ? "border-sunset-coral bg-sunset-coral text-white"
                        : "border-navy-900/30 bg-white"
                    }`}
                  >
                    {on && (
                      <svg className="h-3 w-3" viewBox="0 0 12 12" fill="none" aria-hidden>
                        <path d="M2.5 6.5l2.5 2.5 4.5-5.5" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    )}
                  </span>
                  <span className={on ? "font-semibold text-navy-900" : "text-navy-900/80"}>
                    {opt}
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}

function Field({
  id,
  name,
  label,
  placeholder,
  type = "text",
  required = false,
}: {
  id: string;
  name: string;
  label: string;
  placeholder?: string;
  type?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-semibold uppercase tracking-wide mb-1.5">
        {label}
      </label>
      <input
        id={id}
        name={name}
        type={type}
        placeholder={placeholder}
        required={required}
        className="w-full rounded-xl border-2 border-navy-900/20 bg-cream-100 px-4 py-3 font-body focus:outline-none focus:border-sunset-coral"
      />
    </div>
  );
}
