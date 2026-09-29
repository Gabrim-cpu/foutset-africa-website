"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { allExpertise } from "@/components/data/expertise";
import CtaButton from "@/components/ui/CtaButton";

/* Le formulaire compose une demande structurée et l'ouvre dans le client mail
   du visiteur. C'est volontairement sans serveur : il n'y a pas encore de
   service d'envoi choisi, et un formulaire qui fait semblant d'envoyer perd
   des demandes de devis en silence. Le jour où un endpoint existe, seule la
   fonction submit change. */

const EMAIL = "contact@foutsetafrica.com";

type Field = "name" | "email" | "site" | "message";

export default function ContactForm() {
  const t = useTranslations("contact");
  const tItems = useTranslations("expertiseItems");

  const [values, setValues] = useState<Record<Field, string>>({
    name: "",
    email: "",
    site: "",
    message: "",
  });
  const [need, setNeed] = useState("");
  const [errors, setErrors] = useState<Partial<Record<Field, string>>>({});

  const set = (field: Field) => (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setValues((prev) => ({ ...prev, [field]: event.target.value }));
    setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();

    const next: Partial<Record<Field, string>> = {};
    if (!values.name.trim()) next.name = t("errorRequired");
    if (!values.email.trim()) next.email = t("errorRequired");
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email))
      next.email = t("errorEmail");
    if (!values.message.trim()) next.message = t("errorRequired");

    setErrors(next);
    if (Object.keys(next).length > 0) return;

    const needLabel = need ? tItems(`${need}.title`) : t("formNeedNone");
    const subject = `${t("mailSubject")} — ${needLabel}`;
    const body = [
      `${t("formName")}: ${values.name}`,
      `${t("formEmail")}: ${values.email}`,
      `${t("formSite")}: ${values.site || "—"}`,
      `${t("formNeed")}: ${needLabel}`,
      "",
      values.message,
    ].join("\n");

    window.location.href = `mailto:${EMAIL}?subject=${encodeURIComponent(
      subject,
    )}&body=${encodeURIComponent(body)}`;
  }

  const fieldClass =
    "rounded-sheet mt-2 w-full border border-rule bg-paper px-3.5 py-2.5 text-[0.9375rem] text-ink transition-colors duration-200 placeholder:text-body hover:border-body focus:border-blue-deep focus:outline-none";

  return (
    <form onSubmit={handleSubmit} noValidate className="cartouche p-6 lg:p-8">
      <h2 className="text-[1.5rem]">{t("formTitle")}</h2>

      <div className="mt-7 grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="sheet-label">
            {t("formName")}
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            autoComplete="name"
            value={values.name}
            onChange={set("name")}
            placeholder={t("formNamePlaceholder")}
            aria-invalid={errors.name ? true : undefined}
            aria-describedby={errors.name ? "name-error" : undefined}
            className={`${fieldClass} ${errors.name ? "border-orange-deep" : ""}`}
          />
          {errors.name && (
            <p id="name-error" className="mt-1.5 text-[0.8125rem] text-orange-deep">
              {errors.name}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="email" className="sheet-label">
            {t("formEmail")}
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            autoComplete="email"
            value={values.email}
            onChange={set("email")}
            placeholder={t("formEmailPlaceholder")}
            aria-invalid={errors.email ? true : undefined}
            aria-describedby={errors.email ? "email-error" : undefined}
            className={`${fieldClass} ${errors.email ? "border-orange-deep" : ""}`}
          />
          {errors.email && (
            <p id="email-error" className="mt-1.5 text-[0.8125rem] text-orange-deep">
              {errors.email}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="site" className="sheet-label">
            {t("formSite")}
          </label>
          <input
            id="site"
            name="site"
            type="text"
            value={values.site}
            onChange={set("site")}
            placeholder={t("formSitePlaceholder")}
            className={fieldClass}
          />
        </div>

        <div>
          <label htmlFor="need" className="sheet-label">
            {t("formNeed")}
          </label>
          <select
            id="need"
            name="need"
            value={need}
            onChange={(event) => setNeed(event.target.value)}
            className={`${fieldClass} appearance-none bg-[length:14px] bg-[right_0.9rem_center] bg-no-repeat pr-10`}
            style={{
              backgroundImage:
                "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%234a5a68' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'><path d='M19 9l-7 7-7-7'/></svg>\")",
            }}
          >
            <option value="">{t("formNeedPlaceholder")}</option>
            {allExpertise.map((item) => (
              <option key={item.id} value={item.id}>
                {tItems(`${item.id}.title`)}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="mt-5">
        <label htmlFor="message" className="sheet-label">
          {t("formMessage")}
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          required
          value={values.message}
          onChange={set("message")}
          placeholder={t("formMessagePlaceholder")}
          aria-invalid={errors.message ? true : undefined}
          aria-describedby={errors.message ? "message-error" : undefined}
          className={`${fieldClass} resize-y ${errors.message ? "border-orange-deep" : ""}`}
        />
        {errors.message && (
          <p id="message-error" className="mt-1.5 text-[0.8125rem] text-orange-deep">
            {errors.message}
          </p>
        )}
      </div>

      <CtaButton tone="orange" className="mt-7 w-full">
        {t("formSubmit")}
      </CtaButton>

      <p className="mt-4 text-[0.8125rem]">{t("formNote")}</p>
    </form>
  );
}
