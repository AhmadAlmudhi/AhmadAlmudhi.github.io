"use client";

import { useEffect, useRef, useState } from "react";

const EVENT = "site:toast";

/** Show a short confirmation ("Email copied"). Announced to screen readers (PRD §10.2). */
export function toast(message: string) {
  window.dispatchEvent(new CustomEvent(EVENT, { detail: message }));
}

export function Toaster() {
  const [message, setMessage] = useState<string | null>(null);
  const [key, setKey] = useState(0);
  const timer = useRef<number>(undefined);

  useEffect(() => {
    const onToast = (e: Event) => {
      setMessage((e as CustomEvent<string>).detail);
      setKey((k) => k + 1);
      window.clearTimeout(timer.current);
      timer.current = window.setTimeout(() => setMessage(null), 2400);
    };
    window.addEventListener(EVENT, onToast);
    return () => window.removeEventListener(EVENT, onToast);
  }, []);

  return (
    <div className="toast-region" role="status" aria-live="polite">
      {message && (
        <p key={key} className="toast">
          {message}
        </p>
      )}
    </div>
  );
}
