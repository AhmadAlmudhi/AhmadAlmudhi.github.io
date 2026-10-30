import { profile } from "@/content";
import { pictures } from "@/content/pictures";
import { formatDay } from "@/lib/dates";
import { FitText } from "@/components/ui/FitText";

// Blueprint "Name across the last photograph": Riyadh at dusk, its sky the page's own orange, with the
// name fitted along its foot. The small print sits on a plain band below, never on the picture (CON-7).
export function Footer() {
  const year = profile.lastUpdated.slice(0, 4);
  const shown = [pictures.riyadh, pictures.ksu];
  return (
    <footer className="footer">
      <div className="footer__picture">
        {/* eslint-disable-next-line @next/next/no-img-element -- static export */}
        <img
          src={pictures.riyadh.src}
          width={pictures.riyadh.width}
          height={pictures.riyadh.height}
          alt={pictures.riyadh.alt}
          loading="lazy"
          decoding="async"
        />
        <p className="footer__name" aria-hidden="true">
          <FitText below="0px">{profile.fullName}</FitText>
        </p>
      </div>
      <div className="footer__band">
        <p>
          © {year} {profile.fullName}. Built with Next.js and set in Clash Grotesk. Last updated{" "}
          {formatDay(profile.lastUpdated)}.
        </p>
        <p className="credits">
          Pictures:{" "}
          {shown.map((p, i) => (
            <span key={p.src}>
              <a className="link" href={p.page} target="_blank" rel="noopener noreferrer">
                “{p.title}”
              </a>{" "}
              by {p.creator},{" "}
              <a className="link" href={p.licenceUrl} target="_blank" rel="noopener noreferrer">
                {p.licence}
              </a>
              , via Wikimedia Commons{i < shown.length - 1 ? "; " : "."}
            </span>
          ))}
        </p>
      </div>
    </footer>
  );
}
