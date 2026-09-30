import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import SkeletonImage from "@/components/ui/SkeletonImage";
import { allExpertise, type ExpertiseIcon } from "@/components/data/expertise";
import { ExpertiseIconGlyph } from "@/components/data/expertise-icons";
import { AnimatedText } from "@/components/ui/animated-text";

/* Les expertises, en mosaïque : une grande case photo, des cases photo
   plus petites, et une case d'appel. Chaque service porte sa photo en fond.
   Au survol, le titre et la description passent aux couleurs du logo
   (bleu, orange) — pas de levée ni de zoom.

   L'essai « lg:sticky lg:top-0 » est retiré : le parent sticky de la section
   était <body> tout entier, donc la feuille se collait en haut de l'écran
   pour toute la page — le Groupe et le pied restaient dessous, invisibles,
   sur les trois quarts du défilement. Sans sticky, la feuille glisse une
   fois sur le hero (ses coins arrondis en haut gardent ce geste), puis le
   défilement reprend normalement. */

const SIZES = "(min-width: 1024px) 45vw, 100vw";

function Chevron({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden
    >
      <path d="M9 5l7 7-7 7" />
    </svg>
  );
}

async function ServiceCell({
  id,
  image,
  icon,
  featured = false,
}: {
  id: string;
  /** Sans photo réelle, la cellule reste sur son fond abysse — on n'invente
      pas d'image (voir PRODUCT.md). Le pictogramme du métier la porte. */
  image?: string | null;
  icon: ExpertiseIcon;
  featured?: boolean;
}) {
  const t = await getTranslations("expertiseItems");

  return (
    <Link
      href={`/expertises/${id}`}
      id={id}
      className={`group/cell relative flex scroll-mt-28 flex-col justify-end overflow-hidden rounded-2xl bg-blue-abyss p-5 no-underline lg:p-6 ${
        featured
          ? "min-h-[22rem] p-6 lg:col-span-2 lg:row-span-2 lg:min-h-0 lg:p-8"
          : "min-h-[12rem] lg:min-h-0"
      }`}
    >
      {image ? (
        <SkeletonImage
          src={image}
          alt=""
          fill
          sizes={SIZES}
          className="object-cover"
        />
      ) : (
        <ExpertiseIconGlyph
          icon={icon}
          className="absolute top-6 left-6 h-12 w-12 text-blue-tint/25 transition-colors duration-300 group-hover/cell:text-blue-tint/40"
        />
      )}
      <div
        aria-hidden
        className="absolute inset-0 bg-[linear-gradient(to_top,rgba(6,9,13,0.86)_0%,rgba(6,9,13,0.35)_52%,transparent_78%)]"
      />

      <div className="relative flex flex-col items-start gap-2">
        <h3
          className={`font-display font-bold tracking-[-0.02em] text-paper transition-colors duration-300 group-hover/cell:text-blue ${
            featured
              ? "max-w-[18ch] text-[clamp(1.5rem,2.6vw,2.25rem)] leading-[1.02]"
              : "text-[1.0625rem] leading-snug"
          }`}
        >
          {t(`${id}.title`)}
        </h3>
        <p
          className={`text-blue-wash transition-colors duration-300 group-hover/cell:text-orange ${
            featured
              ? "max-w-[42ch] text-[1.0625rem]"
              : "line-clamp-2 text-[0.9375rem]"
          }`}
        >
          {t(`${id}.description`)}
        </p>
      </div>
    </Link>
  );
}

async function CtaCell() {
  const t = await getTranslations("cta");

  return (
    <Link
      href="/contact"
      className="group/cell relative flex min-h-[12rem] flex-col justify-between gap-6 overflow-hidden rounded-2xl bg-ink p-5 no-underline lg:min-h-0 lg:p-6"
    >
      <div className="flex items-start justify-between gap-4">
        <span className="inline-flex w-fit items-center rounded-full bg-paper/15 px-3 py-1 text-[0.6875rem] font-bold tracking-[0.08em] text-paper uppercase ring-1 ring-paper/25">
          {t("button")}
        </span>
        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-paper/10 text-paper">
          <Chevron className="h-4 w-4" />
        </span>
      </div>

      <p className="font-display max-w-[16ch] text-[1.1875rem] leading-[1.1] font-bold tracking-[-0.01em] text-paper transition-colors duration-300 group-hover/cell:text-blue">
        {t("title")}
      </p>
    </Link>
  );
}

export default async function Expertise() {
  const t = await getTranslations("expertiseSection");
  const byId = new Map(allExpertise.map((item) => [item.id, item]));
  const lead = byId.get("reseaux-telecom")!;
  const energie = byId.get("energie")!;
  const formation = byId.get("formation")!;
  const supply = byId.get("equipment-supply")!;
  const broadcast = byId.get("diffusion-tv-vsat")!;

  return (
    <section
      id="expertises"
      className="relative isolate z-[2] flex scroll-mt-0 flex-col justify-center overflow-hidden rounded-t-[1.25rem] bg-paper lg:min-h-svh"
    >
      {/* Essai du client : une trame de lignes fines, avec une lueur radiale
          posée dessus en haut à droite. C'est un fond décoratif quadrillé
          hors surface de carte/plan — la règle du détecteur le signale par
          principe (voir codex-grid-background) ; gardé ici parce que c'est
          exactement ce que le client a demandé d'essayer, en bleu de la
          marque plutôt qu'en violet générique. À repasser en fond uni si
          l'essai ne convainc pas. */}
      {/* impeccable-disable-next-line codex-grid-background -- essai voulu par le client, voir commentaire ci-dessus */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10"
        style={{
          backgroundImage:
            "linear-gradient(to right, var(--color-rule-soft) 1px, transparent 1px), linear-gradient(to bottom, var(--color-rule-soft) 1px, transparent 1px)",
          backgroundSize: "6rem 4rem",
        }}
      >
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(circle 800px at 100% 200px, var(--color-blue-tint), transparent)",
          }}
        />
      </div>

      <div className="mx-auto flex w-full max-w-[92rem] flex-col items-center gap-10 px-4 py-20 lg:gap-[clamp(1.25rem,3svh,2.5rem)] lg:px-10 lg:py-[clamp(2.5rem,5svh,3.5rem)]">
        <div className="flex flex-col items-center gap-3">
          <h2 className="text-center leading-[0.95] font-bold tracking-[-0.03em] text-blue uppercase">
            <AnimatedText
              text={t("title")}
              className="text-[clamp(2rem,min(5vw,7svh),4rem)]"
            />
          </h2>

          <p className="max-w-[46ch] text-center text-[1.0625rem] text-body">
            {t.rich("subtitle", {
              accent: (chunks) => (
                <strong className="font-bold text-orange">{chunks}</strong>
              ),
            })}
          </p>
        </div>

        <div className="grid w-full grid-cols-1 gap-5 lg:grid-cols-3 lg:grid-rows-[clamp(13rem,22svh,16rem)_clamp(13rem,22svh,16rem)_clamp(12rem,17svh,13.5rem)]">
          <ServiceCell id={lead.id} image={lead.image} icon={lead.icon} featured />
          <ServiceCell id={energie.id} image={energie.image} icon={energie.icon} />
          <ServiceCell id={formation.id} image={formation.image} icon={formation.icon} />
          <CtaCell />
          <ServiceCell id={supply.id} image={supply.image} icon={supply.icon} />
          <ServiceCell id={broadcast.id} image={broadcast.image} icon={broadcast.icon} />
        </div>
      </div>
    </section>
  );
}
