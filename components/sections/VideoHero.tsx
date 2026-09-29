import Image from "next/image";
import HeroVideo from "./HeroVideo";

/* L'ouverture des pages intérieures (expertises, contact), sur la même vidéo
   que l'accueil : le globe de nuit, l'Afrique qui s'allume, les liaisons.

   Même mécanique que le hero d'accueil : la vidéo en `screen` sur le bleu
   abysse, donc son noir rend le fond de marque et seules les lumières
   s'ajoutent. L'image fixe s'affiche d'abord, la boucle se fond par-dessus
   (voir HeroVideo : mouvement réduit et réseau lent respectés).

   Le titre se pose au centre, à la demande du client. Un fond noir léger,
   uniforme, garde le texte lisible sur les liaisons lumineuses sans
   éteindre la vidéo ; un voile radial, plus dense au centre, l'appuie
   encore là où le titre se pose ; un troisième voile assombrit le bas, où
   `bottom` pose le bandeau défilant en texte blanc, sans fond. */

const VIDEO_SOURCES = ["/video/hero.webm", "/video/hero.mp4"];
const POSTER = "/images/hero-poster.jpg";

export default function VideoHero({
  children,
  bottom,
}: {
  children: React.ReactNode;
  /** Posé au pied du hero, pleine largeur (le bandeau défilant). */
  bottom?: React.ReactNode;
}) {
  return (
    <section className="relative isolate flex min-h-[34rem] flex-col overflow-hidden bg-blue-abyss lg:min-h-[42rem]">
      <div aria-hidden className="absolute inset-0 -z-10">
        <div className="absolute inset-0 mix-blend-screen">
          <Image
            src={POSTER}
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover object-center"
          />
          <HeroVideo sources={VIDEO_SOURCES} />
        </div>
        <div className="absolute inset-0 bg-black/30" />
        <div className="absolute inset-0 bg-[radial-gradient(60%_55%_at_50%_48%,color-mix(in_srgb,var(--color-blue-abyss)_78%,transparent)_0%,color-mix(in_srgb,var(--color-blue-abyss)_40%,transparent)_100%)]" />
        {bottom && (
          <div className="absolute inset-x-0 bottom-0 h-48 bg-[linear-gradient(to_top,color-mix(in_srgb,var(--color-blue-abyss)_85%,transparent),transparent)]" />
        )}
      </div>

      <div className="mx-auto flex w-full max-w-[92rem] flex-1 flex-col items-center justify-center px-6 pt-28 pb-16 text-center lg:px-10 lg:pt-32 lg:pb-20 xl:px-16">
        {children}
      </div>

      {bottom}
    </section>
  );
}
