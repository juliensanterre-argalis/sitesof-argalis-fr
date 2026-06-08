### **Cahier des Charges : Mini-site Catalogue de Formations**

#### **0. Résumé du Projet**

L'objectif est de développer un mini-site web sous la forme d'une **Single Page Application (SPA)**, contenu dans un unique fichier `index.html`. Ce site présentera le catalogue de formations d'un organisme. Le contenu du site (informations sur l'organisme, liste et détail des formations) sera entièrement piloté par deux fichiers JSON locaux. L'interface utilisateur sera construite en utilisant les composants de la bibliothèque **Shadcn/ui** et stylisée avec **Tailwind CSS**.

#### **1. Architecture Technique & Structure des Fichiers**

Le projet doit être contenu dans un répertoire unique avec la structure suivante :

```
/repertoire-client/
├── index.html          # Le point d'entrée unique de l'application.
├── script.js           # Le code JavaScript pour la logique applicative.
├── style.css           # La feuille de style (générée par Tailwind CSS).
├── organism.json       # Données de configuration de l'organisme de formation.
└── export_formation.json # Le fichier contenant tous les produits de formation.
```

*   **`index.html`** : Contient la structure de base (le "shell") avec des conteneurs vides pour les différentes vues (catalogue et fiche produit). Il doit inclure le fichier `style.css` et `script.js`.
*   **`script.js`** : Ce script sera responsable de :
    1.  Charger les données des deux fichiers JSON au démarrage.
    2.  Injecter dynamiquement les informations de l'organisme (logo, couleur, nom).
    3.  Transformer et nettoyer les données brutes des formations.
    4.  Générer et afficher la vue "Catalogue".
    5.  Gérer la navigation entre la vue "Catalogue" et la vue "Fiche Produit" (sans rechargement de page).
    6.  Gérer la logique de filtrage du catalogue.
*   **`organism.json`** et **`export_formation.json`** : Sont les sources de données uniques pour l'application.

#### **2. Structure des Données et Correspondances**

Le fichier `export_formation.json` contient les données brutes des formations. Le script `script.js` devra effectuer une **transformation (mapping)** pour chaque formation afin de correspondre à la structure attendue par le front-end.

##### **a) `organism.json`**

```json
{
  "nomOrganisme": "Nom de l'Organisme de Formation",
  "logoUrl": "./assets/logo.png",
  "couleurPrincipale": "#DC2626",
  "telephone": "01 23 45 67 89",
  "email": "contact@organisme.fr",
  "adresse": "123 Rue de la Formation, 75001 Paris"
}
```

##### **b) `export_formation.json` : Pré-filtrage et Mapping des champs**

**Pré-filtrage obligatoire :**

Avant tout traitement, le système doit filtrer les formations selon deux critères obligatoires :

| Champ JSON | Type | Condition | Description |
|------------|------|-----------|-------------|
| `actif` | Boolean | `=== true` | Le produit doit être au statut actif |
| `publication_site_web` | Boolean | `=== true` | Le produit doit être marqué pour publication sur le site internet |

**Règle de filtrage :** Seules les formations qui ont **les deux champs à `true`** doivent être affichées sur le site vitrine. Les autres formations sont exclues du catalogue.

**Mapping des champs :**

Voici la correspondance entre les champs du JSON source et les champs que le code devra utiliser.

