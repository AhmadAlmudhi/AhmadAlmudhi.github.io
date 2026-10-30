import { profile } from "@/content";
import { formatDay } from "@/lib/dates";
import { Divider } from "@/components/ui/Ornament";
import { Landscape, Tower } from "@/components/ui/ThemePictures";

// CON-7: the page closes the way it opened — the name between the dividers, the towers and the palm
// groves of the theme — over a last green band with the small print.
export function Footer() {
  const year = profile.lastUpdated.slice(0, 4);
  return (
    <footer className="footer">
      <div className="footer__scene">
        <Tower side="left" className="footer__tower" />
        <Tower side="right" className="footer__tower" />
        <Landscape className="footer__land" />
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
