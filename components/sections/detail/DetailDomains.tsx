import type { DomainIcon } from "@/components/data/domain-icons";
import { DomainIconGlyph } from "@/components/data/domain-icons";

/* Les domaines d'intervention, sur la nuit.

   Le registre à filets fins sur papier gris se lisait comme une notice. Les
   quatre domaines passent en cartes sur fond sombre, numérotées : un grand
   chiffre au trait en coin, l'icône dans une pastille orange, le titre en
   papier. Au survol, la carte monte d'un cran, son bord et son chiffre
   prennent le bleu — le visiteur voit ce qu'il pointe. */

type Domain = {
  title: string;
  description: string;
  icon: DomainIcon;
};

export default function DetailDomains({
  title,
  subtitle,
  featureDomains,
  compactDomain,
  darkDomain,
}: {
  title: string;
  subtitle: string;
  featureDomains: [Domain, Domain];
  compactDomain: Domain;
  darkDomain: Domain;
}) {
  const domains = [...featureDomains, compactDomain, darkDomain];

  return (
    <section className="relative isolate overflow-hidden bg-night">
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-[radial-gradient(50%_60%_at_15%_0%,color-mix(in_srgb,var(--color-blue)_22%,transparent),transparent_70%)]"
      />

      <div className="mx-auto max-w-[92rem] px-6 py-20 lg:px-10 lg:py-28 xl:px-16">
        <div className="grid gap-6 lg:grid-cols-2 lg:items-end lg:gap-16">
          <h2 className="text-paper">{title}</h2>
          <p className="max-w-[52ch] text-[1.0625rem] text-blue-tint">
            {subtitle}
          </p>
        </div>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:mt-16 lg:gap-5">
          {domains.map((domain, i) => (
            <article
              key={domain.title}
              className="group relative overflow-hidden rounded-[1.25rem] border border-white/10 bg-white/[0.04] p-6 transition-[border-color,background-color,transform] duration-300 hover:-translate-y-1 hover:border-blue-bright/60 hover:bg-white/[0.07] lg:p-8"
            >
              <span
                aria-hidden
                className="font-display absolute top-5 right-6 text-[3.5rem] leading-none font-bold text-transparent transition-colors duration-300 [-webkit-text-stroke:1px_rgba(255,255,255,0.2)] group-hover:[-webkit-text-stroke-color:var(--color-blue-bright)] lg:top-6 lg:right-8 lg:text-[4.5rem]"
              >
                {String(i + 1).padStart(2, "0")}
              </span>

              <span className="flex h-12 w-12 items-center justify-center rounded-full bg-orange/15 text-orange">
                <DomainIconGlyph icon={domain.icon} className="h-6 w-6" />
              </span>

              <h3 className="mt-6 max-w-[26ch] pr-16 text-paper lg:text-[1.5rem]">
                {domain.title}
              </h3>
              <p className="mt-3 max-w-[58ch] text-[0.9375rem] text-blue-tint">
                {domain.description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
