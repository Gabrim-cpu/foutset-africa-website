/* Les marques de calage.

   Sur une feuille imprimée en deux passes, la marque de calage sert à vérifier
   que les plaques se superposent : elle est tirée dans chaque encre, et tout
   décalage se voit. Celle-ci est donc dessinée deux fois, bleu puis orange
   décalé d'un demi-point — le repère dit ce qu'il est censé dire au lieu de
   l'illustrer.

   La boîte est positionnée par l'appelant : posées en dur à `inset-4`, les
   deux marques hautes du premier écran passaient sous l'en-tête fixe et ne
   pouvaient jamais apparaître. */

function Mark({ className }: { className: string }) {
  return (
    <svg
      viewBox="0 0 20 20"
      className={`absolute h-4 w-4 -translate-x-1/2 -translate-y-1/2 ${className}`}
      fill="none"
      aria-hidden
    >
      <g stroke="var(--color-blue)" strokeWidth="0.9" opacity="0.55">
        <circle cx="10" cy="10" r="5.5" />
        <path d="M10 0v6.5M10 13.5V20M0 10h6.5M13.5 10H20" />
      </g>
      {/* La seconde plaque, calée d'un demi-point : c'est tout le propos. */}
      <g
        stroke="var(--color-orange)"
        strokeWidth="0.9"
        opacity="0.75"
        transform="translate(0.5 0.5)"
      >
        <circle cx="10" cy="10" r="5.5" />
        <path d="M10 0v6.5M10 13.5V20M0 10h6.5M13.5 10H20" />
      </g>
    </svg>
  );
}

/**
 * Quatre coins, aux angles de la boîte que décrit `className`. Le parent doit
 * être `relative`, et la boîte doit dégager l'en-tête fixe quand elle couvre
 * le premier écran.
 */
export default function RegistrationMarks({
  className = "inset-4",
}: {
  className?: string;
}) {
  return (
    <div aria-hidden className={`pointer-events-none absolute ${className}`}>
      <Mark className="top-0 left-0" />
      <Mark className="top-0 right-0 translate-x-1/2" />
      <Mark className="bottom-0 left-0 translate-y-1/2" />
      <Mark className="right-0 bottom-0 translate-x-1/2 translate-y-1/2" />
    </div>
  );
}
