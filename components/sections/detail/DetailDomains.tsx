import type { DomainIcon } from "@/components/data/domain-icons";
import { DomainIconGlyph } from "@/components/data/domain-icons";

type DomainCard = {
  title: string;
  description: string;
  icon: DomainIcon;
};

function FeatureCard({ card }: { card: DomainCard }) {
  return (
    <div className="overflow-hidden rounded-2xl border border-[#E5E5E5] bg-white">
      <div className="relative flex aspect-[16/9] items-center justify-center bg-gradient-to-br from-[#2A78C0] to-[#1A1A1A]">
        <DomainIconGlyph icon={card.icon} className="h-12 w-12 text-white/30" />
      </div>

      <div className="p-6">
        <span className="flex h-9 w-9 items-center justify-center text-[#F07818]">
          <DomainIconGlyph icon={card.icon} className="h-6 w-6" />
        </span>
        <h3 className="mt-3 text-lg text-[#1A1A1A]">{card.title}</h3>
        <p className="mt-2 text-sm text-[#555555] leading-relaxed">
          {card.description}
        </p>
      </div>
    </div>
  );
}

function CompactCard({ card }: { card: DomainCard }) {
  return (
    <div className="rounded-2xl border border-[#E5E5E5] bg-white p-6">
      <span className="flex h-9 w-9 items-center justify-center text-[#F07818]">
        <DomainIconGlyph icon={card.icon} className="h-6 w-6" />
      </span>
      <h3 className="mt-3 text-lg text-[#1A1A1A]">{card.title}</h3>
      <p className="mt-2 text-sm text-[#555555] leading-relaxed">
        {card.description}
      </p>
    </div>
  );
}

function DarkCard({ card }: { card: DomainCard }) {
  return (
    <div className="flex items-center justify-between gap-6 rounded-2xl bg-[#1A1A1A] p-6">
      <div>
        <h3 className="text-lg text-white">{card.title}</h3>
        <p className="mt-2 max-w-sm text-sm text-white/60 leading-relaxed">
          {card.description}
        </p>
      </div>
      <DomainIconGlyph
        icon={card.icon}
        className="hidden h-10 w-10 shrink-0 text-white/30 sm:block"
      />
    </div>
  );
}

export default function DetailDomains({
  title,
  subtitle,
  featureDomains,
  compactDomain,
  darkDomain,
}: {
  title: string;
  subtitle: string;
  featureDomains: [DomainCard, DomainCard];
  compactDomain: DomainCard;
  darkDomain: DomainCard;
}) {
  return (
    <section className="bg-[#F8F9FA] py-20">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <p className="text-sm font-semibold text-[#CCCCCC]">02</p>
        <h2 className="mt-2 text-2xl text-[#1A1A1A] sm:text-3xl">{title}</h2>
        <p className="mt-3 max-w-2xl text-[#555555] leading-relaxed">
          {subtitle}
        </p>

        <div className="mt-10 grid gap-6 sm:grid-cols-2">
          {featureDomains.map((card) => (
            <FeatureCard key={card.title} card={card} />
          ))}
        </div>

        <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_2fr]">
          <CompactCard card={compactDomain} />
          <DarkCard card={darkDomain} />
        </div>
      </div>
    </section>
  );
}
