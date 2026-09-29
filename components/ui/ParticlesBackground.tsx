"use client";

import { useEffect, useRef } from "react";

/* Un réseau de points bleus qui dérivent sur le papier, reliés par un filet
   quand ils se rapprochent.

   Pas de librairie : un canvas et une boucle suffisent, sans script tiers à
   charger. La boucle ne tourne que lorsque le pied est dans la fenêtre, et
   s'arrête net si le visiteur a demandé moins d'animation (une image fixe
   reste alors). Le curseur attire les points voisins, même si le canvas est
   sous le texte : la souris est lue sur la fenêtre. */

const COLOR = "42, 120, 192"; /* --color-blue */
const LINK_DISTANCE = 150;
const GRAB_DISTANCE = 200;
const DENSITY = 9000; /* px² par point */

type Dot = { x: number; y: number; vx: number; vy: number; r: number };

export default function ParticlesBackground({
  className = "",
}: {
  className?: string;
}) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    let w = 0;
    let h = 0;
    let dots: Dot[] = [];
    let raf = 0;
    let visible = false;
    const mouse = { x: -9999, y: -9999 };

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = canvas.clientWidth;
      h = canvas.clientHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const count = Math.min(140, Math.round((w * h) / DENSITY));
      dots = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.6,
        vy: (Math.random() - 0.5) * 0.6,
        r: 1 + Math.random() * 2,
      }));
      draw();
    };

    const draw = () => {
      ctx.clearRect(0, 0, w, h);

      for (let i = 0; i < dots.length; i++) {
        const a = dots[i];
        for (let j = i + 1; j < dots.length; j++) {
          const b = dots[j];
          const d = Math.hypot(a.x - b.x, a.y - b.y);
          if (d < LINK_DISTANCE) {
            ctx.strokeStyle = `rgba(${COLOR}, ${0.28 * (1 - d / LINK_DISTANCE)})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }

        const m = Math.hypot(a.x - mouse.x, a.y - mouse.y);
        if (m < GRAB_DISTANCE) {
          ctx.strokeStyle = `rgba(${COLOR}, ${0.55 * (1 - m / GRAB_DISTANCE)})`;
          ctx.lineWidth = 1.2;
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(mouse.x, mouse.y);
          ctx.stroke();
        }

        ctx.fillStyle = `rgba(${COLOR}, 0.6)`;
        ctx.beginPath();
        ctx.arc(a.x, a.y, a.r, 0, Math.PI * 2);
        ctx.fill();
      }
    };

    const step = () => {
      for (const d of dots) {
        d.x += d.vx;
        d.y += d.vy;
        if (d.x < 0 || d.x > w) d.vx *= -1;
        if (d.y < 0 || d.y > h) d.vy *= -1;
      }
      draw();
      raf = requestAnimationFrame(step);
    };

    const sync = () => {
      cancelAnimationFrame(raf);
      if (visible && !reduced.matches) raf = requestAnimationFrame(step);
    };

    const onMove = (e: MouseEvent) => {
      const r = canvas.getBoundingClientRect();
      mouse.x = e.clientX - r.left;
      mouse.y = e.clientY - r.top;
    };
    const onLeave = () => {
      mouse.x = mouse.y = -9999;
    };

    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      sync();
    });
    io.observe(canvas);

    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    window.addEventListener("mousemove", onMove, { passive: true });
    document.addEventListener("mouseleave", onLeave);
    reduced.addEventListener("change", sync);

    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      ro.disconnect();
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseleave", onLeave);
      reduced.removeEventListener("change", sync);
    };
  }, []);

  return (
    <canvas
      ref={ref}
      aria-hidden
      className={`pointer-events-none absolute inset-0 -z-10 h-full w-full ${className}`}
    />
  );
}
