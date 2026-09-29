"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import LanguageSwitcher from "./LanguageSwitcher";
import { navEntries, type NavEntry } from "./nav-items";

/* Le cartouche de titre de la feuille.

   Une carte porte son titre, son échelle et sa légende dans un bloc réglé en
   marge. Le bandeau est ce bloc.

   Au repos il est transparent : la feuille passe dessous, bord à bord. Il ne
   gagne papier, filet et ombre qu'une fois le défilement engagé — le fond
   n'apparaît que quand il a quelque chose à séparer.

   Le panneau déroulant des expertises est parti. Les pages d'expertise sont posées à
   plat dans la barre : ce sont les pages que le visiteur vient chercher, elles
   n'ont pas à se mériter au survol. Elles font cinq entrées, donc le menu ne
   peut plus être centré en absolu sur la fenêtre — il tient sa place dans le
   flux, entre la marque et les actions, et la barre passe au menu plein écran
   sous lg au lieu de md : à 900 px, cinq libellés ne tiennent pas.

   Sur l'accueil, avant tout défilement, le bandeau flotte sur la vidéo de
   nuit sans voile : libellés, langue et menu passent alors en papier. Le
   logo, lui, ne change jamais : il garde ses couleurs d'origine partout.
   Dès que le bandeau gagne son fond, ou que le menu s'ouvre sur le papier,
   le reste reprend son encre.

   Aucun appel à l'action dans le bandeau : Contact y est un lien comme les
   autres.

   Au survol, chaque entrée s'allume comme sous une lampe : un filet orange au
   ras du bord haut, et un cône de lumière qui descend sur le libellé. La page
   ouverte garde sa lampe allumée (voir .nav-lamp dans globals.css). */

/* Le libellé : capitales espacées, comme la marque. Le filet orange, discret,
   se pose juste sous le mot au survol (voir .nav-underline). */
const ITEM =
  "nav-underline font-display whitespace-nowrap px-3 py-1 text-[0.8125rem] font-bold tracking-[0.06em] uppercase no-underline xl:px-4";

