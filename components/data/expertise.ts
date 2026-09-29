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
  /** Photo de la carte d'expertise sur l'accueil, servie depuis public/. */
  image: string;
};

/* Le télécom mène : c'est le cœur du métier, et la première entrée partout
   (bandeau, index, formulaire). Les trois autres expertises le servent. */
export const allExpertise: ExpertiseItem[] = [
  {
    id: "reseaux-telecom",
    icon: "wifi",
    image: "/images/network-telecom.jpg",
  },
  {
    id: "formation",
    icon: "formation",
    image: "/images/expertise/Trainings.jpg",
  },
  {
    id: "prestation",
    icon: "prestation",
    image: "/images/site-panorama.jpg",
  },
  {
    id: "equipment-supply",
    icon: "supply",
    image: "/images/telecom-site.jpg",
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
