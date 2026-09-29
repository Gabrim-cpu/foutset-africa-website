import {
  COUNTRIES,
  MAP_VIEWBOX,
  PLACES,
  geodesicPoint,
  geodesicRing,
  project,
} from "./geography";

/* ---------------------------------------------------------------------------
   La feuille de couverture — le continent.

   Géographie réelle, frontières réelles, distances réelles. Rien ici n'est un
   dégradé radial déguisé en empreinte : les zones SONT les pays, et les
   anneaux SONT des cercles géodésiques vrais, tracés en suivant de vrais
   azimuts depuis Douala. En Mercator l'échelle croît avec la latitude, donc un
   anneau de distance constante n'est pas un cercle sur la feuille : le
   dessiner rond aurait été commode et faux.

   Ce que la feuille affirme, et qui est vrai : siège à Douala, couverture
   nationale au Cameroun, couverture sous-régionale en Afrique centrale. Le
   reste du continent est au trait — il situe, il n'affirme rien. Aucun contour
   EIRP, aucun débit par zone, aucune donnée d'ensoleillement : ces chiffres
   n'existent pas encore, donc ils ne se dessinent pas.

   Les tracés viennent de <SheetDefs />, rendu une fois par page.
--------------------------------------------------------------------------- */

/** Le Cameroun : couverture nationale. */
const NATIONAL: string[] = ["CMR"];

/** L'Afrique centrale : couverture sous-régionale. */
const SUBREGION: string[] = ["TCD", "CAF", "GNQ", "GAB", "COG", "COD"];

/* Le lettrage se règle en style inline et non par une classe CSS : une
   font-size en rem dans une feuille de style écraserait l'attribut SVG et
   tout le lettrage tomberait à la même taille. */
const SHEET_LETTERING: React.CSSProperties = {
  fontFamily: "var(--font-sans)",
  fontWeight: 700,
  letterSpacing: "0.12em",
  textTransform: "uppercase",
};

const MEASURED_LETTERING: React.CSSProperties = {
  fontFamily: "var(--font-data)",
  fontVariantNumeric: "tabular-nums",
};

export type SheetMarker = {
  id: string;
  lon: number;
  lat: number;
  /** Omis quand la ligne de rappel aboutit à un bloc qui nomme déjà le lieu. */
  label?: string;
  dx?: number;
  dy?: number;
  anchor?: "start" | "end";
};

export type CoverageSheetProps = {
  /** Anneaux de distance depuis Douala, en kilomètres réels. */
  rings?: number[];
  /** Arcs d'acheminement depuis le port de Douala vers l'intérieur. */
  routes?: { lon: number; lat: number }[];
  /** Libellés de pays, traduits par l'appelant. */
  countryLabels?: Record<string, string>;
  markers?: SheetMarker[];
  animate?: boolean;
  /**
   * Multiplicateur du lettrage et des traits. Le SVG suit son conteneur, donc
   * une feuille rendue à 390 px affiche un texte trois fois plus petit qu'à
   * 1200 px. Comme sur une carte imprimée, le lettrage se dimensionne pour
   * l'échelle de reproduction, pas pour le système de coordonnées.
   */
  textScale?: number;
  /** Fenêtre de la feuille. Par défaut le continent entier. */
  viewBox?: string;
  /** Cadrage dans le conteneur. Centré par défaut. */
  preserveAspectRatio?: string;
  className?: string;
  /** Titre accessible ; la feuille est décorative si on ne le passe pas. */
  title?: string;
};

/** Graticule : méridiens et parallèles tous les 10°, sur toute la feuille. */
function graticule() {
  const lines: string[] = [];
  for (let lon = -10; lon <= 50; lon += 10) {
    const [x] = project(lon, 0);
    lines.push(`M${x.toFixed(1)} 0V1108`);
  }
  for (let lat = -30; lat <= 30; lat += 10) {
    const [, y] = project(0, lat);
    lines.push(`M0 ${y.toFixed(1)}H1000`);
  }
  return lines.join("");
}

