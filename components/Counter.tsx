"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";

/** Counts a figure like "15+" or "24/7" up from zero the first time it scrolls into view. */
export function Counter({ value }: { value: string }) {
  const m = value.match(/^(\d+)(.*)$/);
  const target = m ? Number(m[1]) : 0;
  const suffix = m ? m[2] : "";
  const ref = useRef<HTMLSpanElement>(null);
  const [n, setN] = useState(target);

  // Server HTML shows the real figure; JS drops it to 0 before first paint, then counts up.
  useLayoutEffect(() => {
    if (target && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) setN(0);
  }, [target]);

  useEffect(() => {
    const el = ref.current;
    if (!target || !el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let raf = 0;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        io.disconnect();
        const start = performance.now();
        const tick = (t: number) => {
          const p = Math.min(1, (t - start) / 1400);
          setN(Math.round(target * (1 - Math.pow(1 - p, 4))));
          if (p < 1) raf = requestAnimationFrame(tick);
        };
        raf = requestAnimationFrame(tick);
      },
      { threshold: 0.6 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [target]);

  if (!m) return <span>{value}</span>;
  return (
    <span ref={ref} className="tabular-nums">
      {n}
      {suffix}
    </span>
  );
}
