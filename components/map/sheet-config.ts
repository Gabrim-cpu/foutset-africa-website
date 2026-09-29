import type { CoverageSheetProps } from "./CoverageSheet";

/* Chaque expertise reçoit son propre relevé, dans la même grammaire.

   C'est la condition sans laquelle le monde ne parlerait que du satellite —
   le risque avoué de cette direction. La différence entre les feuilles ne
   vient jamais de données inventées : elle vient de ce que le relevé met en
   avant. Les anneaux sont des distances vraies depuis Douala ; les arcs
   relient Douala à des villes réelles de la sous-région.
*/

type SheetConfig = Pick<CoverageSheetProps, "rings" | "routes">;

export const EXPERTISE_SHEET: Record<string, SheetConfig> = {
  // La portée satellitaire se lit en distance : les anneaux sont le sujet.
  "reseaux-telecom": { rings: [500, 1000, 1500] },

  // La formation rayonne depuis Douala vers les équipes de la sous-région.
  formation: { rings: [500, 1000] },

  // La prestation se déplace : les mêmes villes, sans promesse de distance.
  prestation: { rings: [1000] },

  // La fourniture rayonne depuis Douala, sans promesse de distance.
  "equipment-supply": { rings: [1000] },

  // L'énergie rayonne depuis Douala, sans promesse de distance.
  energie: { rings: [1000] },

  // La diffusion TV & VSAT se lit en portée satellite, comme les réseaux.
  "diffusion-tv-vsat": { rings: [500, 1000, 1500] },
};
