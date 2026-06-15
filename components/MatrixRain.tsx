"use client";

import { useEffect, useRef } from "react";

/**
 * Animated "Matrix" digital-rain background on a fixed full-screen canvas.
 * Sits behind all content (-z-10), low opacity so text stays readable.
 * Respects prefers-reduced-motion (draws a single static frame, no loop)
 * and pauses while the tab is hidden to save CPU/battery.
 */
export default function MatrixRain() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const fontSize = 16;
    const chars =
      "ｱｲｳｴｵｶｷｸｹｺｻｼｽｾｿﾀﾁﾂﾃﾄﾅﾆﾇﾈ0123456789ABCDEFｦﾊﾋﾌﾍﾎ<>/\\{}[]=$#".split("");
    let drops: number[] = [];
    let raf = 0;
    let last = 0;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      const cols = Math.ceil(canvas.width / fontSize);
      drops = Array.from({ length: cols }, () =>
        Math.floor((Math.random() * canvas.height) / fontSize),
      );
    };

    const paint = () => {
      // translucent fade creates the trailing tail
      ctx.fillStyle = "rgba(5, 8, 6, 0.1)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.font = `${fontSize}px ui-monospace, monospace`;
      for (let i = 0; i < drops.length; i++) {
        const ch = chars[(Math.random() * chars.length) | 0];
        const x = i * fontSize;
        const y = drops[i] * fontSize;
        // bright white "head" glyphs, then a blue + green mix for the tails
        const r = Math.random();
        ctx.fillStyle = r > 0.97 ? "#eafff6" : r > 0.5 ? "#00ff7a" : "#22b8ff";
        ctx.fillText(ch, x, y);
        if (y > canvas.height && Math.random() > 0.975) drops[i] = 0;
        drops[i]++;
      }
    };

    resize();
    window.addEventListener("resize", resize);

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      // one static, sparse frame — no animation loop
      ctx.fillStyle = "#050806";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      paint();
      return () => window.removeEventListener("resize", resize);
    }

    const loop = (t: number) => {
      raf = requestAnimationFrame(loop);
      if (t - last < 55) return; // ~18fps: subtle + light on CPU
      last = t;
      paint();
    };
    raf = requestAnimationFrame(loop);

    const onVisibility = () => {
      cancelAnimationFrame(raf);
      if (!document.hidden) raf = requestAnimationFrame(loop);
    };
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  return (
    <canvas
      ref={ref}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 -z-10 h-full w-full opacity-20"
    />
  );
}
