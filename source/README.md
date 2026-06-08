# Mini-site Catalogue de Formations - Architecture Multi-Clients

## 📋 Description

Mini-site web sous forme de Single Page Application (SPA) présentant un catalogue de formations. Le site utilise **Tailwind CSS** pour le style et s'inspire des composants **Shadcn/ui** pour l'interface utilisateur.

**🎯 Architecture Multi-Clients** : Ce projet utilise une architecture centralisée permettant de gérer facilement des centaines de sites clients avec un code source commun. La création des répertoires clients est automatisée par un service externe connecté au CRM.

## 🏗️ Structure du Projet

```
/
├── source/                         # 📦 Fichiers source communs à tous les clients
│   ├── index.html                  #   Point d'entrée unique de l'application
│   ├── script.js                   #   Logique applicative JavaScript
│   ├── filters-functions.js        #   Logique des filtres avancés
│   ├── range-slider.js             #   Composant de double slider personnalisé
│   ├── style.css                   #   Feuille de style avec Tailwind CSS
│   ├── send-email.php              #   Backend pour l'envoi des formulaires via Mailgun
│   ├── composer.json               #   Configuration PHP
│   ├── fictive-data.js             #   Données fictives pour démo
│   ├── mailgun-templates/          #   Templates HTML pour Mailgun
│   ├── CDC.md                      #   Cahier des charges
│   └── README.md                   #   Ce fichier (documentation)
│
├── dummy/                          # 🔧 Template de base
│   └── index.html                  #   Fichier HTML qui référence les sources
│
└── sites-clients/                  # 👥 Répertoires des clients (créés automatiquement)
    ├── client-A/                   #   Exemple client A (pour tests)
    │   ├── index.html              #   Copie de dummy/index.html
    │   ├── organism.json           #   Configuration spécifique au client
    │   ├── export_formation.json   #   Formations du client
    │   └── export_session.json     #   Sessions du client
    ├── client-B/                   #   Exemple client B (pour tests)
    ├── client-C/                   #   Exemple client C (pour tests)
    └── client-D/                   #   Exemple client D (pour tests)
```

**Note** : Le projet est déployé sur un serveur PHP via SFTP. Les répertoires clients sont créés automatiquement par le service externe connecté au CRM.

## 🚀 Démarrage Rapide

### Prérequis
- Un navigateur web moderne
- Un serveur web local (Python, Node.js, ou autre)

### Lancement

#### Pour tester un site client spécifique

**Option 1 : Avec Python 3**
```bash
cd sites-clients/client-A
python3 -m http.server 8000
```

**Option 2 : Avec Node.js (http-server)**
```bash
cd sites-clients/client-A
npx http-server -p 8000
```

**Option 3 : Avec PHP**
```bash
cd sites-clients/client-A
php -S localhost:8000
```

Puis ouvrez votre navigateur à l'adresse : **http://localhost:8000**

> **Note** : Remplacez `client-A` par le nom du client que vous souhaitez tester (client-B, client-C, client-D, etc.)

## 🏛️ Architecture Multi-Clients

### Principe de fonctionnement

L'architecture repose sur 3 composants principaux :

#### 1. **Répertoire `source/`** - Code source commun
Tous les fichiers communs (HTML, CSS, JS, PHP) sont centralisés ici. **Une modification dans ce répertoire s'applique automatiquement à tous les sites clients.**

#### 2. **Répertoire `dummy/`** - Template de base
Contient le fichier `index.html` template qui :
- Charge les ressources CSS/JS depuis `source/` (chemins relatifs `../source/`)
- Contient la structure HTML de base
- Sera copié par le service externe dans chaque répertoire client

#### 3. **Répertoire `sites-clients/`** - Sites des clients
Chaque client possède son propre sous-répertoire contenant **4 fichiers** :
- **`index.html`** : Copie du fichier `dummy/index.html` (créé par le service externe)
- **`organism.json`** : Configuration du client (nom, logo, couleurs, contacts)
- **`export_formation.json`** : Catalogue de formations du client
- **`export_session.json`** : Sessions de formation du client

### Flux de chargement

Quand un visiteur accède au site d'un client :

```
1. Le navigateur charge : sites-clients/client-A/index.html
   ↓
2. Ce fichier charge les ressources depuis source/ :
   - ../source/style.css
   - ../source/script.js
   - ../source/filters-functions.js
   - ../source/range-slider.js
   - ../source/fictive-data.js
   ↓
3. Le script.js charge les données JSON locales :
   - ./organism.json
   - ./export_formation.json
   - ./export_session.json
   ↓
4. La page s'affiche avec le code commun + les données du client
```

### Avantages

✅ **Centralisation** : Une seule modification dans `source/` met à jour tous les clients
✅ **Personnalisation** : Chaque client a ses propres données (JSON)
✅ **Scalabilité** : Facile de gérer des centaines de clients
✅ **Maintenance** : Aucune duplication de code
✅ **Automatisation** : La création des clients est gérée par le service externe

## 🤖 Création Automatique des Clients

**Important** : La création des répertoires clients est entièrement automatisée par un **service externe** connecté au CRM.

### Rôle du service externe

Le service externe se charge de :

1. **Créer le répertoire** : `sites-clients/[nom-client]/`
2. **Copier le template** : Copier `dummy/index.html` vers `sites-clients/[nom-client]/index.html`
3. **Générer les fichiers JSON** depuis le CRM :
   - `organism.json` - Informations du client (nom, logo, couleur, contacts)
   - `export_formation.json` - Catalogue de formations
   - `export_session.json` - Sessions de formation

### Structure créée automatiquement

```
sites-clients/nouveau-client/
├── index.html              # Copié depuis dummy/index.html
├── organism.json           # Généré depuis le CRM
├── export_formation.json   # Généré depuis le CRM
└── export_session.json     # Généré depuis le CRM
```

## 🔄 Mise à Jour des Sites

### Mettre à jour tous les clients simultanément

Pour faire évoluer tous les sites clients, il suffit de modifier les fichiers dans `source/` :

- **`source/index.html`** - Structure HTML
- **`source/script.js`** - Logique JavaScript
- **`source/style.css`** - Styles CSS
- **`source/send-email.php`** - Backend email
- **`source/filters-functions.js`** - Fonctions de filtrage
- **`source/range-slider.js`** - Composant slider
- **`source/mailgun-templates/`** - Templates email

**Les modifications sont immédiatement appliquées à tous les clients** car ils référencent tous les mêmes fichiers source.

### Mettre à jour un client spécifique

Pour personnaliser un client, le service externe met à jour ses fichiers JSON :
- `organism.json` - Modifier nom, logo, couleur, contacts
- `export_formation.json` - Ajouter/modifier formations
- `export_session.json` - Ajouter/modifier sessions

## 🌐 Déploiement en Production

### Configuration Requise

**Serveur PHP** :
- PHP 7.4 ou supérieur (recommandé : PHP 8.1+)
- Extensions requises : `mbstring`, `curl`, `json`
- Accès SFTP pour le déploiement

**Service d'envoi d'emails** :
- Compte Mailgun (ou service compatible)
- Clé API et domaine configurés

### Étapes de Déploiement

1. **Configurer Mailgun dans `send-email.php`** :
   ```php
   $MAILGUN_API_KEY = 'votre_clé_api_mailgun';
   $MAILGUN_DOMAIN = 'mg.votredomaine.com';
   ```

2. **Configurer les emails dans `organism.json`** :
   ```json
   {
     "email": "contact@votredomaine.fr",           // Email public (affiché sur le site)
     "emailDestination": "reception@votredomaine.fr" // Email de réception des formulaires (privé)
   }
   ```

3. **Transférer les fichiers via SFTP** :
   - Tous les fichiers du projet
   - Vérifier que `composer.json` est présent (spécifie PHP 8.1)

4. **Tester les formulaires** :
   - Devis Particulier / Entreprise
   - Préinscription Particulier / Entreprise

### Configuration des Emails

Le fichier `organism.json` contient **deux adresses email distinctes** :

- **`email`** : Email public affiché dans le footer et sur la page de contact
- **`emailDestination`** : Email privé utilisé pour recevoir les formulaires (jamais visible sur le site)

Cette séparation permet :
- ✅ D'utiliser une boîte de réception dédiée pour les formulaires
- ✅ De protéger l'email de réception du spam
- ✅ De garder un email de contact public différent

## ✨ Fonctionnalités

### Navigation et Menu Hiérarchique

#### Menu Catalogue Intelligent
Le site intègre un **menu de navigation hiérarchique à 3 niveaux** qui s'adapte automatiquement au contenu disponible :

- **Niveau 1 - Secteurs** : Catégories principales (ex: "Santé sécurité au Travail", "Bureautique")
- **Niveau 2 - Familles** : Sous-catégories au sein d'un secteur (ex: "Secourisme", "Incendie")
- **Niveau 3 - Groupes** : Groupes spécifiques au sein d'une famille (ex: "INRS", "Bac à feu")

#### Comportement du Menu

**Affichage au survol** :
- Les sous-menus s'affichent automatiquement au survol (CSS pur, pas de JavaScript)
- Chaque niveau s'ouvre dans une fenêtre séparée à droite du niveau parent
- Tous les niveaux restent visibles pendant la navigation

**Positionnement intelligent** :
- Par défaut, les sous-menus s'ouvrent à **droite**
- Si l'espace est insuffisant, ils s'ouvrent automatiquement à **gauche** (flip automatique)
- Fonctionne sur tous les niveaux (familles et groupes)

**Fermeture** :
- Clic sur un élément : filtre le catalogue et ferme le menu
- Clic en dehors du menu : ferme tout
- Clic sur le bouton Catalogue : toggle du menu

#### Gestion des Cas Particuliers

**1. Produits sans hiérarchie complète** :
- Si un produit n'a pas de secteur/famille/groupe, il utilise "Non classé" comme valeur par défaut
- Combinaisons possibles : Secteur seul, Secteur + Famille, Secteur + Groupe, etc.

**2. Gestion intelligente des niveaux "Non classé"** ⭐ *NOUVEAU* :
Le menu évite d'afficher les niveaux "Non classé" inutiles pour une navigation plus propre :
- **Secteur "Non classé"** : N'apparaît jamais dans le menu
- **Secteur → Famille "Non classé"** : Le secteur devient un item terminal cliquable (sans sous-menu)
  - Exemple : "Formations privatives (visio)" → Clic direct, pas de sous-menu
- **Famille → Groupe "Non classé"** : La famille devient un item terminal cliquable (sans sous-menu)
  - Exemple : "Secteur > Famille valide" → Clic sur la famille, pas de sous-menu groupe
- **Groupes "Non classé"** : Filtrés automatiquement de la liste des groupes

Cette logique permet d'arrêter la hiérarchie au dernier niveau ayant un nom significatif, évitant ainsi des sous-menus vides ou non pertinents.

**3. Aucune hiérarchie significative** :
- Si aucun produit n'a de secteur/famille/groupe défini
- OU si tous les produits sont "Non classé" à tous les niveaux
- → Le **bouton Catalogue est automatiquement masqué**

**4. Aucun produit éligible** :
- Si aucune formation n'est publiée (`actif: true` ET `publication_site_web: true`)
- → Affichage d'un **message contextuel** avec icône

### Vue Catalogue
- **Recherche avancée** : Recherche dans le nom, compétences, programme, prérequis
- **Filtrage hiérarchique** : Via le menu Catalogue (Secteur > Famille > Groupe)
- **Filtres avancés** ⭐ : Système complet de filtrage multi-critères
- **Cartes de formation** ⭐ *AMÉLIORÉ* : 
  - Affichage compact avec titre, catégorie/groupe, durée et prix
  - **Référence PRO** affichée à droite du badge de catégorie
  - Badge de catégorie/groupe/famille justifié à gauche
  - Référence PRO (ex: PRO-000001) en petit à droite
