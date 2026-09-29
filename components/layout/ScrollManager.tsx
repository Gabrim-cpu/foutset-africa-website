"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

/* Le défilement entre deux pages.

   Chaque page passe d'abord par son squelette (loading.tsx), puis le vrai
   contenu arrive en flux. Next tente le défilement au moment où le squelette
   s'affiche :

   — vers une ancre (« À propos » → /#groupe depuis une autre page), la
     section n'existe pas encore, donc rien ne bouge et le visiteur reste en
     haut de l'accueil ;
   — vers une page sans ancre, la position de la page quittée restait parfois
     appliquée, et l'on arrivait au milieu de la nouvelle.

   Ici, à chaque changement de page : avec une ancre, on attend que la cible
   existe (quelques secondes au plus) puis on s'y rend ; sans ancre, on part
   du haut. Le retour arrière du navigateur n'est pas touché : il restaure
   lui-même la position d'où l'on venait. */

export default function ScrollManager() {
  const pathname = usePathname();
  const isFirstRender = useRef(true);
  const isHistoryNav = useRef(false);

  useEffect(() => {
    const onPop = () => {
      isHistoryNav.current = true;
    };

    /* Un lien vers la page où l'on est déjà (le logo du pied sur l'accueil,
       « Formation » en bas de la page Formation) ne déclenche aucune
       navigation, donc rien ne bougeait : le visiteur restait en bas. Il
       remonte en haut de la page. */
    const onClick = (event: MouseEvent) => {
      // Pas de test sur `defaultPrevented` : le <Link> de Next l'annule
      // toujours, pour naviguer lui-même.
      if (event.button !== 0) return;
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      const link = (event.target as Element | null)?.closest?.("a[href]");
      if (!(link instanceof HTMLAnchorElement) || link.target === "_blank") return;
      const url = new URL(link.href, window.location.href);
      if (
        url.origin === window.location.origin &&
        url.pathname === window.location.pathname &&
        !url.hash
      ) {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    };

    window.addEventListener("popstate", onPop);
    document.addEventListener("click", onClick);
    return () => {
      window.removeEventListener("popstate", onPop);
      document.removeEventListener("click", onClick);
    };
  }, []);

  useEffect(() => {
    const hash = decodeURIComponent(window.location.hash.slice(1));

    if (isHistoryNav.current) {
      isHistoryNav.current = false;
      return;
    }

    // Au premier chargement, le navigateur gère la position (rechargement,
    // lien direct) ; on ne l'aide que si une ancre est demandée.
    if (isFirstRender.current) {
      isFirstRender.current = false;
      if (!hash) return;
    }

    if (!hash) {
      window.scrollTo({ top: 0, left: 0, behavior: "instant" });
      return;
    }

    let frame = 0;
    const deadline = performance.now() + 4000;
    const seek = () => {
      const target = document.getElementById(hash);
      if (target) {
        target.scrollIntoView({ block: "start" });
        return;
      }
      if (performance.now() < deadline) frame = requestAnimationFrame(seek);
    };
    seek();
    return () => cancelAnimationFrame(frame);
  }, [pathname]);

  return null;
}
