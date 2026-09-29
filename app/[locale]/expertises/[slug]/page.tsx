import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { expertiseDetailMeta } from "@/components/data/expertise-detail";
import { allExpertise } from "@/components/data/expertise";
import { routing } from "@/i18n/routing";
import DetailHero from "@/components/sections/detail/DetailHero";
import DetailIntro from "@/components/sections/detail/DetailIntro";
import DetailDomains from "@/components/sections/detail/DetailDomains";
import DetailGrowth from "@/components/sections/detail/DetailGrowth";
import Ticker from "@/components/ui/Ticker";

/** Les seules valeurs réellement mesurées que le contenu fournit. */
const MEASURED_KEYS: Record<string, string[]> = {
  "reseaux-telecom": ["bands", "throughput", "contention"],
};

/* Une expertise inconnue ne se rend pas : elle part directement en 404, avec
   un vrai statut 404 — sans passer par le squelette, qui forcerait un 200. */
export const dynamicParams = false;

export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    Object.keys(expertiseDetailMeta).map((slug) => ({ locale, slug })),
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const meta = expertiseDetailMeta[slug];
  if (!meta) return {};

  const t = await getTranslations({
    locale,
    namespace: `expertiseDetail.${slug}`,
  });
  return { title: t("introTitle"), description: t("metaDescription") };
}

export default async function ExpertiseDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const meta = expertiseDetailMeta[slug];
  const listing = allExpertise.find((item) => item.id === slug);
  if (!meta || !listing) notFound();

  const t = await getTranslations({
    locale,
    namespace: `expertiseDetail.${slug}`,
  });
  const tDomains = await getTranslations("expertiseDetail");
  const tItem = await getTranslations({
    locale,
    namespace: `expertiseItems.${slug}`,
  });

  const featureDomains = [
    {
      title: t("feature1Title"),
      description: t("feature1Description"),
      icon: meta.featureDomains[0].icon,
    },
    {
      title: t("feature2Title"),
      description: t("feature2Description"),
      icon: meta.featureDomains[1].icon,
    },
  ] as [
    { title: string; description: string; icon: typeof meta.icon },
    { title: string; description: string; icon: typeof meta.icon },
  ];
  const compactDomain = {
    title: t("compactTitle"),
    description: t("compactDescription"),
    icon: meta.compactDomain.icon,
  };
  const darkDomain = {
    title: t("darkTitle"),
    description: t("darkDescription"),
    icon: meta.darkDomain.icon,
  };

  /* Le bandeau défilant : les valeurs mesurées quand la page en a (réseaux &
     télécom), sinon ses domaines d'intervention. */
  const measured = (MEASURED_KEYS[slug] ?? []).map((key) => ({
    label: tItem(`${key}Label`),
    value: tItem(key),
  }));
  const ticker =
    measured.length > 0 ? (
      <Ticker label={tDomains("keyFigures")} items={measured} mono />
    ) : (
      <Ticker
        label={tDomains("domainsTitle")}
        items={[...featureDomains, compactDomain, darkDomain].map((d) => ({
          value: d.title,
        }))}
      />
    );

  return (
    <>
      <DetailHero
        discipline={tItem("title")}
        subtitle={t("heroSubtitle")}
        ticker={ticker}
      />
      <DetailIntro
        title={t("introTitle")}
        paragraphs={[t("introParagraph1"), t("introParagraph2")]}
      />
      <DetailDomains
        title={tDomains("domainsTitle")}
        subtitle={t("domainsSubtitle")}
        featureDomains={featureDomains}
        compactDomain={compactDomain}
        darkDomain={darkDomain}
      />
      <DetailGrowth
        discipline={tItem("title")}
        title={t("closingTitle")}
        paragraph={t("closingParagraph")}
        ctaLabel={t("ctaLabel")}
        image={meta.closingPhoto.src}
        imagePosition={meta.closingPhoto.position}
      />
    </>
  );
}
