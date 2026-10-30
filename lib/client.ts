"use client";

import { useSyncExternalStore } from "react";

const noop = () => () => {};

/** False during the static render and hydration, true once running in the browser. */
export function useHydrated() {
  return useSyncExternalStore(
    noop,
    () => true,
    () => false,
  );
}

/** A value computed in the browser, with the value the static build rendered as the fallback. */
export function useClientValue<T>(client: () => T, server: T) {
  return useSyncExternalStore(noop, client, () => server);
}
