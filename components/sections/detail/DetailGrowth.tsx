import Image from "next/image";
import CtaButton from "@/components/ui/CtaButton";

/* La note de clôture : ce que l'expertise change pour le client, et l'appel.

   Elle tenait un titre et un paragraphe seuls sur du blanc. Elle porte
   maintenant une seconde photo, dans le cadre arrondi du hero en miroir, et
   se termine sur le bouton de contact avec le libellé propre à l'expertise
   (« Parlons de votre projet réseau »…), qui n'était affiché nulle part. */

export default function DetailGrowth({
  discipline,
  title,
  paragraph,
  ctaLabel,
  image,
  imagePosition = "object-center",
}: {
  discipline: string;
  title: string;
  paragraph: string;
  ctaLabel: string;
  image: string;
  imagePosition?: string;
}) {
  return (
    <section className="bg-paper">
      <div className="mx-auto grid max-w-[92rem] items-center gap-12 px-6 py-20 lg:grid-cols-2 lg:gap-20 lg:px-10 lg:py-28 xl:px-16">
        <div className="relative mr-3 mb-3 lg:mr-4 lg:mb-4">
          <div
            aria-hidden
            className="absolute inset-0 translate-x-3 translate-y-3 rounded-[1.75rem] rounded-tr-[5rem] border border-blue/40 lg:translate-x-4 lg:translate-y-4"
          />
          <div className="relative aspect-4/3 overflow-hidden rounded-[1.75rem] rounded-tr-[5rem] bg-sheet-deep">
            <Image
              src={image}
              alt=""
              fill
              sizes="(min-width: 1024px) 45vw, 100vw"
              className={`object-cover ${imagePosition}`}
            />
          </div>
        </div>

        <div>
          <p className="sheet-label">{discipline}</p>
          <h2 className="mt-4 max-w-[18ch]">{title}</h2>
          <p className="mt-5 max-w-[52ch] text-[1.125rem]">{paragraph}</p>

          <CtaButton href="/contact" className="mt-9">
            {ctaLabel}
          </CtaButton>
        </div>
      </div>
    </section>
  );
}
