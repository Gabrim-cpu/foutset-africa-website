import { useTranslations } from "next-intl";
import Skeleton from "./Skeleton";

/* Le squelette de page, le même partout.

   Il ne copie plus la grille de chaque gabarit : un titre, un paragraphe et
   une rangée de blocs, sans marges propres à une page. Il annonce « la page
   arrive », pas la forme exacte de telle page.

   Le haut est sur l'encre bleue, comme l'ouverture des pages qu'il annonce
   (expertises, contact) : le bandeau, dont les libellés passent en papier sur
   ces pages, reste lisible pendant le chargement.

   Le bandeau et le pied ne sont pas redessinés : ils vivent dans le layout et
   restent affichés pendant le chargement. */

export function PageSkeleton() {
  const t = useTranslations("loading");

  return (
    <div role="status" aria-live="polite" aria-busy="true" className="bg-sheet">
      <span className="sr-only">{t("label")}</span>

      <div className="bg-blue-abyss">
        <div className="mx-auto w-full max-w-[92rem] px-6 pt-32 pb-16 lg:px-10 xl:px-16">
          <Skeleton tone="ink" className="h-3 w-28" />
          <Skeleton tone="ink" className="mt-5 h-10 w-[min(36rem,90%)] lg:h-14" />

          <div className="mt-5 max-w-[60ch] space-y-3">
            <Skeleton tone="ink" className="h-4 w-full" />
            <Skeleton tone="ink" className="h-4 w-3/5" />
          </div>
        </div>
      </div>

      <div className="mx-auto w-full max-w-[92rem] px-6 py-12 lg:px-10 xl:px-16">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 3 }, (_, i) => (
            <Skeleton key={i} className="aspect-[4/3] w-full" />
          ))}
        </div>
      </div>
    </div>
  );
}
