"use client";

import { useLocale } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import { FrenchFlag, BritishFlag } from "./FlagIcon";

const locales = [
  { code: "fr", label: "Français", Flag: FrenchFlag },
  { code: "en", label: "English", Flag: BritishFlag },
] as const;

export default function LanguageSwitcher({
  className = "",
}: {
  className?: string;
}) {
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();

  return (
    <div
      className={`flex items-center gap-1 rounded-full border border-[#E5E5E5] p-1 ${className}`}
    >
      {locales.map(({ code, label, Flag }) => (
        <button
          key={code}
          type="button"
          onClick={() => router.replace(pathname, { locale: code })}
          aria-current={locale === code}
          aria-label={label}
          title={label}
          className={`flex h-7 w-9 items-center justify-center rounded-md transition-all ${
            locale === code
              ? "ring-2 ring-[#2A78C0] ring-offset-1"
              : "opacity-50 hover:opacity-100"
          }`}
        >
          <Flag className="h-4 w-6 rounded-sm" />
        </button>
      ))}
    </div>
  );
}
