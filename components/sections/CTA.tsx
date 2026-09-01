import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";

export default async function CTA() {
  const t = await getTranslations("cta");

  return (
    <section className="relative overflow-hidden bg-[#2A78C0] py-20">
      <div
        className="absolute inset-y-0 right-0 w-2/3 bg-white/10"
        style={{ clipPath: "polygon(35% 0, 100% 0, 100% 100%, 0% 100%)" }}
      />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <div className="flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-end">
          <div className="max-w-2xl">
            <h2 className="text-3xl text-white sm:text-4xl">{t("title")}</h2>
            <p className="mt-4 text-white/80 leading-relaxed">
              {t("subtitle")}
            </p>
          </div>

          <Link
            href="/contact"
            className="inline-flex shrink-0 items-center rounded-full bg-[#F07818] px-8 py-3.5 text-sm font-semibold uppercase tracking-wide text-white transition-all hover:bg-[#c9640f]"
          >
            {t("button")}
          </Link>
        </div>
      </div>
    </section>
  );
}
