export type ExpertiseIcon = "wifi" | "bolt" | "formation" | "prestation" | "importExport";

export type ExpertiseItem = {
  id: string;
  icon: ExpertiseIcon;
};

export const primaryExpertise: ExpertiseItem[] = [
  { id: "reseaux-telecom", icon: "wifi" },
  { id: "energie", icon: "bolt" },
];

export const groupedExpertise: ExpertiseItem[] = [
  { id: "formation", icon: "formation" },
  { id: "prestation", icon: "prestation" },
  { id: "import-export", icon: "importExport" },
];

export const allExpertise: ExpertiseItem[] = [
  ...primaryExpertise,
  ...groupedExpertise,
];
