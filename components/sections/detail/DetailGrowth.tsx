import { Link } from "@/i18n/navigation";
import type { DomainIcon } from "@/components/data/domain-icons";
import { DomainIconGlyph } from "@/components/data/domain-icons";

export default function DetailGrowth({
  title,
  paragraph,
  ctaLabel,
  icon,
}: {
  title: string;
  paragraph: string;
  ctaLabel: string;
  icon: DomainIcon;
}) {
  return (
    <section className="bg-white py-20">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div
            className="relative flex aspect-[4/3] items-center justify-center overflow-hidden bg-gradient-to-br from-[#2A78C0] to-[#1A1A1A]"
            style={{
              clipPath: "polygon(0 0, 100% 0, 100% 82%, 82% 100%, 0 100%)",
            }}
          >
            <DomainIconGlyph icon={icon} className="h-20 w-20 text-white/20" />
          </div>

          <div>
            <p className="text-sm font-semibold text-[#CCCCCC]">03</p>
            <h2 className="mt-2 text-2xl text-[#1A1A1A] sm:text-3xl">
              {title}
            </h2>
            <p className="mt-4 text-[#555555] leading-relaxed">{paragraph}</p>

            <Link
              href="/contact"
              className="mt-8 inline-flex items-center rounded-full bg-[#F07818] px-6 py-3.5 text-sm font-semibold uppercase tracking-wide text-white transition-all hover:bg-[#c9640f]"
            >
              {ctaLabel}
              <span className="ml-2">→</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
