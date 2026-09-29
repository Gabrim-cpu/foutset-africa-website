"use client";

import { ReactLenis } from "lenis/react";
import { useEffect, useState, type ReactNode } from "react";

/* Le défilement lisse, branché sur la fenêtre. Les sections d'accueil se
   calent ensuite en sticky (voir la page d'accueil). Si le visiteur demande
   moins de mouvement, Lenis ne s'installe pas. */

export default function SmoothScroll({ children }: { children: ReactNode }) {
  const [reduce, setReduce] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReduce(media.matches);
    sync();
    media.addEventListener("change", sync);
    return () => media.removeEventListener("change", sync);
  }, []);

  if (reduce) return children;

  return (
    <ReactLenis root options={{ lerp: 0.08, duration: 1.15, smoothWheel: true }}>
      {children}
    </ReactLenis>
  );
}
