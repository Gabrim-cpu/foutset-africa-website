import type { DomainIcon } from "./domain-icons";

export type DomainMeta = {
  icon: DomainIcon;
};

export type ExpertiseDetailMeta = {
  icon: DomainIcon;
  featureDomains: [DomainMeta, DomainMeta];
  compactDomain: DomainMeta;
  darkDomain: DomainMeta;
  /** Seconde photo, dans la note de clôture. Le hero reprend celle de la
      carte d'expertise ; celle-ci ne doit pas la répéter. */
  closingPhoto: { src: string; position?: string };
};

/* Les photos de clôture référencent uniquement les fichiers réellement
   présents dans public/ : quatre photos pour six pages, certaines sont
   donc réutilisées d'une page à l'autre — jamais deux fois sur la même
   page (le hero reprend la photo de la carte, la note de clôture porte
   l'autre). Aucune image inventée (PRODUCT.md). */
export const expertiseDetailMeta: Record<string, ExpertiseDetailMeta> = {
  "reseaux-telecom": {
    icon: "tower",
    featureDomains: [{ icon: "satellite" }, { icon: "tower" }],
    compactDomain: { icon: "network" },
    darkDomain: { icon: "security" },
    closingPhoto: { src: "/images/expertise/satellite-tv-broadcasting.png" },
  },
  formation: {
    icon: "certification",
    featureDomains: [{ icon: "satellite" }, { icon: "tower" }],
    compactDomain: { icon: "network" },
    darkDomain: { icon: "certification" },
    closingPhoto: { src: "/images/expertise/network-telecom.jpg" },
  },
  prestation: {
    icon: "consulting",
    featureDomains: [{ icon: "consulting" }, { icon: "staffing" }],
    compactDomain: { icon: "supply" },
    darkDomain: { icon: "certification" },
    closingPhoto: { src: "/images/expertise/Trainings.jpg" },
  },
  "equipment-supply": {
    icon: "supply",
    featureDomains: [{ icon: "supply" }, { icon: "project" }],
    compactDomain: { icon: "certification" },
    darkDomain: { icon: "staffing" },
    closingPhoto: { src: "/images/hero-poster.jpg" },
  },
  energie: {
    icon: "maintenance",
    featureDomains: [{ icon: "supply" }, { icon: "project" }],
    compactDomain: { icon: "maintenance" },
    darkDomain: { icon: "certification" },
    // Le pied de page affiche déjà la vidéo du logo : pas de footer-poster
    // ici, une photo de site avec un cadrage décalé plutôt.
    closingPhoto: { src: "/images/expertise/network-telecom.jpg", position: "object-[70%_50%]" },
  },
  "diffusion-tv-vsat": {
    icon: "satellite",
    featureDomains: [{ icon: "satellite" }, { icon: "network" }],
    compactDomain: { icon: "maintenance" },
    darkDomain: { icon: "consulting" },
    closingPhoto: { src: "/images/hero-poster.jpg" },
  },
};
