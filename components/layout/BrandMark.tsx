"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { usePathname } from "@/i18n/navigation";

// How long the wordmark holds before swapping to the logo.
const HOLD_MS = 700;

export default function BrandMark() {
  const pathname = usePathname();
  const isHomepage = pathname === "/";
  const [showWordmark, setShowWordmark] = useState(isHomepage);

  useEffect(() => {
    if (!isHomepage) return;

    const timer = setTimeout(() => setShowWordmark(false), HOLD_MS);
    return () => clearTimeout(timer);
    // Only ever run once, on first mount.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <span className="relative flex h-9 items-center">
      <motion.span
        aria-hidden
        className="pointer-events-none absolute left-0 flex items-baseline gap-1.5 whitespace-nowrap text-lg font-bold tracking-tight"
        initial={{ opacity: 0, y: 8 }}
        animate={showWordmark ? { opacity: 1, y: 0 } : { opacity: 0, y: -8 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
      >
        <span className="text-blue">FOUTSET</span>
        <span className="text-orange">AFRICA</span>
      </motion.span>

      <motion.span
        className="flex items-center"
        initial={{ opacity: isHomepage ? 0 : 1, y: isHomepage ? 8 : 0 }}
        animate={showWordmark ? { opacity: 0, y: 8 } : { opacity: 1, y: 0 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
      >
        <Image
          src="/logo.png"
          alt="FOUTSET AFRICA"
          width={540}
          height={207}
          priority
          className="h-9 w-auto"
        />
      </motion.span>
    </span>
  );
}