```json
// Structure cible que le JavaScript devra construire à partir de votre JSON
[
  {
    "id": "PRO-000001",              // <-- reference
    "titre": "Sauveteur Secouriste du Travail Initiale", // <-- libelle
    "categorie": "Santé sécurité au Travail", // <-- produit_secteur
    "duree_heures": "14h",           // <-- duree_heure
    "prix": {
      "apprenant": "450",            // <-- prix_apprenant
      "groupe": "1800"               // <-- prix_groupe
    },
    "reference": "SST-I",            // <-- code_produit
    "objectifs": [                   // <-- objectif_formation (chaîne à découper par '\n')
      "Mettre en application ses compétences...",
      "Etre capable d’intervenir efficacement..."
    ],
    "publicConcerne": "Tout le personnel", // <-- public_vise
    "prerequis": [                   // <-- prerequis (chaîne à découper par '|')
      "Etre Acteur SST",
      "Aucun" // --> Sera affiché tel quel
    ],
    "modalites": {
      "deroulement": "La formation se déroule selon...", // <-- deroulement_formation
      "methodes_et_moyens": "Méthode:\nDémonstration... \nMoyen:\nPlan d’intervention...", // <-- methode_mobilisation
    },
    "accessibiliteHandicap": "Formation accessible aux publics...", // <-- acces_handi
    "programme": "<table><tbody>...",   // <-- programme (contient du HTML à interpréter)
    "evaluation": [                  // <-- controle_connaissance (chaîne à découper par '|')
        "Epreuve certificative n°1...",
        "Epreuve certificative n°2..."
    ],
    "avis": {
      "intervenant": 81,             // <-- satisfaction_intervenant (chaîne "81 %" à parser)
      "pedagogie": 78,               // <-- satisfaction_pedagogie
      "contenu": 77,                 // <-- satisfaction_contenu
      "objectifs": 79                // <-- satisfaction_obj
    },
    "resultats": {
      "participation": 38,           // <-- taux_presence
      "reussite": 100                // <-- reussite
    },
    "certification": {
      "estCertifiante": true,        // <-- formation_certifiante ("Oui" / "Non")
      "url": "https://www.francecompetences.fr/recherche/rs/715/" // <-- url
    }
  }
]
```

---

#### **3. Description Détaillée des Vues et de leurs Composants**

##### **Vue 1 : Catalogue des Formations**

*   **Zone de Filtres** : Boutons de filtre basés sur le champ `categorie` (`produit_secteur`).
*   **La Carte Formation (miniature)** : Chaque carte cliquable doit afficher les informations suivantes provenant du JSON mappé :
    *   **Titre** : `titre` (`libelle`)
    *   **Catégorie** : `categorie` (`produit_secteur`) sous forme de `<Badge>`.
    *   **Durée** : `duree_heures` (`duree_heure`).
    *   **Prix** :
        *   Si `prix.apprenant` est renseigné (non `null`), afficher une ligne : "Par apprenant : {prix.apprenant} € HT".
        *   Si `prix.groupe` est renseigné (non `null`), afficher une ligne : "Par groupe : {prix.groupe} € HT".
        *   Si les deux sont `null`, afficher "Nous consulter".
    *   Un bouton `<Button>` avec le texte "Voir les détails".

##### **Vue 2 : Fiche Produit de Formation**

*   **Layout Général** :
    *   Un bouton `<Button variant="outline">` "← Retour au catalogue" est visible en haut de la page.
    *   La page est divisée en **deux colonnes asymétriques** (`grid grid-cols-1 lg:grid-cols-3 gap-8`).
        *   **Colonne principale (gauche)** : `lg:col-span-2`. Contient la description détaillée.
        *   **Colonne latérale (droite)** : `lg:col-span-1`. Contient le bloc d'actions "sticky".

*   **Colonne Latérale Droite (Sticky)**
    *   **Composant racine** : Un `<Card>` avec une position `sticky` (`top-8`).
    *   **Contenu de la carte d'action** :
        *   "Référence : **{reference}**" (`code_produit`)
        *   "Durée : **{duree_heures}**" (`duree_heure`)
        *   "Prix :" suivi de la même logique d'affichage que pour la carte catalogue (affiche les deux prix si disponibles, un seul, ou "Nous consulter").

