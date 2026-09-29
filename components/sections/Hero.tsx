import Image from "next/image";
import { getTranslations } from "next-intl/server";
import PulseBeamsCta from "@/components/ui/PulseBeamsCta";
import HeroVideo from "./HeroVideo";
import HeroSpotlight from "./HeroSpotlight";

/* Le premier écran.

   Il portait le continent dessiné : un relevé au trait, tracé à la main dans
   du SVG. Le client le lit comme un dessin — « on dirait qu'on l'a dessiné » —
   et pour une maison qui pose des pylônes et des liaisons satellite, la
   première image doit être le métier, pas sa carte.

   La vision FOUTSET se montre en mouvement : le globe de nuit, l'Afrique qui
   s'allume, les liaisons qui se tissent entre ses villes. La vidéo est encodée
   en boucle sans couture (la dernière seconde se fond dans la première), en
   WebM puis MP4, ~300 Ko chacune. L'original non compressé vit dans
   Assets/video/, jamais dans public/.

   L'image fixe est la première image de la boucle : elle s'affiche tout de
   suite, porte le LCP, et la vidéo se fond par-dessus sans saut. Voir
   HeroVideo.

   Le noir de l'espace ne doit pas trouer l'encre bleue : le média se pose en
   `screen` sur le bleu abysse, donc le noir rend le fond de marque et les
   lumières s'ajoutent. Pas `lighten` : le continent est d'un bleu nuit plus
   sombre que le fond, et `lighten` l'effaçait — l'Afrique disparaissait.

   La boucle est encodée en 1920×1080 depuis l'original (768×432), avec un
   agrandissement lanczos et un léger renforcement. Une source plus nette
   reste le seul vrai gain possible.

   Aucun voile, aucun dégradé : la vidéo se montre telle quelle. Elle est
   assez sombre pour porter le titre en blanc, et le bandeau passe lui-même en
   papier tant qu'il flotte dessus (voir Navigation).

   Le titre, sa phrase, et une seule action : « Demander un devis », en
   pastille à liaisons pulsées (voir PulseBeamsCta). Ni lieu, ni bande des métiers : le
   bandeau porte déjà les expertises. */

const VIDEO_SOURCES = ["/video/hero.webm", "/video/hero.mp4"];
const POSTER = "/images/hero-poster.jpg";

export default async function Hero() {
  const t = await getTranslations("hero");

  return (
    <section className="relative isolate flex h-svh min-h-[32rem] flex-col justify-end overflow-hidden bg-blue-abyss">
      <div aria-hidden className="absolute inset-0 -z-10 bg-blue-abyss">
        {/* Sous lg, la vidéo ne couvre plus tout l'écran : en portrait, un
            cadre 16:9 recadré plein écran ne laissait qu'une bande de traits,
            sans globe ni Afrique. Elle tient un bloc carré (4:3 sur tablette)
            sous le bandeau, qui montre le continent entier, et se fond vers
            le bas dans l'encre où le titre se pose.

            Au large, le globe glisse à droite et déborde du cadre : la colonne
            de texte reste sur l'encre, et la courbure du globe se lit encore.
            Le bord gauche de la vidéo est de l'espace noir, rendu bleu abysse
            par le `screen` : la coupe ne se voit pas. */}
        <div className="absolute inset-x-0 top-16 aspect-square mix-blend-screen [mask-image:linear-gradient(to_bottom,black_65%,transparent)] sm:aspect-[4/3] lg:inset-y-0 lg:top-0 lg:right-[-10%] lg:left-[20%] lg:aspect-auto lg:[mask-image:none]">
          <Image
            src={POSTER}
            alt=""
            fill
            priority
            sizes="(min-width: 1024px) 70vw, 100vw"
            className="object-cover object-center"
          />
          <HeroVideo sources={VIDEO_SOURCES} />
        </div>
      </div>

      <HeroSpotlight />

      <div className="mx-auto w-full max-w-[92rem] px-6 pt-40 pb-16 lg:px-10 lg:pt-48 lg:pb-24 xl:px-16">
        <h1 className="hero-rise max-w-[20ch] text-paper [--enter-delay:200ms]">{t("headline")}</h1>

        <p className="hero-rise mt-8 max-w-[54ch] [--enter-delay:420ms] text-[1.0625rem] whitespace-pre-line text-blue-wash lg:mt-10 lg:text-[1.125rem]">
          {t.rich("subtitle", {
            brand: (chunks) => <strong className="text-blue">{chunks}</strong>,
            accent: (chunks) => <strong className="text-orange">{chunks}</strong>,
            b: (chunks) => <strong>{chunks}</strong>,
          })}
        </p>

        <div className="hero-rise mt-10 [--enter-delay:640ms] lg:mt-12">
          <PulseBeamsCta href="/contact">{t("cta")}</PulseBeamsCta>
        </div>
      </div>
    </section>
  );
}
