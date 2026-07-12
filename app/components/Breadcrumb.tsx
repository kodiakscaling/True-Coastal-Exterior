import Link from "next/link";

export function Breadcrumb({
  items,
}: {
  items: { label: string; href?: string }[];
}) {
  return (
    <nav aria-label="Breadcrumb" className="container-tc px-6 pt-6">
      <ol className="flex flex-wrap items-center gap-2 text-sm text-navy-900/60">
        {items.map((item, i) => (
          <li key={i} className="flex items-center gap-2">
            {item.href ? (
              <Link href={item.href} className="hover:text-sunset-coral transition-colors">
                {item.label}
              </Link>
            ) : (
              <span className="text-navy-900/90 font-semibold">{item.label}</span>
            )}
            {i < items.length - 1 && <span aria-hidden>›</span>}
          </li>
        ))}
      </ol>
    </nav>
  );
}
