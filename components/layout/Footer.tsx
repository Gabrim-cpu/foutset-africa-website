import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";

export default async function Footer() {
  const t = await getTranslations("footer");
  const tNav = await getTranslations("nav");

  return (
    <footer className="relative bg-[#1A1A1A] pt-20 pb-10 text-[#888888]">
      <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-[#F07818] via-[#2A78C0] to-transparent" />

      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid gap-12 md:grid-cols-4">
          <div>
            <Image
              src="/logo-foutset.png"
              alt="FOUTSET AFRICA"
              width={516}
              height={183}
              className="h-10 w-auto"
            />
            <p className="mt-3 text-sm">{t("tagline")}</p>

            <p className="mt-6 text-xs font-semibold uppercase tracking-wide text-[#666666]">
              {t("headquartersLabel")}
            </p>
            <p className="mt-1 text-sm text-[#CCCCCC]">
              {t("headquartersValue")}
            </p>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-white">
              {t("navigationTitle")}
            </p>
            <ul className="mt-4 space-y-2 text-sm">
              <li>
                <a href="#groupe" className="transition-colors hover:text-[#2A78C0]">
                  {tNav("leGroupe")}
                </a>
              </li>
              <li>
                <a href="#expertises" className="transition-colors hover:text-[#2A78C0]">
                  {tNav("nosExpertises")}
                </a>
              </li>
              <li>
                <a href="#" className="transition-colors hover:text-[#2A78C0]">
                  {tNav("nosEngagements")}
                </a>
              </li>
              <li>
                <a href="#" className="transition-colors hover:text-[#2A78C0]">
                  {tNav("actualites")}
                </a>
              </li>
            </ul>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-white">
              {t("certificationsTitle")}
            </p>
            <div className="mt-4 flex gap-3">
              <div className="flex h-12 w-16 items-center justify-center rounded-lg border border-[#333333] text-xs text-[#666666]">
                ISO
              </div>
              <div className="flex h-12 w-16 items-center justify-center rounded-lg border border-[#333333] text-xs text-[#666666]">
                QSE
              </div>
            </div>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-white">
              {t("contactTitle")}
            </p>
            <ul className="mt-4 space-y-2 text-sm underline underline-offset-4">
              <li>
                <Link href="/contact" className="transition-colors hover:text-[#2A78C0]">
                  {t("writeToUs")}
                </Link>
              </li>
              <li>
                <Link href="/contact" className="transition-colors hover:text-[#2A78C0]">
                  {t("requestQuote")}
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-4 border-t border-[#333333] pt-6 text-xs sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {t("copyright")}
          </p>
          <div className="flex gap-6">
            <a href="#" className="transition-colors hover:text-[#2A78C0]">
              {t("legalNotice")}
            </a>
            <a href="#" className="transition-colors hover:text-[#2A78C0]">
              {t("privacyPolicy")}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
