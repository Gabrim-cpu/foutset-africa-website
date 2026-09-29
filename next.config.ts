import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./i18n/request.ts");

const nextConfig: NextConfig = {
  devIndicators: false,
  // Le cache disque de Turbopack corrompt les classes Tailwind au rechargement à chaud (erreur 500 sur le CSS).
  experimental: { turbopackFileSystemCacheForDev: false },
};

export default withNextIntl(nextConfig);
