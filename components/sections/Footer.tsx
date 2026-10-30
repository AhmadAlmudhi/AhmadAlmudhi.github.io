import { profile } from "@/content";
import { formatDay } from "@/lib/dates";
import { Divider } from "@/components/ui/Ornament";

// CON-7: the page closes the way it opened — the name between the dividers, the towers and the palm
// groves of the theme — over a last green band with the small print.
export function Footer() {
  const year = profile.lastUpdated.slice(0, 4);
  return (
    <footer className="footer">
      <div className="footer__scene">
        {/* eslint-disable @next/next/no-img-element -- static export; the theme's own pictures */}
        <img className="footer__tower footer__tower--left" src="/theme/tower-left.webp" width={320} height={397} alt="" loading="lazy" />
        <img className="footer__tower footer__tower--right" src="/theme/tower-right.webp" width={320} height={397} alt="" loading="lazy" />
        <img className="footer__land" src="/theme/landscape.webp" width={1396} height={141} alt="" loading="lazy" />
        {/* eslint-enable @next/next/no-img-element */}
        <div className="footer__sign">
          <Divider />
          <p className="footer__name gold-text">{profile.fullName}</p>
          <Divider />
        </div>
      </div>
      <div className="band footer__band">
        <p>
          © {year} {profile.fullName}. Last updated {formatDay(profile.lastUpdated)}.
        </p>
      </div>
    </footer>
  );
}
