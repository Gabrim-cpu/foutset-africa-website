import { getTranslations } from "next-intl/server";
import VideoHero from "@/components/sections/VideoHero";
import SheetCta from "@/components/sections/SheetCta";
import BrandText from "@/components/ui/BrandText";

/* Les produits, en une seule page à trois sections.

   Contrairement aux expertises, ce ne sont pas des pages séparées : le
   déroulant « Produits » du bandeau y mène par ancre (voir nav-items.ts). Même
   grammaire que DetailIntro — un chapeau bleu qui tient la colonne, le détail
   au corps courant — mais chaque section porte en plus son eyebrow (le nom
   exact du déroulant) et trois repères, pour qu'une section seule, arrivée
   par lien direct, se lise sans le reste de la page. */

const SECTIONS = ["tv", "vsat", "gsm"] as const;

export async function generateMetadata() {
  const t = await getTranslations("productsPage");
  return { title: t("metaTitle"), description: t("metaDescription") };
}

export default async function ProductsPage() {
  const t = await getTranslations("productsPage");

  return (
    <>
      <VideoHero>
        <h1 className="max-w-[18ch] text-paper">{t("title")}</h1>
        <p className="mt-6 max-w-[62ch] text-[1.125rem] text-blue-wash">
          {t("subtitle")}
        </p>
      </VideoHero>

      {SECTIONS.map((key, i) => (
        <section
          key={key}
          id={key}
          className={`scroll-mt-28 ${i % 2 === 0 ? "bg-paper" : "bg-sheet"}`}
        >
          <div className="mx-auto max-w-[92rem] px-6 py-16 lg:px-10 lg:py-24 xl:px-16">
            <div className="grid gap-8 lg:grid-cols-[minmax(0,26rem)_minmax(0,1fr)] lg:gap-20">
              <div className="lg:sticky lg:top-28 lg:self-start">
                <p className="sheet-label">{t(`${key}.eyebrow`)}</p>
                <h2 className="mt-4 max-w-[20ch] text-[1.75rem] sm:text-[2rem]">
                  {t(`${key}.title`)}
                </h2>
              </div>

              <div className="max-w-[62ch]">
                <p className="border-l-2 border-blue pl-6 text-[clamp(1.1875rem,1.9vw,1.5rem)] leading-snug font-medium text-ink">
                  {t(`${key}.lead`)}
                </p>
                <p className="mt-8 pl-[1.625rem] text-[1.0625rem]">
                  <BrandText>{t(`${key}.detail`)}</BrandText>
                </p>

                <ul className="mt-8 flex flex-wrap gap-x-8 gap-y-3 pl-[1.625rem]">
                  {t.raw(`${key}.points`).map((point: string) => (
                    <li
                      key={point}
                      className="flex items-center gap-2.5 text-[0.9375rem] text-body"
                    >
                      <span aria-hidden className="h-1.5 w-1.5 shrink-0 rounded-full bg-orange" />
                      {point}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>
      ))}

      <SheetCtaSection />
    </>
  );
}

async function SheetCtaSection() {
  const t = await getTranslations("cta");
  return (
    <SheetCta
      title={t("title")}
      subtitle={t("subtitle")}
      buttonLabel={t("button")}
    />
  );
}
