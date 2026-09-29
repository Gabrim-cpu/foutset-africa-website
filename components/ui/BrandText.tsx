/* Le nom de la maison, toujours en gras — « Foutset » en bleu, « Africa » en
   orange, comme sur le logo.

   Le nom vit dans les textes traduits, au milieu des phrases : plutôt que de
   le baliser à la main dans chaque message (et dans les deux langues), ce
   composant le retrouve — quelle que soit la casse — et le pose en gras. À
   utiliser partout où une phrase affichée peut le contenir. */

const NAME = /(foutset)(\s+)(africa)/gi;

export default function BrandText({ children }: { children: string }) {
  const nodes: React.ReactNode[] = [];
  let lastIndex = 0;

  for (const match of children.matchAll(NAME)) {
    const [full, foutset, space, africa] = match;
    const start = match.index ?? 0;

    if (start > lastIndex) nodes.push(children.slice(lastIndex, start));

    nodes.push(
      <strong key={`${start}-fr`} className="text-blue">
        {foutset}
      </strong>,
      space,
      <strong key={`${start}-af`} className="text-orange">
        {africa}
      </strong>,
    );

    lastIndex = start + full.length;
  }

  if (lastIndex < children.length) nodes.push(children.slice(lastIndex));

  return <>{nodes}</>;
}
