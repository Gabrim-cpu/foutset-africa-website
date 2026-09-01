import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";

export default async function Hero() {
  const t = await getTranslations("hero");

  return (
    <section className="relative overflow-hidden bg-[#F5F7FA] pt-32 pb-20 lg:pt-40 lg:pb-28">
      <div className="mx-auto max-w-4xl px-6 text-center lg:px-8">
        <div className="mb-6 flex items-center justify-center gap-3 text-xs font-semibold uppercase tracking-[0.15em] text-[#2A78C0]">
          <span className="h-px w-6 bg-[#F07818]" />
          {t("eyebrow")}
          <span className="h-px w-6 bg-[#F07818]" />
        </div>

        <h1 className="text-4xl uppercase leading-[1.05] tracking-tight text-[#1A1A1A] sm:text-5xl lg:text-6xl">
          {t("headlineLine1")}
          <br />
          {t("headlineLine2")}
          <br />
          {t("headlineLine3")}
        </h1>

        <p className="mx-auto mt-6 max-w-md text-[#555555] leading-relaxed">
          {t("subtitle")}
        </p>

        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <a
            href="#expertises"
            className="inline-flex items-center rounded-full bg-[#F07818] px-6 py-3.5 text-sm font-semibold uppercase tracking-wide text-white transition-all hover:bg-[#c9640f]"
          >
            {t("primaryCta")}
          </a>
          <Link
            href="/contact"
            className="inline-flex items-center rounded-full border border-[#2A78C0] px-6 py-3.5 text-sm font-semibold uppercase tracking-wide text-[#2A78C0] transition-all hover:bg-[#2A78C0] hover:text-white"
          >
            {t("secondaryCta")}
          </Link>
        </div>
      </div>

      <div className="mx-auto mt-16 max-w-5xl px-6 lg:px-8">
        <div className="relative aspect-[16/8] overflow-hidden rounded-tl-[3rem] rounded-br-[3rem] bg-gradient-to-br from-[#2A78C0] to-[#1A1A1A]">
          <div className="flex h-full w-full items-center justify-center text-white/20">
            <svg
              className="h-24 w-24"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={0.75}
                d="M3 21h18M5 21V8l7-4 7 4v13M9 21v-6h6v6M9 12h.01M15 12h.01M9 9h.01M15 9h.01"
              />
            </svg>
          </div>

          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent p-6 pt-16">
            <p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-white/70">
              {t("projectLabel")}
            </p>
            <p className="mt-1 text-lg font-semibold text-white">
              {t("projectName")}
            </p>
          </div>

          <span className="absolute bottom-6 right-6 flex h-10 w-10 items-center justify-center rounded-full bg-[#F07818] text-white">
            <svg
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </span>
        </div>
      </div>
    </section>
  );
}
