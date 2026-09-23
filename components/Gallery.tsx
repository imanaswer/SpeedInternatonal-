"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import type { Photo } from "@/lib/media";
import { ChevronLeft, ChevronRight, Close } from "./Icons";

/** Horizontal scroll-snap strip. Click a photo to open it in a native <dialog> lightbox with keyboard navigation. */
export function Gallery({ photos }: { photos: Photo[] }) {
  const strip = useRef<HTMLUListElement>(null);
  const dialog = useRef<HTMLDialogElement>(null);
  const [open, setOpen] = useState<number | null>(null);

  const scrollBy = (dir: 1 | -1) => {
    const el = strip.current;
    if (!el) return;
    const card = el.querySelector<HTMLElement>("li");
    el.scrollBy({ left: dir * ((card?.offsetWidth ?? 320) + 16), behavior: "smooth" });
  };

  const show = useCallback(
    (i: number) => {
      const n = ((i % photos.length) + photos.length) % photos.length;
      setOpen(n);
      const d = dialog.current;
      if (d && !d.open) d.showModal();
    },
    [photos.length],
  );

  const close = () => {
    dialog.current?.close();
  };

  useEffect(() => {
    if (open === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") show(open + 1);
      if (e.key === "ArrowLeft") show(open - 1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, show]);

  const current = open === null ? null : photos[open];

  return (
    <div className="flex flex-col gap-6">
      <ul
        ref={strip}
        className="stagger -mx-5 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-2 [scrollbar-width:none] sm:-mx-8 sm:px-8 lg:-mx-12 lg:px-12 [&::-webkit-scrollbar]:hidden"
        aria-label="Photo gallery"
      >
        {photos.map((p, i) => (
          <li key={p.src + i} className="w-[78%] shrink-0 snap-start sm:w-[46%] lg:w-[31%]">
            <button
              type="button"
              onClick={() => show(i)}
              className="group relative block aspect-[4/3] w-full overflow-clip  bg-sand ring-1 ring-ink/[0.06] focus:outline-none focus-visible:ring-2 focus-visible:ring-signal"
              aria-label={`Open photo: ${p.alt}`}
            >
              <Image src={p.src} alt={p.alt} fill sizes="(min-width: 1024px) 400px, (min-width: 640px) 50vw, 80vw" className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]" />
              <span aria-hidden className="absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-transparent opacity-80" />
              {p.caption && <span className="absolute inset-x-0 bottom-0 p-5 text-left text-[15px] font-medium leading-snug text-white">{p.caption}</span>}
            </button>
          </li>
        ))}
      </ul>

      <div className="flex items-center justify-between">
        <span className="text-xs font-semibold uppercase tracking-[0.18em] text-muted">Scroll or use the arrows. Tap a photo to enlarge.</span>
        <div className="flex gap-2">
          <button type="button" onClick={() => scrollBy(-1)} className="flex h-11 w-11 items-center justify-center  border-[1.5px] border-ink text-ink transition-colors hover:bg-ink hover:text-white" aria-label="Previous photos">
            <ChevronLeft size={18} />
          </button>
          <button type="button" onClick={() => scrollBy(1)} className="flex h-11 w-11 items-center justify-center  border-[1.5px] border-ink text-ink transition-colors hover:bg-ink hover:text-white" aria-label="Next photos">
            <ChevronRight size={18} />
          </button>
        </div>
      </div>

      <dialog ref={dialog} onClose={() => setOpen(null)} className="lightbox" aria-label="Enlarged photo">
        {current && (
          <div className="flex h-full w-full flex-col items-center justify-center gap-4 p-4 sm:p-8">
            <div className="relative aspect-[3/2] w-full max-w-5xl overflow-clip  bg-ink">
              <Image key={current.src} src={current.src} alt={current.alt} fill sizes="(min-width: 1024px) 1024px, 100vw" className="object-cover" priority />
            </div>
            <div className="flex w-full max-w-5xl items-center justify-between gap-4 text-ivory">
              <p className="text-sm sm:text-base">
                {current.caption ?? current.alt} <span className="text-cloud/60">· {open! + 1} / {photos.length}</span>
              </p>
              <div className="flex shrink-0 gap-2">
                <button type="button" onClick={() => show(open! - 1)} className="flex h-11 w-11 items-center justify-center  bg-white/10 ring-1 ring-white/20 hover:bg-white/20" aria-label="Previous photo">
                  <ChevronLeft size={18} />
                </button>
                <button type="button" onClick={() => show(open! + 1)} className="flex h-11 w-11 items-center justify-center  bg-white/10 ring-1 ring-white/20 hover:bg-white/20" aria-label="Next photo">
                  <ChevronRight size={18} />
                </button>
                <button type="button" onClick={close} className="flex h-11 w-11 items-center justify-center  bg-white text-ink hover:bg-white" aria-label="Close">
                  <Close size={18} />
                </button>
              </div>
            </div>
          </div>
        )}
      </dialog>
    </div>
  );
}
