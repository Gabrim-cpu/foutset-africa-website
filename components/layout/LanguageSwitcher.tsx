"use client";

import { useLocale } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import { BritishFlag, FrenchFlag } from "./FlagIcon";

/* Un simple repère, comme une rose des vents en marge de carte : un globe,
   rien d'autre. Le choix ne s'affiche qu'au survol ou au focus, dans un
   feuillet qui tombe sous le repère — même mécanique que le déroulant du
   menu (voir Navigation.tsx), à l'échelle d'une seule ligne. */

const locales = [
  { code: "fr", label: "Français", Flag: FrenchFlag },
  { code: "en", label: "English", Flag: BritishFlag },
] as const;

export default function LanguageSwitcher({
  tone = "ink",
  className = "",
}: {
  /** `paper` sur l'encre bleue du hero, `ink` sur le papier. */
  tone?: "ink" | "paper";
  className?: string;
}) {
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();

  const idle =
    tone === "paper"
      ? "text-paper/75 hover:text-paper"
      : "text-body hover:text-ink";

  return (
    <div className={`group relative ${className}`}>
      <button
        type="button"
        aria-label="Français / English"
        aria-haspopup="true"
        className={`flex h-9 w-9 items-center justify-center transition-colors duration-200 ${idle}`}
      >
        <svg
          viewBox="0 0 24 24"
          aria-hidden
          className="h-5 w-5 fill-none stroke-current stroke-[1.5]"
        >
          <circle cx="12" cy="12" r="9" />
          <path d="M3 12h18" />
          <path d="M12 3c2.5 2.5 3.8 5.7 3.8 9s-1.3 6.5-3.8 9c-2.5-2.5-3.8-5.7-3.8-9S9.5 5.5 12 3z" />
        </svg>
      </button>

      {/* Ne pousse rien sous elle à l'état fermé (position absolue) ; elle
          apparaît en fondu avec un léger zoom depuis son coin haut-droit,
          comme un popover Radix, plutôt qu'en se dépliant en hauteur.
          `visibility` fait partie de la transition : elle bascule tout de
          suite à l'ouverture, et seulement après le fondu à la fermeture. */}
      <div className="invisible absolute right-0 top-full z-50 origin-top-right scale-95 pt-2 opacity-0 transition-[opacity,transform,visibility] duration-200 ease-ink group-hover:visible group-hover:scale-100 group-hover:opacity-100 group-focus-within:visible group-focus-within:scale-100 group-focus-within:opacity-100">
        <ul className="min-w-38 overflow-hidden border border-rule bg-paper shadow-[0_18px_40px_-16px_rgba(20,32,43,0.5)]">
          {locales.map(({ code, label, Flag }) => (
            <li key={code}>
              <button
                type="button"
                onClick={() => router.replace(pathname, { locale: code })}
                aria-current={locale === code ? "true" : undefined}
                className={`flex w-full items-center gap-2.5 px-4 py-2.5 text-left text-[0.8125rem] font-bold tracking-[0.01em] transition-colors duration-150 ${
                  locale === code
                    ? "bg-sheet text-ink"
                    : "text-body hover:bg-sheet hover:text-ink"
                }`}
              >
                <Flag className="h-3.5 w-5 shrink-0" />
                {label}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
