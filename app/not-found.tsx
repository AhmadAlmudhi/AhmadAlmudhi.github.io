import type { Metadata } from "next";
import Link from "next/link";
import { profile } from "@/content";

export const metadata: Metadata = {
  title: `Not found — ${profile.fullName}`,
};

// GLB-2: unknown paths get the page's own type and colours, and one way back.
export default function NotFound() {
  return (
    <main id="main" className="not-found">
      <p className="not-found__code display">404</p>
      <h1 className="not-found__title">This page is not on the site.</h1>
      <p className="not-found__text">
        The resume is a single page. Everything is on it: experience, projects, skills, education, certificates and
        how to reach me.
      </p>
      <Link className="button" href="/">
        Back to the resume
      </Link>
    </main>
  );
}
