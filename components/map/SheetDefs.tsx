import { COUNTRIES } from "./geography";

/* La géométrie du continent, définie une seule fois par page.

   Le relevé apparaît deux fois sur chaque page — une composition sous `lg`,
   une autre au-dessus — et le continent pèse 21 Ko de tracés. Les répéter
   doublerait le HTML de chaque page pour rien, sur un site dont le public est
   explicitement sur connexion faible. Les chemins vivent donc ici, et chaque
   feuille les réutilise par référence.

   Rendu une fois dans le layout : toutes les pages portent un relevé. */

export default function SheetDefs() {
  return (
    <svg
      aria-hidden
      focusable="false"
      width="0"
      height="0"
      className="absolute"
      style={{ position: "absolute", width: 0, height: 0, overflow: "hidden" }}
    >
      <defs>
        {Object.entries(COUNTRIES).map(([code, country]) => (
          <path key={code} id={`geo-${code}`} d={country.d} />
        ))}
      </defs>
    </svg>
  );
}
