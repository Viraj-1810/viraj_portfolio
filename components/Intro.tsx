"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Boot/404 intro: scans 0→100% looking for "a conventional developer",
 * throws a glitchy ERROR 404, then reveals the portfolio.
 *
 * It is rendered active by default so it is part of the server HTML and
 * covers the page on the very first paint (no flash of the portfolio first).
 * Plays on every full load/refresh; skippable (Esc / button); disabled for
 * prefers-reduced-motion; hidden via <noscript> for no-JS users.
 */
export default function Intro() {
  const [active, setActive] = useState(true);
  const [pct, setPct] = useState(0);
  const [phase, setPhase] = useState<"scan" | "error" | "boot">("scan");
  const [closing, setClosing] = useState(false);
  const finishRef = useRef<() => void>(() => {});

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      setActive(false);
      document.body.style.overflow = "";
      return;
    }

    document.body.style.overflow = "hidden";

    const timers: ReturnType<typeof setTimeout>[] = [];
    let raf = 0;
    let done = false;

    const finish = () => {
      if (done) return;
      done = true;
      cancelAnimationFrame(raf);
      timers.forEach(clearTimeout);
      setClosing(true);
      setTimeout(() => {
        setActive(false);
        document.body.style.overflow = "";
      }, 550);
    };
    finishRef.current = finish;

    const dur = 2000;
    let start: number | undefined;
    const tick = (ts: number) => {
      if (start === undefined) start = ts;
      const p = Math.min(100, Math.round(((ts - start) / dur) * 100));
      setPct(p);
      if (p < 100) {
        raf = requestAnimationFrame(tick);
      } else {
        setPhase("error");
        timers.push(setTimeout(() => setPhase("boot"), 1300));
        timers.push(setTimeout(finish, 2400));
      }
    };
    timers.push(setTimeout(() => (raf = requestAnimationFrame(tick)), 350));

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" || e.key === "Enter") finish();
    };
    window.addEventListener("keydown", onKey);

    return () => {
      cancelAnimationFrame(raf);
      timers.forEach(clearTimeout);
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, []);

  if (!active) return null;

  return (
    <>
      <noscript>
        <style>{`#intro-overlay{display:none!important}`}</style>
      </noscript>
      <div
        id="intro-overlay"
        aria-label="Intro animation"
        className={`fixed inset-0 z-[100] flex items-center justify-center overflow-hidden bg-background transition-opacity duration-500 ${
          closing ? "pointer-events-none opacity-0" : "opacity-100"
        }`}
      >
      <div className="intro-scanlines pointer-events-none absolute inset-0 opacity-60" />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(50rem_30rem_at_50%_40%,rgba(0,255,122,0.12),transparent_70%)]"
      />

      <div className="font-code relative w-[min(90vw,640px)] px-6">
        {phase === "scan" && (
          <div>
            <p className="text-sm text-muted">
              <span className="text-crimson">&gt;</span> scanning the network for a
              conventional developer<span className="intro-caret">_</span>
            </p>
            <div className="mt-7 flex items-center gap-4">
              <div className="h-2.5 flex-1 overflow-hidden rounded-full border border-border bg-surface">
                <div
                  className="h-full rounded-full bg-crimson shadow-[0_0_12px_var(--crimson)]"
                  style={{ width: `${pct}%` }}
                />
              </div>
              <span className="w-14 text-right text-xl font-bold tabular-nums text-crimson">
                {pct}%
              </span>
            </div>
            <p className="mt-3 text-xs text-muted">
              querying candidate database… {pct >= 100 ? "no match" : ""}
            </p>
          </div>
        )}

        {phase === "error" && (
          <div className="text-center">
            <p className="intro-glitch text-7xl font-extrabold tracking-tight text-crimson sm:text-9xl">
              404
            </p>
            <p className="mt-5 text-base font-semibold uppercase tracking-[0.25em] text-foreground sm:text-lg">
              conventional developer not found
            </p>
          </div>
        )}

        {phase === "boot" && (
          <div className="text-center">
            <p className="text-sm text-muted">
              <span className="text-crimson">&gt;</span> loading something better
              <span className="intro-caret">_</span>
            </p>
            <p className="mt-4 text-2xl font-bold text-gradient sm:text-3xl">
              VIRAJ GUPTA // AI DEVELOPER
            </p>
          </div>
        )}
      </div>

      <button
        type="button"
        onClick={() => finishRef.current()}
        className="font-code absolute bottom-6 right-6 rounded-md border border-border px-3 py-1.5 text-xs text-muted transition-colors hover:border-crimson hover:text-crimson"
      >
        Skip ›
      </button>
      </div>
    </>
  );
}
