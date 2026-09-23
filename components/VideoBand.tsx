"use client";

import Link from "next/link";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { ArrowRight, Mute, Pause, Play, Sound } from "./Icons";

type Video = { webm: string; mov: string; poster: string };

/** Full-bleed muted loop with play/pause and sound controls. Shows the poster only when the user prefers reduced motion. */
export function VideoBand({
  video,
  eyebrow,
  title,
  body,
  cta,
  children,
}: {
  video: Video;
  eyebrow: string;
  title: string;
  body?: string;
  cta?: { href: string; label: string };
  children?: ReactNode;
}) {
  const ref = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(true);
  const [muted, setMuted] = useState(true);
  const [still, setStill] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setStill(true);
      setPlaying(false);
      return;
    }
    el.muted = true; // React does not always serialise the muted attribute, and autoplay needs it.
    // Only run while on screen.
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) el.play().catch(() => setPlaying(false));
        else el.pause();
      },
      { threshold: 0.25 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const toggle = () => {
    const el = ref.current;
    if (!el) return;
    if (el.paused) el.play().then(() => setPlaying(true)).catch(() => setPlaying(false));
    else {
      el.pause();
      setPlaying(false);
    }
  };
  const toggleSound = () => {
    const el = ref.current;
    if (!el) return;
    el.muted = !el.muted;
    setMuted(el.muted);
  };

  return (
    <section className="relative overflow-clip bg-ink text-ivory">
      <video
        ref={ref}
        className="absolute inset-0 h-full w-full object-cover"
        poster={video.poster}
        autoPlay={!still}
        muted
        loop
        playsInline
        preload="metadata"
        aria-hidden
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
      >
        {!still && (
          <>
            <source src={video.webm} type="video/webm" />
            <source src={video.mov} type="video/quicktime" />
          </>
        )}
      </video>
      <div aria-hidden className="absolute inset-0 bg-gradient-to-r from-ink via-ink/70 to-ink/20" />
      <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-ink/80 via-transparent to-transparent" />

      <div className="container-site relative flex min-h-[520px] flex-col justify-end gap-8 py-16 lg:min-h-[640px] lg:py-24">
        <div className="reveal flex max-w-2xl flex-col gap-5">
          <span className="eyebrow text-signal">{eyebrow}</span>
          <h2 className="display text-4xl text-white sm:text-5xl lg:text-[60px]">{title}</h2>
          {body && <p className="max-w-lg text-[17px] leading-relaxed text-cloud">{body}</p>}
          {children}
          {cta && (
            <div className="pt-2">
              <Link href={cta.href} className="btn btn-lg btn-white">
                {cta.label}
                <span className="btn-icon">
                  <ArrowRight size={16} />
                </span>
              </Link>
            </div>
          )}
        </div>

        {!still && (
          <div className="flex items-center gap-2">
            <button type="button" onClick={toggle} className="flex h-11 w-11 items-center justify-center  bg-white/10 text-white ring-1 ring-white/20  transition-colors hover:bg-white/20" aria-label={playing ? "Pause video" : "Play video"} aria-pressed={playing}>
              {playing ? <Pause size={18} /> : <Play size={18} />}
            </button>
            <button type="button" onClick={toggleSound} className="flex h-11 w-11 items-center justify-center  bg-white/10 text-white ring-1 ring-white/20  transition-colors hover:bg-white/20" aria-label={muted ? "Turn sound on" : "Mute video"} aria-pressed={!muted}>
              {muted ? <Mute size={18} /> : <Sound size={18} />}
            </button>
            <span className="ml-2 text-xs tracking-[0.12em] text-cloud/70">CONTAINER TERMINAL, AERIAL</span>
          </div>
        )}
      </div>
    </section>
  );
}
