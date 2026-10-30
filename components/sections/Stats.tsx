import { profile } from "@/content";

/**
 * Rolling figures (motion.md §6): each digit is a column that rolls up to its value once, the
 * columns a beat apart. The real figure stays in the text for screen readers; with no script or
 * reduced motion the columns simply rest on their values.
 */
function Rolling({ value }: { value: string }) {
  let column = 0;
  return (
    <>
      <span className="sr-only">{value}</span>
      <span className="roll" aria-hidden="true">
        {[...value].map((ch, i) =>
          /\d/.test(ch) ? (
            <span key={i} className="roll__col">
              {/* the column takes its own digit's width; the strip's 0–9 are drawn by CSS on top */}
              <span className="roll__sizer">{ch}</span>
              <span className="roll__strip" style={{ "--d": ch, "--c": column++ } as React.CSSProperties} />
            </span>
          ) : (
            <span key={i} className="roll__char">
              {ch}
            </span>
          ),
        )}
      </span>
    </>
  );
}

// HERO-4, blueprint "Stepped figure tiles": three figures on three tiles that refuse to line up.
// The tall tile carries the page's idea — two apps became one.
export function Stats() {
  return (
    <div className="stats">
      <h2 className="stats__title">In numbers</h2>
      {profile.stats.map((stat, i) => (
        <p key={stat.label} className={`tile tile--${i + 1}`}>
          <span className="tile__figure">
            <Rolling value={stat.value} />
          </span>
          <span className="tile__caption">{stat.label}</span>
        </p>
      ))}
    </div>
  );
}
