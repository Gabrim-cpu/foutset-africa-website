import { useId } from "react";

export function FrenchFlag({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 3 2"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
    >
      <rect width="3" height="2" fill="#FFFFFF" />
      <rect width="1" height="2" fill="#002395" />
      <rect x="2" width="1" height="2" fill="#ED2939" />
    </svg>
  );
}

export function BritishFlag({ className }: { className?: string }) {
  const id = useId();
  const clipId = `${id}-clip`;
  const diagonalClipId = `${id}-diagonal-clip`;

  return (
    <svg
      className={className}
      viewBox="0 0 60 30"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
    >
      <clipPath id={clipId}>
        <path d="M0,0 v30 h60 v-30 z" />
      </clipPath>
      <clipPath id={diagonalClipId}>
        <path d="M30,15 h30 v15 z v15 h-30 z h-30 v-15 z v-15 h30 z" />
      </clipPath>
      <g clipPath={`url(#${clipId})`}>
        <path d="M0,0 v30 h60 v-30 z" fill="#012169" />
        <path d="M0,0 L60,30 M60,0 L0,30" stroke="#fff" strokeWidth="6" />
        <path
          d="M0,0 L60,30 M60,0 L0,30"
          clipPath={`url(#${diagonalClipId})`}
          stroke="#C8102E"
          strokeWidth="4"
        />
        <path d="M30,0 v30 M0,15 h60" stroke="#fff" strokeWidth="10" />
        <path d="M30,0 v30 M0,15 h60" stroke="#C8102E" strokeWidth="6" />
      </g>
    </svg>
  );
}
