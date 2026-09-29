"use client";

import { useEffect, useRef } from "react";

/* Le projecteur du hero.

   Une lumière suit le curseur sur le globe : autour d'elle la scène s'assombrit
   légèrement, en dessous les liaisons ressortent, avec un halo orange au
   centre — la même lampe que celle du bandeau.

   Rien ne passe par l'état React : la position s'écrit directement dans deux
   variables CSS, une fois par image au plus. Uniquement avec une souris (pas
   de curseur sur un écran tactile) et sans `prefers-reduced-motion`. Au repos,
   ou quand le pointeur quitte le hero, la vidéo reste telle quelle. */

export default function HeroSpotlight() {
  const ref = useRef<HTMLDivElement>(null);
  const haloRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const light = ref.current;
    const halo = haloRef.current;
    const hero = light?.parentElement;
    if (!light || !halo || !hero) return;

    const fine = window.matchMedia("(hover: hover) and (pointer: fine)");
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (!fine.matches || reduced.matches) return;

    let frame = 0;
    let x = 0;
    let y = 0;

    const paint = () => {
      frame = 0;
      hero.style.setProperty("--spot-x", `${x}px`);
      hero.style.setProperty("--spot-y", `${y}px`);
    };

    const onMove = (event: PointerEvent) => {
      const rect = hero.getBoundingClientRect();
      x = event.clientX - rect.left;
      y = event.clientY - rect.top;
      light.dataset.on = "true";
      halo.dataset.on = "true";
      if (!frame) frame = requestAnimationFrame(paint);
    };

    const onLeave = () => {
      delete light.dataset.on;
      delete halo.dataset.on;
    };

    hero.addEventListener("pointermove", onMove);
    hero.addEventListener("pointerleave", onLeave);
    return () => {
      hero.removeEventListener("pointermove", onMove);
      hero.removeEventListener("pointerleave", onLeave);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  /* Deux calques frères, pas un calque et son pseudo-élément : le fondu
     d'opacité isolerait le halo, et son `screen` ne toucherait plus la vidéo. */
  return (
    <>
      <div ref={ref} aria-hidden className="hero-spotlight" />
      <div ref={haloRef} aria-hidden className="hero-spotlight-halo" />
    </>
  );
}
