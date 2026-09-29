/* Un bloc de squelette. Décoratif : l'annonce « chargement » se fait une
   seule fois, par le conteneur qui porte role="status". */

export default function Skeleton({
  className = "",
  tone = "sheet",
}: {
  className?: string;
  /** `ink` sur les fonds bleu abysse (hero, pied). */
  tone?: "sheet" | "ink";
}) {
  return (
    <div
      aria-hidden
      className={`skeleton ${tone === "ink" ? "skeleton-ink" : ""} ${className}`}
    />
  );
}
