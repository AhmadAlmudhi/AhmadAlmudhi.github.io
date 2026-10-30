"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";
import { toast } from "./Toast";

/** CON-2: copies a value; the icon morphs to a check and a toast confirms it. */
export function CopyButton({
  value,
  label,
  done,
  className = "action",
}: {
  /** Computed on click, so values assembled in the browser (the email) never sit in the HTML. */
  value: () => string;
  label: string;
  done: string;
  className?: string;
}) {
  const [copied, setCopied] = useState(false);
  return (
    <button
      type="button"
      className={className}
      data-copied={copied}
      onClick={async () => {
        try {
          await navigator.clipboard.writeText(value());
          setCopied(true);
          toast(done);
          window.setTimeout(() => setCopied(false), 2000);
        } catch {
          toast("Copy did not work here. Select the text instead.");
        }
      }}
    >
      <span className="action__icon" aria-hidden="true">
        <Copy className="action__icon-a" size={18} strokeWidth={1.75} />
        <Check className="action__icon-b" size={18} strokeWidth={2} />
      </span>
      <span>{label}</span>
    </button>
  );
}
