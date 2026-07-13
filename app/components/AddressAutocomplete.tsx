"use client";

import { useEffect, useRef, useState } from "react";

// Public Mapbox token (pk.…). Safe to expose client-side; restrict it to the
// site domain in the Mapbox dashboard. When unset, this field quietly behaves
// like a plain text input so the form never breaks.
const MAPBOX_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;

type Suggestion = { id: string; label: string };

export function AddressAutocomplete({
  id,
  name,
  label,
  placeholder,
  required = false,
  /** Bump this number to clear the field (e.g. after a successful submit) */
  resetSignal = 0,
}: {
  id: string;
  name: string;
  label: string;
  placeholder?: string;
  required?: boolean;
  resetSignal?: number;
}) {
  const [value, setValue] = useState("");
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);

  const wrapRef = useRef<HTMLDivElement>(null);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const abortRef = useRef<AbortController | null>(null);
  const justSelectedRef = useRef(false);

  // Clear the field when the parent form resets
  useEffect(() => {
    setValue("");
    setSuggestions([]);
    setOpen(false);
    setActiveIndex(-1);
  }, [resetSignal]);

  // Close the dropdown on an outside click
  useEffect(() => {
    function onDoc(e: MouseEvent) {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, []);

  // Debounced address lookup as the user types
  useEffect(() => {
    if (!MAPBOX_TOKEN) return; // no provider configured → plain input
    if (justSelectedRef.current) {
      justSelectedRef.current = false;
      return;
    }
    const q = value.trim();
    if (q.length < 3) {
      setSuggestions([]);
      setOpen(false);
      return;
    }
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(async () => {
      abortRef.current?.abort();
      const ctrl = new AbortController();
      abortRef.current = ctrl;
      try {
        const url =
          `https://api.mapbox.com/search/geocode/v6/forward` +
          `?q=${encodeURIComponent(q)}` +
          `&access_token=${MAPBOX_TOKEN}` +
          `&autocomplete=true&country=us&types=address&limit=5` +
          // Bias results toward LA County / Orange County
          `&proximity=-118.05,33.85`;
        const res = await fetch(url, { signal: ctrl.signal });
        if (!res.ok) return;
        const data = await res.json();
        const items: Suggestion[] = (data.features ?? [])
          .map((f: { id?: string; properties?: Record<string, string> }) => ({
            id: f.properties?.mapbox_id ?? f.id ?? "",
            label: (f.properties?.full_address ?? f.properties?.name ?? "").replace(
              /,\s*United States$/,
              "",
            ),
          }))
          .filter((s: Suggestion) => s.label);
        setSuggestions(items);
        setActiveIndex(-1);
        setOpen(items.length > 0);
      } catch {
        /* aborted or network error — ignore, keep plain-input behavior */
      }
    }, 250);
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [value]);

  function select(s: Suggestion) {
    justSelectedRef.current = true;
    setValue(s.label);
    setSuggestions([]);
    setOpen(false);
    setActiveIndex(-1);
  }

  function onKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (!open || suggestions.length === 0) return;
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex((i) => (i + 1) % suggestions.length);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex((i) => (i <= 0 ? suggestions.length - 1 : i - 1));
    } else if (e.key === "Enter") {
      if (activeIndex >= 0 && activeIndex < suggestions.length) {
        e.preventDefault();
        select(suggestions[activeIndex]);
      }
    } else if (e.key === "Escape") {
      setOpen(false);
    }
  }

  return (
    <div className="relative" ref={wrapRef}>
      <label
        htmlFor={id}
        className="block text-sm font-semibold uppercase tracking-wide mb-1.5"
      >
        {label}
      </label>
      <input
        id={id}
        name={name}
        type="text"
        placeholder={placeholder}
        required={required}
        autoComplete="off"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={onKeyDown}
        onFocus={() => suggestions.length > 0 && setOpen(true)}
        role="combobox"
        aria-expanded={open}
        aria-autocomplete="list"
        aria-controls={`${id}-listbox`}
        className="w-full rounded-xl border-2 border-navy-900/20 bg-cream-100 px-4 py-3 font-body focus:outline-none focus:border-sunset-coral"
      />
      {open && suggestions.length > 0 && (
        <ul
          id={`${id}-listbox`}
          role="listbox"
          className="absolute z-30 mt-2 w-full overflow-hidden rounded-xl border-2 border-navy-900 bg-cream-50 p-1.5 shadow-chunky-sm"
        >
          {suggestions.map((s, i) => (
            <li key={s.id || s.label}>
              <button
                type="button"
                role="option"
                aria-selected={i === activeIndex}
                // Keep input focus so blur doesn't close the list before click
                onMouseDown={(e) => e.preventDefault()}
                onClick={() => select(s)}
                onMouseEnter={() => setActiveIndex(i)}
                className={`flex w-full items-start gap-2 rounded-lg px-3 py-2 text-left text-sm transition-colors ${
                  i === activeIndex ? "bg-cream-100" : ""
                }`}
              >
                <svg
                  className="mt-0.5 h-4 w-4 shrink-0 text-sunset-coral"
                  viewBox="0 0 24 24"
                  fill="none"
                  aria-hidden
                >
                  <path
                    d="M12 21s7-6.5 7-11a7 7 0 10-14 0c0 4.5 7 11 7 11z"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinejoin="round"
                  />
                  <circle cx="12" cy="10" r="2.5" stroke="currentColor" strokeWidth="2" />
                </svg>
                <span className="text-navy-900/90">{s.label}</span>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
