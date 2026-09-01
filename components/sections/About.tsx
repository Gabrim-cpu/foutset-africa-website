import { getTranslations } from "next-intl/server";

export default async function About() {
  const t = await getTranslations("about");

  return (
    <section id="groupe" className="bg-[#F8F9FA] py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid items-center gap-16 lg:grid-cols-2">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.15em] text-[#F07818]">
              {t("eyebrow")}
            </p>
            <h2 className="mt-3 text-3xl text-[#1A1A1A] sm:text-4xl">
              {t("title")}
            </h2>

            <p className="mt-6 text-[#555555] leading-relaxed">
              {t("paragraph1")}
            </p>
            <p className="mt-4 text-[#555555] leading-relaxed">
              {t("paragraph2")}
            </p>

            <div className="mt-10 flex gap-12 border-t border-[#E5E5E5] pt-8">
              <div>
                <p className="text-lg font-semibold text-[#1A1A1A]">
                  {t("normsLabel")}
                </p>
                <p className="mt-1 text-xs uppercase tracking-wide text-[#888888]">
                  {t("normsValue")}
                </p>
              </div>
              <div>
                <p className="text-lg font-semibold text-[#1A1A1A]">
                  {t("coverageLabel")}
                </p>
                <p className="mt-1 text-xs uppercase tracking-wide text-[#888888]">
                  {t("coverageValue")}
                </p>
              </div>
            </div>
          </div>

          <div className="aspect-[4/5] overflow-hidden rounded-2xl bg-gradient-to-br from-[#E8ECF0] to-[#CCCCCC]">
            <div className="flex h-full w-full items-center justify-center text-[#999999]">
              <svg
                className="h-16 w-16"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={0.75}
                  d="M2.25 21h19.5M4.5 3h15M4.5 21V3M19.5 21V3M9 6.75h1.5M9 11.25h1.5M9 15.75h1.5m3-9h1.5m-1.5 4.5h1.5m-1.5 4.5h1.5M9 21v-3.375c0-.621.504-1.125 1.125-1.125h3.75c.621 0 1.125.504 1.125 1.125V21"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
