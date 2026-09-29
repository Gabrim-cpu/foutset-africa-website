import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { flatNavEntries } from "./nav-items";
import ParticlesBackground from "@/components/ui/ParticlesBackground";
import CtaButton from "@/components/ui/CtaButton";
import BrandText from "@/components/ui/BrandText";

/* Le pied n'est plus une notice : c'est la dernière feuille. Il occupe la
   fenêtre entière, reprend l'appel qui vivait juste au-dessus de lui — la même
   phrase deux fois de suite n'était qu'un doublon — et range le reste en une
   seule ligne basse : marque, menu, adresse, mention.

   Le fond est le papier, comme le reste du site.

   Le texte est bleu : #2A78C0 pour les grandes masses, le bleu profond pour
   le texte fin (voir --color-blue-deep — sur papier, le bleu éclairci
   n'offrait plus assez de contraste). Aucun orange dans le pied, à la
   demande du client : l'appel et le repère passent au bleu. Le logo, lui,
   reste tel quel, bleu et orange.

   Le repère de calage en haut de bloc reste : il signe la feuille, et
   il donne au bandeau de navigation la ligne où disparaître. */

export default async function Footer() {
  const t = await getTranslations("footer");
  const tNav = await getTranslations("nav");
  const tCta = await getTranslations("cta");
  const tExpertise = await getTranslations("expertiseItems");
  const tContact = await getTranslations("contact");

  const year = new Date().getFullYear();

  /* Le menu du pied tient en une seule ligne courante : les mêmes entrées que
     le bandeau, dans le même ordre, contact compris. Une seule source pour les
     deux — le pied listait sa propre copie, et elle a déjà divergé une fois. */
  const links = flatNavEntries.map((entry) => ({
    key: entry.key,
    href: entry.href,
    label:
      entry.ns === "nav" ? tNav(entry.key) : tExpertise(`${entry.key}.title`),
  }));

  return (
    <footer
      id="site-footer"
      className="relative isolate flex min-h-svh flex-col overflow-hidden bg-paper text-blue-deep"
    >
      <ParticlesBackground />

      {/* Le repère de calage, en bleu : pas d'orange dans le pied. */}
      <div aria-hidden className="h-[3px] bg-blue" />

      {/* `pb-24` sous md : la marge que le bouton de remontée occupe dans le
          coin bas droit. */}
      <div className="mx-auto flex w-full max-w-[92rem] flex-1 flex-col px-6 pt-10 pb-24 md:pb-8 lg:px-10 lg:pt-20 xl:px-16">
        <h2 className="max-w-[13ch] text-[clamp(2rem,min(7.4vw,11svh),6.5rem)] leading-[0.98] text-blue">
          {tCta("title")}
        </h2>

        {/* `mt-auto` pousse le bas de feuille contre le bord : à pleine
            fenêtre, le blanc se creuse entre le titre et l'appel, jamais
            après la ligne des liens. */}
        <p className="mt-auto max-w-[46ch] pt-8 text-[1.0625rem] text-blue-deep">
          {tCta("subtitle")}
        </p>

        {/* L'appel prend toute la largeur, en plaque bleue. Papier sur
            #2A78C0 : 4.6:1, en grand corps. */}
        <CtaButton href="/contact" className="mt-7 w-full justify-between lg:h-16 lg:px-10">
          {tCta("button")}
        </CtaButton>

        {/* La ligne basse : marque, menu, adresse, mention. Quatre zones sur
            une seule ligne au large, empilées sous lg. */}
        <div className="mt-10 flex flex-col gap-8 border-t border-blue/30 pt-6 lg:flex-row lg:items-end lg:justify-between lg:gap-10">
          <Link
            href="/"
            className="shrink-0 self-start no-underline"
            aria-label={tNav("home")}
          >
            {/* Le logo d'origine, bleu et orange. Le client l'a demandé deux
                fois : ses couleurs ne se touchent pas, ici non plus. */}
            <Image
              src="/logo.png"
              alt="FOUTSET AFRICA"
              width={540}
              height={207}
              className="h-14 w-auto lg:h-16"
            />
          </Link>

          <nav
            className="flex flex-wrap gap-x-7 gap-y-2 text-[0.9375rem] lg:max-w-[44rem] lg:flex-1 lg:justify-center"
            aria-label={t("navigationTitle")}
          >
            {links.map((link) => (
              <Link
                key={link.key}
                href={link.href}
                className="text-blue-deep underline-offset-4 transition-colors duration-200 hover:text-blue"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="shrink-0 lg:text-right">
            <p className="sheet-label">{t("headquartersLabel")}</p>
            <p className="measured mt-1.5 text-blue-deep">
              {tContact("addressValue")}
            </p>
            <p className="mt-3 text-[0.8125rem]">
              © {year} <BrandText>{t("copyright")}</BrandText>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
