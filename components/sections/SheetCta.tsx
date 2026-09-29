import CtaButton from "@/components/ui/CtaButton";

/* La seconde plaque d'encre, à pleine puissance : l'orange prend toute la
   région. Le texte se pose en encre sombre dessus — blanc sur orange ne donne
   que 2.8:1, ce qui ne se lit pas au soleil.

   Un seul appel à l'action pour tout le site : l'accueil et les feuilles
   se terminent sur le même bloc, avec leur propre libellé. */

export default function SheetCta({
  title,
  subtitle,
  buttonLabel,
}: {
  title: string;
  subtitle?: string;
  buttonLabel: string;
}) {
  return (
    <section className="bg-orange">
      <div className="mx-auto max-w-[92rem] px-6 py-16 lg:px-10 lg:py-20 xl:px-16">
        {/* Borné : sur toute la largeur, le bouton finissait à 750 px du
            texte et la plaque orange se lisait comme un vide. */}
        <div className="flex max-w-[72rem] flex-col gap-8 lg:flex-row lg:items-end lg:justify-between lg:gap-16">
          {/* La mesure se pose sur les éléments, pas sur le conteneur : `ch`
              se résout à la taille de police du bloc qui le porte, donc un
              `max-w` en `ch` sur une div en 16 px bornait le titre à ~270 px
              et le cassait en cinq lignes. */}
          <div>
            <h2 className="max-w-[36rem] text-ink">{title}</h2>
            {subtitle && (
              <p className="mt-4 max-w-[54ch] text-[1.0625rem] text-ink">
                {subtitle}
              </p>
            )}
          </div>

          <CtaButton
            href="/contact"
            tone="ink"
            className="shrink-0 self-start lg:self-auto"
          >
            {buttonLabel}
          </CtaButton>
        </div>
      </div>
    </section>
  );
}
