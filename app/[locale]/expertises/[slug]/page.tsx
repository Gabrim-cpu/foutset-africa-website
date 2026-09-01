import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { expertiseDetailMeta } from "@/components/data/expertise-detail";
import { routing } from "@/i18n/routing";
import DetailHero from "@/components/sections/detail/DetailHero";
import DetailIntro from "@/components/sections/detail/DetailIntro";
import DetailDomains from "@/components/sections/detail/DetailDomains";
import DetailGrowth from "@/components/sections/detail/DetailGrowth";

export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    Object.keys(expertiseDetailMeta).map((slug) => ({ locale, slug }))
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
  return { title: t("introTitle") };
}

export default async function ExpertiseDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const meta = expertiseDetailMeta[slug];
  if (!meta) notFound();

  const t = await getTranslations({
    locale,
    namespace: `expertiseDetail.${slug}`,
  });
  const tDomains = await getTranslations("expertiseDetail");

  return (
    <>
      <DetailHero
        eyebrow={t("eyebrow")}
        word={t("heroWord")}
        subtitle={t("heroSubtitle")}
        icon={meta.icon}
      />
      <DetailIntro
        title={t("introTitle")}
        paragraphs={[t("introParagraph1"), t("introParagraph2")]}
      />
      <DetailDomains
        title={tDomains("domainsTitle")}
        subtitle={t("domainsSubtitle")}
        featureDomains={[
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
        ]}
        compactDomain={{
          title: t("compactTitle"),
          description: t("compactDescription"),
          icon: meta.compactDomain.icon,
        }}
        darkDomain={{
          title: t("darkTitle"),
          description: t("darkDescription"),
          icon: meta.darkDomain.icon,
        }}
      />
      <DetailGrowth
        title={t("closingTitle")}
        paragraph={t("closingParagraph")}
        ctaLabel={t("ctaLabel")}
        icon={meta.icon}
      />
    </>
  );
}