export default function Navigation({
  isScrolled,
  isHidden,
  isMenuOpen,
  onToggleMenu,
}: {
  isScrolled: boolean;
  isHidden: boolean;
  isMenuOpen: boolean;
  onToggleMenu: () => void;
}) {
  const t = useTranslations("nav");
  const tExpertise = useTranslations("expertiseItems");
  const pathname = usePathname();

  const label = (entry: NavEntry) =>
    entry.ns === "nav" ? t(entry.key) : tExpertise(`${entry.key}.title`);

  /* La page ouverte se marque ; un déroulant se marque quand une de ses pages
     est ouverte. */
  const isCurrent = (entry: NavEntry): boolean =>
    entry.children
      ? entry.children.some(isCurrent)
      : pathname === entry.href;

  return (
    <header
      /* Retiré du champ ET du parcours au clavier : un cartouche seulement
         translaté hors cadre reste focusable, et la tabulation partait dans
         du vide au-dessus de l'écran. */
      inert={isHidden || undefined}
      className={`header-enter pointer-events-none fixed inset-x-0 top-0 z-50 transition-[transform,opacity] duration-300 ${
        isHidden
          ? "-translate-y-full opacity-0 duration-150"
          : "translate-y-0 opacity-100"
      }`}
    >
      {/* Bord à bord, fixe. Le filet du bas et l'ombre n'apparaissent qu'une
          fois le défilement engagé. Seul cet intérieur reçoit la souris,
          l'enveloppe laisse passer les clics. */}
      <div
        className={`pointer-events-auto border-b border-rule bg-paper transition-shadow duration-300 ${
          isScrolled
            ? "shadow-[0_10px_24px_-18px_rgba(20,32,43,0.55)]"
            : "shadow-none"
        }`}
      >
      <div className="relative mx-auto flex h-16 max-w-[92rem] items-center gap-6 px-6 lg:px-10 xl:px-16">
        <Link
          href="/"
          className="relative z-50 flex shrink-0 items-center"
          aria-label={t("home")}
        >
          <Image
            src="/logo.png"
            alt="FOUTSET AFRICA"
            width={540}
            height={207}
            priority
            /* Jamais reteint : le logo garde ses couleurs d'origine, bleu et
               orange, sur la vidéo comme sur le papier. Demande du client. Il
               occupe la hauteur du bandeau, comme la marque de référence. */
            className="h-9 w-auto xl:h-10"
          />
        </Link>

        <nav
          className="hidden min-w-0 flex-1 items-center justify-center lg:flex"
          aria-label={t("primaryNav")}
        >
          {navEntries.map((entry) => {
            const current = isCurrent(entry);

            if (!entry.children) {
              return (
                <Link
                  key={entry.key}
                  href={entry.href}
                  aria-current={current ? "page" : undefined}
                  className={ITEM}
                >
                  {label(entry)}
                </Link>
              );
            }

            /* Le déroulant s'ouvre au survol et au focus clavier, sans état :
               `group-hover` et `group-focus-within` suffisent. Le panneau
               démarre sous une bande de 0.75rem de padding, pas de marge : le
               curseur ne quitte jamais le groupe en descendant vers lui. */
            return (
              <div key={entry.key} className="group flex items-center">
                <Link
                  href={entry.href}
                  aria-current={current ? "page" : undefined}
                  aria-haspopup="true"
                  className={`${ITEM} gap-1.5`}
                >
                  {label(entry)}
                  <svg
                    viewBox="0 0 12 7"
                    aria-hidden
                    className="h-[7px] w-3 fill-none stroke-current stroke-[1.6] transition-transform duration-300 ease-ink group-focus-within:rotate-180 group-hover:rotate-180"
                  >
                    <path d="M1 1l5 5 5-5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </Link>

                {/* Le second rang : pas un panneau flottant, mais une bande qui
                    occupe toute la largeur de la barre, calée sur la marque et
                    les actions. Les pages se partagent l'espace à parts égales
                    (voir la référence du client). Elle ne pousse rien sous elle
                    à l'état fermé (position absolue) ; elle apparaît en fondu
                    avec un léger zoom, comme un popover Radix, plutôt qu'en se
                    dépliant en hauteur. `visibility` fait partie de la
                    transition : elle bascule tout de suite à l'ouverture, et
                    seulement après le fondu à la fermeture — le panneau reste
                    interactif et focusable pendant qu'il disparaît. */}
                <div className="invisible absolute inset-x-0 top-full origin-top scale-95 opacity-0 transition-[opacity,transform,visibility] duration-200 ease-ink group-focus-within:visible group-focus-within:scale-100 group-focus-within:opacity-100 group-hover:visible group-hover:scale-100 group-hover:opacity-100">
                  <div className="border-t border-rule bg-paper shadow-[0_18px_40px_-16px_rgba(20,32,43,0.5)]">
                    <ul
                      className="mx-auto grid max-w-[92rem] divide-x divide-rule px-6 lg:px-10 xl:px-16"
                      style={{ gridTemplateColumns: `repeat(${entry.children.length}, minmax(0, 1fr))` }}
                    >
                      {entry.children.map((child) => (
                        <li key={child.key}>
                          <Link
                            href={child.href}
                            aria-current={pathname === child.href ? "page" : undefined}
                            className="group/item flex h-full items-center px-6 py-6 no-underline aria-[current]:bg-sheet"
                          >
                            <span className="font-display text-[1.0625rem] font-bold tracking-[-0.01em] text-ink transition-colors duration-200 group-hover/item:text-blue">
                              {label(child)}
                            </span>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            );
          })}
        </nav>

        <div className="ml-auto flex shrink-0 items-center gap-7">
          <div className="hidden items-center lg:flex">
            <LanguageSwitcher tone="ink" />
          </div>

          <button
            type="button"
            onClick={onToggleMenu}
            className={`relative z-50 -mr-2 flex h-9 w-9 items-center justify-center transition-colors duration-200 lg:hidden ${
              "text-ink"
            }`}
            aria-label={isMenuOpen ? t("closeMenu") : t("openMenu")}
            aria-expanded={isMenuOpen}
          >
            {/* Deux traits, pas trois : ils se croisent en X à l'ouverture. */}
            <span className="relative block h-2 w-6">
              <span
                className={`absolute left-0 h-0.5 w-6 rounded-full bg-current transition-all duration-300 ${
                  isMenuOpen ? "top-0.75 rotate-45" : "top-0"
                }`}
              />
              <span
                className={`absolute left-0 h-0.5 w-6 rounded-full bg-current transition-all duration-300 ${
                  isMenuOpen ? "top-0.75 -rotate-45" : "top-1.5"
                }`}
              />
            </span>
          </button>
        </div>
      </div>
      </div>
    </header>
  );
}