- **Navigation fluide** : Cliquez sur une carte pour voir les détails
- **Messages contextuels** : Affichage adapté selon la situation (recherche, filtre, aucun produit)

### Système de Filtres Avancés ⭐ *NOUVEAU*

Le site intègre un système de filtrage avancé permettant de combiner plusieurs critères pour affiner la recherche de formations.

#### Panneau de Filtres

**Bouton "Filtres avancés"** :
- Affichage/masquage du panneau de filtres
- Badge indiquant le nombre de filtres actifs
- Position : sous la barre de recherche

**Organisation des filtres** :
1. **Catégories** (Hiérarchie en cascade)
2. **Autres critères** (Durée, Budget, Certification)

#### Filtres Hiérarchiques en Cascade

**Secteur → Famille → Groupe** :
- **Secteur** : Liste déroulante de tous les secteurs disponibles
- **Famille** : Apparaît uniquement après sélection d'un secteur
- **Groupe** : Apparaît uniquement après sélection d'une famille
- **Réinitialisation automatique** : Changer le secteur réinitialise famille et groupe
- **Inclusion complète** : Tous les secteurs sont inclus, même "Non classé"

#### Filtres par Sliders Dynamiques

**Durée** ⭐ *AMÉLIORÉ* :
- **Sélecteur de type** : Choisir entre "En heures" ou "En jours"
  - Par défaut : "En heures"
  - Changement dynamique : Le slider se met à jour automatiquement
- **Double slider** : Deux poignées pour définir min et max
- **Plage dynamique** : Calculée automatiquement selon les données
  - En heures : 0h à 35h (par exemple)
  - En jours : 0j à 5j (par exemple)
- **Glissement fluide** : Cliquez et glissez les poignées rouges
- **Affichage en temps réel** : Les valeurs min/max s'affichent sous le slider avec la bonne unité (h ou j)
- **Badge de filtre actif** : Affiche "DURÉE: 0J - 3J" ou "DURÉE: 0H - 35H" selon le type sélectionné
- **Labels** : Min et max affichés en dessous du slider

**Budget** :
- **Type de tarif** : Sélection "Par apprenant" ou "Par groupe"
- **Double slider adaptatif** : La plage s'adapte au type de tarif sélectionné
- **Label dynamique** : Affiche "Budget (par apprenant)" ou "Budget (par groupe)"
- **Plage dynamique** : Calculée selon les prix disponibles dans les données

**Certification** :
- **Liste déroulante** : Toutes / Certifiantes / Non certifiantes

#### Badges de Filtres Actifs

**Affichage** :
- **Position** : Entre le bouton "Filtres avancés" et le panneau de filtres
- **Chips grises** : Un badge par filtre actif
- **Croix de suppression** : Cliquez pour retirer un filtre spécifique
- **Mise à jour dynamique** : Apparaissent/disparaissent instantanément

**Contenu des badges** :
- **Secteur** : "Secteur: [Nom]"
- **Famille** : "Famille: [Nom]"
- **Groupe** : "Groupe: [Nom]"
- **Durée** ⭐ *AMÉLIORÉ* : "Durée: [min]h - [max]h" ou "Durée: [min]j - [max]j" selon le type sélectionné
- **Type de tarif** : "Tarif: Par [apprenant/groupe]"
- **Budget** : "Budget: [min]€ - [max]€"
- **Certification** : "Certifiante" ou "Non certifiante"

#### Bouton "Réinitialiser les filtres"

**Affichage conditionnel** :
- Apparaît uniquement si au moins un filtre est actif
- Position : En bas à droite du panneau de filtres
- Icône de réinitialisation + texte

**Action** :
- Réinitialise tous les filtres à leurs valeurs par défaut
- Supprime tous les badges
- Masque le bouton automatiquement

#### Message "Aucune formation disponible"

Lorsque les filtres ne retournent aucun résultat :
- **Icône triste** : Indication visuelle
- **Titre** : "Aucune formation disponible"
- **Message** : "Aucune formation ne correspond aux critères sélectionnés."
- **Bouton d'action** ⭐ *NOUVEAU* : "Effacer les filtres" (gros bouton rouge)

#### Caractéristiques Techniques

**Performance** :
- **Mise à jour partielle** : Seule la grille de formations est re-rendue, pas les filtres
- **Pas de flash** : Transitions fluides sans rechargement de page
- **Événements optimisés** : Les sliders ne se recréent pas à chaque changement

**Sliders personnalisés** :
- **Composant RangeSlider** : Classe JavaScript réutilisable
- **Couleur principale** : Utilise automatiquement la couleur du site
- **Effets visuels** : Agrandissement au survol (scale 1.1) et au clic (scale 1.2)
- **Curseur interactif** : `grab` au repos, `grabbing` pendant le déplacement
- **Zone colorée** : La partie entre les deux poignées est colorée en rouge

**Fichiers** :
- `range-slider.js` : Composant de double slider personnalisé
- `filters-functions.js` : Logique complète des filtres avancés
- `script.js` : Intégration et rendu de l'interface

### Vue Fiche Produit

#### Fil d'Ariane (Breadcrumbs)
- **Hiérarchie intelligente** : Affichage automatique de Secteur > Famille > Groupe
- **Affichage conditionnel** : Seuls les niveaux présents sont affichés
- **Dernier niveau en couleur** : Le niveau actuel est mis en évidence

#### Blocs d'Information
Les fiches produit affichent les blocs suivants dans l'ordre :

1. **Objectifs** : Liste des objectifs pédagogiques
2. **À qui s'adresse la formation ?** : Public concerné et prérequis
3. **Modalités** : Déroulement et méthodes pédagogiques
4. **Accessibilité** : Informations sur l'accessibilité handicap
5. **Compétences développées** ⭐ *NOUVEAU* : Liste des compétences acquises (séparées par `|`)
6. **Programme** : Contenu détaillé avec support HTML
7. **Contrôle des connaissances** : Modalités d'évaluation
8. **Maintien des connaissances** ⭐ *NOUVEAU* : Durée de validité et recyclage recommandé
9. **Avis et Résultats** ⭐ *AMÉLIORÉ* : Satisfaction des participants et taux de réussite (fusionnés)
   - **Affichage conditionnel** : Le bloc entier est masqué si aucune donnée n'est disponible
   - **Affichage "n/a"** : Les valeurs manquantes affichent "n/a" en gris au lieu de "0%"
   - **Sections indépendantes** : Les avis et résultats s'affichent indépendamment selon les données disponibles
   - **Détection intelligente** : Masque les données à `null`, `undefined`, `0`, `"0"`, ou chaînes vides
   - **Lien vers indicateurs** ⭐ *NOUVEAU* : Lien cliquable "nos indicateurs de qualité" ouvrant une page dédiée
10. **Formation certifiante** : Information sur la certification avec lien France Compétences

#### Page Indicateurs de Qualité ⭐ *NOUVEAU*

Une page dédiée accessible depuis le bloc "Avis et Résultats" présentant les moyennes des 6 indicateurs calculées sur l'ensemble des formations.

**Accès** :
- Lien cliquable sur "nos indicateurs de qualité" (en rouge) dans le bloc Avis
- Disponible uniquement si au moins un avis est affiché

**Contenu** :
- **Titre principal** : "Des indicateurs pour juger de la qualité de nos formations"
- **Introduction** : Présentation de la démarche qualité avec le nom de l'organisme
- **Section explicative** : "Quels sont ces indicateurs ? Et que signifient-ils ?"
  - Explication des 4 indicateurs de satisfaction (objectifs, contenu, pédagogie, intervenant)
  - Explication des 2 indicateurs de résultats (participation, réussite)
  - Mention explicite : "Les valeurs présentées correspondent à **la moyenne de l'ensemble des sessions réalisées** pour chacune de nos formations"

**Affichage des 6 indicateurs** :

1. **Indicateurs de satisfaction** (4) :
   - Fond avec couleur primaire à 5% d'opacité
   - Icône SVG wireframe (cercle avec coche)
   - Grille responsive de 4 cartes blanches
   - Chaque carte affiche : pourcentage en grand + titre

2. **Indicateurs de résultats** (2) :
   - Fond avec couleur primaire à 5% d'opacité
   - Icône SVG wireframe (graphique en barres)
   - Grille responsive de 2 cartes blanches
   - Chaque carte affiche : pourcentage en grand + titre

**Calcul des moyennes** ⭐ *IMPORTANT* :
- Pour chaque indicateur : moyenne calculée sur **toutes les formations**
- **Exclusion des valeurs nulles** : Seules les valeurs strictement positives (> 0) sont prises en compte
- **Valeurs exclues** : 0, null, undefined, valeurs absentes
- **Arrondi** : Les moyennes sont arrondies à l'entier le plus proche
- **Fonction** : `calculerMoyenne(formations, extracteur)` filtre et calcule automatiquement

**Date de mise à jour** :
- Affichée en bas à droite après les indicateurs
- Format : "Données mises à jour au [date]"
- Date calculée automatiquement : **veille du jour actuel**
- Style : Petit texte en italique, gris

**Navigation** :
- **Bouton retour en haut** : "Retour à la formation" (discret)
- **Bouton d'action en bas** : "Retour à la fiche formation" (gros bouton primaire)
- Retour automatique à la formation d'origine

**Personnalisation** :
- Le nom de l'organisme est inséré dynamiquement depuis `organism.json`
- Texte en gras pour les mots-clés importants
- Design cohérent avec la charte graphique du site

#### Design des Cartes
- **Bordure gauche colorée** : 4px en couleur primaire
- **Header avec fond plat** : Couleur primaire à 5% d'opacité
- **Icône badge** : Icône thématique dans un carré coloré
- **Contraste automatique** : Calcul WCAG pour déterminer si le texte doit être blanc ou noir

#### Sidebar Sticky ⭐ *AMÉLIORÉ*

**Bloc Informations** :
- **Référence PRO** : Référence produit (ex: PRO-000001) toujours affichée
- **Code produit** : Code court (ex: SST-I) affiché uniquement s'il existe dans les données
- **Grille adaptative** : 
  - 3 colonnes (Référence + Code + Durée) si code présent
  - 2 colonnes (Référence + Durée) si code absent
- **Durée complète** : Affiche "14h (2j)" quand les deux valeurs sont disponibles
- **Prix détaillés** : Par apprenant et par groupe avec labels clairs
- **Toujours visible** : Reste en haut lors du scroll
- **Bouton d'action** : "Demander un devis" avec icône

**Bloc Prochaines Sessions** ⭐ *NOUVEAU* :
- **Affichage conditionnel** : Visible uniquement si des sessions futures existent pour ce produit
- **Nombre de sessions** : Affiche jusqu'à 3 prochaines sessions par ordre chronologique
- **Informations par session** :
  - **Date** : Format long avec première lettre en majuscule (ex: "Jeudi 13 novembre 2025")
  - **Lieu** : Ville + code postal ou "À déterminer"
  - **Modalité** : Présentiel, Distanciel, etc.
- **Cartes cliquables** : Clic sur une session → Ouvre le détail de la session
- **Effet hover** : Bordure rouge + ombre portée
- **Bouton "Voir toutes les sessions"** :
  - Positionné en bas du bloc
  - Redirige vers le calendrier avec filtre pré-appliqué sur le produit
  - Recherche automatique par titre du produit
