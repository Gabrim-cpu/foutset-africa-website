"use client";

import { useEffect, useRef } from "react";

/* Le texte respire : chaque lettre oscille en continu entre une graisse fine
   et une graisse grasse (`font-variation-settings: "wght"`), avec un délai
   qui part du centre du mot vers ses deux bords — pas une révélation au
   défilement, une respiration permanente.

   Elle a besoin d'une police variable sur l'axe "wght" : Sora et Manrope
   (voir app/[locale]/layout.tsx) le sont, chargées sans poids fixe.

   `<span>`, pas `<div>`/`<p>` : ce composant se pose souvent dans un titre
   (`<h2>`), qui n'accepte que du contenu phrasant. `fontSize` reste
   optionnel — omis, chaque lettre hérite du corps du titre qui la porte. */

export function AnimatedText({
  text,
  fontSize,
  minWeight = 300,
  maxWeight = 800,
  animationDuration = 1.5,
  delayMultiplier = 0.25,
  className = "",
}: {
  text: string;
  /** Corps du texte, en pixels ; omis, hérite du parent. */
  fontSize?: number;
  minWeight?: number;
  maxWeight?: number;
  /** Durée d'un aller (fin → gras), en secondes. */
  animationDuration?: number;
  /** Écart de délai entre deux lettres voisines, en secondes. */
  delayMultiplier?: number;
  className?: string;
}) {
  const containerRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const spans = containerRef.current.querySelectorAll("span[data-letter]");
    const numLetters = spans.length;

    spans.forEach((span, i) => {
      const mappedIndex = i - numLetters / 2;
      (span as HTMLElement).style.animationDelay = `${mappedIndex * delayMultiplier}s`;
    });
  }, [text, delayMultiplier]);

  return (
    <span
      ref={containerRef}
      aria-label={text}
      className={className}
      style={fontSize ? { fontSize } : undefined}
    >
      {text.split("").map((char, index) => (
        <span
          key={index}
          data-letter
          aria-hidden="true"
          className="inline-block"
          style={{
            animationName: "letter-breath",
            animationDuration: `${animationDuration}s`,
            animationTimingFunction: "cubic-bezier(0.37, 0, 0.63, 1)",
            animationIterationCount: "infinite",
            animationDirection: "alternate",
            animationFillMode: "both",
            fontVariationSettings: `"wght" ${minWeight}`,
          }}
        >
          {char === " " ? " " : char}
        </span>
      ))}
      <style jsx>{`
        @keyframes letter-breath {
          0% {
            font-variation-settings: "wght" ${minWeight};
          }
          100% {
            font-variation-settings: "wght" ${maxWeight};
          }
        }
      `}</style>
    </span>
  );
}
