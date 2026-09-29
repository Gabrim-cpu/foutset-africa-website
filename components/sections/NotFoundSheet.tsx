import { getLocale, getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { allExpertise } from "@/components/data/expertise";
import CoverageSheet from "@/components/map/CoverageSheet";
import LegendSymbol from "@/components/map/LegendSymbol";
import LeaderLink from "@/components/ui/LeaderLink";
import RegistrationMarks from "@/components/map/RegistrationMarks";
import { PLACES, project } from "@/components/map/geography";

/* La feuille 404 : hors couverture.

   Une adresse qui ne mène nulle part, en cartographie, a un lieu : Null
   Island, 0° N 0° E, en pleine mer dans le golfe de Guinée. C'est là que
   tombent les coordonnées vides. Pour une maison de Douala, le point est à
   1 175 km réels — sur la même feuille que le reste du site.

   Tout est vrai : la projection, la distance, la position. Rien n'est
   inventé pour faire joli.

   Le seul geste : viser « Rétablir la liaison » (survol ou clavier) rétablit
   le signal — les barres se remplissent, et un arc orange repart de Null
   Island vers Douala. Pur CSS, via :has() sur la feuille ; sans lui, la page
   reste entière. */

/** Le point de chute des coordonnées vides. */
const NULL_ISLAND = { lon: 0, lat: 0 };

/** Distance orthodromique réelle, en km. */
function haversineKm(lon1: number, lat1: number, lon2: number, lat2: number) {
  const r = Math.PI / 180;
  const a =
    Math.sin(((lat2 - lat1) * r) / 2) ** 2 +
    Math.cos(lat1 * r) * Math.cos(lat2 * r) * Math.sin(((lon2 - lon1) * r) / 2) ** 2;
  return 2 * 6371 * Math.asin(Math.sqrt(a));
}

/* Cadrage : du Sénégal méridional au Congo, assez large pour que la côte
   situe le point, assez serré pour que l'île vide se voie. */
const [VX0, VY0] = project(-7, 12.5);
const [VX1, VY1] = project(19, -6.5);
const VIEWBOX = `${VX0.toFixed(1)} ${VY0.toFixed(1)} ${(VX1 - VX0).toFixed(1)} ${(VY1 - VY0).toFixed(1)}`;

export default async function NotFoundSheet() {
  const t = await getTranslations("notFound");
  const tMap = await getTranslations("map");
  const tItems = await getTranslations("expertiseItems");
  const locale = await getLocale();

  const distance = new Intl.NumberFormat(locale).format(
    Math.round(
      haversineKm(PLACES.douala.lon, PLACES.douala.lat, NULL_ISLAND.lon, NULL_ISLAND.lat),
    ),
  );

  const [nx, ny] = project(NULL_ISLAND.lon, NULL_ISLAND.lat);
  const [dx, dy] = project(PLACES.douala.lon, PLACES.douala.lat);
  // L'arc de retour se bombe vers le large, comme une liaison et non un trait.
  const cx = (nx + dx) / 2 - (dy - ny) * 0.35;
  const cy = (ny + dy) / 2 - (dx - nx) * 0.35;
  const relinkLength = Math.hypot(dx - nx, dy - ny) * 1.25;
  const unit = (VX1 - VX0) / 100; // 1 % de la largeur de la feuille

  return (
    <section className="lost-signal graticule relative isolate min-h-svh overflow-hidden border-b border-rule bg-sheet">
      <title>{t("metaTitle")}</title>

      <div className="mx-auto grid max-w-[92rem] gap-12 px-6 pt-32 pb-20 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] lg:items-center lg:gap-16 lg:px-10 lg:pt-36 xl:px-16">
        <div>
          <p className="sheet-label flex items-center gap-3">
            <span aria-hidden className="h-[2px] w-8 shrink-0 bg-orange" />
            {t("eyebrow")}
          </p>

          {/* Le code se lit comme une coordonnée : le zéro est le point visé. */}
          <p
            aria-hidden
            className="font-display mt-6 flex items-center text-[clamp(6rem,19vw,13.5rem)] leading-[0.8] font-semibold tracking-[-0.05em] text-blue-abyss select-none"
          >
            4
            <svg viewBox="0 0 100 100" className="sonar mx-[0.04em] h-[0.78em] w-[0.78em] shrink-0">
              <circle cx="50" cy="50" r="46" fill="none" stroke="currentColor" strokeWidth="7" />
              <circle cx="50" cy="50" r="30" fill="none" stroke="var(--color-blue)" strokeWidth="1.2" opacity="0.5" />
              <circle cx="50" cy="50" r="15" fill="none" stroke="var(--color-blue)" strokeWidth="1.2" opacity="0.5" />
              <path d="M50 8V92M8 50H92" stroke="var(--color-blue)" strokeWidth="1.2" opacity="0.4" />
              <g className="sonar-sweep">
                <path d="M50 50L50 5A45 45 0 0 1 88.97 27.5Z" fill="url(#sonar-fade)" />
                <path d="M50 50L50 5" stroke="var(--color-orange)" strokeWidth="2" strokeLinecap="round" />
              </g>
              <circle cx="50" cy="50" r="5" fill="var(--color-orange)" />
              <defs>
                <linearGradient id="sonar-fade" x1="0.5" y1="0" x2="1" y2="0.6">
                  <stop offset="0" stopColor="var(--color-orange)" stopOpacity="0.55" />
                  <stop offset="1" stopColor="var(--color-orange)" stopOpacity="0" />
                </linearGradient>
              </defs>
            </svg>
            4
          </p>

          <h1 className="mt-8 max-w-[16ch] text-[clamp(2rem,4.4vw,3.5rem)]">{t("title")}</h1>
          <p className="mt-5 max-w-[54ch] text-[1.0625rem]">{t("body")}</p>

          {/* Le relevé du signal : ce qui change quand on vise le retour. */}
          <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-3 border-y border-rule py-3.5">
            <p className="flex items-center gap-3">
              <span aria-hidden className="signal-bars flex h-4 items-end gap-[3px]">
                {[40, 60, 80, 100].map((h) => (
                  <span key={h} className="w-[4px] rounded-[1px]" style={{ height: `${h}%` }} />
                ))}
              </span>
              <span className="sheet-label">
                {t("signalLabel")} :{" "}
                <span className="signal-lost text-orange-deep">{t("signalLost")}</span>
                <span className="signal-back text-blue-deep">{t("signalBack")}</span>
              </span>
            </p>
            <p className="measured text-ink">0°00′00″N · 0°00′00″E</p>
          </div>

          <div className="mt-9 flex flex-wrap items-center gap-x-10 gap-y-5">
            <LeaderLink href="/" direction="left" emphasis className="relink-trigger">
              {t("home")}
            </LeaderLink>
            <LeaderLink href="/contact">{t("quote")}</LeaderLink>
          </div>

          <nav aria-label={t("relaysLabel")} className="mt-10">
            <p className="sheet-label">{t("relaysLabel")}</p>
            <ul className="mt-3 flex flex-wrap gap-2">
              {allExpertise.map((item) => (
                <li key={item.id}>
                  <Link
                    href={`/expertises/${item.id}`}
                    className="rounded-sheet group inline-flex items-center gap-2.5 border border-rule bg-paper px-3.5 py-2 text-[0.9375rem] font-semibold text-ink no-underline transition-colors duration-200 hover:border-ink"
                  >
                    <LegendSymbol
                      icon={item.icon}
                      className="h-3 w-6 shrink-0 text-blue-deep transition-colors duration-200 group-hover:text-orange-deep"
                    />
                    {tItems(`${item.id}.title`)}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <figure className="m-0">
          <div className="cartouche relative overflow-hidden p-3">
            <RegistrationMarks />
            <div className="relative">
              <CoverageSheet
                viewBox={VIEWBOX}
                countryLabels={{ CMR: tMap("cameroun"), NGA: tMap("nigeria") }}
                textScale={0.42}
                animate
                title={t("mapTitle")}
                className="block h-auto w-full bg-blue-wash/40"
              />

              {/* La surcouche : même fenêtre, même cadrage que la feuille. */}
              <svg viewBox={VIEWBOX} aria-hidden className="absolute inset-0 h-full w-full">
                {/* La liaison perdue : un pointillé qui ne va pas au bout. */}
                <path
                  d={`M${dx} ${dy}L${nx + (dx - nx) * 0.22} ${ny + (dy - ny) * 0.22}`}
                  fill="none"
                  stroke="var(--color-ink)"
                  strokeWidth={unit * 0.28}
                  strokeDasharray={`${unit * 1.1} ${unit * 0.9}`}
                  opacity="0.55"
                />

                {/* La liaison rétablie, tracée au geste. */}
                <path
                  className="relink-arc"
                  d={`M${nx} ${ny}Q${cx} ${cy} ${dx} ${dy}`}
                  fill="none"
                  stroke="var(--color-orange)"
                  strokeWidth={unit * 0.55}
                  strokeLinecap="round"
                  strokeDasharray={relinkLength}
                  style={{ "--relink-length": relinkLength } as React.CSSProperties}
                />

                {/* Null Island : les échos du sonar, puis le point. */}
                {[0, 1, 2].map((i) => (
                  <circle
                    key={i}
                    className="sonar-ping"
                    cx={nx}
                    cy={ny}
                    r={unit * 9}
                    fill="none"
                    stroke="var(--color-orange)"
                    strokeWidth={unit * 0.3}
                    style={{ animationDelay: `${i * 800}ms` }}
                  />
                ))}
                <circle cx={nx} cy={ny} r={unit * 1.4} fill="var(--color-orange)" />
                <circle cx={nx} cy={ny} r={unit * 0.55} fill="var(--color-ink)" />
                <path
                  d={`M${nx} ${ny}l${unit * 5} ${unit * 5}h${unit * 6}`}
                  fill="none"
                  stroke="var(--color-ink)"
                  strokeWidth={unit * 0.22}
                />
                <text
                  x={nx + unit * 12}
                  y={ny + unit * 6}
                  fontSize={unit * 2.6}
                  fill="var(--color-ink)"
                  style={{
                    fontFamily: "var(--font-sans)",
                    fontWeight: 700,
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                  }}
                >
                  {t("mapPoint")}
                </text>
                <text
                  x={nx + unit * 12}
                  y={ny + unit * 9.4}
                  fontSize={unit * 2.2}
                  fill="var(--color-body)"
                  style={{ fontFamily: "var(--font-data)", fontVariantNumeric: "tabular-nums" }}
                >
                  0°N 0°E
                </text>
              </svg>
            </div>
          </div>
          <figcaption className="sheet-label mt-3">{t("mapCaption", { distance })}</figcaption>
        </figure>
      </div>
    </section>
  );
}
