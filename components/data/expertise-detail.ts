import type { DomainIcon } from "./domain-icons";

export type DomainMeta = {
  icon: DomainIcon;
};

export type ExpertiseDetailMeta = {
  icon: DomainIcon;
  featureDomains: [DomainMeta, DomainMeta];
  compactDomain: DomainMeta;
  darkDomain: DomainMeta;
};

export const expertiseDetailMeta: Record<string, ExpertiseDetailMeta> = {
  "reseaux-telecom": {
    icon: "tower",
    featureDomains: [{ icon: "satellite" }, { icon: "tower" }],
    compactDomain: { icon: "network" },
    darkDomain: { icon: "security" },
  },
  energie: {
    icon: "solar",
    featureDomains: [{ icon: "solar" }, { icon: "battery" }],
    compactDomain: { icon: "maintenance" },
    darkDomain: { icon: "project" },
  },
  formation: {
    icon: "certification",
    featureDomains: [{ icon: "satellite" }, { icon: "solar" }],
    compactDomain: { icon: "network" },
    darkDomain: { icon: "certification" },
  },
  prestation: {
    icon: "consulting",
    featureDomains: [{ icon: "consulting" }, { icon: "staffing" }],
    compactDomain: { icon: "project" },
    darkDomain: { icon: "certification" },
  },
  "import-export": {
    icon: "logistics",
    featureDomains: [{ icon: "supply" }, { icon: "logistics" }],
    compactDomain: { icon: "certification" },
    darkDomain: { icon: "partnership" },
  },
};
