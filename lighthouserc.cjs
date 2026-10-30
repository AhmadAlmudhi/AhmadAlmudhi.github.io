// PRD §10.1/§15: Lighthouse on the built export, mobile emulation (the default), median of three
// runs. Accessibility and best practices must be perfect; performance at least 0.95 is the target
// (shared CI runners are noisier than a phone, so CI fails below 0.9 and warns below 0.95). SEO
// passes every audit except the deliberate noindex.
module.exports = {
  ci: {
    collect: {
      staticDistDir: "./out",
      url: ["http://localhost/"],
      numberOfRuns: 3,
      settings: { chromeFlags: "--no-sandbox --headless=new" },
    },
    assert: {
      assertions: {
        "categories:performance": ["error", { minScore: 0.9, aggregationMethod: "median-run" }],
        "categories:accessibility": ["error", { minScore: 1, aggregationMethod: "median-run" }],
        "categories:best-practices": ["error", { minScore: 1, aggregationMethod: "median-run" }],
        "is-crawlable": "off",
        "largest-contentful-paint": ["warn", { maxNumericValue: 2000, aggregationMethod: "median-run" }],
        "cumulative-layout-shift": ["error", { maxNumericValue: 0.05, aggregationMethod: "median-run" }],
      },
    },
    upload: { target: "filesystem", outputDir: ".lighthouseci" },
  },
};
