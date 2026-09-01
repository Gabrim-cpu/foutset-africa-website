export default function DetailIntro({
  title,
  paragraphs,
}: {
  title: string;
  paragraphs: [string, string];
}) {
  return (
    <section className="border-b border-[#E5E5E5] bg-white py-20">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[1fr_2fr]">
          <div>
            <p className="text-sm font-semibold text-[#CCCCCC]">01</p>
            <h2 className="mt-2 border-b-2 border-[#F07818] pb-4 text-2xl text-[#1A1A1A] sm:text-3xl">
              {title}
            </h2>
          </div>

          <div className="space-y-6">
            {paragraphs.map((paragraph) => (
              <p key={paragraph} className="text-[#555555] leading-relaxed">
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
