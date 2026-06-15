"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Boot/404 intro: scans 0→100% looking for "a conventional developer",
 * throws a glitchy ERROR 404, then reveals the portfolio.
 *
 * Rendered active by default so it is part of the server HTML and covers the
 * page on the very first paint (no flash of the portfolio first). Plays on
 * every full load/refresh; skippable (Esc / button); disabled for
 * prefers-reduced-motion; hidden via <noscript> for no-JS users.
 *
 * Typing/glitch sound is synthesized with the Web Audio API (no asset files).
 * Browsers block autoplay audio until a user gesture, so sound is best-effort
 * and resumes on the first key/click; a mute toggle is provided.
 */
export default function Intro() {
  const [active, setActive] = useState(true);
  const [pct, setPct] = useState(0);
  const [phase, setPhase] = useState<"scan" | "error" | "boot">("scan");
  const [closing, setClosing] = useState(false);
  const [muted, setMuted] = useState(false);
  const finishRef = useRef<() => void>(() => {});
  const mutedRef = useRef(false);
  const audioRef = useRef<AudioContext | null>(null);

  useEffect(() => {
    mutedRef.current = muted;
  }, [muted]);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      setActive(false);
      document.body.style.overflow = "";
      return;
    }

    document.body.style.overflow = "hidden";

    // --- audio helpers (synthesized, no files) ---
    const ensureCtx = () => {
      if (!audioRef.current) {
        const Ctx =
          window.AudioContext ||
          (window as unknown as { webkitAudioContext?: typeof AudioContext })
            .webkitAudioContext;
        if (Ctx) audioRef.current = new Ctx();
      }
      void audioRef.current?.resume?.();
      return audioRef.current;
    };
    const tone = (
      freq: number,
      dur: number,
      vol: number,
      type: OscillatorType = "square",
      when = 0,
    ) => {
      const ctx = audioRef.current;
      if (!ctx || mutedRef.current) return;
      const t = ctx.currentTime + when;
      const osc = ctx.createOscillator();
      const g = ctx.createGain();
      osc.type = type;
      osc.frequency.value = freq;
      g.gain.setValueAtTime(0, t);
      g.gain.linearRampToValueAtTime(vol, t + 0.004);
      g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
      osc.connect(g);
      g.connect(ctx.destination);
      osc.start(t);
      osc.stop(t + dur + 0.02);
    };
    const keyClick = () => tone(1300 + Math.random() * 800, 0.028, 0.045);
    const glitch = () => {
      for (let i = 0; i < 7; i++)
        tone(110 + Math.random() * 320, 0.06, 0.05, "sawtooth", i * 0.045);
    };
    const confirm = () => {
      tone(620, 0.12, 0.05, "sine", 0);
      tone(940, 0.16, 0.05, "sine", 0.11);
    };

    ensureCtx();

    const timers: ReturnType<typeof setTimeout>[] = [];
    let raf = 0;
    let typer: ReturnType<typeof setInterval> | undefined;
    let done = false;

    const stopTyper = () => {
      if (typer) clearInterval(typer);
      typer = undefined;
    };

    const finish = () => {
      if (done) return;
      done = true;
      cancelAnimationFrame(raf);
      stopTyper();
      timers.forEach(clearTimeout);
      setClosing(true);
      setTimeout(() => {
        setActive(false);
        document.body.style.overflow = "";
        void audioRef.current?.close?.();
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
        stopTyper();
        glitch();
        setPhase("error");
        timers.push(
          setTimeout(() => {
            setPhase("boot");
            confirm();
          }, 1300),
        );
        timers.push(setTimeout(finish, 2400));
      }
    };
    timers.push(
      setTimeout(() => {
        raf = requestAnimationFrame(tick);
        typer = setInterval(keyClick, 70);
      }, 350),
    );

    const onKey = (e: KeyboardEvent) => {
      ensureCtx();
      if (e.key === "Escape" || e.key === "Enter") finish();
    };
    const onPointer = () => ensureCtx();
    window.addEventListener("keydown", onKey);
    window.addEventListener("pointerdown", onPointer);

    return () => {
      cancelAnimationFrame(raf);
      stopTyper();
      timers.forEach(clearTimeout);
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("pointerdown", onPointer);
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
        {/* Cyber background art (sits behind a dark scrim for legibility) */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-cover bg-center opacity-25"
          style={{ backgroundImage: "url(/images/intro-bg.jpg)" }}
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-gradient-to-b from-background/75 via-background/85 to-background"
        />
        <div className="intro-scanlines pointer-events-none absolute inset-0 opacity-60" />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(50rem_30rem_at_50%_40%,rgba(0,255,122,0.1),transparent_70%)]"
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

        {/* Mute toggle */}
        <button
          type="button"
          onClick={() => setMuted((m) => !m)}
          aria-pressed={muted}
          aria-label={muted ? "Unmute intro sound" : "Mute intro sound"}
          className="absolute bottom-6 left-6 flex h-9 w-9 items-center justify-center rounded-md border border-border text-muted transition-colors hover:border-crimson hover:text-crimson"
        >
          {muted ? (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden="true">
              <path d="M4 9v6h4l5 4V5L8 9H4z" strokeWidth="1.8" strokeLinejoin="round" />
              <path d="m16 9 5 6M21 9l-5 6" strokeWidth="1.8" strokeLinecap="round" />
            </svg>
          ) : (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden="true">
              <path d="M4 9v6h4l5 4V5L8 9H4z" strokeWidth="1.8" strokeLinejoin="round" />
              <path d="M16 8a5 5 0 0 1 0 8M18.5 5.5a9 9 0 0 1 0 13" strokeWidth="1.8" strokeLinecap="round" />
            </svg>
          )}
        </button>

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
