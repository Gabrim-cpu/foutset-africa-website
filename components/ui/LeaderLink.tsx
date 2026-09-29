import { Link } from "@/i18n/navigation";

/* Le lien d'action, sans bouton.

   Les pavés pleins et les contours arrondis se lisaient comme n'importe quel
   gabarit. Sur une carte, on désigne un lieu par une ligne de rappel : un
   libellé, un filet, une pointe. L'action du site prend la même forme.

   Au repos, le filet est court ; au survol ou au focus, il s'allonge vers sa
   destination, et le libellé se souligne en orange. L'orange ne porte jamais
   le texte : seulement le trait, qui n'a pas de seuil de lisibilité. */

type Direction = "right" | "down" | "left";

const ARROWS: Record<Direction, string> = {
  right: "M1 1l5 5-5 5",
  left: "M6 1 1 6l5 5",
  down: "M1 1l5 5 5-5",
};

export default function LeaderLink({
  href,
  children,
  tone = "ink",
  direction = "right",
  emphasis = false,
  className = "",
  onClick,
}: {
  href: string;
  children: React.ReactNode;
  /** `paper` sur l'encre bleue, `ink` sur le papier. */
  tone?: "ink" | "paper";
  direction?: Direction;
  /** L'action principale : le souligné orange est là dès le repos. */
  emphasis?: boolean;
  className?: string;
  onClick?: () => void;
}) {
  const color =
    tone === "paper"
      ? emphasis
        ? "text-paper"
        : "text-blue-wash hover:text-paper"
      : emphasis
        ? "text-ink"
        : "text-body hover:text-ink";

  const label = (
    <span className="relative pb-1.5">
      {children}
      <span
        aria-hidden
        className={`absolute inset-x-0 bottom-0 h-[2px] origin-left bg-orange transition-transform duration-300 ease-ink group-hover:scale-x-100 group-focus-visible:scale-x-100 ${
          emphasis ? "scale-x-100" : "scale-x-0"
        }`}
      />
    </span>
  );

  const leader =
    direction === "down" ? (
      <svg
        aria-hidden
        viewBox="0 0 12 7"
        className="h-2 w-3 shrink-0 translate-y-[-3px] fill-none stroke-orange stroke-[1.6] transition-transform duration-300 ease-ink group-hover:translate-y-0"
      >
        <path d={ARROWS.down} strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ) : (
      /* La place du filet allongé est réservée : il grandit dans son logement
         sans pousser le lien voisin. */
      <svg
        aria-hidden
        viewBox="0 0 7 12"
        className={`h-3 w-[7px] shrink-0 translate-y-[-3px] fill-none stroke-orange stroke-[1.6] transition-transform duration-300 ease-ink ${
          direction === "left"
            ? "group-hover:-translate-x-1"
            : "group-hover:translate-x-1"
        }`}
      >
        <path d={ARROWS[direction]} strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );

  return (
    <Link
      href={href}
      onClick={onClick}
      className={`group inline-flex items-center gap-3 text-[0.8125rem] font-bold tracking-[0.09em] whitespace-nowrap uppercase no-underline transition-colors duration-200 ${color} ${className}`}
    >
      {direction === "left" && leader}
      {label}
      {direction !== "left" && leader}
    </Link>
  );
}
