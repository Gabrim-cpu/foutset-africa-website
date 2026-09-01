"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { navItems } from "./Navigation";
import LanguageSwitcher from "./LanguageSwitcher";

export default function MobileMenu({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const t = useTranslations("nav");
  const tMenu = useTranslations("mobileMenu");

  return (
    <div
      className={`fixed inset-0 z-40 bg-white transition-all duration-300 md:hidden ${
        isOpen
          ? "pointer-events-auto visible opacity-100"
          : "pointer-events-none invisible opacity-0"
      }`}
    >
      <div className="flex h-full flex-col px-6 pb-8 pt-20">
        <nav className="flex flex-col space-y-6">
          {navItems.map((item, index) => (
            <a
              key={item.labelKey}
              href={item.href}
              onClick={onClose}
              className={`border-b border-[#F0F0F0] pb-6 text-2xl text-[#333333] transition-all duration-300 ${
                isOpen ? "translate-y-0 opacity-100" : "translate-y-5 opacity-0"
              }`}
              style={{ transitionDelay: `${index * 50}ms` }}
            >
              {t(item.labelKey)}
            </a>
          ))}
        </nav>

        <div
          className={`mt-auto transition-all duration-300 ${
            isOpen ? "translate-y-0 opacity-100" : "translate-y-5 opacity-0"
          }`}
          style={{ transitionDelay: "150ms" }}
        >
          <p className="mb-6 text-sm text-[#666666]">{tMenu("tagline")}</p>

          <LanguageSwitcher className="mb-4 w-fit" />

          <Link
            href="/contact"
            onClick={onClose}
            className="flex w-full items-center justify-center rounded-full bg-[#F07818] px-6 py-4 text-sm font-semibold uppercase tracking-wide text-white transition-colors hover:bg-[#c9640f]"
          >
            {t("nousContacter")}
          </Link>
        </div>
      </div>
    </div>
  );
}
