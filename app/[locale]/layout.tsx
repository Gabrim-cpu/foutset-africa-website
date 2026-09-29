import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { JetBrains_Mono, Manrope, Sora } from "next/font/google";
import { GoogleAnalytics } from "@next/third-parties/google";
import { routing } from "@/i18n/routing";
import "../globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import SheetDefs from "@/components/map/SheetDefs";
import ScrollManager from "@/components/layout/ScrollManager";

/* L'identifiant de mesure GA4 (G-XXXXXXXXXX) vit en variable d'environnement,
   jamais en dur : pas le même compte en développement et en production, et le
   dépôt ne doit pas porter l'identifiant du client. Sans elle, le script ne
   se charge simplement pas — le build ne casse pas en son absence. */
const GA_ID = process.env.NEXT_PUBLIC_GA_ID;

// Sora porte les titres : une géométrique ronde et dense, de la même famille
// de dessin que le lettrage du logo.
const sora = Sora({
  subsets: ["latin"],
  variable: "--font-sora",
  display: "swap",
});

// Manrope porte le texte courant : ouverte, très lisible en petit corps.
const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap",
});

// Réservé aux valeurs réellement mesurées : bandes, débits, distances.
const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "metadata" });

  return {
    title: {
      default: t("title"),
      template: `%s | ${t("title")}`,
    },
    description: t("description"),
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);

  return (
    <html
      lang={locale}
      data-scroll-behavior="smooth"
      className={`${sora.variable} ${manrope.variable} ${jetbrainsMono.variable}`}
    >
      <body className="antialiased">
        <NextIntlClientProvider>
          {/* La géométrie du continent, définie une fois pour toute la page. */}
          <SheetDefs />
          <ScrollManager />
          <Header />
          {children}
          <Footer />
        </NextIntlClientProvider>
        {GA_ID && <GoogleAnalytics gaId={GA_ID} />}
      </body>
    </html>
  );
}
