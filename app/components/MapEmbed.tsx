"use client";

import { useState } from "react";

/**
 * Embedded Google Map. On touch/mobile a transparent overlay sits over the
 * iframe so a finger drag scrolls the page instead of panning the map; a tap
 * activates the map. On desktop the map is interactive by default.
 */
export function MapEmbed({ src, title }: { src: string; title: string }) {
  const [active, setActive] = useState(false);

  return (
    <div className="relative">
      <iframe
        src={src}
        title={title}
        className="block h-[340px] w-full border-0 md:h-[480px]"
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      />
      {!active && (
        <button
          type="button"
          onClick={() => setActive(true)}
          aria-label={`Activate ${title}`}
          className="absolute inset-0 flex items-end justify-center pb-4 lg:hidden"
        >
          <span className="pointer-events-none rounded-full bg-navy-900/75 px-3 py-1.5 text-xs font-semibold text-cream-50 backdrop-blur">
            Tap to explore the map
          </span>
        </button>
      )}
    </div>
  );
}
