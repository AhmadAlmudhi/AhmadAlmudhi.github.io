import { expect, test } from "@playwright/test";

const isPhone = (name: string) => name === "phone";

test.describe("the page", () => {
  test("says who and what on the first screen, and is never indexed", async ({ page }) => {
    await page.goto("/");
    await expect(page.getByRole("heading", { level: 1 })).toHaveText(/Ahmad\s*Almudhi/);
    await expect(page.getByText(/Software engineer specializing in Flutter/)).toBeVisible();
    await expect(page.locator('meta[name="robots"]')).toHaveAttribute("content", /noindex/);
    await expect(page.getByRole("link", { name: /Download resume/ }).first()).toBeVisible();
  });

  test("keeps the email out of the static HTML (PRD §10.4)", async ({ request }) => {
    const html = await (await request.get("/")).text();
    expect(html).not.toContain("a.almudhi1419@gmail.com");
  });

  test("serves the resume PDF", async ({ request }) => {
    const res = await request.get("/resume/Ahmad-Almudhi-Resume.pdf");
    expect(res.status()).toBe(200);
    expect(res.headers()["content-type"]).toContain("pdf");
  });
});

test.describe("navigation and history (PRD §5.2)", () => {
  test("a deep link lands on its section (NAV-8)", async ({ page }) => {
    await page.goto("/#certifications");
    await expect(page.getByRole("heading", { name: "Certifications", level: 2 })).toBeInViewport();
  });

  test("a section jump lands, and Back returns to the previous section (NAV-5)", async ({ page }, info) => {
    await page.goto("/");
    if (isPhone(info.project.name)) {
      await page.getByRole("button", { name: "Sections" }).first().click();
      await page.getByRole("dialog", { name: "Sections" }).getByRole("button", { name: "Skills" }).click();
    } else {
      await page.getByRole("banner").getByRole("link", { name: "Skills" }).click();
    }
    await expect(page).toHaveURL(/#skills$/);
    await expect(page.getByRole("heading", { name: "Skills", level: 2 })).toBeInViewport();
    await page.goBack();
    await expect(page).not.toHaveURL(/#skills$/);
  });

  test("the dock walks every section with Next and never hides (NAV-1)", async ({ page }, info) => {
    test.skip(!isPhone(info.project.name), "phones only");
    await page.goto("/");
    const dock = page.getByRole("navigation", { name: "Sections" });
    for (const id of ["experience", "projects", "skills", "education", "certifications", "contact"]) {
      await dock.getByRole("button", { name: /^Next section/ }).click();
      await expect(page).toHaveURL(new RegExp(`#${id}$`));
      await expect(dock).toBeInViewport();
      await expect(page.locator(`#${id}`)).toBeInViewport();
    }
    await expect(dock.getByRole("button", { name: "No next section" })).toBeDisabled();
  });
});

test.describe("project overlays (PRJ-5..7, NAV-6)", () => {
  test("opens a project, its lightbox, and Back steps out one level at a time", async ({ page }) => {
    await page.goto("/#projects");
    await page.getByRole("button", { name: "View project" }).first().click();
    const detail = page.getByRole("dialog", { name: "Battuta" });
    await expect(detail).toBeVisible();
    await expect(page).toHaveURL(/#projects\/battuta$/);
    await expect(detail.getByText(/Placeholder/)).toHaveCount(0);

    await detail.getByRole("button", { name: /Open screenshot 1 of 9/ }).click();
    const lightbox = page.getByRole("dialog", { name: "Battuta screenshots" });
    await expect(lightbox).toBeVisible();
    await expect(lightbox.getByText("1 of 9")).toBeVisible();
    await page.keyboard.press("ArrowRight");
    await expect(lightbox.getByText("2 of 9")).toBeVisible();
    await expect(page).toHaveURL(/#projects\/battuta\/2$/);

    await page.goBack();
    await expect(lightbox).toBeHidden();
    await expect(detail).toBeVisible();
    await page.goBack();
    await expect(detail).toBeHidden();
    await expect(page).toHaveURL(/#projects$/);
  });

  test("a project deep link opens on first load, and closing stays on the site", async ({ page }) => {
    await page.goto("/#projects/battuta");
    const detail = page.getByRole("dialog", { name: "Battuta" });
    await expect(detail).toBeVisible();
    await page.keyboard.press("Escape");
    await expect(detail).toBeHidden();
    await expect(page).toHaveURL(/#projects$/);
  });

  test("a card steps through its screenshots with Previous and Next (PRJ-3)", async ({ page }) => {
    await page.goto("/#projects");
    const nav = page.getByRole("group", { name: "Battuta screenshots" });
    const prev = nav.getByRole("button", { name: "Previous screenshot" });
    const next = nav.getByRole("button", { name: "Next screenshot" });
    await expect(nav.getByText("1 of 9")).toBeVisible();
    await expect(prev).toBeDisabled();
    await next.click();
    await next.click();
    await expect(nav.getByText("3 of 9")).toBeVisible();
    await prev.click();
    await expect(nav.getByText("2 of 9")).toBeVisible();
    for (let i = 0; i < 8; i++) if (await next.isEnabled()) await next.click();
    await expect(nav.getByText("9 of 9")).toBeVisible();
    await expect(next).toBeDisabled();
    await expect(page.locator(".card__shots .wide-frame img.shot")).toHaveCount(1);
  });

  test("Battuta shows phone and desktop screenshots, and they load (PRJ-2)", async ({ page }) => {
    await page.goto("/#projects/battuta");
    const detail = page.getByRole("dialog", { name: "Battuta" });
    await expect(detail.locator(".detail__item--phone .phone")).toHaveCount(6);
    await expect(detail.locator(".detail__item--desktop .wide-frame")).toHaveCount(3);
    await expect(detail.getByRole("link", { name: "Live demo" })).toHaveAttribute("href", "https://battuta-travel.web.app");
    const shots = detail.locator("img.shot");
    await expect(shots).toHaveCount(9);
    for (const img of await shots.all()) {
      await img.scrollIntoViewIfNeeded();
      await expect.poll(() => img.evaluate((i: HTMLImageElement) => i.complete && i.naturalWidth > 0)).toBe(true);
    }
  });

  test("the QR code opens centred on desktop (CON-5)", async ({ page }, info) => {
    test.skip(isPhone(info.project.name), "desktop only");
    await page.goto("/#contact");
    await page.getByRole("button", { name: "QR code" }).click();
    const sheet = page.getByRole("dialog", { name: "Open this on your phone" });
    await expect(sheet).toBeVisible();
    await page.waitForTimeout(400);
    const box = (await sheet.boundingBox())!;
    const vw = page.viewportSize()!;
    expect(Math.abs(box.x + box.width / 2 - vw.width / 2)).toBeLessThan(4);
    expect(Math.abs(box.y + box.height / 2 - vw.height / 2)).toBeLessThan(4);
  });

  test("certificates open full screen and close with Esc (CRT-2)", async ({ page }) => {
    await page.goto("/#certifications");
    await page.getByRole("button", { name: /View the PSPO I certificate/ }).click();
    const lightbox = page.getByRole("dialog", { name: "Certificates" });
    await expect(lightbox).toBeVisible();
    await expect(lightbox.getByRole("img", { name: /Professional Scrum Product Owner I/ })).toBeVisible();
    await page.keyboard.press("Escape");
    await expect(lightbox).toBeHidden();
  });
});

test.describe("the record (EXP-1, EDU-1)", () => {
  test("a finished role shows its length in full words; the current one shows none", async ({ page }) => {
    await page.goto("/#experience");
    const muvi = page.locator(".role").filter({ hasText: "Muvi Cinemas" });
    await expect(muvi.getByText("02/2025 – Present")).toBeVisible();
    await expect(muvi.locator(".role__duration")).toHaveCount(0);
    await expect(muvi.locator(".highlights li")).toHaveCount(6);
    await expect(page.locator(".role").filter({ hasText: "VEGA Styles" }).locator(".role__duration")).toHaveText("4 years");
  });

  test("education reads exactly as the CV", async ({ page }) => {
    await page.goto("/#education");
    await expect(page.getByRole("heading", { name: "Flutter Development Bootcamp (200 hours)" })).toBeVisible();
    await expect(page.getByRole("heading", { name: "Software Engineering, Bachelor's degree" })).toBeVisible();
    await expect(page.getByText("04/2023 – 06/2023")).toBeVisible();
  });
});

test.describe("motion (PRD §8)", () => {
  test("reduced motion is the finished page: nothing waits to be revealed", async ({ page }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto("/");
    await expect(page.locator("[data-reveal]")).toHaveCount(0);
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
    const lineTransform = await page.locator(".hero__name [data-line]").first().evaluate((el) => getComputedStyle(el).transform);
    expect(lineTransform).toBe("none");
  });

  test("content below the fold arrives when scrolled to", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("heading", { name: "Certifications", level: 2 }).scrollIntoViewIfNeeded();
    const heading = page.getByRole("heading", { name: "Certifications", level: 2 });
    await expect(heading).toHaveCSS("opacity", "1");
  });

  test("entrances play again on the way back up, and from above", async ({ page }) => {
    await page.goto("/");
    const head = page.locator("#education .section-head");
    await expect(head).toHaveAttribute("data-reveal", "below");
    await head.scrollIntoViewIfNeeded();
    await expect(head).toHaveAttribute("data-reveal", "in");
    await page.evaluate(() => window.scrollTo(0, document.documentElement.scrollHeight));
    await expect(head).toHaveAttribute("data-reveal", "above");
    await head.scrollIntoViewIfNeeded();
    await expect(head).toHaveAttribute("data-reveal", "in");
    await expect(head).toHaveCSS("opacity", "1");
  });

  test("at every scroll position, down and back up, what is on screen has arrived within a second", async ({ page }) => {
    await page.goto("/");
    const height = await page.evaluate(() => document.documentElement.scrollHeight);
    const vh = page.viewportSize()!.height;
    const stops: number[] = [];
    for (let y = 0; y < height; y += Math.round(vh * 0.8)) stops.push(y);
    for (const y of [...stops, ...stops.slice(0, -1).reverse()]) {
      await page.evaluate((top) => window.scrollTo({ top, behavior: "instant" }), y);
      await page.waitForTimeout(1000);
      const waiting = await page.evaluate(() =>
        [...document.querySelectorAll<HTMLElement>("[data-reveal]")]
          .filter((el) => {
            const r = el.getBoundingClientRect();
            return r.top < innerHeight - 4 && r.bottom > 4 && (el.dataset.reveal !== "in" || +getComputedStyle(el).opacity < 0.99);
          })
          .map((el) => el.className),
      );
      expect(waiting, `still waiting at ${y}px`).toEqual([]);
    }
  });

  test("printing shows everything", async ({ page }) => {
    await page.goto("/");
    await page.emulateMedia({ media: "print" });
    const hidden = await page.evaluate(() => [...document.querySelectorAll<HTMLElement>("[data-reveal]")].filter((el) => +getComputedStyle(el).opacity < 1).length);
    expect(hidden).toBe(0);
  });

  test("nothing waiting to slide in widens the page", async ({ page }) => {
    await page.goto("/");
    for (const id of ["experience", "education", "contact"]) {
      await page.locator(`#${id}`).scrollIntoViewIfNeeded();
      const wide = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
      expect(wide).toBeLessThanOrEqual(0);
    }
  });
});

test.describe("sharp at any zoom", () => {
  test("the towers are one picture at 2× and 4×, clipped to a vector outline", async ({ page }) => {
    await page.goto("/");
    const towers = page.locator(".hero .tower");
    await expect(towers).toHaveCount(2);
    for (const tower of await towers.all()) {
      expect(await tower.evaluate((el) => getComputedStyle(el).clipPath)).toMatch(/^polygon\(/);
      expect(await tower.evaluate((el: HTMLImageElement) => el.currentSrc)).toMatch(/\/theme\/tower-(640|1280)\.(avif|webp)$/);
    }
    await expect(page.locator(".hero .tower--right")).toHaveCSS("scale", "-1 1");
    const band = await page.locator(".hero__band").evaluate((el) => getComputedStyle(el).backgroundImage);
    expect(band).toContain("data:image/svg+xml");
  });
});

test.describe("hardening (PRD §10, GLB-2/4)", () => {
  test("unknown paths get the designed 404", async ({ page }) => {
    const res = await page.goto("/no-such-page/");
    expect(res?.status()).toBe(404);
    await expect(page.getByRole("heading", { name: "This page is not on the site." })).toBeVisible();
    await expect(page.getByRole("link", { name: "Back to the resume" })).toHaveAttribute("href", "/");
  });

  test("link previews and the app manifest are real files with the right types", async ({ request, page }) => {
    const og = await request.get("/og.jpg");
    expect(og.headers()["content-type"]).toBe("image/jpeg");
    const manifest = await (await request.get("/manifest.webmanifest")).json();
    expect(manifest.icons.length).toBeGreaterThanOrEqual(3);
    await page.goto("/");
    await expect(page.locator('meta[property="og:image"]')).toHaveAttribute("content", /\/og\.jpg$/);
    await expect(page.locator('meta[http-equiv="Content-Security-Policy"]')).toHaveAttribute("content", /default-src 'self'/);
  });

  test("after one visit the site and the resume work offline", async ({ page, context }, info) => {
    test.skip(info.project.name !== "desktop", "one browser is enough");
    await page.goto("/");
    await page.evaluate(async () => {
      const reg = await navigator.serviceWorker.ready;
      if (!navigator.serviceWorker.controller) await new Promise((r) => navigator.serviceWorker.addEventListener("controllerchange", r, { once: true }));
      return reg.active?.state;
    });
    await context.setOffline(true);
    await page.reload();
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
    const pdf = await page.evaluate(async () => (await fetch("/resume/Ahmad-Almudhi-Resume.pdf")).status);
    expect(pdf).toBe(200);
    await context.setOffline(false);
  });
});
