/* Les entrées de navigation vivent ici, hors de tout module client.

   Elles étaient exportées depuis Navigation.tsx, qui porte "use client" : le
   Footer, composant serveur, en recevait une référence client au lieu du
   tableau, et plantait sur .map. Un module neutre se lit correctement des deux
   côtés de la frontière.

   Le menu, tel que la direction l'a fixé : Services, Produits, Formation,
   Contact. Accueil est retiré de la barre — le logo y ramène déjà, une
   seconde porte vers la même page n'ajoutait rien.

   Services et Produits sont deux déroulants distincts. Services mène aux
   quatre pages d'expertise ; Produits mène à trois sections d'une seule et
   même page (/produits), pas à des pages séparées — `flattenInFooter: false`
   l'empêche de se répéter trois fois dans le pied de page. */

export type NavEntry = {
  /** Le namespace de traduction où lire le libellé — les expertises ont le
      leur, et leur clé y est `<id>.title`. */
  ns: "nav" | "expertiseItems";
  key: string;
  href: string;
  /** Les pages (ou sections) qui s'ouvrent sous l'entrée, en menu déroulant. */
  children?: NavEntry[];
  /** false : le pied de page garde l'entrée telle quelle, sans la remplacer
      par ses enfants. Par défaut (undefined), un déroulant se déplie dans le
      pied comme dans le bandeau. */
  flattenInFooter?: boolean;
};

const expertise = (id: string): NavEntry => ({
  ns: "expertiseItems",
  key: id,
  href: `/expertises/${id}`,
});

export const navEntries: NavEntry[] = [
  {
    ns: "nav",
    key: "services",
    href: "/#expertises",
    children: [
      "reseaux-telecom",
      "diffusion-tv-vsat",
      "equipment-supply",
      "energie",
    ].map(expertise),
  },
  {
    ns: "nav",
    key: "produits",
    href: "/produits",
    flattenInFooter: false,
    children: [
      { ns: "nav", key: "tvSolution", href: "/produits#tv" },
      { ns: "nav", key: "vsatSolution", href: "/produits#vsat" },
      { ns: "nav", key: "gsmBackhauling", href: "/produits#gsm" },
    ],
  },
  expertise("formation"),
  { ns: "nav", key: "contact", href: "/contact" },
];

/** Les entrées à plat pour le pied de page : un déroulant s'y déplie en ses
    pages, sauf s'il pointe vers des sections d'une seule page. */
export const flatNavEntries: NavEntry[] = navEntries.flatMap((entry) =>
  entry.children && entry.flattenInFooter !== false ? entry.children : [entry],
);
