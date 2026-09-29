"use client";

import { useEffect, useRef, useState } from "react";

/* La vidéo de couverture, posée par-dessus l'image fixe.

   Montée côté client et pas dans le HTML servi :

   — L'image fixe reste le premier rendu. C'est elle que le navigateur mesure
     en LCP ; la vidéo arrive après, sans peser sur l'affichage du titre.
   — `prefers-reduced-motion` se lit ici. Une balise <video autoplay> dans le
     HTML démarre avant tout CSS, et aucune media query ne l'arrête.
   — Le réseau aussi : en mode économie de données ou en 2G, la boucle n'est
     pas téléchargée du tout. L'image fixe est la même scène.

   Hors de l'écran, la boucle se met en pause : rien ne tourne pour rien
   pendant qu'on lit le bas de la page.

   Elle est décorative : muette, en boucle, sans commande, et masquée aux
   lecteurs d'écran — le titre porte le message. */

type NetworkInformation = { saveData?: boolean; effectiveType?: string };

function isConstrainedNetwork() {
  const connection = (navigator as Navigator & { connection?: NetworkInformation })
    .connection;
  if (!connection) return false;
  return (
    connection.saveData === true ||
    connection.effectiveType === "slow-2g" ||
    connection.effectiveType === "2g"
  );
}

export default function HeroVideo({
  sources,
  className = "object-cover",
}: {
  sources: string[];
  /** Cadrage du média : le hero couvre, le pied contient. */
  className?: string;
}) {
  const ref = useRef<HTMLVideoElement>(null);
  const [allowed, setAllowed] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setAllowed(!query.matches && !isConstrainedNetwork());

    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    const video = ref.current;
    if (!allowed || !video) return;

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        video.play().catch(() => {});
      } else {
        video.pause();
      }
    });
    observer.observe(video);
    return () => observer.disconnect();
  }, [allowed]);

  if (!allowed) return null;

  return (
    <video
      ref={ref}
      autoPlay
      muted
      loop
      playsInline
      preload="auto"
      aria-hidden
      tabIndex={-1}
      onCanPlay={() => setReady(true)}
      className={`absolute inset-0 h-full w-full ${className} transition-opacity duration-700 ${
        ready ? "opacity-100" : "opacity-0"
      }`}
    >
      {sources.map((src) => (
        <source
          key={src}
          src={src}
          type={src.endsWith(".webm") ? "video/webm" : "video/mp4"}
        />
      ))}
    </video>
  );
}