*   **Colonne Principale Gauche (Contenu détaillé)**
    *   Cette colonne est une succession verticale de composants `<Card>`, chacun espacé des autres.

    1.  **Carte "Objectifs"** : Afficher le tableau `objectifs` (`objectif_formation` découpé) sous forme de liste `<ul>`.
    2.  **Carte "À qui s'adresse la formation ?"** :
        *   Public concerné : Afficher `publicConcerne` (`public_vise`).
        *   Prérequis : **Toujours afficher le sous-titre "Prérequis"**. Afficher le tableau `prerequis` (`prerequis` découpé) en liste `<ul>`. Si le champ est "Aucun", la liste contiendra simplement l'élément "Aucun".
    3.  **Carte "Modalités"** :
        *   Déroulement : `modalites.deroulement` (`deroulement_formation`).
        *   Méthodes et Moyens : `modalites.methodes_et_moyens` (`methode_mobilisation`). **Afficher le contenu en respectant les sauts de ligne**.
    4.  **Carte "Accessibilité"** : Afficher `accessibiliteHandicap` (`acces_handi`).
    5.  **Carte "Programme"** : **Injecter et rendre le contenu HTML** du champ `programme`. Le style de ce contenu (police, taille, couleur) doit hériter du style global de la page pour une intégration harmonieuse. Les balises HTML (tableaux, listes, paragraphes) doivent être interprétées, mais le style visuel doit être cohérent avec le reste du site.
    6.  **Carte "Contrôle des connaissances"** : Afficher le tableau `evaluation` (`controle_connaissance` découpé) sous forme de liste `<ul>`.
    7.  **Carte "Avis"** : Afficher les 4 indicateurs `avis.intervenant`, `avis.pedagogie`, etc. en pourcentage.
    8.  **Carte "Résultats"** : Afficher `resultats.participation` et `resultats.reussite` en pourcentage.
    9.  **Carte "Formation certifiante"** :
        *   Afficher "Oui" ou "Non" basé sur `certification.estCertifiante`.
        *   Si `certification.url` est une URL valide, afficher un bouton `<Button variant="outline">` "Voir la fiche France Compétences" qui ouvre ce lien dans un **nouvel onglet** (`target="_blank"`).

#### **4. Composants Shadcn/ui à Utiliser**

*   **Layout & Cartes** : `Card`, `CardHeader`, `CardTitle`, `CardContent`, `CardFooter`.
*   **Boutons** : `Button` (utiliser les variantes `default`, `secondary`, `outline`).
*   **Étiquettes** : `Badge`.
*   **Séparation** : `Separator` (pour diviser les sections si nécessaire).

#### **5. Logique de Fonctionnement (JavaScript)**

1.  **Initialisation (`init`)** :
    *   Utiliser `fetch()` pour charger `organism.json` et `export_formation.json`.
    *   Stocker les données dans des variables.
    *   Appeler une fonction de **`mapAndCleanData(formations)`** avant de faire le rendu.
    *   Injecter la `couleurPrincipale` dans le document en tant que variable CSS `:root` pour une thématisation facile.

2.  **Pré-traitement des données (Étape cruciale)**
    *   Juste après le `fetch()`, le script devra d'abord **filtrer** les formations selon les critères de publication.
    *   **Filtrage obligatoire :**
        *   Ne conserver que les formations où `actif === true`
        *   ET où `publication_site_web === true`
        *   Les formations ne respectant pas ces deux critères ne doivent jamais apparaître sur le site
    *   Ensuite, le script devra **nettoyer et structurer** les données pour chaque formation en suivant le mapping de la section 2.
    *   **Actions à prévoir :**
        *   **Découper les chaînes en tableaux** pour `objectif_formation` (sur le caractère `\n`) et `prerequis`, `controle_connaissance` (sur le caractère `|`).
        *   **Parser les pourcentages** des champs `satisfaction_*`, `taux_presence` et `reussite` pour extraire uniquement la valeur numérique.
        *   **Convertir `formation_certifiante`** ("Oui"/"Non") en valeur booléenne (`true`/`false`).
        *   **Important :** Le script devra injecter du **contenu HTML brut** dans le DOM pour les champs comme `programme`, par exemple en utilisant la propriété `innerHTML`. Il devra s'assurer que le style par défaut (inline CSS potentiellement présent dans le HTML) est supprimé ou surchargé par le CSS global du site.

