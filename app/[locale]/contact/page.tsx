import { getTranslations } from "next-intl/server";
import CoverageSheet from "@/components/map/CoverageSheet";
import ContactForm from "@/components/sections/ContactForm";
import VideoHero from "@/components/sections/VideoHero";
import { PLACES } from "@/components/map/geography";
import RegistrationMarks from "@/components/map/RegistrationMarks";

/* Le numéro de téléphone qui figurait ici (+237 6 00 00 00 00) était un
   gabarit, pas une ligne. Il est retiré : un faux numéro sur une page de
   contact coûte plus qu'un numéro absent. Il reviendra quand le vrai sera
   fourni. */

const EMAIL = "contact@foutsetafrica.com";

export async function generateMetadata() {
  const t = await getTranslations("contact");
  /* Le h1 est une question ; un titre d'onglet ne l'est pas. */
  return { title: t("metaTitle"), description: t("metaDescription") };
}

export default async function ContactPage() {
  const t = await getTranslations("contact");
  const tMap = await getTranslations("map");

  return (
    <section className="bg-sheet">
      {/* L'ouverture sur la vidéo de l'accueil, titre au centre, comme les
          expertises (voir VideoHero). */}
      <VideoHero>
        <h1 className="max-w-[18ch] text-paper">{t("title")}</h1>
        <p className="mt-6 max-w-[62ch] text-[1.125rem] text-blue-wash">
          {t("subtitle")}
        </p>
      </VideoHero>

      <div className="mx-auto max-w-[92rem] px-6 py-16 lg:px-10 lg:py-20 xl:px-16">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,24rem)_minmax(0,1fr)] lg:gap-16">
          <div>
            <p className="sheet-label">{t("sheetLabel")}</p>

            <dl className="mt-4 border-t border-rule">
              <div className="border-b border-rule py-4">
                <dt className="text-[0.8125rem] text-body">
                  {t("addressLabel")}
                </dt>
                <dd className="mt-1 text-[1.0625rem] text-ink">
                  {t("addressValue")}
                </dd>
              </div>
              <div className="border-b border-rule py-4">
                <dt className="text-[0.8125rem] text-body">
                  {t("emailLabel")}
                </dt>
                <dd className="mt-1 text-[1.0625rem]">
                  <a href={`mailto:${EMAIL}`} className="text-ink">
                    {EMAIL}
                  </a>
                </dd>
              </div>
            </dl>

            {/* La feuille rappelle où FOUTSET intervient : utile quand on se
                demande si son site est dans la zone. */}
            <figure className="m-0 mt-10">
              <div className="cartouche relative p-3">
                <RegistrationMarks />
                <CoverageSheet
                  rings={[500, 1000, 1500]}
                  markers={[
                    {
                      id: "douala",
                      lon: PLACES.douala.lon,
                      lat: PLACES.douala.lat,
                      label: PLACES.douala.label,
                      dx: 40,
                      dy: 46,
                    },
                  ]}
                  textScale={2.4}
                  title={tMap("sheetTitle")}
                  className="block h-auto w-full"
                />
              </div>
              <figcaption className="sheet-label mt-3">
                {t("mapCaption")}
              </figcaption>
            </figure>
          </div>

          <ContactForm />
        </div>
      </div>
    </section>
  );
}
