export type ExpertiseIcon =
  | "wifi"
  | "formation"
  | "prestation"
  | "supply"
  | "broadcast"
  | "energy";

export type ExpertiseItem = {
  id: string;
  icon: ExpertiseIcon;
  /** Photo de la carte d'expertise sur l'accueil, servie depuis public/.
      Null quand aucune photo réelle n'existe : la carte reste sur son fond
      abysse avec son pictogramme — on n'invente pas d'image (PRODUCT.md). */
  image: string | null;
};

/* Le télécom mène : c'est le cœur du métier, et la première entrée partout
   (bandeau, index, formulaire). Les trois autres expertises le servent. */
export const allExpertise: ExpertiseItem[] = [
  {
    id: "reseaux-telecom",
    icon: "wifi",
    image: "/images/expertise/network-telecom.jpg",
  },
  {
    id: "formation",
    icon: "formation",
    image: "/images/expertise/Trainings.jpg",
  },
  {
    id: "prestation",
    icon: "prestation",
    // Pas de photo dédiée : l'import/export n'a pas encore d'image réelle.
    image: null,
  },
  {
    id: "equipment-supply",
    icon: "supply",
    // Pas de photo dédiée : l'import/export n'a pas encore d'image réelle.
    image: null,
  },
  {
    id: "energie",
    icon: "energy",
    image: "/images/expertise/solar-energy.jpg",
  },
  {
    id: "diffusion-tv-vsat",
    icon: "broadcast",
    image: "/images/expertise/satellite-tv-broadcasting.png",
  },
];
