"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { navEntries } from "./nav-items";
import LanguageSwitcher from "./LanguageSwitcher";

/* Le menu déplié.

   Il portait deux listes : les rubriques en gros, puis les expertises
   dans un cartouche à part, parce que le bandeau les cachait derrière un
   panneau. La barre les affiche maintenant à plat — le menu dit la même chose,
   dans le même ordre, en une seule liste.

   Seul le titre de chaque expertise reste : le petit verbe qui l'accompagnait
   (connecter, transmettre…) a été retiré partout, du menu comme des pages. */

export default function MobileMenu({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const t = useTranslations("nav");
  const tExpertise = useTranslations("expertiseItems");
  const tMenu = useTranslations("mobileMenu");

  return (
    <div
      className={`fixed inset-0 z-40 overflow-y-auto bg-sheet transition-opacity duration-300 lg:hidden ${
        isOpen
          ? "pointer-events-auto visible opacity-100"
          : "pointer-events-none invisible opacity-0"
      }`}
    >
      <div className="flex min-h-full flex-col px-6 pt-24 pb-10">
        <nav className="flex flex-col" aria-label={t("primaryNav")}>
          {navEntries.map((entry) => (
            <div key={entry.key} className="border-b border-rule">
              <Link
                href={entry.href}
                onClick={onClose}
                className="flex items-baseline justify-between gap-4 py-4 no-underline"
              >
                <span className="font-display text-[1.5rem] font-semibold tracking-[-0.03em] text-ink">
                  {entry.ns === "nav"
                    ? t(entry.key)
                    : tExpertise(`${entry.key}.title`)}
                </span>
              </Link>

              {entry.children && (
                <ul className="pb-3">
                  {entry.children.map((child) => (
                    <li key={child.key}>
                      <Link
                        href={child.href}
                        onClick={onClose}
                        className="flex items-baseline py-2.5 pl-4 no-underline"
                      >
                        <span className="font-display text-[1.0625rem] font-medium text-body">
                          {child.ns === "nav"
                            ? t(child.key)
                            : tExpertise(`${child.key}.title`)}
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </nav>

        <div className="mt-auto pt-10">
          <p className="max-w-[42ch] text-[0.9375rem]">{tMenu("tagline")}</p>

          <div className="mt-6">
            <LanguageSwitcher />
          </div>
        </div>
      </div>
    </div>
  );
}
