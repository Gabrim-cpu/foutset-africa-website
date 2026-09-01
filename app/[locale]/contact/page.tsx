import { getTranslations } from "next-intl/server";

export async function generateMetadata() {
  const t = await getTranslations("contact");
  return { title: t("title") };
}

export default async function ContactPage() {
  const t = await getTranslations("contact");

  return (
    <section className="bg-white pt-32 pb-20 lg:pt-40">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mb-16 text-center">
          <h1 className="text-3xl text-[#1A1A1A] sm:text-4xl">
            {t("title")}
          </h1>
          <p className="mt-4 text-lg text-[#555555] max-w-2xl mx-auto">
            {t("subtitle")}
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
          <div className="space-y-8">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-[#F0F7FF] flex items-center justify-center text-[#2A78C0] flex-shrink-0">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <div>
                <h3 className="text-[#1A1A1A]">{t("addressLabel")}</h3>
                <p className="text-[#555555]">{t("addressValue")}</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-[#F0F7FF] flex items-center justify-center text-[#2A78C0] flex-shrink-0">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <div>
                <h3 className="text-[#1A1A1A]">{t("emailLabel")}</h3>
                <p className="text-[#555555]">contact@foutsetafrica.com</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-[#F0F7FF] flex items-center justify-center text-[#2A78C0] flex-shrink-0">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </div>
              <div>
                <h3 className="text-[#1A1A1A]">{t("phoneLabel")}</h3>
                <p className="text-[#555555]">+237 6 00 00 00 00</p>
              </div>
            </div>
          </div>

          <form className="space-y-6">
            <div>
              <input
                type="text"
                className="w-full rounded-lg border border-[#E5E5E5] px-4 py-3 transition-all focus:border-[#2A78C0] focus:outline-none focus:ring-1 focus:ring-[#2A78C0]"
                placeholder={t("formName")}
              />
            </div>
            <div>
              <input
                type="email"
                className="w-full rounded-lg border border-[#E5E5E5] px-4 py-3 transition-all focus:border-[#2A78C0] focus:outline-none focus:ring-1 focus:ring-[#2A78C0]"
                placeholder={t("formEmail")}
              />
            </div>
            <div>
              <textarea
                rows={4}
                className="w-full rounded-lg border border-[#E5E5E5] px-4 py-3 transition-all focus:border-[#2A78C0] focus:outline-none focus:ring-1 focus:ring-[#2A78C0]"
                placeholder={t("formMessage")}
              />
            </div>
            <button
              type="submit"
              className="w-full rounded-full bg-[#F07818] px-8 py-3.5 text-sm font-semibold uppercase tracking-wide text-white transition-all hover:bg-[#c9640f]"
            >
              {t("formSubmit")}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
