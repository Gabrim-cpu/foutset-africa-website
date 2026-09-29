# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Utilisateur principal : **un client direct qui a un besoin technique précis et
veut un devis.** Entreprises, ONG, institutions et professionnels au Cameroun
et en Afrique centrale qui cherchent une liaison VSAT, une installation
solaire, une formation technique ou de la fourniture d'équipement.

Situation : la personne arrive avec un problème concret (un site à connecter,
un site à alimenter, une équipe à former, du matériel à faire venir) et cherche
un prestataire capable de le traiter localement. Elle évalue vite, souvent
depuis un mobile, et souvent sur une connexion inégale.

Job à accomplir : comprendre en quelques secondes si FOUTSET AFRICA couvre son
besoin exact, puis entrer en contact pour obtenir un devis.

Audiences secondaires (non prioritaires) : opérateurs télécoms et intégrateurs
IT cités dans les textes existants, et fournisseurs internationaux côté
import/export.

## Product Purpose

FOUTSET AFRICA SARL déploie et maintient des infrastructures télécoms, réseau
et énergie en Afrique centrale, et forme les équipes locales à les exploiter.

Le site est un outil de **conversion commerciale** : il doit transformer un
besoin technique en prise de contact qualifiée. Le succès se mesure au nombre
de demandes de devis pertinentes, pas au temps passé sur la page.

## Positioning

Chaîne complète sous un seul interlocuteur : étude, déploiement,
approvisionnement du matériel, **et** transfert de compétences aux équipes
locales. Un intégrateur pur ne forme pas ; un organisme de formation ne déploie
pas ; un importateur ne fait ni l'un ni l'autre. Le mot d'ordre issu des textes
existants : « Connecter. Construire. Transformer. »

Second différenciateur factuel : capacité satellitaire réelle là où la fibre et
l'hertzien terrestre ne vont pas (backhaul GSM par satellite, VSAT bandes C, Ku,
Ka, DTH). C'est une réponse à une contrainte géographique précise, pas une
promesse générique.

## Operating Context

- Marché : Cameroun (siège à Douala) et Afrique centrale, couverture nationale
  et sous-régionale.
- Interventions en environnement contraint : zones enclavées, sites isolés,
  alimentation électrique non garantie.
- Site bilingue français / anglais (next-intl), le français est la langue
  source et la langue par défaut.
- Consultation majoritairement mobile, bande passante variable : le poids des
  pages et le temps de premier rendu sont des contraintes produit, pas
  seulement techniques.

## Capabilities and Constraints

Cinq domaines d'expertise, chacun avec sa page de détail :

