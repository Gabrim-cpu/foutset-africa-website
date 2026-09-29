import { Link } from "@/i18n/navigation";

/* Le bouton d'appel, avec ses liaisons.

   Trois filets partent du bord droit du bouton comme des câbles vers des
   relais, et une impulsion de lumière les parcourt à tour de rôle : le même
   geste que le site raconte avec ses liaisons satellite. Le bouton lui-même est
   une pastille à bord fin ; au survol, une lueur monte depuis son bord haut.

   Aucun JavaScript : l'impulsion est un dégradé animé en SMIL, donc ce
   composant reste côté serveur. Sous md, ou si le visiteur demande moins
   d'animation, les filets disparaissent et il ne reste que la pastille — les
   filets déborderaient de l'écran étroit, et le texte passe avant l'effet.

   Le bouton fait 56 px (h-14) et les filets sont tracés dans un cadre de 160 px
   centré sur lui : les départs, à 64, 80 et 96, tombent sur son bord droit.

   La pastille est orange, texte blanc : la couleur du site doit ressortir
   dès le premier écran (demande du client). L'orange vif de la marque était
   trop criard en aplat plein écran ; au repos la pastille prend l'orange
   foncé, plus sourd, et s'éclaircit vers l'orange vif au survol. */

const W = 320;
const H = 160;

const BEAMS = [
  {
    path: "M0 64H60C65.5 64 70 59.5 70 54V22C70 16.5 74.5 12 80 12H240",
    end: [240, 12],
    begin: "0s",
  },
  {
    path: "M0 80H300",
    end: [300, 80],
    begin: "0.9s",
  },
  {
    path: "M0 96H90C95.5 96 100 100.5 100 106V138C100 143.5 104.5 148 110 148H200",
    end: [200, 148],
    begin: "1.8s",
  },
] as const;

const DUR = "3.6s";

export default function PulseBeamsCta({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <div className="relative inline-block">
      <svg
        aria-hidden
        width={W}
        height={H}
        viewBox={`0 0 ${W} ${H}`}
        fill="none"
        className="pointer-events-none absolute top-1/2 left-full hidden -translate-y-1/2 md:block motion-reduce:hidden"
      >
        <defs>
          {BEAMS.map((beam, i) => (
            <linearGradient
              key={i}
              id={`cta-beam-${i}`}
              gradientUnits="userSpaceOnUse"
              x1="-120"
              x2="-20"
              y1="0"
              y2="0"
            >
              <stop offset="0%" stopColor="var(--color-blue-bright)" stopOpacity="0" />
              <stop offset="35%" stopColor="var(--color-blue-bright)" />
              <stop offset="70%" stopColor="var(--color-paper)" />
              <stop offset="100%" stopColor="var(--color-orange)" stopOpacity="0" />
              <animate
                attributeName="x1"
                values="-120;340;340"
                keyTimes="0;0.6;1"
                dur={DUR}
                begin={beam.begin}
                repeatCount="indefinite"
              />
              <animate
                attributeName="x2"
                values="-20;440;440"
                keyTimes="0;0.6;1"
                dur={DUR}
                begin={beam.begin}
                repeatCount="indefinite"
              />
            </linearGradient>
          ))}
        </defs>

        {BEAMS.map((beam, i) => (
          <g key={i} transform={`translate(0 0)`}>
            <path d={beam.path} stroke="var(--color-blue-tint)" strokeOpacity="0.28" />
            <path
              d={beam.path}
              stroke={`url(#cta-beam-${i})`}
              strokeWidth="2"
              strokeLinecap="round"
            />
            <circle
              cx={beam.end[0]}
              cy={beam.end[1]}
              r="5"
              fill="var(--color-blue-abyss)"
              stroke="var(--color-blue-tint)"
              strokeOpacity="0.6"
            />
          </g>
        ))}
      </svg>

      <Link
        href={href}
        className="group relative block h-14 rounded-full bg-paper/25 p-px no-underline shadow-2xl shadow-black/40 transition-colors duration-300 hover:bg-orange"
      >
        <span className="absolute inset-0 overflow-hidden rounded-full">
          <span className="absolute inset-0 rounded-full bg-[radial-gradient(75%_100%_at_50%_0%,color-mix(in_srgb,var(--color-blue-bright)_65%,transparent)_0%,transparent_75%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
        </span>
        <span className="relative z-10 flex h-full items-center gap-4 rounded-full bg-orange-deep px-8 font-display text-[1.0625rem] font-semibold tracking-[-0.01em] whitespace-nowrap text-paper ring-1 ring-paper/10 transition-colors duration-300 group-hover:bg-orange">
          {children}
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-5 w-5 shrink-0 transition-transform duration-200 group-hover:translate-x-1"
            aria-hidden
          >
            <path d="M9 5l7 7-7 7" />
          </svg>
        </span>
      </Link>
    </div>
  );
}