- **Design cohérent** : Même style que le bloc Informations (header rouge, fond dégradé)
- **Position** : Suit le scroll avec le bloc Informations (conteneur sticky commun)

### Messages d'État

Le site affiche des messages contextuels adaptés à chaque situation :

**Aucune formation disponible** :
- 📝 **Avec recherche active** : "Aucune formation ne correspond à votre recherche '[terme]'. Essayez avec d'autres mots-clés."
- 🏷️ **Avec filtre hiérarchique** : "Aucune formation n'est disponible dans cette catégorie pour le moment."
- 🚫 **Sans filtre** : "Aucune formation n'est disponible pour le moment. Revenez plus tard pour découvrir nos nouvelles offres de formation."

Chaque message inclut :
- Une icône visuelle
- Un titre clair
- Un texte explicatif
- Un bouton "Voir toutes les formations" (si un filtre est actif)

## 📅 Gestion des Sessions de Formation ⭐ *NOUVEAU*

Le site intègre un système de gestion des sessions de formation avec des dates et lieux précis.

### Fichier Source

Les sessions sont chargées depuis `export_session.json` à la racine du projet.

### Règles de Filtrage Métier

Pour qu'une session soit affichée, elle doit respecter **tous** les critères suivants :

1. **Statut valide** : Uniquement les sessions avec statut `PRÉVISIONNEL` ou `CONFIRMÉ`
   - ❌ Exclut : `TERMINÉ`, `EN COURS`, `ARCHIVÉ`, `ANNULÉ`

2. **Publication activée** : `publication_session_site_web` doit être `true`

3. **Date future** : La colonne `j1` (date de début de la session) doit être dans le futur
   - La session ne doit pas avoir commencé
   - Comparaison faite au début de la journée (00:00:00)

4. **Produit valide** : La session doit correspondre à une formation présente dans `export_formation.json`
   - **Tentative 1** : Matching par `code_produit`
     - Exemple : session avec `code_produit: "SST-I"` → formation avec `code_produit: "SST-I"`
   - **Tentative 2** : Si pas de correspondance par code, matching par **nom exact** du produit (insensible à la casse)
     - Exemple : session avec `libelleproduit: "Formation SST"` → formation avec `libelle: "Formation SST"`
   - Seules les formations actives et publiées sont prises en compte

### Comportement du Bouton Calendrier

Le bouton **Calendrier** dans la navigation principale (header) est affiché/masqué dynamiquement selon les conditions suivantes :

**Masqué si** :
- Le fichier `export_session.json` n'existe pas
- Le fichier est vide (`[]`)
- Aucune session ne respecte les critères de filtrage

**Affiché si** :
- Au moins une session valide existe après application des filtres

### Lien entre Formations et Sessions

Le lien entre les deux fichiers se fait en **deux étapes** :

#### Méthode 1 : Par `code_produit` (prioritaire)

**Dans `export_formation.json`** :
```json
{
  "reference": "PRO-000001",
  "code_produit": "SST-I",
  "libelle": "Sauveteur Secouriste du Travail"
}
```

**Dans `export_session.json`** :
```json
{
  "reference": "SES-000779",
  "code_produit": "SST-I",
  "libelleproduit": "Sauveteur Secouriste du Travail",
  "j1": "2025-11-13T00:00:00.000Z"
}
```

➡️ La session `SES-000779` est liée à la formation `PRO-000001` via `code_produit: "SST-I"`

#### Méthode 2 : Par nom exact (si code_produit absent ou non trouvé)

Si une session n'a pas de `code_produit` ou si aucune formation ne correspond, le système tente un matching par **nom exact** :

**Dans `export_formation.json`** :
```json
{
  "reference": "PRO-000007",
  "code_produit": null,
  "libelle": "Formation Spéciale"
}
```

**Dans `export_session.json`** :
```json
{
  "reference": "SES-000999",
  "code_produit": null,
  "libelleproduit": "Formation Spéciale",
  "j1": "2025-12-01T00:00:00.000Z"
}
```

➡️ La session `SES-000999` est liée à la formation `PRO-000007` via le nom exact `"Formation Spéciale"` (insensible à la casse)

### Mapping des Données

Chaque session filtrée contient les informations suivantes :

| Champ | Source JSON | Description |
|-------|-------------|-------------|
| `reference` | `reference` | Référence unique de la session (ex: SES-000779) |
| `code_produit` | `code_produit` | Code du produit de formation (ex: SST-I) |
| `libelle_produit` | `libelleproduit` | Nom de la formation |
| `statut` | `statut` | Statut de la session (PRÉVISIONNEL/CONFIRMÉ) |
| `date_debut` | `j1` | Date de début de la session (format ISO) |
| `ville` | `ville` | Ville où se déroule la session |
| `code_postal` | `code_postale` | Code postal du lieu |
| `modalite` | `libellemodalite` | Modalité (Présentiel, Distanciel, etc.) |
| `duree_jours` | `session_duree_jours` | Durée en jours |
| `duree_heures` | `session_duree_heures` | Durée en heures |
| `effectif_max` | `effectif_maxi` | Nombre maximum de participants |
| `places_disponibles` | `nbdispo_preinscrit` | Nombre de places disponibles |
| `intervenant` | `nom_intervenant` | Nom de l'intervenant |
| `publication_places` | `publication_places_site_web` | Afficher le nombre de places (boolean) |

### Logs Console

Le système affiche des logs pour faciliter le débogage :

**Chargement réussi** :
```
✅ X sessions valides chargées
   - Y sessions liées par code_produit
   - Z sessions liées par nom
```

**Fichier absent ou vide** :
```
⚠️ Fichier export_session.json non trouvé ou vide, le bouton Calendrier sera masqué
```

Les statistiques permettent de voir combien de sessions ont été liées par chaque méthode (code vs nom).

### Vue Calendrier des Sessions ⭐ *AMÉLIORÉ*

Une page dédiée affichant toutes les sessions de formation disponibles avec recherche et filtres avancés.

#### Accès
- Clic sur le bouton **Calendrier** dans le header (visible uniquement si des sessions existent)

#### Interface

**En-tête** :
- Titre : "Calendrier des Sessions"
- Sous-titre explicatif
- **Barre de recherche** ⭐ *AMÉLIORÉ* : 
  - Recherche en temps réel sur nom, ville, modalité, code postal, intervenant
  - **Bouton de suppression (×)** : Apparaît dynamiquement quand du texte est saisi
  - Icône de loupe à gauche
  - Padding ajusté pour accueillir le bouton de suppression
  - Clic sur × → Efface la recherche et recharge toutes les sessions
- **Bouton "Filtres avancés"** ⭐ *NOUVEAU* : 
  - Icône d'entonnoir
  - Badge avec le nombre de filtres actifs
  - Change de style quand les filtres sont ouverts

**Filtres avancés** ⭐ *NOUVEAU* :
- **Panneau masquable** : S'affiche/se masque au clic sur le bouton
- **Badge dynamique** : 
  - Affiche le nombre de filtres actifs en temps réel
  - Badge rouge avec texte blanc (filtres fermés)
  - Badge blanc avec texte rouge (filtres ouverts)
  - Mise à jour instantanée à chaque changement de filtre
- **Fond gris** avec bordure pour différencier du contenu principal
- **4 filtres disponibles** :
  1. **Lieu** : Liste déroulante des villes uniques (triées alphabétiquement)
  2. **Statut** : Confirmé / Prévisionnel
  3. **Date de début (à partir de)** ⭐ *AMÉLIORÉ* : 
     - Date picker moderne avec **Flatpickr**
     - Interface en français
     - Format d'affichage : "13 novembre 2025"
     - Date minimum : Aujourd'hui
     - Filtre les sessions à partir de la date sélectionnée (>=)
     - Design cohérent avec les autres champs
     - Calendrier élégant avec couleur primaire
  4. **Places disponibles (min.)** : Sélecteur avec options Toutes, 1+, 5+, 10+, 15+
- **Bouton "Réinitialiser les filtres"** : 
  - Affiché dynamiquement uniquement si au moins un filtre est actif
  - Positionné en bas à droite du panneau
  - Réinitialise tous les filtres en une fois
  - Mise à jour instantanée de l'affichage

**Logique de filtrage** :
- Les filtres se combinent avec la recherche (ET logique)
- Chaque filtre est appliqué indépendamment
- **Date** : Affiche toutes les sessions à partir de la date sélectionnée (pas seulement ce jour)
- **Places** : Filtre les sessions avec au moins X places disponibles
- Mise à jour instantanée de la liste des sessions
- Compteur de résultats mis à jour automatiquement
- Badge du bouton "Filtres avancés" mis à jour en temps réel

**Cartes de session (format allongé)** :
- **Titre** : Nom de la formation
- **Badge statut** : PRÉVISIONNEL (rouge) ou CONFIRMÉ (vert)
- **Référence** : Référence de la session (ex: SES-000779)
- **Informations clés** avec icônes :
  - 📅 **Date** : Format long (ex: "lundi 13 novembre 2025")
  - 📍 **Lieu** : Ville et code postal
  - 💻 **Modalité** : Présentiel, Distanciel, etc.
  - ⏱️ **Durée** : Heures et jours (si disponible)
- **Places disponibles** : Affichage conditionnel si `publication_places = true`
  - Nombre de places restantes
  - Effectif maximum

**Interactions** :
- ✅ Recherche en temps réel (filtrage instantané)
- ✅ Filtres avancés masquables avec badge de compteur
- ✅ Clic sur une carte → Ouvre le détail de la session
- ✅ Survol → Effet d'élévation (shadow)
- ✅ Compteur de résultats affiché
- ✅ Message si aucune session trouvée avec bouton de réinitialisation

**Messages d'état** :
- 📝 **Avec recherche ou filtres actifs** : 
  - "Aucune session ne correspond à votre recherche '[terme]'" (si recherche)
  - "Aucune session disponible pour le moment" (si filtres sans recherche)
  - **Bouton "Réinitialiser les filtres"** affiché automatiquement
  - Efface la recherche et tous les filtres en un clic
- 📅 **Sans recherche ni filtres** : "Aucune session disponible pour le moment" (sans bouton)

**Gestion du lieu dans les cartes** :
- Si `ville` renseignée : `ville (code_postal)`
- Si `ville` vide : **"À déterminer"**

#### Design
- **Format allongé** : Une session par ligne, optimisé pour la lecture
- **Bordure gauche** : 4px en couleur primaire
- **Badge de statut** : Couleur dynamique selon le statut
- **Grille responsive** : Informations organisées en colonnes auto-adaptatives
- **Bloc places** : Mise en avant visuelle avec fond coloré
- **Panneau de filtres** : Fond gris avec bordure, grille responsive 4 colonnes

### Vue Détail d'une Session ⭐ *NOUVEAU*

Page dédiée affichant toutes les informations d'une session spécifique avec carte de géolocalisation.

#### Accès
- Clic sur une carte de session dans la vue Calendrier

#### Structure de la page

**En-tête** :
- Bouton **Retour au calendrier**
- Titre : Nom de la formation
- Badge statut (PRÉVISIONNEL/CONFIRMÉ)
- Référence de la session

**Layout en 2 colonnes** :

**Colonne gauche - Informations** :
- **Carte "Informations de la session"** avec icônes :
  - 📅 Date de début (format long)
  - 📍 Lieu (ville + code postal)
  - 💻 Modalité
  - ⏱️ Durée (si disponible)
  - 👤 Intervenant (si disponible)
- **Carte "Places disponibles"** (si `publication_places = true`) :
  - Nombre de places restantes (grande taille)
  - Effectif maximum
  - Message contextuel

