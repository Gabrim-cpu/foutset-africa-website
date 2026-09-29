import { Link } from "@/i18n/navigation";

/* Le bouton d'appel du site : une seule forme, une seule taille.

   Le libellé s'efface, une plage part du bord droit et recouvre le bouton,
   le chevron reste au centre de cette plage. Seule la couleur change, selon
   le fond qui la porte : `blue` sur le papier, `ink` sur la plaque orange,
   `orange` pour l'envoi du formulaire. */

const TONES = {
  blue: "bg-blue text-paper [--cta-panel:color-mix(in_srgb,var(--color-paper)_18%,transparent)] [--cta-glyph:var(--color-paper)]",
  ink: "bg-ink text-paper [--cta-panel:color-mix(in_srgb,var(--color-paper)_18%,transparent)] [--cta-glyph:var(--color-paper)]",
  orange:
    "bg-orange text-ink [--cta-panel:color-mix(in_srgb,var(--color-ink)_16%,transparent)] [--cta-glyph:var(--color-ink)]",
} as const;

const BASE =
  "group relative inline-flex h-14 items-center overflow-hidden rounded-full px-8 font-display text-[1.0625rem] font-semibold tracking-[-0.01em] whitespace-nowrap no-underline";

function Chevron() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-4 w-4"
      aria-hidden
    >
      <path d="M9 5l7 7-7 7" />
    </svg>
  );
}

function Face({ children }: { children: React.ReactNode }) {
  return (
    <>
      <span className="relative z-0 mr-8 transition-opacity duration-500 group-hover:opacity-0 group-focus-visible:opacity-0">
        {children}
      </span>
      <span className="absolute top-1 right-1 bottom-1 z-10 grid w-1/4 place-items-center rounded-full bg-[var(--cta-panel)] text-[var(--cta-glyph)] transition-all duration-500 group-hover:w-[calc(100%-0.5rem)] group-focus-visible:w-[calc(100%-0.5rem)] group-active:scale-95">
        <Chevron />
      </span>
    </>
  );
}

export default function CtaButton({
  href,
  tone = "blue",
  className = "",
  children,
}: {
  /** Sans `href`, le bouton est un bouton d'envoi de formulaire. */
  href?: string;
  tone?: keyof typeof TONES;
  className?: string;
  children: React.ReactNode;
}) {
  const cls = `${BASE} ${TONES[tone]} ${className}`;

  if (href) {
    return (
      <Link href={href} className={cls}>
        <Face>{children}</Face>
      </Link>
    );
  }

  return (
    <button type="submit" className={cls}>
      <Face>{children}</Face>
    </button>
  );
}
