import { notFound } from "next/navigation";

/* Toute adresse qui ne correspond à aucune page atterrit ici, sous le layout
   de la langue — bandeau, pied et traductions compris — puis part sur la
   feuille 404 de [locale]/not-found.tsx. */

export default function CatchAll() {
  notFound();
}
