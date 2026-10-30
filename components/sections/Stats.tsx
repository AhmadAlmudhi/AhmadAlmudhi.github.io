import { profile } from "@/content";

// HERO-4, blueprint "Stepped figure tiles": three figures on three tiles that refuse to line up.
// The tall tile carries the page's idea — two apps became one.
export function Stats() {
  return (
    <div className="stats">
      <h2 className="stats__title">In numbers</h2>
      {profile.stats.map((stat, i) => (
        <p key={stat.label} className={`tile tile--${i + 1}`}>
          <span className="tile__figure" data-figure={stat.value}>
            {stat.value}
          </span>
          <span className="tile__caption">{stat.label}</span>
        </p>
      ))}
    </div>
  );
}
