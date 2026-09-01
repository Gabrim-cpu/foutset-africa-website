import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import {
  primaryExpertise,
  groupedExpertise,
  type ExpertiseItem,
} from "@/components/data/expertise";
import { ExpertiseIconGlyph } from "@/components/data/expertise-icons";

type ItemText = { title: string; description: string };

function PrimaryCard({
  item,
  text,
  discoverLabel,
}: {
  item: ExpertiseItem;
  text: ItemText;
  discoverLabel: string;
}) {
  return (
    <div
      id={item.id}
      className="group relative scroll-mt-24 overflow-hidden rounded-2xl border border-[#E5E5E5] bg-white p-8 transition-all hover:shadow-md"
    >
      <ExpertiseIconGlyph
        icon={item.icon}
        className="pointer-events-none absolute -right-4 -bottom-4 h-32 w-32 text-[#1A1A1A] opacity-[0.04]"
      />

      <span className="relative flex h-10 w-10 items-center justify-center text-[#F07818]">
        <ExpertiseIconGlyph icon={item.icon} className="h-7 w-7" />
      </span>

      <h3 className="relative mt-4 text-xl text-[#1A1A1A]">{text.title}</h3>
      <p className="relative mt-3 max-w-sm text-sm text-[#555555] leading-relaxed">
        {text.description}
      </p>

      <Link
        href={`/expertises/${item.id}`}
        className="relative mt-6 inline-flex items-center text-xs font-semibold uppercase tracking-wide text-[#2A78C0] transition-colors hover:text-[#F07818]"
      >
        {discoverLabel}
        <span className="ml-2">→</span>
      </Link>
    </div>
  );
}

function GroupedItem({ item, text }: { item: ExpertiseItem; text: ItemText }) {
  return (
    <Link
      href={`/expertises/${item.id}`}
      id={item.id}
      className="group block scroll-mt-24"
    >
      <span className="flex h-9 w-9 items-center justify-center text-[#F07818]">
        <ExpertiseIconGlyph icon={item.icon} className="h-6 w-6" />
      </span>
      <h4 className="mt-3 text-white transition-colors group-hover:text-[#F07818]">
        {text.title}
      </h4>
      <p className="mt-2 text-sm text-white/60 leading-relaxed">
        {text.description}
      </p>
    </Link>
  );
}

export default async function Expertise() {
  const t = await getTranslations("expertiseSection");
  const tItems = await getTranslations("expertiseItems");

  return (
    <section id="expertises" className="bg-white py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="max-w-2xl">
          <h2 className="text-3xl text-[#1A1A1A] sm:text-4xl">{t("title")}</h2>
          <p className="mt-4 text-[#555555] leading-relaxed">{t("subtitle")}</p>
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-2">
          {primaryExpertise.map((item) => (
            <PrimaryCard
              key={item.id}
              item={item}
              text={{
                title: tItems(`${item.id}.title`),
                description: tItems(`${item.id}.description`),
              }}
              discoverLabel={t("discover")}
            />
          ))}
        </div>

        <div className="mt-6 rounded-2xl bg-[#1A1A1A] p-8 sm:p-10">
          <div className="grid gap-8 sm:grid-cols-3">
            {groupedExpertise.map((item) => (
              <GroupedItem
                key={item.id}
                item={item}
                text={{
                  title: tItems(`${item.id}.title`),
                  description: tItems(`${item.id}.description`),
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
