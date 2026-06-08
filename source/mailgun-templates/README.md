# Templates Mailgun

Ce répertoire contient tous les templates HTML prêts à être copiés dans Mailgun.

## Templates disponibles

### 1. Templates de notification à l'organisme (4 fichiers)

Ces templates sont envoyés à l'organisme lorsqu'une demande est reçue :

- **`devis-particulier.html`** - Notification de demande de devis d'un particulier
- **`devis-entreprise.html`** - Notification de demande de devis d'une entreprise
- **`preinscription-particulier.html`** - Notification de préinscription d'un particulier
- **`preinscription-entreprise.html`** - Notification de préinscription d'une entreprise

### 2. Template de confirmation client (1 fichier)

Ce template est envoyé au client après sa demande :

- **`confirmation-demande.html`** - Email de confirmation universel envoyé au client

## Installation sur Mailgun

### Pour les templates de notification

1. Connectez-vous à Mailgun
2. Allez dans **Sending** → **Templates**
3. Créez un nouveau template avec le nom exact :
   - `devis-particulier`
   - `devis-entreprise`
   - `preinscription-particulier`
   - `preinscription-entreprise`
4. Copiez le contenu HTML du fichier correspondant
5. Sauvegardez

### Pour le template de confirmation

1. Connectez-vous à Mailgun
2. Allez dans **Sending** → **Templates**
3. Créez un nouveau template avec le nom : **`confirmation-demande`**
4. Copiez le contenu de `confirmation-demande.html`
5. Sauvegardez

## Variables Mustache utilisées

### Variables communes à tous les templates

#### Référence de la demande
- `{{demande_reference}}` - **Référence unique de la demande** générée automatiquement
  - Format : `TYPE-[ENT-]ANNÉE-TIMESTAMP`
  - Exemples :
    - `DEV-2025-1732636845123` (Devis Particulier)
    - `DEV-ENT-2025-1732636845456` (Devis Entreprise)
    - `PRE-2025-1732636845789` (Préinscription Particulier)
    - `PRE-ENT-2025-1732636846012` (Préinscription Entreprise)
  - Le timestamp en millisecondes garantit l'unicité et la traçabilité chronologique

#### Informations de contact
- `{{fullname}}` - Nom complet du contact
- `{{email}}` - Email du contact
- `{{phone_mobile}}` - Téléphone portable
- `{{phone_fixe}}` - Téléphone fixe (optionnel)

#### Informations formation
- `{{formation}}` - Titre de la formation
- `{{product_reference}}` - **Référence du produit** (commence par PRO-, ex: PRO-000001)
  - Pour les devis : récupérée depuis `formation.reference`
  - Pour les préinscriptions : convertie depuis `session.code_produit` via la fonction `getProductReferenceFromCode()`

#### Informations organisme
- `{{nomOrganisme}}` - Nom de l'organisme
- `{{emailOrganisme}}` - Email de contact
- `{{telephoneOrganisme}}` - Téléphone de l'organisme
- `{{adresseOrganisme}}` - Adresse de l'organisme

#### Couleurs dynamiques
- `{{primary_color}}` - Couleur principale (depuis organism.json)
- `{{primary_dark}}` - Couleur foncée (calculée automatiquement)
- `{{primary_light}}` - Couleur claire (calculée automatiquement)

### Variables spécifiques aux préinscriptions

- `{{session_date}}` - Date de la session
- `{{session_lieu}}` - Lieu de la session
- `{{session_reference}}` - Référence de la session (ex: SES-000920)

### Variables spécifiques aux entreprises

- `{{company_name}}` - Nom de l'entreprise
- `{{siret}}` - Numéro SIRET
- `{{address}}` - Adresse de l'entreprise
- `{{contact_fullname}}` - Nom complet du contact
- `{{contact_function}}` - Fonction du contact
- `{{participant_count}}` - Nombre de participants

### Template de confirmation client (`confirmation-demande.html`)