3.  **Gestion des Vues et Rendu** :
    *   Créer deux conteneurs principaux : `<div id="catalogue-view"></div>` et `<div id="produit-view" class="hidden"></div>`.
    *   La navigation consistera à jouer avec la classe `hidden` de Tailwind sur ces deux conteneurs.
    *   **`renderCatalogue(formations)`** : Boucle sur le tableau de formations nettoyées et génère le HTML pour chaque carte. Ajoute des `event listeners` sur chaque carte.
    *   **`renderFicheProduit(formationId)`** : Trouve la formation par son ID et génère le HTML détaillé pour la fiche produit.

#### **6. Gestion des Valeurs Manquantes (Fallback)**

Le système doit gérer intelligemment les valeurs manquantes ou `null` dans les données JSON. Aucune valeur "null" ne doit jamais être affichée à l'utilisateur final.

##### **Fonction de nettoyage**

Une fonction `cleanValue(value, defaultValue)` doit être implémentée pour :
- Détecter les valeurs `null`, `undefined`, `"null"`, `"NULL"`
- Retourner automatiquement la valeur par défaut appropriée
- S'appliquer à tous les champs des formations

##### **Valeurs par défaut**

| Champ | Valeur de remplacement |
|-------|------------------------|
| `reference` | "N/A" |
| `libelle` | "Formation sans titre" |
| `produit_secteur` | "Autres formations" |
| `duree_heure` | "Non spécifiée" |
| `prix_apprenant` / `prix_groupe` | Afficher "Nous consulter" si les deux sont null |
| `code_produit` | "N/A" |
| `public_vise` | "Tout public" |
| `prerequis` | ["Aucun"] |
| `objectif_formation` | Afficher "Objectifs non spécifiés" |
| `deroulement_formation` | "Information non disponible" |
| `methode_mobilisation` | "Information non disponible" |
| `acces_handi` | "Merci de nous contacter pour plus d'informations sur l'accessibilité" |
| `programme` | "<p>Programme non disponible</p>" |
| `controle_connaissance` | Afficher "Information non disponible" |
| `satisfaction_*`, `taux_presence`, `reussite` | 0% |
| `url` | "" (vide, ne pas afficher le bouton) |

##### **Comportement dans l'interface**

- Les cartes avec des listes vides doivent afficher un message informatif
- Les champs texte vides doivent afficher un message par défaut
- Les badges de catégorie doivent toujours afficher une valeur (jamais "null")
- Les boutons conditionnels (comme le lien France Compétences) ne doivent s'afficher que si l'URL est valide

#### **7. Fonctionnalité de Recherche**

Le catalogue doit inclure une barre de recherche puissante permettant de filtrer les formations.

##### **Caractéristiques de la recherche**

- **Position** : En haut de la page catalogue, dans un encadré avec la couleur principale
- **Style** : Grande barre avec icône de recherche, fond aplat (sans dégradé)
- **Comportement** : Recherche en temps réel (à chaque frappe)
- **Méthode** : Utilise la fonction "contient" (pas seulement le début des mots)
- **Combinaison** : Peut être combinée avec les filtres de catégorie

##### **Champs de recherche**

La recherche doit s'effectuer dans les champs suivants :
1. Titre de la formation (`libelle`)
2. Catégorie (`produit_secteur`)
3. Référence/Code produit (`code_produit`)
4. Objectifs (`objectif_formation`)
5. Public concerné (`public_vise`)
6. Prérequis (`prerequis`)
7. Programme (contenu HTML complet)
8. Modalités (déroulement et méthodes)
9. Évaluation/Contrôle des connaissances

##### **Interface de recherche**

- Afficher le nombre de résultats trouvés
- Bouton d'effacement (X) qui apparaît quand une recherche est active
- Focus automatique maintenu pendant la saisie
- Pas de halo bleu du navigateur (outline: none)

#### **8. Livrables Attendus**

Un répertoire fonctionnel contenant les fichiers `index.html`, `script.js`, `style.css`, et les deux fichiers `json` d'exemple. Le site doit être responsive et reproduire fidèlement la structure et la présentation des données décrites ci-dessus, en utilisant les données réelles du fichier `export_formation.json`.

Le système doit gérer intelligemment toutes les valeurs manquantes et offrir une expérience utilisateur cohérente même avec des données incomplètes.