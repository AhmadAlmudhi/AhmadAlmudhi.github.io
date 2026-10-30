"use client";

import { useSyncExternalStore } from "react";
import { Moon, Sun } from "lucide-react";

type Theme = "light" | "dark";

const COLORS: Record<Theme, string> = { light: "#ff7a1f", dark: "#050f16" };

function subscribe(onChange: () => void) {
  const observer = new MutationObserver(onChange);
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
  return () => observer.disconnect();
}

const read = () => (document.documentElement.dataset.theme === "dark" ? "dark" : "light") as Theme;

function apply(theme: Theme) {
  document.documentElement.dataset.theme = theme;
  document.querySelectorAll('meta[name="theme-color"]').forEach((m) => m.setAttribute("content", COLORS[theme]));
}

// GLB-1: follows the system until the visitor chooses; the choice persists. The boot script in
// the layout applies it before the first paint, so the wrong theme never flashes.
export function ThemeToggle() {
  const theme = useSyncExternalStore(subscribe, read, () => null);
  const next: Theme = theme === "dark" ? "light" : "dark";
  return (
    <button
      type="button"
      className="icon-button theme-toggle"
      aria-label={`Switch to ${next} theme`}
      onClick={() => {
        apply(next);
        try {
          localStorage.setItem("theme", next);
        } catch {}
      }}
    >
      <span className="theme-toggle__icon" data-show={theme !== "dark"} aria-hidden="true">
        <Moon size={20} strokeWidth={1.75} />
      </span>
      <span className="theme-toggle__icon" data-show={theme === "dark"} aria-hidden="true">
        <Sun size={20} strokeWidth={1.75} />
      </span>
    </button>
  );
}
