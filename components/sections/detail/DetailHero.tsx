import type { DomainIcon } from "@/components/data/domain-icons";
import { DomainIconGlyph } from "@/components/data/domain-icons";

export default function DetailHero({
  eyebrow,
  word,
  subtitle,
  icon,
}: {
  eyebrow: string;
  word: string;
  subtitle: string;
  icon: DomainIcon;
}) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-[#2A78C0] to-[#1A1A1A] pt-40 pb-24">
      <DomainIconGlyph
        icon={icon}
        className="pointer-events-none absolute -right-24 top-1/2 h-[28rem] w-[28rem] -translate-y-1/2 text-white/[0.04]"
      />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <p className="text-xs font-semibold uppercase tracking-[0.15em] text-[#F07818]">
          {eyebrow}
        </p>

        <h1 className="mt-6 text-5xl uppercase tracking-tight text-white sm:text-6xl lg:text-7xl">
          {word}
        </h1>

        <p className="mt-6 max-w-xl text-lg text-white/70 leading-relaxed">
          {subtitle}
        </p>

        <span className="mt-16 block h-16 w-px bg-white/20" />
      </div>
    </section>
  );
}