**Colonne droite - Localisation** :
- **Carte interactive Leaflet.js** :
  - Fond de carte OpenStreetMap
  - Géocodage automatique via Nominatim API
  - Marqueur sur la localisation
  - Popup avec nom de la formation et ville
  - Zoom niveau 13
  - Hauteur minimale 500px

**Bas de page** :
- **Carte "À propos de cette formation"** :
  - Titre de la formation
  - Bouton vers la fiche formation complète

#### Géolocalisation

**Gestion du lieu** :
- Si `ville` est renseignée : Affichage de l'adresse complète
  - Format : `lieu_formation, ville (code_postal)`
  - Exemple : "12 rue de la Paix, PARIS (75004)"
- Si `ville` est vide ou non renseignée : 
  - Affichage : **"À déterminer"**
  - **La carte n'est pas affichée**
  - La grille passe en 1 colonne au lieu de 2

**API utilisée** : Nominatim (OpenStreetMap)
- Géocodage automatique : `ville + code_postal + France`
- Fallback sur Paris si géocodage échoue
- Requête : `https://nominatim.openstreetmap.org/search`
- **Non appelée si lieu non déterminé**

**Carte Leaflet** :
- **Style** : CartoDB Positron (moderne et épuré)
- **Marqueur personnalisé** : Icône SVG avec couleur primaire
- Popup avec informations et numéro de session
- Loader pendant le chargement
- Redimensionnement automatique
- **Affichage conditionnel** : Uniquement si lieu déterminé

**Section "À propos de cette formation"** :
- **Layout 2 colonnes** :
  - Gauche : Informations détaillées
    - Titre de la formation
    - Description (200 premiers caractères)
    - **Compétences visées** (4 premières + compteur)
    - Durée et prix
  - Droite : **Gros bouton CTA**
    - Icône document
    - Texte "Voir la fiche formation complète"
    - Effet hover (élévation)
    - Shadow avec couleur primaire

#### Interactions
- ✅ Bouton retour → Vue Calendrier
- ✅ **Gros bouton CTA** → Fiche produit (avec effet hover)
- ✅ Carte interactive (zoom, déplacement)
- ✅ Popup sur marqueur
- ✅ Loader pendant géocodage

## 🎨 Personnalisation

### Modifier les informations de l'organisme

Éditez le fichier `organism.json` :

```json
{
  "nomOrganisme": "Votre Organisme",
  "logoUrl": "https://votre-site.fr/logo.png",
  "couleurPrincipale": "#DC2626",
  "telephone": "01 23 45 67 89",
  "email": "contact@votre-organisme.fr",
  "emailDestination": "reception@votre-organisme.fr",
  "adresse": "Votre adresse",
  "moduladmin": true
}
```

### Mode Démo ⭐ *NOUVEAU*

Le site intègre un **mode démonstration** permettant de limiter l'affichage à 1 produit et 1 session pour présenter le site sans exposer l'intégralité du catalogue.

#### Activation

Dans `organism.json`, définir le paramètre `moduladmin` :

- **`moduladmin: true`** (par défaut) : Mode normal, affichage de tous les produits et sessions
- **`moduladmin: false`** : Mode démo, limitation à 1 produit et 1 session

#### Comportement en Mode Démo

**Cas 1 : Données réelles disponibles**
- **Sélection intelligente** :
  1. Si des sessions existent : Sélection aléatoire d'une session + son produit correspondant
  2. Si aucune session : Sélection aléatoire d'un produit
  3. Correspondance automatique session ↔ produit par `code_produit` ou nom exact
- **Bandeau** : "Site de démonstration - Limité à 1 produit et 1 session"
- **Logs console** :
  ```
  🎭 Mode démo activé - Limitation à 1 produit et 1 session (données réelles)
     ✓ Session sélectionnée: SES-000779
     ✓ Produit correspondant: Sauveteur Secouriste du Travail Initiale
  ```