1. **Réseaux & Télécom** — VSAT bandes C/Ku/Ka (SCPC ou TDM/TDMA, jusqu'à
   200 Mbps, contention ajustable jusqu'à 1:20 après bilan de liaison),
   diffusion TV DTH (SDTV/HDTV/UHDTV), backhaul GSM par satellite, stations de
   base GSM/3G/4G LTE, faisceaux hertziens, optimisation RF, drive testing,
   KPI, VoIP, LAN/WLAN, infrastructures serveurs, pylônes et mâts clé en main,
   alarme, protection foudre, CCTV.
2. **Énergie** — solaire photovoltaïque, solutions hybrides, secours
   électrique, maintenance préventive et curative, audits et dimensionnement.
3. **Formation** — installation, mise en service et maintenance VSAT, solaire
   PV et infrastructures réseau ; théorie + pratique terrain ; transfert de
   compétences aux équipes locales.
4. **Import/Export** — approvisionnement, import/export et acheminement de
   matériel technique jusqu'au site, contrôle qualité avant livraison, réseau
   de fournisseurs internationaux.

Contraintes techniques :

- Toute chaîne visible par l'utilisateur passe par `messages/fr.json` et
  `messages/en.json`. Jamais de texte codé en dur dans un composant.
- Les deux couleurs du logo — bleu `#2A78C0` et orange `#F07818` — sont une
  contrainte de marque absolue, y compris en cas de refonte visuelle complète.
- Structure de pages à préserver : accueil, 5 pages d'expertise
  (`/expertises/[slug]`), page contact.

Décisions produit explicitement ouvertes :

- Adresse e-mail et numéro de téléphone réels à confirmer (le footer et la page
  contact les affichent aujourd'hui).
- Statut des mentions **ISO / QSE** affichées dans le footer : à confirmer s'il
  s'agit de certifications obtenues, de démarches en cours, ou de standards
  simplement suivis. Tant que ce n'est pas confirmé, elles ne doivent pas être
  présentées comme des certifications acquises.
- Pages « Nos Engagements » et « Actualités » : décidées **retirées** de la
  navigation faute de contenu. À réintroduire seulement quand le contenu
  existera.

## Brand Commitments

Contraignant (confirmé par le client) :

- Nom : FOUTSET AFRICA SARL.
- **Logo affiché tel quel** : `public/logo.png` (Assets/brand/logo.jpg, marge blanche retirée, pixels intacts), sans retraitement,
  sans version monochrome, sans déclinaison. Le wordmark se lit en deux
  moitiés, « FOUTSET » en bleu et « AFRICA » en orange.
- **Couleurs de marque, non négociables** : bleu `#2A78C0`, orange `#F07818`.

Explicitement libéré (le client a donné carte blanche) : l'accroche
« Connecter. Construire. Transformer. », la structure des sections, la mise en
page des textes techniques. Ce sont de la matière, plus des engagements.

Voix, observée dans les textes existants et à préserver comme registre :
technique, précise, sobre — des spécifications chiffrées plutôt que des
superlatifs. Chaque page d'expertise porte aujourd'hui un verbe d'action propre
(CONNECTER, ALIMENTER, TRANSMETTRE, ACCOMPAGNER, APPROVISIONNER) ; le procédé
est réutilisable, pas obligatoire.

Rejets explicites du client — quatre registres qui feraient dire « ce n'est pas
nous », même bien exécutés :

1. Startup / tech générique (dégradés violets, glassmorphisme, 3D flottante,
   ton « we're on a mission »).
2. Institutionnel froid et sans vie (gris administratif, distant, inerte).
3. Surchargé et gadget (animation partout, page lourde — injouable sur une
   connexion faible).
4. Sombre « agence créa » (fond noir intégral, typo démesurée, effets de
   curseur, illisible pour qui cherche un devis).

## Evidence on Hand

**FOUTSET AFRICA est une entreprise nouvelle.** Elle n'a pas encore
d'antécédents publiables.

Ce qui existe réellement :

- Le logo (`public/logo.png` (Assets/brand/logo.jpg, marge blanche retirée, pixels intacts)).
- Un document interne recensant l'ensemble des services FOUTSET, que le client
  s'est engagé à fournir. À déposer dans le dépôt ; il devient la source de
  contenu de référence dès qu'il est là.
- Une photographie de site télécom : parabole, pylône, panneaux solaires
  (`public/images/telecom-site.jpg` ; variante large non utilisée dans
  `Assets/photos/telecom-site-wide.jpg`).
- La vidéo de vision (globe de nuit, liaisons sur l'Afrique) :
  `public/video/hero.webm` / `hero.mp4`, encodées depuis
  `Assets/video/hero-video-original.mp4`.
- Le siège : Douala, Cameroun.
- Le catalogue technique détaillé ci-dessus, y compris des spécifications
  précises et vérifiables (bandes, débits, taux de contention, normes).

Ce qui **n'existe pas** et ne doit jamais être fabriqué : nombre de projets
livrés, nombre de clients, logos de clients, témoignages, études de cas,
chiffres d'affaires, effectifs, années d'expérience, notes ou récompenses,
implantations autres que Douala, partenariats nommés.

La crédibilité doit donc être construite sur la **précision technique et la
clarté de l'offre**, pas sur la preuve sociale.

## Product Principles

1. **Le devis est la finalité.** Chaque page doit rendre la prise de contact
   évidente et contextualisée par le besoin qui a amené le visiteur.
2. **La spécificité tient lieu de preuve.** Une entreprise nouvelle gagne sa
   crédibilité en montrant qu'elle maîtrise le détail technique, pas en
   affichant un palmarès qu'elle n'a pas.
3. **Ne rien inventer.** Aucun chiffre, logo client, témoignage ou antécédent
   qui n'ait été fourni. Un espace vide est préférable à une preuve fausse.
4. **Cinq expertises, une seule maison.** L'offre doit se lire comme une chaîne
   continue, jamais comme cinq activités juxtaposées.
5. **Le terrain d'abord.** Mobile, connexion faible, lecture rapide : la
   performance et la lisibilité sont des exigences produit.

## Accessibility & Inclusion

Aucune norme contractuelle n'a été établie à ce jour. Contraintes réelles
retenues comme exigences de base : lisibilité sur petit écran, contrastes
suffisants en plein soleil, et pages légères sur connexion lente.
