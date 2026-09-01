import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Merriweather, Lora, Plus_Jakarta_Sans } from "next/font/google";
import { routing } from "@/i18n/routing";
import "../globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

const merriweather = Merriweather({
  subsets: ["latin"],
  weight: ["700"],
  variable: "--font-merriweather",
  display: "swap",
});

const lora = Lora({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-lora",
  display: "swap",
});

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-plus-jakarta-sans",
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
      className={`${merriweather.variable} ${lora.variable} ${plusJakartaSans.variable}`}
    >
      <body className="antialiased">
        <NextIntlClientProvider>
          <Header />
          {children}
          <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
