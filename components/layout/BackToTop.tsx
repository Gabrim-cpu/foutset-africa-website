"use client";

import { useTranslations } from "next-intl";

/* Le retour de feuille.

   Le pied occupe la fenêtre entière et le bandeau s'y retire : sans ce
   bouton, le visiteur arrivé en bas n'a plus que la molette pour remonter
   1 500 px de relevé. Il se pose à la place exacte que le devis occupait dans
   le bandeau, en plaque bleue (le pied ne porte pas d'orange) — la barre ne disparaît pas, elle
   change d'usage.

   Le défilement se fait en JS et non par une ancre : `scroll-behavior: smooth`
   est déclaré sur `html`, mais une ancre `#` réécrit l'URL et casse le retour
   arrière. La préférence de mouvement réduit est relue ici, puisque le JS ne
   la lit pas tout seul. */

export default function BackToTop({ isVisible }: { isVisible: boolean }) {
  const t = useTranslations("nav");

  const toTop = () => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)")
      .matches;
    window.scrollTo({ top: 0, behavior: reduced ? "auto" : "smooth" });
  };

  return (
    <button
      type="button"
      onClick={toTop}
      inert={!isVisible || undefined}
      /* Deux places, parce que le pied n'a pas la même hauteur partout.
         Au large il tient dans une fenêtre : le bouton se pose dans la bande
         du bandeau, à l'emplacement du devis, libellé compris. Sous md le
         pied fait deux écrans, donc cette bande défile et le bouton
         écraserait le millésime — il descend alors dans le coin bas droit,
         réduit à sa flèche, et le pied lui réserve sa marge. */
      className={`rounded-sheet group fixed right-5 bottom-5 z-50 inline-flex h-12 w-12 items-center justify-center bg-blue text-paper transition-[background-color,color,transform,opacity] duration-150 hover:bg-blue-deep md:top-4 md:right-6 md:bottom-auto lg:right-10 xl:right-16 ${
        isVisible
          ? "translate-y-0 opacity-100"
          : "pointer-events-none translate-y-3 opacity-0 md:-translate-y-3"
      }`}
    >
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-4 w-4 transition-transform duration-200 group-hover:-translate-y-0.5"
        aria-hidden
      >
        <path d="M12 19V5M6 11l6-6 6 6" />
      </svg>
      {/* L'icône seule, à toutes les tailles (demande du client). Le libellé
          reste pour les lecteurs d'écran. */}
      <span className="sr-only">{t("backToTop")}</span>
    </button>
  );
}