#### Variables supplémentaires
- `{{typeDemande}}` - Type de demande (ex: "demande de devis", "préinscription")
- `{{reference}}` - Référence unique de la demande (identique à `{{demande_reference}}`)
- `{{prenom}}` - Prénom du contact
- `{{nom}}` - Nom du contact
- `{{telephone}}` - Téléphone (optionnel)
- `{{logoUrl}}` - URL du logo de l'organisme
- `{{message}}` - Message optionnel du client

#### Variables conditionnelles

**Pour les préinscriptions** (`{{#isPreinscription}}...{{/isPreinscription}}`):
- `{{formationTitre}}` - Titre de la formation
- `{{sessionDate}}` - Date de la session
- `{{sessionLieu}}` - Lieu de la session

**Pour les entreprises** (`{{#isEntreprise}}...{{/isEntreprise}}`):
- `{{nomEntreprise}}` - Nom de l'entreprise
- `{{siret}}` - Numéro SIRET
- `{{nombreParticipants}}` - Nombre de participants

## Caractéristiques du template de confirmation

✅ **Design moderne et responsive**
- Compatible desktop, mobile et webmail
- Logo sur fond blanc pour visibilité maximale
- Icônes SVG wireframe

✅ **Couleurs dynamiques**
- Toutes les couleurs proviennent de `organism.json`
- Calcul automatique des variantes (foncé/clair)
- Cohérence visuelle garantie

✅ **Template universel**
- Un seul template pour tous les types de demandes
- Sections conditionnelles selon le contexte
- Texte simplifié sans mention "entreprise"

✅ **Branding Argalis**
- Mention "Propulsé par Argalis" en footer
- Lien vers www.argalis.fr

## Système de génération des références

### Fonctionnement technique

Les références de demande sont générées automatiquement côté serveur dans `send-email.php` :

```php
$timestamp = round(microtime(true) * 1000); // Timestamp en millisecondes
$demandReference = strtoupper($formType === 'devis' ? 'DEV' : 'PRE') . 
                   ($userType === 'entreprise' ? '-ENT' : '') . 
                   '-' . date('Y') . '-' . 
                   $timestamp;
```

### Format de la référence

**Structure :** `TYPE-[ENT-]ANNÉE-TIMESTAMP`

| Composant | Description | Exemple |
|-----------|-------------|---------|
| **TYPE** | Type de demande (DEV ou PRE) | `DEV` ou `PRE` |
| **ENT** | Optionnel, présent pour les entreprises | `-ENT` |
| **ANNÉE** | Année courante | `2025` |
| **TIMESTAMP** | Millisecondes depuis epoch Unix | `1732636845123` |

### Avantages du système

✅ **Unicité garantie**
- Le timestamp en millisecondes rend les collisions quasi-impossibles
- Pas besoin de base de données pour gérer un compteur

✅ **Traçabilité chronologique**
- Les références sont automatiquement triées par ordre de création
- Possibilité de retrouver la date/heure exacte de la demande

✅ **Simplicité**
- Génération instantanée sans dépendance externe
- Pas de gestion de fichiers ou de verrous

✅ **Lisibilité**
- Format clair et structuré
- Identification immédiate du type de demande

### Affichage dans les templates

La référence est affichée dans un badge bien visible juste après le header :

- **Badge avec bordure pointillée** de la couleur primaire
- **Police monospace** pour un aspect technique
- **Centré** pour une meilleure visibilité
- **Présent dans les 5 templates** (4 notifications + 1 confirmation)

## Notes importantes

- Les noms des templates dans Mailgun doivent correspondre exactement à ceux utilisés dans `send-email.php`
- Les variables Mustache `{{variable}}` sont automatiquement remplacées par Mailgun
- Le template de confirmation est envoyé automatiquement après chaque demande réussie
- La référence de la demande est générée une seule fois et partagée entre le template de notification et le template de confirmation
