"use client";

import { useEffect, useState } from "react";
import Navigation from "./Navigation";
import MobileMenu from "./MobileMenu";
import BackToTop from "./BackToTop";

/* Un seuil de défilement ne justifie pas d'embarquer une librairie
   d'animation : sur une connexion faible, c'est du poids pour rien. Un
   écouteur passif suffit, et l'animation du site vit dans la feuille. */

/** Hauteur du bandeau : la ligne où le pied prend la place du cartouche. */
const HEADER_H = 80;

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isAtFooter, setIsAtFooter] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    /* Cherché à chaque passage tant qu'il manque, pas une seule fois au
       montage : le pied est rendu sur le serveur et arrive en fin de flux,
       donc sur une connexion lente le bandeau s'hydrate avant lui. Une
       référence nulle capturée au montage ne se répare jamais — et le
       cartouche ne disparaissait plus du tout. */
    let footer: HTMLElement | null = null;

    const onScroll = () => {
      setIsScrolled(window.scrollY > 20);

      footer ??= document.getElementById("site-footer");

      /* Le pied occupe la fenêtre entière : dès que son bord haut atteint la
         ligne du bandeau, il n'y a plus de feuille à parcourir derrière, donc
         plus rien à survoler. Le cartouche se retire d'un coup — un
         observateur d'intersection l'aurait retiré une fenêtre trop tôt,
         puisque le pied entre dans le champ bien avant de le remplir. */
      setIsAtFooter(
        footer ? footer.getBoundingClientRect().top <= HEADER_H : false,
      );
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  return (
    <>
      <Navigation
        isScrolled={isScrolled}
        /* Menu ouvert, le bandeau porte la croix de fermeture : le retirer
           enfermerait le visiteur dans le panneau. */
        isHidden={isAtFooter && !isMenuOpen}
        isMenuOpen={isMenuOpen}
        onToggleMenu={() => setIsMenuOpen((prev) => !prev)}
      />
      <MobileMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />

      {/* Il prend la place laissée par le bandeau, au même signal. */}
      <BackToTop isVisible={isAtFooter && !isMenuOpen} />
    </>
  );
}
