import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import VideoHero from "@/components/sections/VideoHero";

/* L'ouverture de chaque expertise.

   Sur la vidéo de l'accueil (voir VideoHero), le titre au centre, à la
   demande du client : la discipline seule, en grand, puis la phrase. Le
   verbe d'accroche (CONNECTER, FOURNIR...) qui la surmontait a été retiré
   à la demande du client — il revenait sur chaque page et n'apportait
   rien. Le bandeau défilant (chiffres clés ou domaines) tient le pied du
   hero, en texte blanc sans fond.

   Aucune icône au-dessus du titre : ni le symbole de légende au trait, ni
   la pastille qui l'a remplacé — le client n'en veut pas. */

export default async function DetailHero({
  discipline,
  subtitle,
  ticker,
}: {
  discipline: string;
  subtitle: string;
  ticker?: React.ReactNode;
}) {
  const tDetail = await getTranslations("expertiseDetail");

  return (
    <VideoHero bottom={ticker}>
      {/* À l'extrême gauche du hero, hors de la colonne centrée : position
          absolue par rapport à la section, pas au bloc de titre. */}
      <Link
        href="/#expertises"
        className="sheet-label absolute top-8 left-6 inline-flex items-center gap-2 text-blue-tint no-underline transition-colors duration-200 hover:text-paper lg:top-10 lg:left-10 xl:left-16"
      >
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-3.5 w-3.5"
          aria-hidden
        >
          <path d="M15 5l-7 7 7 7" />
        </svg>
        {tDetail("backToIndex")}
      </Link>

      <h1 className="text-[clamp(1.875rem,8vw,3.5rem)] text-paper uppercase lg:text-[clamp(3rem,5.2vw,5.5rem)]">
        {discipline}
      </h1>

      <p className="mt-6 max-w-[46ch] text-[1.0625rem] text-blue-wash lg:text-[1.125rem]">
        {subtitle}
      </p>
    </VideoHero>
  );
}
