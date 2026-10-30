import { profile } from "@/content";
import { formatDay } from "@/lib/dates";

// CON-7: a designed close — the name returns at full width.
export function Footer() {
  const year = profile.lastUpdated.slice(0, 4);
  return (
    <footer className="footer">
      <p className="footer__name" aria-hidden="true">
        {profile.fullName}
      </p>
      <p className="footer__legal small">
        © {year} {profile.fullName}. Built with Next.js and set in Clash Grotesk. Last updated{" "}
        {formatDay(profile.lastUpdated)}.
      </p>
    </footer>
  );
}
