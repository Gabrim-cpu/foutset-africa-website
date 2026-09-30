import { getTranslations } from "next-intl/server";
import HeroVideo from "@/components/sections/HeroVideo";
import BrandText from "@/components/ui/BrandText";

/* La notice de la feuille, dessinée d'après la maquette du client.

   Le fond n'est plus une photo fixe : c'est la même vidéo du logo en volume
   que le pied de page, désaturée pour rester un fond et non un sujet.

   Un petit titre, un chapeau et un lien « en savoir plus » présentent Foutset
   Africa avant les deux gros blocs : la mission en haut à gauche, la vision
   plus bas à droite. Chacun porte son libellé, un point, et un filet qui
   file jusqu'au bord de l'écran ; le texte se centre dessous, en colonne
   étroite.

   Tout tient dans un écran au large (demande du client) : le rythme vertical
   et les corps de texte sont resserrés pour ça — `lg:min-h-svh` cale la
   section sur la hauteur de la fenêtre, son contenu y est centré. */

const VIDEO_SOURCES = ["/video/footer.mp4", "/video/footer.webm"];

export default async function About() {
  const t = await getTranslations("about");

  const blocks = [
    { label: t("missionLabel"), text: t("missionText"), side: "start" },
    { label: t("visionLabel"), text: t("visionText"), side: "end" },
  ] as const;

  return (
    <section
      id="groupe"
      className="relative isolate overflow-hidden bg-ink flex h-svh flex-col justify-start"
    >
      <div aria-hidden className="absolute inset-0 -z-10 grayscale">
        {/* La photo de site prévue ici n'a jamais été livrée ; la vidéo seule
            porte le fond, plutôt qu'une image inventée ou un aplat. */}
        <HeroVideo
          sources={VIDEO_SOURCES}
          className="object-cover object-center"
        />
        {/* Le voile : la vidéo reste lisible comme scène, le texte passe
            devant sans effort (papier sur encre voilée, > 10:1). */}
        <div className="absolute inset-0 bg-ink/78" />
      </div>

      <div className="mx-auto flex w-full max-w-[92rem] flex-1 flex-col justify-between gap-[clamp(0.75rem,3svh,2.5rem)] px-6 py-[clamp(4.5rem,9svh,6rem)] lg:px-10 xl:px-16">
        <div className="mx-auto max-w-[46rem] text-center">
          <h2 className="font-display text-[clamp(2rem,min(11vw,8svh),5.5rem)] leading-[0.95] font-bold tracking-[-0.03em] text-blue uppercase">
            {t("eyebrow")}
          </h2>
          <p className="mx-auto mt-[clamp(0.875rem,2.6svh,1.5rem)] max-w-[58ch] text-[clamp(0.75rem,1.9svh,0.9375rem)] text-blue-wash">
            <BrandText>{t("introText")}</BrandText>
          </p>
        </div>

        {blocks.map((block) => (
          <div
            key={block.label}
            className={`w-full max-w-[44rem] ${
              block.side === "end" ? "self-end" : "self-start"
            }`}
          >
            {/* Le filet court jusqu'au bord de la fenêtre : la marge du
                conteneur est annulée du côté d'où il part — la gauche pour
                la mission, la droite pour la vision. */}
            {block.side === "start" ? (
              <div className="-ml-6 flex items-center gap-4 lg:-ml-10 xl:-ml-16">
                <span aria-hidden className="h-0.5 flex-1 bg-orange" />
                <span
                  aria-hidden
                  className="h-2.5 w-2.5 shrink-0 rounded-full bg-orange"
                />
                <p className="font-display text-[clamp(1rem,min(5vw,4.2svh),2.25rem)] leading-none font-bold tracking-[-0.02em] text-paper uppercase">
                  {block.label}
                </p>
              </div>
            ) : (
              <div className="-mr-6 flex items-center gap-4 lg:-mr-10 xl:-mr-16">
                <p className="font-display text-[clamp(1rem,min(5vw,4.2svh),2.25rem)] leading-none font-bold tracking-[-0.02em] text-paper uppercase">
                  {block.label}
                </p>
                <span
                  aria-hidden
                  className="h-2.5 w-2.5 shrink-0 rounded-full bg-orange"
                />
                <span aria-hidden className="h-0.5 flex-1 bg-orange" />
              </div>
            )}

            {/* En gros caractères, à la demande du client. */}
            <p className="mt-3 text-center text-[clamp(0.8125rem,min(3.4vw,2.6svh),1.375rem)] leading-snug font-medium text-paper">
              {block.text}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