export default function CoverageSheet({
  rings = [],
  routes = [],
  countryLabels = {},
  markers = [],
  animate = false,
  textScale = 1,
  viewBox = MAP_VIEWBOX,
  preserveAspectRatio,
  className,
  title,
}: CoverageSheetProps) {
  const [dlaX, dlaY] = project(PLACES.douala.lon, PLACES.douala.lat);
  const context = Object.keys(COUNTRIES).filter(
    (c) => !NATIONAL.includes(c) && !SUBREGION.includes(c),
  );
  const s = textScale;

  return (
    <svg
      viewBox={viewBox}
      preserveAspectRatio={preserveAspectRatio}
      className={className}
      role={title ? "img" : "presentation"}
      aria-label={title}
      aria-hidden={title ? undefined : true}
    >
      {/* Graticule : la trame de la feuille, sous toute l'encre. */}
      <path
        d={graticule()}
        fill="none"
        stroke="var(--color-blue)"
        strokeWidth={0.9 * s}
        opacity="0.16"
      />

      {/* Le continent, au trait. Il situe, il n'affirme rien. */}
      <g fill="none" stroke="var(--color-blue)" strokeWidth={1.15 * s} opacity="0.45">
        {context.map((code) => (
          <use key={code} href={`#geo-${code}`} />
        ))}
      </g>

      {/* Couverture sous-régionale : aplat clair. */}
      <g
        fill="var(--color-blue-tint)"
        fillOpacity="0.6"
        stroke="var(--color-blue-deep)"
        strokeWidth={1.2 * s}
        style={
          animate
            ? { animation: "ink-settle 700ms var(--ease-ink) 120ms backwards" }
            : undefined
        }
      >
        {SUBREGION.map((code) => (
          <use key={code} href={`#geo-${code}`} />
        ))}
      </g>

      {/* Couverture nationale : l'aplat le plus dense de la feuille. */}
      <g
        style={
          animate
            ? { animation: "ink-settle 700ms var(--ease-ink) 260ms backwards" }
            : undefined
        }
      >
        <use
          href="#geo-CMR"
          fill="var(--color-blue)"
          fillOpacity="0.92"
          stroke="var(--color-blue-abyss)"
          strokeWidth={1.6 * s}
        />
      </g>

      {/* Arcs d'acheminement depuis le port de Douala. */}
      {routes.length > 0 && (
        <g
          fill="none"
          stroke="var(--color-orange)"
          strokeWidth={2 * s}
          strokeLinecap="round"
        >
          {routes.map((r, i) => {
            const [x, y] = project(r.lon, r.lat);
            const mx = (dlaX + x) / 2;
            const my = (dlaY + y) / 2 - Math.abs(x - dlaX) * 0.28;
            const len = Math.hypot(x - dlaX, y - dlaY) * 1.3;
            return (
              <path
                key={i}
                d={`M${dlaX.toFixed(1)} ${dlaY.toFixed(1)}Q${mx.toFixed(1)} ${my.toFixed(1)} ${x.toFixed(1)} ${y.toFixed(1)}`}
                strokeDasharray={len}
                style={
                  {
                    "--ink-length": len,
                    animation: animate
                      ? `ink-stroke 900ms var(--ease-ink) ${520 + i * 130}ms backwards`
                      : undefined,
                    strokeDashoffset: 0,
                  } as React.CSSProperties
                }
              />
            );
          })}
        </g>
      )}

      {/* Anneaux de distance : des kilomètres réels depuis Douala. */}
      {rings.map((km, i) => {
        // Posé au sud-sud-ouest, au-dessus de l'Atlantique : à la verticale les
        // libellés se recouvraient, et au nord-est ils tombaient sur les noms
        // du Tchad et du Cameroun. Là, le golfe de Guinée est vide.
        const [labelX, labelY] = geodesicPoint(
          PLACES.douala.lon,
          PLACES.douala.lat,
          km,
          200,
        );
        const [, ringTopY] = project(
          PLACES.douala.lon,
          PLACES.douala.lat + km / 111.32,
        );
        // Longueur approchée du tracé, suffisante pour cadencer l'encrage.
        const len = 2 * Math.PI * Math.abs(dlaY - ringTopY);
        return (
          <g key={km}>
            <path
              d={geodesicRing(PLACES.douala.lon, PLACES.douala.lat, km)}
              fill="none"
              stroke="var(--color-orange)"
              strokeWidth={1.4 * s}
              strokeDasharray={len}
              opacity="0.8"
              style={
                {
                  "--ink-length": len,
                  animation: animate
                    ? `ink-stroke 1100ms var(--ease-ink) ${360 + i * 150}ms backwards`
                    : undefined,
                  strokeDashoffset: 0,
                } as React.CSSProperties
              }
            />
            <text
              x={labelX - 5 * s}
              y={labelY + 4 * s}
              textAnchor="end"
              fontSize={13 * s}
              fill="var(--color-ink)"
              style={{
                ...MEASURED_LETTERING,
                animation: animate
                  ? `ink-settle 400ms var(--ease-ink) ${900 + i * 150}ms backwards`
                  : undefined,
              }}
            >
              {km} km
            </text>
          </g>
        );
      })}

      {/* Noms de pays : lettrage de carte, condensé. */}
      <g
        fill="var(--color-blue-abyss)"
        fontSize={15 * s}
        style={{
          ...SHEET_LETTERING,
          animation: animate
            ? "ink-settle 500ms var(--ease-ink) 620ms backwards"
            : undefined,
        }}
      >
        {Object.entries(countryLabels).map(([code, label]) => {
          const anchor = COUNTRY_LABEL_ANCHOR[code];
          if (!anchor) return null;
          const [x, y] = project(anchor[0], anchor[1]);
          return (
            <text
              key={code}
              x={x}
              y={y}
              textAnchor="middle"
              /* Le Cameroun porte l'aplat le plus dense : son nom s'y réserve en
                 blanc. En encre sombre il tombait à 2,97:1. */
              fill={
                code === "CMR" ? "var(--color-paper)" : "var(--color-blue-abyss)"
              }
            >
              {label}
            </text>
          );
        })}
      </g>

      {/* Le marqueur : Douala se tamponne à l'arrivée du tracé. */}
      <g
        style={{
          transformOrigin: `${dlaX}px ${dlaY}px`,
          animation: animate
            ? "ink-stamp 460ms var(--ease-ink) 820ms backwards"
            : undefined,
        }}
      >
        <circle cx={dlaX} cy={dlaY} r={9 * s} fill="var(--color-orange)" />
        <circle cx={dlaX} cy={dlaY} r={3.5 * s} fill="var(--color-ink)" />
      </g>

      {/* Repères posés par l'appelant, sur ligne de rappel. */}
      <g
        style={
          animate
            ? { animation: "ink-settle 500ms var(--ease-ink) 980ms backwards" }
            : undefined
        }
      >
        {markers.map((m) => {
          const [x, y] = project(m.lon, m.lat);
          const dx = (m.dx ?? 26) * s;
          const dy = (m.dy ?? -26) * s;
          const run = (m.anchor === "end" ? -30 : 30) * s;
          return (
            <g key={m.id}>
              <path
                d={`M${x.toFixed(1)} ${y.toFixed(1)}L${(x + dx).toFixed(1)} ${(y + dy).toFixed(1)}h${run.toFixed(1)}`}
                fill="none"
                stroke="var(--color-ink)"
                strokeWidth={1.3 * s}
              />
              <circle cx={x} cy={y} r={3 * s} fill="var(--color-ink)" />
              {m.label && (
                <text
                  x={x + dx + run + (m.anchor === "end" ? -7 * s : 7 * s)}
                  y={y + dy + 5 * s}
                  textAnchor={m.anchor === "end" ? "end" : "start"}
                  fontSize={15 * s}
                  fill="var(--color-ink)"
                  style={SHEET_LETTERING}
                >
                  {m.label}
                </text>
              )}
            </g>
          );
        })}
      </g>
    </svg>
  );
}

/* Où poser le nom d'un pays, en degrés réels.

   À l'échelle du continent, le Gabon, le Congo et la Centrafrique sont trop
   petits pour porter leur nom sans écraser leurs voisins : une carte n'étiquette
   que ce qui tient, et ces trois-là se lisent dans le cartouche de légende. */
const COUNTRY_LABEL_ANCHOR: Record<string, [number, number]> = {
  CMR: [12.4, 5.6],
  TCD: [18.6, 15.4],
  COD: [23.5, -4.4],
  NGA: [7.0, 9.8],
};
