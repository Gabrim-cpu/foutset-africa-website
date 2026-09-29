"use client";

import Image, { type ImageProps } from "next/image";
import { useState } from "react";

/* Une image `fill` qui tient sa place en squelette tant qu'elle n'est pas
   décodée, puis s'encre en fondu. Le parent fixe les dimensions (aspect-*),
   comme pour tout `next/image` en `fill`.

   Le squelette est retiré une fois l'image arrivée : un balayage qui continue
   sous une photo opaque repeint pour rien. */

export default function SkeletonImage({
  alt,
  className = "",
  onLoad,
  ...props
}: ImageProps) {
  const [loaded, setLoaded] = useState(false);

  return (
    <>
      {!loaded && <div aria-hidden className="skeleton absolute inset-0 rounded-none" />}
      <Image
        {...props}
        alt={alt}
        onLoad={(event) => {
          setLoaded(true);
          onLoad?.(event);
        }}
        className={`transition-opacity duration-500 ${loaded ? "opacity-100" : "opacity-0"} ${className}`}
      />
    </>
  );
}
