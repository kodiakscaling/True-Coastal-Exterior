import Image from "next/image";
import Link from "next/link";
import logo from "@/public/brand/logo.png";
import logoDark from "@/public/brand/logo-footer.png";

export function Logo({
  className = "",
  priority = false,
  dark = false,
}: {
  className?: string;
  priority?: boolean;
  /** Use the navy-background version (for dark sections like the footer) */
  dark?: boolean;
}) {
  return (
    <Link
      href="/"
      aria-label="True Coastal Exterior — home"
      className={`inline-flex items-center ${className}`}
    >
      <Image
        src={dark ? logoDark : logo}
        alt="True Coastal Exterior Home Services"
        priority={priority}
        className="h-12 w-auto md:h-14"
        sizes="(max-width: 768px) 160px, 220px"
      />
    </Link>
  );
}
