import type { ExpertiseIcon } from "@/components/data/expertise";

/* ---------------------------------------------------------------------------
   Symboles de légende.

   Une légende de carte porte des symboles de tracé, pas des pictogrammes dans
   des boîtes : un style de ligne, un semis, une flèche d'acheminement. Un seul
   trait pour tous, 1.7 unité, bouts ronds.
--------------------------------------------------------------------------- */

const SYMBOLS: Record<ExpertiseIcon, React.ReactNode> = {
  // Réseaux & Télécom : une liaison à trois nœuds.
  wifi: (
    <>
      <path d="M2 8h28" />
      <circle cx="2" cy="8" r="2.4" fill="currentColor" stroke="none" />
      <circle cx="16" cy="8" r="2.4" fill="currentColor" stroke="none" />
      <circle cx="30" cy="8" r="2.4" fill="currentColor" stroke="none" />
    </>
  ),
  // Formation : deux lignes, l'une transmise à l'autre.
  formation: (
    <>
      <path d="M2 5h28" />
      <path d="M2 11h28" strokeDasharray="4 3" />
    </>
  ),
  // Prestation : un point de relevé sur la ligne.
  prestation: (
    <>
      <path d="M2 8h28" strokeDasharray="6 4" />
      <path d="M16 3v10M11 8h10" />
    </>
  ),
  // Fourniture d'équipements : un arc d'acheminement, avec sa pointe.
  supply: (
    <>
      <path d="M2 12Q16 -1 28 10" />
      <path d="M23 10.5l5 1.5-1.5-5" />
    </>
  ),
  // Énergie : un tracé en éclair, la ligne qui se brise et repart.
  energy: (
    <>
      <path d="M2 8h9l3-5 4 10 3-5h9" />
    </>
  ),
  // Diffusion TV & VSAT : un mât émetteur, deux arcs de signal.
  broadcast: (
    <>
      <path d="M16 15V9" />
      <circle cx="16" cy="7" r="1.6" fill="currentColor" stroke="none" />
      <path d="M11 9a7 7 0 0110 0" />
      <path d="M7 11a12 12 0 0118 0" />
    </>
  ),
};

export default function LegendSymbol({
  icon,
  className,
}: {
  icon: ExpertiseIcon;
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 32 16"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      {SYMBOLS[icon]}
    </svg>
  );
}
