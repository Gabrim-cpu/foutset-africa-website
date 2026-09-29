/* Le bandeau défilant : une rangée qui passe en continu, de droite à gauche.

   Sur la page Réseaux & Télécom, il fait défiler les valeurs mesurées
   (bandes, débit, contention) — demande du client ; sur les autres, les
   domaines d'intervention de la page.

   Il vit au pied du hero vidéo, sans fond propre (demande du client) : texte
   en blanc, en grand corps, posé directement sur la vidéo. Un filet fin le
   sépare du titre au-dessus.

   La rangée est dessinée deux fois bout à bout et glisse de la moitié de sa
   longueur : quand la première copie sort, la seconde est exactement à sa
   place, la boucle ne se voit pas. Les deux copies sont décoratives ; le
   contenu est lu une seule fois, dans la liste masquée qui les précède.
   Survol : la rangée s'arrête. Mouvement réduit : elle reste immobile. */

type TickerItem = { label?: string; value: string };

function Run({ items, mono }: { items: TickerItem[]; mono: boolean }) {
  return (
    <ul aria-hidden className="flex shrink-0 items-center">
      {items.map((item, i) => (
        <li key={i} className="flex shrink-0 items-center">
          <span className="flex items-baseline gap-2.5 px-5 lg:px-7">
            {item.label && (
              <span className="text-[0.625rem] font-bold tracking-[0.12em] whitespace-nowrap text-paper uppercase lg:text-[0.6875rem]">
                {item.label}
              </span>
            )}
            <span
              className={`${
                mono ? "font-data tracking-[-0.01em]" : "font-display font-semibold tracking-[-0.02em]"
              } text-[clamp(0.875rem,1.2vw,1.0625rem)] whitespace-nowrap text-paper`}
            >
              {item.value}
            </span>
          </span>
          <span className="h-1.25 w-1.25 shrink-0 rounded-full bg-paper/60" />
        </li>
      ))}
    </ul>
  );
}

export default function Ticker({
  label,
  items,
  mono = false,
}: {
  /** Nom du bandeau pour les lecteurs d'écran. */
  label: string;
  items: TickerItem[];
  /** Valeurs mesurées : en chasse fixe, comme partout sur le site. */
  mono?: boolean;
}) {
  // Assez d'éléments pour qu'une copie dépasse la largeur d'un grand écran.
  const repeat = Math.max(2, Math.ceil(8 / items.length));
  const run = Array.from({ length: repeat }, () => items).flat();

  return (
    <section
      aria-label={label}
      className="ticker w-full border-t border-paper/15 py-4 lg:py-5"
    >
      <ul className="sr-only">
        {items.map((item) => (
          <li key={item.value}>
            {item.label ? `${item.label} : ${item.value}` : item.value}
          </li>
        ))}
      </ul>
      <div className="ticker-track">
        <Run items={run} mono={mono} />
        <Run items={run} mono={mono} />
      </div>
    </section>
  );
}