**Cas 2 : Aucune donnée réelle (fichiers absents/vides/aucun produit éligible)**
- **Données fictives** : 8 produits et 8 sessions fictifs
  - 4 produits Santé/Sécurité (SST, Gestes et Postures, Incendie EPI, Habilitation Électrique)
  - 4 produits Management (Management d'équipe, Gestion de projet, Communication, Leadership)
  - 8 sessions avec variations : CONFIRMÉ/PRÉVISIONNEL, places publiées/non publiées
  - Dates dynamiques : aujourd'hui + 2 à 4 mois
  - Villes variées : Paris, Lyon, Bordeaux, Toulouse, Marseille, Nantes, Lille, Strasbourg
- **Bandeau** : "Site de démonstration - Produits et sessions fictifs"
- **Logs console** :
  ```
  🎭 Mode démo - Utilisation de 8 produits et 8 sessions fictifs
     ✓ 8 produits fictifs chargés
     ✓ 8 sessions fictives chargées
  ```

**Bandeau de démonstration** :
- Position : Sticky sous le header (visible sur toutes les pages, z-index: 9999)
- Couleur : Couleur primaire du thème (`couleurPrincipale`)
- Messages selon le cas :
  - **Données réelles** : "Limité à 1 produit et 1 session"
  - **Données fictives** : "Produits et sessions fictifs"
  - Ligne 2 : "Passez au plan **Business** pour accéder à l'intégralité du catalogue"
    - Le mot "Business" est en gras et cliquable (lien vers https://www.argalis.fr/tarifs.html)
  - Ligne 3 : "Rendez-vous dans votre espace Argalis > Administration > Mon abonnement afin de migrer vers ce plan"

**Fonctionnalités conservées** :
- ✅ Menu catalogue complet (hiérarchie)
- ✅ Filtres avancés
- ✅ Barre de recherche
- ✅ Toutes les vues (catalogue, produit, calendrier, session)

#### Comportement en Mode Normal (`moduladmin: true`)

**Cas 1 : Données réelles disponibles**
- Affichage normal de tous les produits et sessions
- Pas de bandeau
- Comportement standard du site

**Cas 2 : Produits réels MAIS pas de sessions**
- Affichage normal des produits
- Bouton "Calendrier" masqué
- **Pas de bandeau** (cas d'utilisation normal : catalogue sans sessions)

**Cas 3 : Aucun produit éligible (fichiers absents/vides/aucun produit éligible)**
- **Données fictives** : 8 produits et 8 sessions fictifs (identiques au mode démo)
- **Bandeau** : "Données fictives"
  - Message : "Activez la publication de vos produits et sessions dans Argalis pour afficher vos propres formations"
  - **Pas de mention du plan Business** (client déjà sur le plan Business)
- **Logs console** :
  ```
  📦 Mode normal - Utilisation de 8 produits et 8 sessions fictifs (aucune donnée réelle)
     ✓ 8 produits fictifs chargés
     ✓ 8 sessions fictives chargées
  ```

#### Fichier de données fictives

Les données fictives sont définies dans `fictive-data.js` :
- **8 produits** avec hiérarchie complète (Secteur > Famille > Groupe)
  - 4 Santé/Sécurité : SST, Gestes et Postures, Incendie EPI, Habilitation Électrique
  - 4 Management : Management d'équipe, Gestion de projet, Communication, Leadership
- **8 sessions** avec variations (statuts, places, modalités)
  - 4 sessions CONFIRMÉ / 4 sessions PRÉVISIONNEL
  - 5 sessions avec places publiées / 3 sessions sans places publiées
  - Villes : Paris, Lyon, Bordeaux, Toulouse, Marseille, Nantes, Lille, Strasbourg
- **Dates dynamiques** : Calculées à partir de la date du jour + 2 à 4 mois
- **Statistiques de satisfaction** : 6 indicateurs pour chaque produit
- Fonction `getFictiveData()` retourne les données formatées

### Ajouter/Modifier des formations

Éditez le fichier `export_formation.json` en suivant la structure existante. Les champs importants :

#### Identification et Classification
- `reference` : Identifiant unique (ex: "PRO-000001")
- `libelle` : Titre de la formation
- `produit_secteur` : Secteur (Niveau 1 du menu hiérarchique)
- `produit_famille` : Famille (Niveau 2 du menu hiérarchique)
- `produit_groupe` : Groupe (Niveau 3 du menu hiérarchique)

#### Informations Pratiques
- `duree_heure` : Durée (ex: "14h")
- `prix_apprenant` / `prix_groupe` : Prix (ou `null` pour "Nous consulter")
- `public_vise` : Public concerné
- `prerequis` : Prérequis séparés par `|`

#### Contenu Pédagogique
- `objectif_formation` : Objectifs séparés par `\n`
- `competence_apprenant` ⭐ *NOUVEAU* : Compétences développées séparées par `|`
- `programme` : HTML du programme
- `deroulement_formation` : Déroulement de la formation
- `methode_mobilisation` : Méthodes et moyens pédagogiques

#### Évaluation et Certification
- `controle_connaissance` : Évaluations séparées par `|`
- `maint_connaissance` ⭐ *NOUVEAU* : Durée de validité (ex: "24 mois")
- `formation_certifiante` : "Oui" ou "Non"
- `url` : URL vers France Compétences (si certifiante)

#### Qualité et Résultats
- `satisfaction_intervenant` : Pourcentage (ex: "81 %")
- `satisfaction_pedagogie` : Pourcentage
- `satisfaction_contenu` : Pourcentage
- `satisfaction_obj` : Pourcentage
- `taux_presence` : Pourcentage
- `reussite` : Pourcentage

#### Publication
- `actif` : `true` pour activer le produit
- `publication_site_web` : `true` pour publier sur le site

### Changer la couleur principale

La couleur principale est définie dans `organism.json` avec le champ `couleurPrincipale` (format HEX).

### Système de Contraste Automatique (WCAG)

Le site intègre un système intelligent de calcul de contraste conforme aux normes **WCAG** (Web Content Accessibility Guidelines) :

#### Fonctionnement
- **Calcul de luminance** : Détermine la luminance relative de la couleur de fond
- **Ratio de contraste** : Compare le contraste avec le blanc et le noir
- **Choix automatique** : Sélectionne la couleur de texte offrant le meilleur contraste

#### Application
- **Headers de la sidebar** : Texte blanc ou noir selon la couleur primaire
- **Tous les éléments colorés** : Garantit un ratio minimum de 4.5:1 (norme WCAG AA)

#### Avantages
- ✅ Accessibilité garantie quelle que soit la couleur choisie
- ✅ Lisibilité optimale pour tous les utilisateurs
- ✅ Conformité aux standards d'accessibilité web

### Footer Moderne

Le footer affiche les informations de l'organisme de manière élégante :

#### Informations de l'organisme
- **Présentation linéaire** : Nom, adresse, téléphone, email sur une seule ligne
- **Icônes thématiques** : Chaque information a son icône (bâtiment, pin, téléphone, email)
- **Liens cliquables** : `tel:` pour le téléphone, `mailto:` pour l'email
- **Fond coloré** : Bloc avec fond gris clair et border-radius

#### Crédit Argalis
- **Ligne séparée** : "Site web propulsé par Argalis - Solution de gestion pour les organismes de formation"
- **Lien externe** : Vers argalis.fr (nouvel onglet, sécurisé avec `rel="noopener noreferrer"`)
- **Effet hover** : Légère transparence au survol

## 🔍 Système de Pré-filtrage des Formations

Le site intègre un système de pré-filtrage qui détermine quelles formations sont affichées sur le site vitrine.

### Critères de publication

Pour qu'une formation soit visible sur le site, elle doit respecter **deux conditions obligatoires** :

| Champ | Valeur requise | Description |
|-------|----------------|-------------|
| `actif` | `true` | Le produit doit être au statut actif |
| `publication_site_web` | `true` | Le produit doit être marqué pour publication sur le site internet |

### Comportement du filtrage

- ✅ **Affichée** : Formation avec `actif: true` ET `publication_site_web: true`
- ❌ **Masquée** : Formation avec `actif: false` OU `publication_site_web: false`
- ❌ **Masquée** : Formation avec l'un des deux champs à `null` ou `undefined`

### Application du filtre

Le filtrage s'applique :
- **Avant le mapping** des données
- **Avant l'affichage** dans le catalogue
- **De manière transparente** pour l'utilisateur final

Les formations non publiées n'apparaissent jamais dans :
- Le catalogue de formations
- Les résultats de recherche
- Les filtres par catégorie
- Le compteur de formations
- Le menu hiérarchique (Secteur > Famille > Groupe)

## 🔧 Implémentation Technique du Menu

### Structure des Données

Le menu hiérarchique est construit à partir des champs suivants dans `export_formation.json` :

```json
{
  "produit_secteur": "Santé sécurité au Travail",
  "produit_famille": "Secourisme",
  "produit_groupe": "INRS"
}
```

### Fonctions Clés

**Hiérarchie** :

**`buildHierarchy(formations)`** :
- Construit la structure hiérarchique Secteur > Famille > Groupe
- Détecte si au moins un produit a une hiérarchie définie
- Retourne `{ hierarchy, hasAnyHierarchy }`

**`isHierarchyEmpty(hierarchyData)`** :
- Vérifie si la hiérarchie est vide ou insignifiante
- Retourne `true` si aucune hiérarchie ou seulement "Non classé" partout
- Utilisé pour décider d'afficher ou non le bouton Catalogue

**`initSubmenuEvents()`** :
- Gère le positionnement intelligent des sous-menus (flip à gauche)
- Attache les événements de clic pour le filtrage
- Gère l'ouverture/fermeture du menu principal

**Filtres de durée** ⭐ *NOUVEAU* :

**`getDureeRange(type)`** :
- Calcule les valeurs min/max pour la durée selon le type
- Paramètre `type` : `'heures'` ou `'jours'`
- Utilise `parseDuree()` pour les heures, `parseDureeJours()` pour les jours
- Retourne `{ min, max }`

**`parseDureeJours(dureeStr)`** :
- Parse la durée en jours depuis les données (ex: "2j" → 2)
- Extrait le nombre avec regex
- Retourne `null` si la valeur est invalide

**`updateFilter('dureeType', value)`** :
- Gère le changement de type de durée
- Réinitialise `dureeMin` et `dureeMax` à `null`
- Force la recréation du slider avec les nouvelles limites

**Filtres du calendrier** ⭐ *NOUVEAU* :

**`getUniqueLieux()`** :
- Extrait toutes les villes uniques depuis `sessionsData`
- Filtre les valeurs vides
- Retourne un tableau trié alphabétiquement

**`getActiveSessionFiltersCount()`** :
- Compte le nombre de filtres actifs (lieu, statut, date, places)
- Retourne un entier utilisé pour le badge du bouton
- Permet d'afficher/masquer le bouton de réinitialisation

**`toggleSessionFilters()`** :
- Bascule l'affichage du panneau de filtres
- Met à jour `showSessionFilters` (boolean)
- Recharge la vue calendrier pour refléter le changement

**`updateSessionFilter(filterName, value)`** :
- Met à jour un filtre spécifique dans `sessionFilters`
- Paramètres : `'lieu'`, `'statut'`, `'dateDebut'`, `'placesMin'`
- Appelle `updateSessionFiltersBadge()` pour mise à jour immédiate du badge
- Appelle `updateResetFiltersButton()` pour afficher/masquer le bouton
- Rafraîchit instantanément la liste des sessions

**`updateSessionFiltersBadge()`** ⭐ *NOUVEAU* :
- Met à jour dynamiquement le badge du bouton "Filtres avancés"
- Affiche le nombre de filtres actifs
- Change les couleurs selon l'état (ouvert/fermé)
- Badge rouge avec texte blanc (fermé) ou blanc avec texte rouge (ouvert)

**`updateResetFiltersButton()`** ⭐ *NOUVEAU* :
- Met à jour dynamiquement le bouton de réinitialisation
- Affiche le bouton uniquement si des filtres sont actifs
- Masque le bouton si aucun filtre n'est actif
- Appelée après chaque changement de filtre

**`resetSessionFilters()`** :
- Réinitialise tous les filtres à leurs valeurs par défaut (chaînes vides)
- Recharge complètement la vue calendrier
- Utilisé par le bouton "Réinitialiser les filtres"

**`renderSessionsList()`** :
- Filtre les sessions selon la recherche ET les filtres actifs
- Logique ET : tous les critères doivent être respectés
- **Date** : Filtre avec `>=` (à partir de la date)
- **Places** : Filtre avec `>=` (au moins X places)
- Affiche les cartes ou un message si aucune session trouvée
- Affiche un bouton de réinitialisation si recherche ou filtres actifs

**Initialisation Flatpickr** ⭐ *NOUVEAU* :
- Bibliothèque : **Flatpickr** (date picker moderne)
- Configuration :
  - `locale: 'fr'` : Interface en français
  - `dateFormat: 'Y-m-d'` : Format technique
  - `altFormat: 'j F Y'` : Format d'affichage lisible
  - `minDate: 'today'` : Pas de dates passées
  - `disableMobile: true` : Désactive le picker natif mobile
- Callbacks :
  - `onReady` : Applique les styles inline sur l'input alternatif
  - `onChange` : Appelle `updateSessionFilter('dateDebut', dateStr)`
  - `onOpen/onClose` : Gère la bordure rouge au focus

**`clearSessionSearch()`** ⭐ *NOUVEAU* :
- Efface la recherche de sessions dans le calendrier
- Réinitialise `sessionSearchQuery` à vide
- Recharge la vue calendrier avec `renderCalendrierView()`
- Appelée par le bouton × dans le champ de recherche

**`createProchainessessionsCard(formation)`** ⭐ *NOUVEAU* :
- Crée le bloc "Prochaines Sessions" pour la fiche produit
- Filtre les sessions du produit par `code_produit`
- Sélectionne les 3 prochaines sessions futures (>= aujourd'hui)
- Trie par ordre chronologique
- Retourne une chaîne vide si aucune session future
- Génère le HTML avec :
  - Header rouge avec icône calendrier
  - Cartes de sessions cliquables avec date capitalisée, lieu, modalité
  - Bouton "Voir toutes les sessions"

**`goToCalendarWithFilter(productTitle)`** ⭐ *NOUVEAU* :
- Navigue vers le calendrier avec un filtre pré-appliqué
- Paramètre : Titre du produit (pas le code)
- Remplit automatiquement le champ de recherche
- Applique le filtre après un délai de 100ms
- Utilisée par le bouton "Voir toutes les sessions" du bloc Prochaines Sessions

### CSS

**Affichage au survol** :
```css
.dropdown-item.has-submenu:hover > .dropdown-submenu {
  opacity: 1;
  visibility: visible;
  transform: translateX(0);
}
```

**Positionnement** :
```css
.dropdown-submenu {
  position: absolute;
  left: calc(100% + 0.5rem);  /* À droite par défaut */
}

.dropdown-submenu.flip-left {
  left: auto;
  right: calc(100% + 0.5rem);  /* À gauche si pas de place */
}
```

## 🔄 Gestion des Valeurs Manquantes (Fallback)

Le site intègre un système intelligent de gestion des valeurs manquantes ou `null` dans les données. Aucune valeur "null" ne sera jamais affichée à l'utilisateur.

### Mapping des Données ⭐ *IMPORTANT*

Le système fait une distinction entre **référence produit** et **code produit** :

**Dans le JSON source** :
- `reference` : Référence PRO (ex: PRO-000001) - **Toujours présente**
- `code_produit` : Code court (ex: SST-I) - **Optionnel**

**Après mapping** :
```javascript
{
  id: formation.reference,           // PRO-000001 (identifiant unique)
  reference: formation.reference,    // PRO-000001 (affichage)
  code_produit: formation.code_produit, // SST-I (optionnel, pour liaison sessions)
  titre: formation.libelle,
  // ...
}
```

**Utilisation** :
- **Référence PRO** : Affichée dans les cartes et fiches produit
- **Code produit** : Utilisé pour lier les sessions au produit
- **Affichage conditionnel** : Le code n'apparaît que s'il existe dans les données

### Valeurs par défaut appliquées

Lorsqu'une donnée est manquante (`null`, `undefined`, `"null"`, `"NULL"`) dans le fichier `export_formation.json`, le système applique automatiquement les valeurs de remplacement suivantes :

| Champ | Valeur par défaut |
|-------|-------------------|
| **Référence** | "N/A" |
| **Titre** | "Formation sans titre" |
| **Catégorie** | "Autres formations" |
| **Durée** | "Non spécifiée" |
| **Prix** | "Nous consulter" (si les deux prix sont null) |
| **Public concerné** | "Tout public" |
| **Prérequis** | ["Aucun"] |
| **Objectifs** | "Objectifs non spécifiés" |
| **Déroulement** | "Information non disponible" |
| **Méthodes et moyens** | "Information non disponible" |
| **Accessibilité** | "Merci de nous contacter pour plus d'informations sur l'accessibilité" |
| **Programme** | "Programme non disponible" |
| **Évaluation** | "Information non disponible" |
| **Pourcentages** (avis, résultats) | 0% |
| **URL certification** | "" (vide, le bouton ne s'affiche pas) |

### Fonction de nettoyage

Le système utilise une fonction `cleanValue(value, defaultValue)` qui :
- Détecte les valeurs nulles sous toutes leurs formes
- Applique automatiquement la valeur par défaut appropriée
- Garantit une expérience utilisateur cohérente

### Comportement dans l'interface

- **Cartes vides** : Affichent un message informatif au lieu de rester vides
- **Listes vides** : Affichent "Aucun" ou un message approprié
- **Champs texte** : Affichent un message d'information par défaut
- **Badges de catégorie** : Les formations sans catégorie sont automatiquement classées dans "Autres formations"

## 📧 Système de Formulaires de Contact ⭐ *NOUVEAU*

Le site intègre un système complet de formulaires de contact avec 4 types de demandes différentes.

### Types de Formulaires

1. **Devis Particulier** : Demande de devis pour un particulier
2. **Devis Entreprise** : Demande de devis pour une entreprise
3. **Préinscription Particulier** : Préinscription à une session pour un particulier
4. **Préinscription Entreprise** : Préinscription à une session pour une entreprise

### Validation des Formulaires

**Validation HTML5 + JavaScript** :
- Attribut `required` sur tous les champs obligatoires
- Attribut `novalidate` sur le formulaire pour contrôle JavaScript
- Messages personnalisés en français via `setCustomValidity()`
- Validation manuelle avec `reportValidity()` avant envoi
- Bordures rouges pour les champs invalides
- Message d'erreur global : "Veuillez remplir tous les champs obligatoires."

**Validation Serveur (PHP)** :
- Double sécurité côté serveur
- Vérification de tous les champs obligatoires
- Validation du format email
- Messages d'erreur détaillés

**Champs Obligatoires** :
- **Particulier** : Nom, Prénom, Email
- **Entreprise** : Nom entreprise, Nom contact, Prénom contact, Email contact

### Formatage Automatique

**Côté Client (JavaScript)** :
- **Noms de famille** : MAJUSCULES automatiques
- **Prénoms** : Première lettre en majuscule
- **Villes** : MAJUSCULES automatiques
- Appliqué sur événement `blur` (perte de focus)

**Côté Serveur (PHP)** :
- Même formatage avec fonctions `mb_strtoupper()` et `mb_convert_case()`
- Garantit la cohérence même si JavaScript est désactivé

### APIs Intégrées

**API Sirene (Recherche d'Entreprise)** :
- Recherche par **nom d'entreprise** avec autocomplétion
- Recherche par **numéro SIRET** (14 chiffres)
- Remplissage automatique : nom, SIRET, adresse, code postal, ville
- Navigation clavier (flèches ↑↓ + Enter)
- Feedback visuel pendant la recherche

**API Géolocalisation (geo.api.gouv.fr)** :
- Recherche de villes par **code postal**
- Recherche de villes par **nom**
- Autocomplétion avec suggestions
- Navigation clavier (flèches ↑↓ + Enter)
- Remplissage automatique code postal ↔ ville

### Préinscriptions - Fonctionnalités Spécifiques

**Informations de Session** :
- **Badge de référence** : SES-XXXXX affiché en haut à droite
- **Icônes SVG** : Calendrier (date) et Pin (lieu) au lieu d'emojis
- **Notice** : Message informatif avec couleurs du thème
- Positionnée entre les infos de session et le formulaire

**Participants (Entreprise)** :
- **Nombre de participants** : Champ numérique obligatoire
- **Liste des participants** : Textarea optionnelle (un nom par ligne)
- Affichage côte à côte : 30% (nombre) + 70% (liste)
- Gestion intelligente dans l'email : combine nombre + liste

### Optimisation de l'Espace

**Modale** :
- Largeur : 900px
- Hauteur adaptative sans scroll

**Champs Particulier** :
- Ligne 1 : Nom + Prénom + Email (3 champs)
- Ligne 2 : Tél. portable + Tél. fixe + Adresse (3 champs)
- Ligne 3 : Code postal + Ville (2 champs)
- Ligne 4 : Message (3 lignes)

**Champs Entreprise** :
- Ligne 1 : Nom entreprise (recherche)
- Ligne 2 : Nom contact + Prénom contact + Fonction (3 champs)
- Ligne 3 : Email + Tél. portable + Tél. fixe (3 champs)
- Ligne 4 : SIRET + Adresse (2 champs)
- Ligne 5 : Code postal + Ville (2 champs)
- Ligne 6 : Nb participants + Liste (2 champs, préinscription uniquement)
- Ligne 7 : Message (3 lignes)

**Textareas** :
- Hauteur réduite : 3 lignes (au lieu de 5)
- Min-height : 80px (au lieu de 120px)
- Resize vertical autorisé

### Envoi des Emails (Mailgun)

**Backend PHP** :
- Fichier : `send-email.php`
- Service : Mailgun API
- 4 templates HTML différents (un par type de formulaire)
- Variables dynamiques injectées dans les templates
- Gestion des erreurs avec messages clairs

**Configuration** :
- **Clés API** : Configurées directement dans `send-email.php`
  - `$MAILGUN_API_KEY` : Votre clé API Mailgun
  - `$MAILGUN_DOMAIN` : Votre domaine Mailgun (ex: mg.votredomaine.com ou argalis.fr)
- **Email de destination** : Lu automatiquement depuis `organism.json`
  - Utilise le champ `emailDestination` (privé, jamais affiché sur le site)
  - Fallback sur `email` si `emailDestination` n'existe pas
- **Couleurs dynamiques** : Lu automatiquement depuis `organism.json`
  - `couleurPrincipale` : Couleur principale (ex: #DC2626)
  - Calcul automatique d'une couleur plus foncée pour les dégradés et variations
  - Variables injectées dans les templates : `{{primary_color}}` et `{{primary_dark}}`

**Templates Mailgun** :
- **4 templates HTML** dans `/mailgun-templates/` :
  - `devis-particulier.html`
  - `devis-entreprise.html`
  - `preinscription-particulier.html`
  - `preinscription-entreprise.html`
- **Couleurs dynamiques** : Utilise `{{primary_color}}` et `{{primary_dark}}` depuis `organism.json`
- **Icônes SVG modernes** : Style wireframe épuré, cohérent avec le projet
- **Design professionnel** : Styles inline pour compatibilité email maximale
- **Badge de référence** : SES-XXXXX pour les préinscriptions
- **Prévisualisation** : Fichier `preview-emails-mailgun.html` pour tester les templates localement
- **Responsive email design** : Compatible tous clients email (Outlook, Gmail, etc.)

## 🛠️ Technologies Utilisées

- **HTML5** : Structure de la page
- **CSS3** : Styles personnalisés
- **Tailwind CSS** : Framework CSS utility-first (via CDN)
- **JavaScript Vanilla** : Logique applicative sans framework
- **PHP** : Backend pour l'envoi d'emails
- **Mailgun** : Service d'envoi d'emails transactionnels
- **APIs externes** : Sirene (entreprises), geo.api.gouv.fr (villes)
- **Shadcn/ui** : Inspiration pour les composants UI

## 📱 Responsive Design

Le site est entièrement responsive et s'adapte à tous les écrans :
- **Mobile** : Vue en colonne unique
- **Tablette** : Grille 2 colonnes pour le catalogue
- **Desktop** : Grille 3 colonnes pour le catalogue, layout 2 colonnes pour les fiches

## 🔧 Maintenance

### Configurer l'organisme (organism.json)

Le fichier `organism.json` centralise toutes les informations de l'organisme :

```json
{
  "nomOrganisme": "Votre Organisme",
  "logoUrl": "https://votre-domaine.fr/logo.png",
  "couleurPrincipale": "#DC2626",
  "telephone": "01 23 45 67 89",
  "email": "contact@votredomaine.fr",           // Email public (affiché sur le site)
  "emailDestination": "reception@votredomaine.fr", // Email privé (réception formulaires)
  "adresse": "123 Rue de la Formation, 75001 Paris"
}
```

**Champs importants** :
- **`logoUrl`** : URL publique du logo (CDN, GitHub raw, etc.)
- **`email`** : Email affiché publiquement dans le footer et sur le site
- **`emailDestination`** : Email privé pour recevoir les formulaires (jamais visible sur le site)
- **`couleurPrincipale`** : Couleur principale du thème (format hexadécimal)

### Modifier les styles

Les styles personnalisés se trouvent dans `style.css`. Les classes Tailwind sont directement utilisées dans le HTML généré par JavaScript.

---

## 📧 Système de Formulaire de Contact

### Vue d'ensemble

Le site intègre un système complet de formulaire de contact avec modale responsive, capable de gérer **quatre scénarios distincts** :
- **Demandes de devis Particulier** (depuis une fiche produit)
- **Demandes de devis Entreprise** (avec recherche d'entreprise via API Sirene)
- **Préinscriptions Particulier** (depuis le calendrier ou le détail d'une session)
- **Préinscriptions Entreprise** (avec liste de participants)

L'envoi est géré de manière centralisée par un script PHP unique utilisant l'API Mailgun et 4 templates différents.

### ✨ Nouvelles Fonctionnalités

**Toggle Particulier / Entreprise** :
- Sélecteur visuel en haut de la modale
- Changement instantané des champs affichés
- Validation conditionnelle selon le contexte

**Intégration API Sirene (INSEE)** :
- Recherche automatique d'entreprises françaises
- Auto-remplissage SIRET et Adresse
- API publique et gratuite

**Champs Conditionnels** :
- Adaptation automatique selon le type d'utilisateur
- Champs requis variables (téléphone, message)
- Nombre de participants (devis) vs Liste (préinscription)

**Interface Améliorée** :
- Bloc d'information session mis en évidence
- Notice de confirmation pour préinscriptions
- Design moderne et responsive

### Architecture

**Fichiers du système** :

| Fichier | Description |
|---------|-------------|
| `send-email.php` | Script PHP serveur pour l'envoi via Mailgun |
| `index.html` | Modale HTML du formulaire |
| `script.js` | Fonctions JavaScript (ouverture, fermeture, soumission) |
| `style.css` | Styles de la modale et du formulaire |

### Interface Utilisateur

**Modale de Contact** :
- Fenêtre modale (élément `<dialog>`) responsive et accessible
- **Toggle Particulier / Entreprise** en haut de la modale
- Titre dynamique selon le contexte :
  - "Demande de Devis" (pour les devis)
  - "Demande de Préinscription" (pour les préinscriptions)
- Fermeture possible via :
  - Bouton de fermeture (icône X)
  - Clic en dehors de la modale
  - Touche "Échap"

**Toggle Particulier / Entreprise** :
- Composant moderne avec 2 boutons et icônes
- Par défaut sur "Particulier"
- Changement instantané des champs affichés
- Design avec fond coloré et bouton actif mis en évidence

**Champs du Formulaire (Particulier)** :

| Contexte | Nom | Email | Téléphone | Message |
|----------|-----|-------|-----------|---------|
| Devis | ✅ Obligatoire | ✅ Obligatoire | Facultatif | ✅ Obligatoire (pré-rempli) |
| Préinscription | ✅ Obligatoire | ✅ Obligatoire | ✅ Obligatoire | Facultatif |

**Champs du Formulaire (Entreprise)** :

| Contexte | Contact | Email | Téléphone | Entreprise | SIRET | Adresse | Participants | Message |
|----------|---------|-------|-----------|------------|-------|---------|--------------|---------|
| Devis | ✅ Obligatoire | ✅ Obligatoire | Facultatif | ✅ Obligatoire | Facultatif | Facultatif | Nombre (facultatif) | ✅ Obligatoire |
| Préinscription | ✅ Obligatoire | ✅ Obligatoire | ✅ Obligatoire | ✅ Obligatoire | Facultatif | Facultatif | Liste (facultatif) | Facultatif |

**Bloc d'Information Session** (préinscription uniquement) :
- Fond coloré avec bordure et icône
- Affiche : Formation, Date, Lieu, Référence
- Non-éditable

**Notice de Confirmation** (préinscription uniquement) :
- Fond vert avec icône de validation
- Texte : "Ceci est une demande de préinscription. Notre équipe vous recontactera prochainement pour confirmer votre inscription et répondre à vos questions."

### Configuration PHP

**Variables à configurer dans `send-email.php`** :

```php
$MAILGUN_API_KEY = 'VOTRE_CLE_API_MAILGUN';
$MAILGUN_DOMAIN = 'VOTRE_DOMAINE_MAILGUN'; // Ex: mg.votredomaine.com
$RECIPIENT_EMAIL = 'contact@votredomaine.com';
```

**Sécurité** :
- ✅ Vérification de la méthode POST
- ✅ En-têtes CORS configurés
- ✅ Validation des données JSON
- ✅ Validation de l'email
- ✅ Vérification des champs requis
- ✅ Clé API jamais exposée au client

### Intégration API Sirene (INSEE)

**Fonctionnalité** : Recherche automatique d'entreprises françaises

**API utilisée** : `https://recherche-entreprises.api.gouv.fr` (API publique et gratuite)

**Flux 1 - Recherche par nom d'entreprise** :
1. Saisie de 3 caractères minimum dans le champ "Nom de l'entreprise"
2. Debounce de 500ms pour éviter trop de requêtes
3. Appel API avec le nom saisi
4. Affichage de 5 suggestions maximum dans un dropdown
5. Clic sur une suggestion → auto-remplissage SIRET et Adresse

**Flux 2 - Recherche par SIRET** :
1. Saisie de 14 chiffres dans le champ "SIRET"
2. Appel API automatique
3. Si trouvé → auto-remplissage Nom et Adresse

**Fonctions JavaScript** :
- `searchCompanyByName(query)` : Recherche par nom
- `searchCompanyBySiret(siret)` : Recherche par SIRET
- `selectCompany(company)` : Sélection d'une suggestion
- `fillCompanyFields(company)` : Remplissage des champs
- `formatAddress(siege)` : Formatage de l'adresse

**Styles** :
- Dropdown avec suggestions stylisées
- Affichage du nom, adresse et SIRET
- États : loading, empty, résultats
- Fermeture au clic ailleurs

### Logique d'Envoi

**Flux de Traitement** :
1. Réception des données JSON
2. Validation des champs requis selon `userType` et `formType`
3. Détection du type de formulaire et d'utilisateur
4. Sélection du template Mailgun approprié (4 templates)
5. Préparation des variables du template
6. Envoi via cURL à l'API Mailgun
7. Retour de la réponse au client

**Logique Conditionnelle (4 scénarios)** :

**1. Devis Particulier** (`formType: "devis"`, `userType: "particulier"`) :
- Template : `devis-particulier`
- Sujet : "Nouvelle Demande de Devis (Particulier) - [Formation]"
- Variables : `formation`, `name`, `email`, `phone`, `message`

**2. Devis Entreprise** (`formType: "devis"`, `userType: "entreprise"`) :
- Template : `devis-entreprise`
- Sujet : "Nouvelle Demande de Devis (Entreprise) - [Formation]"
- Variables : `formation`, `contact_name`, `contact_email`, `contact_phone`, `company_name`, `siret`, `address`, `participant_count`, `message`

**3. Préinscription Particulier** (`formType: "preinscription"`, `userType: "particulier"`) :
- Template : `preinscription-particulier`
- Sujet : "Nouvelle Demande de Préinscription (Particulier) - [Formation]"
- Variables : `formation`, `session_date`, `session_lieu`, `session_reference`, `name`, `email`, `phone`, `message`

**4. Préinscription Entreprise** (`formType: "preinscription"`, `userType: "entreprise"`) :
- Template : `preinscription-entreprise`
- Sujet : "Nouvelle Demande de Préinscription (Entreprise) - [Formation]"
- Variables : `formation`, `session_date`, `session_lieu`, `session_reference`, `contact_name`, `contact_email`, `contact_phone`, `company_name`, `siret`, `address`, `participant_list`, `message`

### Points d'Entrée

**1. Demande de Devis**

Localisation : Fiche produit (sidebar)

```javascript
openDevisModal(formationName)
```

**2. Préinscription à une Session**

Localisations :
- Cartes de session (calendrier)
- Page de détail d'une session

```javascript
openPreinscriptionModal(formationName, sessionDate, sessionLieu)
```

### Fonctions JavaScript

**`switchUserType(type)`** :
- Bascule entre "particulier" et "entreprise"
- Affiche/masque les champs appropriés
- Met à jour les champs requis selon le contexte
- Gère l'apparence du toggle

**`updateRequiredFields(formType, userType)`** :
- Définit les champs obligatoires selon le contexte
- Téléphone obligatoire pour préinscription
- Message obligatoire pour devis (particulier)
- Gère les champs entreprise (nombre vs liste participants)

**`openDevisModal(formationName)`** :
- Configure le titre : "Demande de Devis"
- Définit `formType` à `"devis"`
- Masque le bloc d'information session et la notice
- Pré-remplit le message pour particulier
- Réinitialise le toggle sur "Particulier"

**`openPreinscriptionModal(formationName, sessionDate, sessionLieu, sessionReference)`** :
- Configure le titre : "Demande de Préinscription"
- Définit `formType` à `"preinscription"`
- Affiche le bloc d'information session et la notice
- Pré-remplit tous les champs cachés (incluant référence)
- Réinitialise le toggle sur "Particulier"

**`closeContactModal()`** :
- Ferme la modale de contact

**API Sirene** :
- `searchCompanyByName(query)` : Recherche avec debounce
- `searchCompanyBySiret(siret)` : Recherche par SIRET
- `selectCompany(company)` : Sélection et remplissage
- `fillCompanyFields(company)` : Auto-remplissage
- `formatAddress(siege)` : Formatage adresse

**Gestion de la Soumission** :
1. Empêche le comportement par défaut
2. Désactive le bouton et affiche "Envoi en cours..."
3. Sérialise les données en JSON (incluant `userType`)
4. Envoie une requête `fetch` à `send-email.php`
5. Affiche un message de succès ou d'erreur
6. Ferme la modale après 2 secondes en cas de succès

### Templates Mailgun

Le système utilise **4 templates différents** selon le type d'utilisateur et le type de demande :

| Template | Utilisateur | Demande | Couleur |
|----------|-------------|---------|---------|
| `devis-particulier` | Particulier | Devis | Couleur primaire #DC2626 |
| `devis-entreprise` | Entreprise | Devis | Couleur primaire #DC2626 |
| `preinscription-particulier` | Particulier | Préinscription | Couleur primaire #DC2626 |
| `preinscription-entreprise` | Entreprise | Préinscription | Couleur primaire #DC2626 |

---

#### Template 1 : `devis-particulier`

**Variables** : `{{formation}}`, `{{product_reference}}`, `{{lastname}}`, `{{firstname}}`, `{{fullname}}`, `{{email}}`, `{{phone_mobile}}`, `{{phone_fixed}}`, `{{address}}`, `{{message}}`

```html
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>Nouvelle Demande de Devis (Particulier)</title>
    <style>
        body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; line-height: 1.6; color: #333333; background-color: #f7f7f7; margin: 0; padding: 0; }
        .wrapper { width: 100%; }
        .container { width: 90%; max-width: 600px; margin: 20px auto; border: 1px solid #dddddd; border-radius: 8px; overflow: hidden; background-color: #ffffff; }
        .header { background-color: #f4f4f4; padding: 20px; text-align: center; border-bottom: 1px solid #dddddd; }
        .header h1 { margin: 0; color: #DC2626; font-size: 24px; }
        .header .badge { display: inline-block; background: #DC2626; color: white; padding: 4px 12px; border-radius: 12px; font-size: 12px; font-weight: 600; margin-top: 8px; }
        .content { padding: 30px; }
        .content p { margin: 0 0 18px; }
        .content .label { font-weight: bold; color: #555555; display: block; margin-bottom: 4px; }
        .message-box { background-color: #f9f9f9; border: 1px solid #eeeeee; padding: 15px; border-radius: 5px; margin-top: 10px; }
        .footer { background-color: #f4f4f4; padding: 15px; text-align: center; font-size: 12px; color: #777777; }
    </style>
</head>
<body>
    <div class="wrapper">
        <div class="container">
            <div class="header">
                <h1>Nouvelle Demande de Devis</h1>
                <span class="badge">PARTICULIER</span>
            </div>
            <div class="content">
                <p><span class="label">Formation :</span><strong>{{formation}}</strong></p>
                <p><span class="label">Référence produit :</span><strong style="color: #DC2626;">{{product_reference}}</strong></p>
                
                <hr>
                
                <p><span class="label">Nom :</span>{{fullname}}</p>
                <p><span class="label">Email :</span><a href="mailto:{{email}}" style="color: #DC2626;">{{email}}</a></p>
                <p><span class="label">Téléphone portable :</span>{{phone_mobile}}</p>
                <p><span class="label">Téléphone fixe :</span>{{phone_fixed}}</p>
                <p><span class="label">Adresse :</span>{{address}}</p>
                <p class="label">Message :</p>
                <div class="message-box">
                    <p style="margin:0;">{{message}}</p>
                </div>
            </div>
            <div class="footer">
                Cet email a été envoyé depuis le formulaire de contact du site web.
            </div>
        </div>
    </div>
</body>
</html>
```

---

#### Template 2 : `devis-entreprise`

**Variables** : `{{formation}}`, `{{product_reference}}`, `{{company_name}}`, `{{contact_lastname}}`, `{{contact_firstname}}`, `{{contact_fullname}}`, `{{contact_function}}`, `{{contact_email}}`, `{{contact_phone_mobile}}`, `{{contact_phone_fixed}}`, `{{siret}}`, `{{address}}`, `{{participant_count}}`, `{{message}}`

```html
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>Nouvelle Demande de Devis (Entreprise)</title>
    <style>
        body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; line-height: 1.6; color: #333333; background-color: #f7f7f7; margin: 0; padding: 0; }
        .wrapper { width: 100%; }
        .container { width: 90%; max-width: 600px; margin: 20px auto; border: 1px solid #dddddd; border-radius: 8px; overflow: hidden; background-color: #ffffff; }
        .header { background-color: #f4f4f4; padding: 20px; text-align: center; border-bottom: 1px solid #dddddd; }
        .header h1 { margin: 0; color: #DC2626; font-size: 24px; }
        .header .badge { display: inline-block; background: #DC2626; color: white; padding: 4px 12px; border-radius: 12px; font-size: 12px; font-weight: 600; margin-top: 8px; }
        .content { padding: 30px; }
        .content p { margin: 0 0 18px; }
        .content .label { font-weight: bold; color: #555555; display: block; margin-bottom: 4px; }
        .section-title { font-size: 18px; font-weight: bold; color: #DC2626; margin: 25px 0 15px; padding-bottom: 8px; border-bottom: 2px solid #DC2626; }
        .message-box { background-color: #f9f9f9; border: 1px solid #eeeeee; padding: 15px; border-radius: 5px; margin-top: 10px; }
        .footer { background-color: #f4f4f4; padding: 15px; text-align: center; font-size: 12px; color: #777777; }
        hr { border: 0; border-top: 1px solid #eeeeee; margin: 25px 0; }
    </style>
</head>
<body>
    <div class="wrapper">
        <div class="container">
            <div class="header">
                <h1>Nouvelle Demande de Devis</h1>
                <span class="badge">ENTREPRISE</span>
            </div>
            <div class="content">
                <p><span class="label">Formation :</span><strong>{{formation}}</strong></p>
                <p><span class="label">Référence produit :</span><strong style="color: #DC2626;">{{product_reference}}</strong></p>
                
                <hr>
                
                <div class="section-title">Informations Entreprise</div>
                <p><span class="label">Nom de l'entreprise :</span><strong>{{company_name}}</strong></p>
                <p><span class="label">SIRET :</span>{{siret}}</p>
                <p><span class="label">Adresse :</span>{{address}}</p>
                <p><span class="label">Nombre de participants :</span>{{participant_count}}</p>
                
                <hr>
                
                <div class="section-title">Contact</div>
                <p><span class="label">Nom du contact :</span>{{contact_fullname}}</p>
                <p><span class="label">Fonction :</span>{{contact_function}}</p>
                <p><span class="label">Email :</span><a href="mailto:{{contact_email}}" style="color: #DC2626;">{{contact_email}}</a></p>
                <p><span class="label">Téléphone portable :</span>{{contact_phone_mobile}}</p>
                <p><span class="label">Téléphone fixe :</span>{{contact_phone_fixed}}</p>
                
                <p class="label">Message :</p>
                <div class="message-box">
                    <p style="margin:0;">{{message}}</p>
                </div>
            </div>
            <div class="footer">
                Cet email a été envoyé depuis le formulaire de contact du site web.
            </div>
        </div>
    </div>
</body>
</html>
```

---

#### Template 3 : `preinscription-particulier`

**Variables** : `{{formation}}`, `{{product_reference}}`, `{{session_date}}`, `{{session_lieu}}`, `{{session_reference}}`, `{{lastname}}`, `{{firstname}}`, `{{fullname}}`, `{{email}}`, `{{phone_mobile}}`, `{{phone_fixed}}`, `{{address}}`, `{{message}}`

```html
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>Nouvelle Demande de Préinscription (Particulier)</title>
    <style>
        body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; line-height: 1.6; color: #333333; background-color: #f7f7f7; margin: 0; padding: 0; }
        .wrapper { width: 100%; }
        .container { width: 90%; max-width: 600px; margin: 20px auto; border: 1px solid #dddddd; border-radius: 8px; overflow: hidden; background-color: #ffffff; }
        .header { background-color: #f4f4f4; padding: 20px; text-align: center; border-bottom: 1px solid #dddddd; }
        .header h1 { margin: 0; color: #DC2626; font-size: 24px; }
        .header .badge { display: inline-block; background: #DC2626; color: white; padding: 4px 12px; border-radius: 12px; font-size: 12px; font-weight: 600; margin-top: 8px; }
        .content { padding: 30px; }
        .content p { margin: 0 0 18px; }
        .content .label { font-weight: bold; color: #555555; display: block; margin-bottom: 4px; }
        .session-box { background-color: #fee2e2; border: 2px solid #DC2626; padding: 15px; border-radius: 5px; margin-bottom: 20px; }
        .message-box { background-color: #f9f9f9; border: 1px solid #eeeeee; padding: 15px; border-radius: 5px; margin-top: 10px; }
        .footer { background-color: #f4f4f4; padding: 15px; text-align: center; font-size: 12px; color: #777777; }
        hr { border: 0; border-top: 1px solid #eeeeee; margin: 25px 0; }
    </style>
</head>
<body>
    <div class="wrapper">
        <div class="container">
            <div class="header">
                <h1>Nouvelle Demande de Préinscription</h1>
                <span class="badge">PARTICULIER</span>
            </div>
            <div class="content">
                <div class="session-box">
                    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px;">
                        <span style="font-size: 0.9rem; font-weight: 600; color: #555;">
                            <svg style="width: 14px; height: 14px; display: inline; vertical-align: middle; margin-right: 6px;" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path>
                            </svg>
                            INFORMATIONS DE LA SESSION
                        </span>
                        <span style="background: #DC2626; color: white; padding: 4px 12px; border-radius: 12px; font-size: 0.85rem; font-weight: 700; letter-spacing: 0.5px;">{{session_reference}}</span>
                    </div>
                    <p style="margin: 0 0 8px;"><span class="label">Formation :</span><strong>{{formation}}</strong></p>
                    <p style="margin: 0 0 8px;"><span class="label">Référence produit :</span><strong style="color: #DC2626;">{{product_reference}}</strong></p>
                    <p style="margin: 0 0 8px;">
                        <span class="label">
                            <svg style="width: 14px; height: 14px; display: inline; vertical-align: middle; margin-right: 4px;" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                            </svg>
                            Date :
                        </span>
                        <strong>{{session_date}}</strong>
                    </p>
                    <p style="margin: 0;">
                        <span class="label">
                            <svg style="width: 14px; height: 14px; display: inline; vertical-align: middle; margin-right: 4px;" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                            </svg>
                            Lieu :
                        </span>
                        <strong>{{session_lieu}}</strong>
                    </p>
                </div>
                
                <hr>
                
                <p><span class="label">Nom :</span>{{fullname}}</p>
                <p><span class="label">Email :</span><a href="mailto:{{email}}" style="color: #DC2626;">{{email}}</a></p>
                <p><span class="label">Téléphone portable :</span>{{phone_mobile}}</p>
                <p><span class="label">Téléphone fixe :</span>{{phone_fixed}}</p>
                <p><span class="label">Adresse :</span>{{address}}</p>
                
                <p class="label">Message :</p>
                <div class="message-box">
                    <p style="margin:0;">{{message}}</p>
                </div>
            </div>
            <div class="footer">
                Cet email a été envoyé depuis le formulaire de préinscription du site web.
            </div>
        </div>
    </div>
</body>
</html>
```

---

#### Template 4 : `preinscription-entreprise`

**Variables** : `{{formation}}`, `{{product_reference}}`, `{{session_date}}`, `{{session_lieu}}`, `{{session_reference}}`, `{{company_name}}`, `{{contact_lastname}}`, `{{contact_firstname}}`, `{{contact_fullname}}`, `{{contact_function}}`, `{{contact_email}}`, `{{contact_phone_mobile}}`, `{{contact_phone_fixed}}`, `{{siret}}`, `{{address}}`, `{{participant_list}}`, `{{message}}`

```html
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>Nouvelle Demande de Préinscription (Entreprise)</title>
    <style>
        body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; line-height: 1.6; color: #333333; background-color: #f7f7f7; margin: 0; padding: 0; }
        .wrapper { width: 100%; }
        .container { width: 90%; max-width: 600px; margin: 20px auto; border: 1px solid #dddddd; border-radius: 8px; overflow: hidden; background-color: #ffffff; }
        .header { background-color: #f4f4f4; padding: 20px; text-align: center; border-bottom: 1px solid #dddddd; }
        .header h1 { margin: 0; color: #DC2626; font-size: 24px; }
        .header .badge { display: inline-block; background: #DC2626; color: white; padding: 4px 12px; border-radius: 12px; font-size: 12px; font-weight: 600; margin-top: 8px; }
        .content { padding: 30px; }
        .content p { margin: 0 0 18px; }
        .content .label { font-weight: bold; color: #555555; display: block; margin-bottom: 4px; }
        .session-box { background-color: #fee2e2; border: 2px solid #DC2626; padding: 15px; border-radius: 5px; margin-bottom: 20px; }
        .section-title { font-size: 18px; font-weight: bold; color: #DC2626; margin: 25px 0 15px; padding-bottom: 8px; border-bottom: 2px solid #DC2626; }
        .message-box { background-color: #f9f9f9; border: 1px solid #eeeeee; padding: 15px; border-radius: 5px; margin-top: 10px; white-space: pre-wrap; }
        .footer { background-color: #f4f4f4; padding: 15px; text-align: center; font-size: 12px; color: #777777; }
        hr { border: 0; border-top: 1px solid #eeeeee; margin: 25px 0; }
    </style>
</head>
<body>
    <div class="wrapper">
        <div class="container">
            <div class="header">
                <h1>Nouvelle Demande de Préinscription</h1>
                <span class="badge">ENTREPRISE</span>
            </div>
            <div class="content">
                <div class="session-box">
                    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px;">
                        <span style="font-size: 0.9rem; font-weight: 600; color: #555;">
                            <svg style="width: 14px; height: 14px; display: inline; vertical-align: middle; margin-right: 6px;" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path>
                            </svg>
                            INFORMATIONS DE LA SESSION
                        </span>
                        <span style="background: #DC2626; color: white; padding: 4px 12px; border-radius: 12px; font-size: 0.85rem; font-weight: 700; letter-spacing: 0.5px;">{{session_reference}}</span>
                    </div>
                    <p style="margin: 0 0 8px;"><span class="label">Formation :</span><strong>{{formation}}</strong></p>
                    <p style="margin: 0 0 8px;"><span class="label">Référence produit :</span><strong style="color: #DC2626;">{{product_reference}}</strong></p>
                    <p style="margin: 0 0 8px;">
                        <span class="label">
                            <svg style="width: 14px; height: 14px; display: inline; vertical-align: middle; margin-right: 4px;" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                            </svg>
                            Date :
                        </span>
                        <strong>{{session_date}}</strong>
                    </p>
                    <p style="margin: 0;">
                        <span class="label">
                            <svg style="width: 14px; height: 14px; display: inline; vertical-align: middle; margin-right: 4px;" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                            </svg>
                            Lieu :
                        </span>
                        <strong>{{session_lieu}}</strong>
                    </p>
                </div>
                
                <div class="section-title">Informations Entreprise</div>
                <p><span class="label">Nom de l'entreprise :</span><strong>{{company_name}}</strong></p>
                <p><span class="label">SIRET :</span>{{siret}}</p>
                <p><span class="label">Adresse :</span>{{address}}</p>
                
                <p class="label">Liste des participants :</p>
                <div class="message-box">{{participant_list}}</div>
                
                <hr>
                
                <div class="section-title">Contact</div>
                <p><span class="label">Nom du contact :</span>{{contact_fullname}}</p>
                <p><span class="label">Fonction :</span>{{contact_function}}</p>
                <p><span class="label">Email :</span><a href="mailto:{{contact_email}}" style="color: #DC2626;">{{contact_email}}</a></p>
                <p><span class="label">Téléphone portable :</span>{{contact_phone_mobile}}</p>
                <p><span class="label">Téléphone fixe :</span>{{contact_phone_fixed}}</p>
                
                <p class="label">Message :</p>
                <div class="message-box">{{message}}</div>
            </div>
            <div class="footer">
                Cet email a été envoyé depuis le formulaire de préinscription du site web.
            </div>
        </div>
    </div>
</body>
</html>
```

### Test en Local

**Prérequis** :
- PHP installé sur la machine de développement
- Compte Mailgun actif avec clé API

**Lancement du Serveur** :
```bash
php -S localhost:8000
```

**Accès** : `http://localhost:8000`

⚠️ **Important** : Un serveur statique (Python, Node http-server) ne fonctionnera pas car il n'interprète pas le PHP.

### Réponses API

**Succès (HTTP 200)** :
```json
{
  "success": true,
  "message": "Votre message a été envoyé avec succès. Nous vous contacterons bientôt."
}
```

**Erreur (HTTP 400/500)** :
```json
{
  "success": false,
  "message": "Description de l'erreur"
}
```

### Création des Templates dans Mailgun

**Étapes pour créer chaque template** :

1. Connectez-vous à [Mailgun](https://app.mailgun.com)
2. Sélectionnez votre domaine (ex: `argalis.fr`)
3. Menu **Sending** → **Templates** → **Create Template**
4. Pour chaque template :
   - **Nom** : Utilisez exactement le nom du fichier sans `.html`
     - `devis-particulier`
     - `devis-entreprise`
     - `preinscription-particulier`
     - `preinscription-entreprise`
   - **Description** : Description libre (ex: "Template pour les demandes de devis particulier")
   - **Éditeur** : Cliquez sur l'onglet **HTML** (pas Visual)
   - **Contenu** : Copiez-collez tout le contenu du fichier correspondant depuis `/mailgun-templates/`
   - Cliquez sur **Save Template**

5. **Vérification** : Les 4 templates doivent apparaître dans votre liste avec le statut "active"

**Note importante** : Les noms des templates dans Mailgun doivent correspondre exactement aux noms utilisés dans `send-email.php` (ligne 186, 220, 275, 327).

### Checklist de Déploiement

- [ ] Configurer les variables dans `send-email.php`
- [ ] Créer les 4 templates dans Mailgun :
  - [ ] `devis-particulier`
  - [ ] `devis-entreprise`
  - [ ] `preinscription-particulier`
  - [ ] `preinscription-entreprise`
- [ ] Tester les 4 scénarios :
  - [ ] Devis Particulier
  - [ ] Devis Entreprise (avec API Sirene)
  - [ ] Préinscription Particulier
  - [ ] Préinscription Entreprise (avec liste participants)
- [ ] Vérifier la réception des emails avec les bons templates
- [ ] Tester le toggle Particulier/Entreprise
- [ ] Tester l'API Sirene (recherche par nom et SIRET)
- [ ] Tester la fermeture de la modale (X, Échap, clic dehors)
- [ ] Tester sur mobile (toggle responsive)

---

## 📄 Licence

Ce projet est développé pour Argalis Formation.

## 🤝 Support

Pour toute question ou assistance, contactez l'équipe de développement.
