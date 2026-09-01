"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { allExpertise } from "@/components/data/expertise";
import { ExpertiseIconGlyph } from "@/components/data/expertise-icons";
import LanguageSwitcher from "./LanguageSwitcher";

export type NavItem = {
  labelKey: "leGroupe" | "nosExpertises" | "nosEngagements" | "actualites";
  href: string;
  hasDropdown?: boolean;
};

export const navItems: NavItem[] = [
  { labelKey: "leGroupe", href: "#groupe" },
  { labelKey: "nosExpertises", href: "#expertises", hasDropdown: true },
  { labelKey: "nosEngagements", href: "#" },
  { labelKey: "actualites", href: "#" },
];

export default function Navigation({
  isScrolled,
  isMenuOpen,
  onToggleMenu,
}: {
  isScrolled: boolean;
  isMenuOpen: boolean;
  onToggleMenu: () => void;
}) {
  const t = useTranslations("nav");
  const tExpertise = useTranslations("expertiseItems");

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-white shadow-sm" : "bg-white/95 backdrop-blur-sm"
      }`}
    >
      <div className="mx-auto grid h-16 max-w-7xl grid-cols-[1fr_auto_1fr] items-center px-6 lg:px-8">
        <div className="flex items-center">
          <Link
            href="/"
            className={`relative z-50 flex items-center transition-all duration-300 ${
              isScrolled
                ? "translate-x-0 opacity-100"
                : "pointer-events-none -translate-x-2 opacity-0"
            }`}
            aria-label="FOUTSET AFRICA - Accueil"
          >
            <Image
              src="/logo-foutset.png"
              alt="FOUTSET AFRICA"
              width={516}
              height={183}
              priority
              className="h-9 w-auto"
            />
          </Link>
        </div>

        <nav
          className="hidden items-center gap-8 md:flex"
          aria-label="Navigation principale"
        >
          {navItems.map((item) =>
            item.hasDropdown ? (
              <div key={item.labelKey} className="group relative">
                <a
                  href={item.href}
                  className="flex items-center gap-1 text-xs font-semibold uppercase tracking-wide text-[#333333] transition-colors hover:text-[#2A78C0]"
                >
                  {t(item.labelKey)}
                  <svg
                    className="h-3 w-3 transition-transform duration-200 group-hover:rotate-180"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </a>

                <div className="invisible absolute left-1/2 top-full w-72 -translate-x-1/2 translate-y-1 opacity-0 transition-all duration-200 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:visible group-focus-within:translate-y-0 group-focus-within:opacity-100">
                  <div className="overflow-hidden rounded-2xl border border-[#E5E5E5] bg-white p-2 shadow-lg">
                    {allExpertise.map((expertise) => (
                      <Link
                        key={expertise.id}
                        href={`/expertises/${expertise.id}`}
                        className="flex items-center gap-3 rounded-xl px-3 py-2.5 transition-colors hover:bg-[#F0F7FF]"
                      >
                        <span className="flex h-8 w-8 shrink-0 items-center justify-center text-[#F07818]">
                          <ExpertiseIconGlyph
                            icon={expertise.icon}
                            className="h-5 w-5"
                          />
                        </span>
                        <span className="text-sm font-medium normal-case tracking-normal text-[#1A1A1A]">
                          {tExpertise(`${expertise.id}.title`)}
                        </span>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <a
                key={item.labelKey}
                href={item.href}
                className="text-xs font-semibold uppercase tracking-wide text-[#333333] transition-colors hover:text-[#2A78C0]"
              >
                {t(item.labelKey)}
              </a>
            )
          )}
        </nav>

        <div className="flex items-center justify-end gap-6">
          <div className="hidden items-center gap-6 md:flex">
            <LanguageSwitcher />

            <Link
              href="/contact"
              className="inline-flex items-center rounded-full bg-[#F07818] px-6 py-2.5 text-xs font-semibold uppercase tracking-wide text-white transition-all hover:bg-[#c9640f]"
            >
              {t("nousContacter")}
            </Link>
          </div>

          <button
            type="button"
            onClick={onToggleMenu}
            className="relative z-50 flex h-10 w-10 items-center justify-center rounded-full border border-[#E5E5E5] bg-white md:hidden"
            aria-label={isMenuOpen ? "Fermer le menu" : "Ouvrir le menu"}
            aria-expanded={isMenuOpen}
          >
            <span className="relative block h-4 w-5">
              <span
                className={`absolute left-0 top-0 h-0.5 w-5 bg-[#333333] transition-all duration-300 ${
                  isMenuOpen ? "top-2 rotate-45" : ""
                }`}
              />
              <span
                className={`absolute left-0 top-2 h-0.5 w-5 bg-[#333333] transition-all duration-300 ${
                  isMenuOpen ? "opacity-0" : ""
                }`}
              />
              <span
                className={`absolute left-0 top-4 h-0.5 w-5 bg-[#333333] transition-all duration-300 ${
                  isMenuOpen ? "top-2 -rotate-45" : ""
                }`}
              />
            </span>
          </button>
        </div>
      </div>
    </header>
  );
}
