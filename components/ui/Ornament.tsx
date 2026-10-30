/**
 * The identity's ornaments, drawn from Ahmad's theme image: the eight-point star (two squares turned
 * 45°, a smaller pair inside) and the divider that frames his name, ◆ — ✵ — ◆. Gold by default;
 * they take `currentColor`, so a green band can set them in its lighter gold.
 */
export function Star({ className = "", size = 28 }: { className?: string; size?: number }) {
  return (
    <svg className={`star ${className}`} width={size} height={size} viewBox="0 0 100 100" aria-hidden="true" focusable="false">
      <g fill="none" stroke="currentColor" strokeWidth="5" strokeLinejoin="miter">
        <rect x="22" y="22" width="56" height="56" />
        <rect x="22" y="22" width="56" height="56" transform="rotate(45 50 50)" />
        <rect x="36" y="36" width="28" height="28" />
        <rect x="36" y="36" width="28" height="28" transform="rotate(45 50 50)" />
      </g>
    </svg>
  );
}

export function Divider({ className = "" }: { className?: string }) {
  return (
    <span className={`divider ${className}`} aria-hidden="true">
      <span className="divider__end" />
      <span className="divider__line divider__line--start" />
      <Star className="divider__star" />
      <span className="divider__line divider__line--end" />
      <span className="divider__end" />
    </span>
  );
}

/** A section's title the way the identity sets the name: centred, gold, under the divider. */
export function SectionHead({ id, title, className = "" }: { id: string; title: string; className?: string }) {
  return (
    <header className={`section-head ${className}`}>
      <h2 id={id} className="section-head__title">
        {title}
      </h2>
      <Divider />
    </header>
  );
}
