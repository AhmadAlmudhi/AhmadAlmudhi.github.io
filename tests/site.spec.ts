import { expect, test } from "@playwright/test";

const isPhone = (name: string) => name === "phone";

test.describe("the page", () => {
  test("says who and what on the first screen, and is never indexed", async ({ page }) => {
    await page.goto("/");
    await expect(page.getByRole("heading", { level: 1 })).toHaveText(/Ahmad\s*Almudhi/);
    await expect(page.getByText("Software Engineer in Riyadh.")).toBeVisible();
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

  test("the section index jumps, and Back returns to the previous section (NAV-5)", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("button", { name: "Sections" }).first().click();
    await page.getByRole("dialog", { name: "Sections" }).getByRole("button", { name: "Skills" }).click();
    await expect(page).toHaveURL(/#skills$/);
    await expect(page.getByRole("heading", { name: "Skills", level: 2 })).toBeInViewport();
    await page.goBack();
    await expect(page).not.toHaveURL(/#skills$/);
  });

  test("the dock moves between sections on phones (NAV-1)", async ({ page }, info) => {
    test.skip(!isPhone(info.project.name), "phones only");
    await page.goto("/");
    await page.getByRole("button", { name: /^Next section: Experience/ }).click();
    await expect(page).toHaveURL(/#experience$/);
  });
});

test.describe("project overlays (PRJ-5..7, NAV-6)", () => {
  test("opens a project, its lightbox, and Back steps out one level at a time", async ({ page }, info) => {
    await page.goto("/#projects");
    const open = isPhone(info.project.name)
      ? page.getByRole("button", { name: "Open project" }).first()
      : page.getByRole("button", { name: /^Open Muvi booking app/ });
    await open.click();
    const detail = page.getByRole("dialog", { name: "Muvi booking app" });
    await expect(detail).toBeVisible();
    await expect(page).toHaveURL(/#projects\/muvi-booking-app$/);
    await expect(detail.getByText(/Placeholder\. The real project/)).toBeVisible();

    await detail.getByRole("button", { name: /Open screenshot 1 of 3/ }).click();
    const lightbox = page.getByRole("dialog", { name: "Muvi booking app screenshots" });
    await expect(lightbox).toBeVisible();
    await expect(lightbox.getByText("1 of 3")).toBeVisible();
    await page.keyboard.press("ArrowRight");
    await expect(lightbox.getByText("2 of 3")).toBeVisible();
    await expect(page).toHaveURL(/#projects\/muvi-booking-app\/2$/);

    await page.goBack();
    await expect(lightbox).toBeHidden();
    await expect(detail).toBeVisible();
    await page.goBack();
    await expect(detail).toBeHidden();
    await expect(page).toHaveURL(/#projects$/);
  });

  test("a project deep link opens on first load, and closing stays on the site", async ({ page }) => {
    await page.goto("/#projects/muvi-it-dashboard");
    const detail = page.getByRole("dialog", { name: "Muvi IT dashboard" });
    await expect(detail).toBeVisible();
    await page.keyboard.press("Escape");
    await expect(detail).toBeHidden();
    await expect(page).toHaveURL(/#projects$/);
  });

  test("certificates open full screen and close with Esc (CRT-2)", async ({ page }) => {
    await page.goto("/#certifications");
    await page.getByRole("link", { name: "View certificate" }).first().click();
    const lightbox = page.getByRole("dialog", { name: "Certificates" });
    await expect(lightbox).toBeVisible();
    await expect(lightbox.getByRole("img", { name: /Professional Scrum Product Owner I/ })).toBeVisible();
    await page.keyboard.press("Escape");
    await expect(lightbox).toBeHidden();
  });
});

test.describe("the read-as lens", () => {
  test("mutes the other side's highlights and states the split", async ({ page }) => {
    await page.goto("/#experience");
    await expect(page.getByText(/five engineering, five product/)).toBeVisible();
    // keyboard, as a radio group should work: focus the checked option, arrow to the next
    await page.getByRole("radio", { name: "Both" }).focus();
    await page.keyboard.press("ArrowRight");
    await expect(page.getByRole("radio", { name: "Engineer" })).toBeChecked();
    await expect(page.getByText(/Engineering work: 5 of 10 highlights/)).toBeVisible();
    const product = page.locator('.highlights [data-side="product"]').first();
    const engineering = page.locator('.highlights [data-side="engineering"]').first();
    const ink = await engineering.evaluate((el) => getComputedStyle(el).color);
    // retried until the colour transition settles
    await expect(product).not.toHaveCSS("color", ink);
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
});

test.describe("hardening (PRD §10, GLB-2/4)", () => {
  test("unknown paths get the designed 404", async ({ page }) => {
    const res = await page.goto("/no-such-page/");
    expect(res?.status()).toBe(404);
    await expect(page.getByRole("heading", { name: "This page is not on the site." })).toBeVisible();
    await expect(page.getByRole("link", { name: "Back to the resume" })).toHaveAttribute("href", "/");
  });

  test("link previews and the app manifest are real files with the right types", async ({ request, page }) => {
    const og = await request.get("/og.png");
    expect(og.headers()["content-type"]).toBe("image/png");
    const manifest = await (await request.get("/manifest.webmanifest")).json();
    expect(manifest.icons.length).toBeGreaterThanOrEqual(3);
    await page.goto("/");
    await expect(page.locator('meta[property="og:image"]')).toHaveAttribute("content", /\/og\.png$/);
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
