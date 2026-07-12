export function WaveDivider({
  flip = false,
  fill = "#FBF6E9",
  className = "",
}: {
  flip?: boolean;
  fill?: string;
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 1440 120"
      preserveAspectRatio="none"
      className={`w-full block ${flip ? "rotate-180" : ""} ${className}`}
      aria-hidden="true"
    >
      <path
        d="M0,64 C240,120 480,20 720,48 C960,76 1200,120 1440,64 L1440,120 L0,120 Z"
        fill={fill}
      />
    </svg>
  );
}
