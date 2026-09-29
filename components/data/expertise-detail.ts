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

export const expertiseDetailMeta: Record<string, ExpertiseDetailMeta> = {
  "reseaux-telecom": {
    icon: "tower",
    featureDomains: [{ icon: "satellite" }, { icon: "tower" }],
    compactDomain: { icon: "network" },
    darkDomain: { icon: "security" },
    closingPhoto: { src: "/images/telecom-site.jpg", position: "object-[30%_50%]" },
  },
  formation: {
    icon: "certification",
    featureDomains: [{ icon: "satellite" }, { icon: "tower" }],
    compactDomain: { icon: "network" },
    darkDomain: { icon: "certification" },
    closingPhoto: { src: "/images/network-telecom.jpg" },
  },
  prestation: {
    icon: "consulting",
    featureDomains: [{ icon: "consulting" }, { icon: "staffing" }],
    compactDomain: { icon: "supply" },
    darkDomain: { icon: "certification" },
    closingPhoto: { src: "/images/site-panorama.jpg", position: "object-[72%_50%]" },
  },
  "equipment-supply": {
    icon: "supply",
    featureDomains: [{ icon: "supply" }, { icon: "project" }],
    compactDomain: { icon: "certification" },
    darkDomain: { icon: "staffing" },
    closingPhoto: { src: "/images/site-panorama.jpg", position: "object-[30%_50%]" },
  },
  energie: {
    icon: "maintenance",
    featureDomains: [{ icon: "supply" }, { icon: "project" }],
    compactDomain: { icon: "maintenance" },
    darkDomain: { icon: "certification" },
    closingPhoto: { src: "/images/site-panorama.jpg", position: "object-[50%_50%]" },
  },
  "diffusion-tv-vsat": {
    icon: "satellite",
    featureDomains: [{ icon: "satellite" }, { icon: "network" }],
    compactDomain: { icon: "maintenance" },
    darkDomain: { icon: "consulting" },
    closingPhoto: { src: "/images/hero-poster.jpg" },
  },
};
