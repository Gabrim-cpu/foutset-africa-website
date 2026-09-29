import BrandText from "@/components/ui/BrandText";
/* Ce que couvre l'expertise.

   Deux paragraphes de même corps se lisaient comme un pavé. Le premier dit
   l'essentiel : il passe en chapeau, grand et à l'encre, derrière un filet
   bleu. Le second, le détail, reste au corps courant. Le titre tient sa
   colonne pendant la lecture. */

export default function DetailIntro({
  title,
  paragraphs,
}: {
  title: string;
  paragraphs: [string, string];
}) {
  const [lead, detail] = paragraphs;

  return (
    <section className="bg-paper">
      <div className="mx-auto max-w-[92rem] px-6 py-16 lg:px-10 lg:py-24 xl:px-16">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,26rem)_minmax(0,1fr)] lg:gap-20">
          <h2 className="max-w-[22ch] text-[1.75rem] sm:text-[2rem] lg:sticky lg:top-28 lg:self-start">
            {title}
          </h2>

          <div className="max-w-[62ch]">
            <p className="border-l-2 border-blue pl-6 text-[clamp(1.1875rem,1.9vw,1.5rem)] leading-snug font-medium text-ink">
              <BrandText>{lead}</BrandText>
            </p>
            <p className="mt-8 pl-[1.625rem] text-[1.0625rem]"><BrandText>{detail}</BrandText></p>
          </div>
        </div>
      </div>
    </section>
  );
}
