// Données fictives pour le mode démo et les cas sans données réelles
// Ces données sont utilisées quand aucun produit/session réel n'est disponible

// Fonction pour générer des dates dynamiques (aujourd'hui + X mois)
function getFictiveDate(monthsOffset, dayOffset = 0) {
  const date = new Date();
  date.setMonth(date.getMonth() + monthsOffset);
  date.setDate(date.getDate() + dayOffset);
  return date.toISOString().split('T')[0]; // Format YYYY-MM-DD
}

// 4 Produits fictifs
const fictiveFormations = [
  {
    reference: "DEMO-SST-001",
    code_produit: "SST-DEMO",
    libelle: "Sauveteur Secouriste du Travail (SST) - Formation Initiale",
    titre: "Sauveteur Secouriste du Travail (SST) - Formation Initiale",
    produit_secteur: "Santé et Sécurité au Travail",
    produit_famille: "Secourisme",
    produit_groupe: "SST",
    categorie: "Santé et Sécurité au Travail",
    famille: "Secourisme",
    groupe: "SST",
    duree_heure: "14h",
    duree_heures: "14h",
    duree_jours: "2",
    prix_apprenant: "250",
    prix_groupe: "1800",
    prix: {
      apprenant: "250",
      groupe: "1800"
    },
    public_vise: "Tout salarié souhaitant devenir Sauveteur Secouriste du Travail",
    prerequis: "Aucun prérequis nécessaire",
    objectif_formation: "Être capable d'intervenir efficacement face à une situation d'accident\nAcquérir les connaissances nécessaires à la prévention des risques\nMettre en application ses compétences au profit de la santé et sécurité au travail",
    objectifs: [
      "Être capable d'intervenir efficacement face à une situation d'accident",
      "Acquérir les connaissances nécessaires à la prévention des risques",
      "Mettre en application ses compétences au profit de la santé et sécurité au travail"
    ],
    programme: "Protéger|Examiner|Faire alerter|Secourir",
    contenu: [
      "Protéger",
      "Examiner",
      "Faire alerter",
      "Secourir"
    ],
    modalite_pedagogique: "Présentiel",
    modalites: ["Présentiel"],
    certification: "Certificat SST valable 24 mois",
    certifiante: true,
    actif: true,
    publication_site_web: true,
    // Statistiques de satisfaction fictives (6 indicateurs)
    satisfaction_intervenant: "98",
    satisfaction_pedagogie: "96",
    satisfaction_contenu: "97",
    satisfaction_obj: "95",
    taux_presence: "99",
    reussite: "100"
  },
  {
    reference: "DEMO-GP-002",
    code_produit: "GP-DEMO",
    libelle: "Gestes et Postures - Prévention des TMS",
    titre: "Gestes et Postures - Prévention des TMS",
    produit_secteur: "Santé et Sécurité au Travail",
    produit_famille: "Prévention",
    produit_groupe: "Ergonomie",
    categorie: "Santé et Sécurité au Travail",
    famille: "Prévention",
    groupe: "Ergonomie",
    duree_heure: "7h",
    duree_heures: "7h",
    duree_jours: "1",
    prix_apprenant: "180",
    prix_groupe: "1200",
    prix: {
      apprenant: "180",
      groupe: "1200"
    },
    public_vise: "Tout salarié exposé à des risques liés aux gestes et postures",
    prerequis: "Aucun prérequis nécessaire",
    objectif_formation: "Identifier les risques liés aux gestes et postures\nAppliquer les principes de sécurité physique et d'économie d'effort\nAdopter les bonnes pratiques pour préserver sa santé",
    objectifs: [
      "Identifier les risques liés aux gestes et postures",
      "Appliquer les principes de sécurité physique et d'économie d'effort",
      "Adopter les bonnes pratiques pour préserver sa santé"
    ],
    programme: "Notions d'anatomie|Principes de sécurité physique|Techniques de manutention|Exercices pratiques",
    contenu: [
      "Notions d'anatomie",
      "Principes de sécurité physique",
      "Techniques de manutention",
      "Exercices pratiques"
    ],
    modalite_pedagogique: "Présentiel",
    modalites: ["Présentiel"],
    certification: "Attestation de formation",
    certifiante: false,
    actif: true,
    publication_site_web: true,
    // Statistiques de satisfaction fictives (6 indicateurs)
    satisfaction_intervenant: "95",
    satisfaction_pedagogie: "93",
    satisfaction_contenu: "94",
    satisfaction_obj: "92",
    taux_presence: "97",
    reussite: "98"
  },
  {
    reference: "DEMO-MGT-003",
    code_produit: "MGT-DEMO",
    libelle: "Management d'Équipe - Les Fondamentaux",
    titre: "Management d'Équipe - Les Fondamentaux",
    produit_secteur: "Management et Leadership",
    produit_famille: "Management opérationnel",
    produit_groupe: "Management d'équipe",
    categorie: "Management et Leadership",
    famille: "Management opérationnel",
    groupe: "Management d'équipe",
    duree_heure: "21h",
    duree_heures: "21h",
    duree_jours: "3",
    prix_apprenant: "890",
    prix_groupe: "2400",
    prix: {
      apprenant: "890",
      groupe: "2400"
    },
    public_vise: "Managers, chefs d'équipe, responsables d'unité",
    prerequis: "Être en situation de management ou sur le point de l'être",
    objectif_formation: "Développer ses compétences managériales\nMotiver et fédérer son équipe\nGérer les situations difficiles\nCommuniquer efficacement avec son équipe",
    objectifs: [
      "Développer ses compétences managériales",
      "Motiver et fédérer son équipe",
      "Gérer les situations difficiles",
      "Communiquer efficacement avec son équipe"
    ],
    programme: "Les styles de management|La communication managériale|La motivation d'équipe|La gestion des conflits|Le pilotage de la performance",
    contenu: [
      "Les styles de management",
      "La communication managériale",
      "La motivation d'équipe",
      "La gestion des conflits",
      "Le pilotage de la performance"
    ],
    modalite_pedagogique: "Présentiel|Distanciel",
    modalites: ["Présentiel", "Distanciel"],
    certification: "Attestation de formation",
    certifiante: false,
    actif: true,
    publication_site_web: true,
    // Statistiques de satisfaction fictives (6 indicateurs)
    satisfaction_intervenant: "97",
    satisfaction_pedagogie: "95",
    satisfaction_contenu: "96",
    satisfaction_obj: "94",
    taux_presence: "98",
    reussite: "96"
  },
  {
    reference: "DEMO-GP-004",
    code_produit: "GPRO-DEMO",
    libelle: "Gestion de Projet - Méthodes Agiles",
    titre: "Gestion de Projet - Méthodes Agiles",
    produit_secteur: "Management et Leadership",
    produit_famille: "Gestion de projet",
    produit_groupe: "Méthodes agiles",
    categorie: "Management et Leadership",
    famille: "Gestion de projet",
    groupe: "Méthodes agiles",
    duree_heure: "14h",
    duree_heures: "14h",
    duree_jours: "2",
    prix_apprenant: "750",
    prix_groupe: "2100",
    prix: {
      apprenant: "750",
      groupe: "2100"
    },
    public_vise: "Chefs de projet, Product Owners, Scrum Masters",
    prerequis: "Connaissances de base en gestion de projet",
    objectif_formation: "Comprendre les principes des méthodes agiles\nMettre en œuvre Scrum dans ses projets\nAnimer des cérémonies agiles\nPiloter un projet en mode agile",
    objectifs: [
      "Comprendre les principes des méthodes agiles",
      "Mettre en œuvre Scrum dans ses projets",
      "Animer des cérémonies agiles",
      "Piloter un projet en mode agile"
    ],
    programme: "Introduction à l'agilité|Le framework Scrum|Les rôles agiles|Les cérémonies|Les outils agiles|Mise en pratique",
    contenu: [
      "Introduction à l'agilité",
      "Le framework Scrum",
      "Les rôles agiles",
      "Les cérémonies",
      "Les outils agiles",
      "Mise en pratique"
    ],
    modalite_pedagogique: "Présentiel|Distanciel",
    modalites: ["Présentiel", "Distanciel"],
    certification: "Attestation de formation",
    certifiante: false,
    actif: true,
    publication_site_web: true,
    // Statistiques de satisfaction fictives (6 indicateurs)
    satisfaction_intervenant: "94",
    satisfaction_pedagogie: "92",
    satisfaction_contenu: "93",
    satisfaction_obj: "91",
    taux_presence: "96",
    reussite: "97"
  },
  {
    reference: "DEMO-INC-005",
    code_produit: "INC-DEMO",
    libelle: "Incendie - Équipier de Première Intervention (EPI)",
    titre: "Incendie - Équipier de Première Intervention (EPI)",
    produit_secteur: "Santé et Sécurité au Travail",
    produit_famille: "Incendie",
    produit_groupe: "EPI",
    categorie: "Santé et Sécurité au Travail",
    famille: "Incendie",
    groupe: "EPI",
    duree_heure: "7h",
    duree_heures: "7h",
    duree_jours: "1",
    prix_apprenant: "200",
    prix_groupe: "1400",
    prix: {
      apprenant: "200",
      groupe: "1400"
    },
    public_vise: "Tout salarié désigné pour intervenir en cas de début d'incendie",
    prerequis: "Aucun prérequis nécessaire",
    objectif_formation: "Connaître les consignes de sécurité incendie\nManipuler les extincteurs et RIA\nDonner l'alerte et organiser l'évacuation",
    objectifs: [
      "Connaître les consignes de sécurité incendie",
      "Manipuler les extincteurs et RIA",
      "Donner l'alerte et organiser l'évacuation"
    ],
    programme: "Le feu et ses conséquences|Les moyens d'extinction|L'évacuation|Exercices pratiques",
    contenu: [
      "Le feu et ses conséquences",
      "Les moyens d'extinction",
      "L'évacuation",
      "Exercices pratiques"
    ],
    modalite_pedagogique: "Présentiel",
    modalites: ["Présentiel"],
    certification: "Attestation de formation",
    certifiante: false,
    actif: true,
    publication_site_web: true,
    satisfaction_intervenant: "96",
    satisfaction_pedagogie: "94",
    satisfaction_contenu: "95",
    satisfaction_obj: "93",
    taux_presence: "98",
    reussite: "99"
  },
  {
    reference: "DEMO-COM-006",
    code_produit: "COM-DEMO",
    libelle: "Communication Interpersonnelle",
    titre: "Communication Interpersonnelle",
    produit_secteur: "Management et Leadership",
    produit_famille: "Communication",
    produit_groupe: "Relations professionnelles",
    categorie: "Management et Leadership",
    famille: "Communication",
    groupe: "Relations professionnelles",
    duree_heure: "14h",
    duree_heures: "14h",
    duree_jours: "2",
    prix_apprenant: "680",
    prix_groupe: "1900",
    prix: {
      apprenant: "680",
      groupe: "1900"
    },
    public_vise: "Managers, collaborateurs souhaitant améliorer leur communication",
    prerequis: "Aucun prérequis nécessaire",
    objectif_formation: "Développer son écoute active\nS'affirmer avec assertivité\nGérer les situations difficiles\nAdapter sa communication à son interlocuteur",
    objectifs: [
      "Développer son écoute active",
      "S'affirmer avec assertivité",
      "Gérer les situations difficiles",
      "Adapter sa communication à son interlocuteur"
    ],
    programme: "Les fondamentaux de la communication|L'écoute active|L'assertivité|La communication non verbale|Gérer les conflits",
    contenu: [
      "Les fondamentaux de la communication",
      "L'écoute active",
      "L'assertivité",
      "La communication non verbale",
      "Gérer les conflits"
    ],
    modalite_pedagogique: "Présentiel|Distanciel",
    modalites: ["Présentiel", "Distanciel"],
    certification: "Attestation de formation",
    certifiante: false,
    actif: true,
    publication_site_web: true,
    satisfaction_intervenant: "96",
    satisfaction_pedagogie: "95",
    satisfaction_contenu: "94",
    satisfaction_obj: "93",
    taux_presence: "97",
    reussite: "95"
  },
  {
    reference: "DEMO-HAR-007",
    code_produit: "HAR-DEMO",
    libelle: "Habilitation Électrique - Personnel Non Électricien (H0B0)",
    titre: "Habilitation Électrique - Personnel Non Électricien (H0B0)",
    produit_secteur: "Santé et Sécurité au Travail",
    produit_famille: "Habilitation électrique",
    produit_groupe: "Non électricien",
    categorie: "Santé et Sécurité au Travail",
    famille: "Habilitation électrique",
    groupe: "Non électricien",
    duree_heure: "7h",
    duree_heures: "7h",
    duree_jours: "1",
    prix_apprenant: "220",
    prix_groupe: "1500",
    prix: {
      apprenant: "220",
      groupe: "1500"
    },
    public_vise: "Personnel non électricien travaillant à proximité d'installations électriques",
    prerequis: "Aucun prérequis nécessaire",
    objectif_formation: "Connaître les dangers de l'électricité\nIdentifier les zones à risques électriques\nAppliquer les consignes de sécurité\nObtenir l'habilitation H0B0",
    objectifs: [
      "Connaître les dangers de l'électricité",
      "Identifier les zones à risques électriques",
      "Appliquer les consignes de sécurité",
      "Obtenir l'habilitation H0B0"
    ],
    programme: "Notions d'électricité|Les dangers de l'électricité|Les zones à risques|Les mesures de prévention|Évaluation pratique",
    contenu: [
      "Notions d'électricité",
      "Les dangers de l'électricité",
      "Les zones à risques",
      "Les mesures de prévention",
      "Évaluation pratique"
    ],
    modalite_pedagogique: "Présentiel",
    modalites: ["Présentiel"],
    certification: "Titre d'habilitation H0B0",
    certifiante: true,
    actif: true,
    publication_site_web: true,
    satisfaction_intervenant: "97",
    satisfaction_pedagogie: "95",
    satisfaction_contenu: "96",
    satisfaction_obj: "94",
    taux_presence: "99",
    reussite: "98"
  },
  {
    reference: "DEMO-LEA-008",
    code_produit: "LEA-DEMO",
    libelle: "Leadership et Motivation d'Équipe",
    titre: "Leadership et Motivation d'Équipe",
    produit_secteur: "Management et Leadership",
    produit_famille: "Leadership",
    produit_groupe: "Développement personnel",
    categorie: "Management et Leadership",
    famille: "Leadership",
    groupe: "Développement personnel",
    duree_heure: "21h",
    duree_heures: "21h",
    duree_jours: "3",
    prix_apprenant: "950",
    prix_groupe: "2600",
    prix: {
      apprenant: "950",
      groupe: "2600"
    },
    public_vise: "Managers, chefs de projet, responsables d'équipe",
    prerequis: "Expérience en management souhaitée",
    objectif_formation: "Développer son leadership\nMotiver et fédérer son équipe\nInspirer et donner du sens\nCréer une dynamique collective positive",
    objectifs: [
      "Développer son leadership",
      "Motiver et fédérer son équipe",
      "Inspirer et donner du sens",
      "Créer une dynamique collective positive"
    ],
    programme: "Les styles de leadership|La motivation individuelle et collective|La vision et le sens|L'intelligence émotionnelle|La conduite du changement",
    contenu: [
      "Les styles de leadership",
      "La motivation individuelle et collective",
      "La vision et le sens",
      "L'intelligence émotionnelle",
      "La conduite du changement"
    ],
    modalite_pedagogique: "Présentiel|Distanciel",
    modalites: ["Présentiel", "Distanciel"],
    certification: "Attestation de formation",
    certifiante: false,
    actif: true,
    publication_site_web: true,
    satisfaction_intervenant: "98",
    satisfaction_pedagogie: "96",
    satisfaction_contenu: "97",
    satisfaction_obj: "95",
    taux_presence: "98",
    reussite: "96"
  }
];

// 8 Sessions fictives avec variations
const fictiveSessions = [
  {
    reference: "DEMO-SES-001",
    code_produit: "SST-DEMO",
    libelleproduit: "Sauveteur Secouriste du Travail (SST) - Formation Initiale",
    j1: getFictiveDate(2, 5), // Dans 2 mois + 5 jours
    jdernier: getFictiveDate(2, 6),   // Dans 2 mois + 6 jours
    statut: "CONFIRMÉ",
    ville: "Paris",
    code_postale: "75001",
    lieu_formation: "Centre de Formation Argalis",
    session_duree_heures: "14h",
    session_duree_jours: "2",
    libellemodalite: "Présentiel",
    publication_session_site_web: true,
    publication_places_site_web: true,
    nbdispo_preinscrit: 8,
    effectif_maxi: 12
  },
  {
    reference: "DEMO-SES-002",
    code_produit: "GP-DEMO",
    libelleproduit: "Gestes et Postures - Prévention des TMS",
    j1: getFictiveDate(2, 12), // Dans 2 mois + 12 jours
    jdernier: getFictiveDate(2, 12),   // Même jour (formation 1 jour)
    statut: "PRÉVISIONNEL",
    ville: "Lyon",
    code_postale: "69002",
    lieu_formation: "Espace Formation Lyon",
    session_duree_heures: "7h",
    session_duree_jours: "1",
    libellemodalite: "Présentiel",
    publication_session_site_web: true,
    publication_places_site_web: true,
    nbdispo_preinscrit: 5,
    effectif_maxi: 10
  },
  {
    reference: "DEMO-SES-003",
    code_produit: "MGT-DEMO",
    libelleproduit: "Management d'Équipe - Les Fondamentaux",
    j1: getFictiveDate(3, 1), // Dans 3 mois + 1 jour
    jdernier: getFictiveDate(3, 3),   // Dans 3 mois + 3 jours
    statut: "CONFIRMÉ",
    ville: "Bordeaux",
    code_postale: "33000",
    lieu_formation: "Campus Argalis Bordeaux",
    session_duree_heures: "21h",
    session_duree_jours: "3",
    libellemodalite: "Présentiel",
    publication_session_site_web: true,
    publication_places_site_web: false, // Places non publiées
    nbdispo_preinscrit: null,
    effectif_maxi: null
  },
  {
    reference: "DEMO-SES-004",
    code_produit: "GPRO-DEMO",
    libelleproduit: "Gestion de Projet - Méthodes Agiles",
    j1: getFictiveDate(3, 15), // Dans 3 mois + 15 jours
    jdernier: getFictiveDate(3, 16),   // Dans 3 mois + 16 jours
    statut: "PRÉVISIONNEL",
    ville: "Toulouse",
    code_postale: "31000",
    lieu_formation: "Centre Argalis Toulouse",
    session_duree_heures: "14h",
    session_duree_jours: "2",
    libellemodalite: "Distanciel",
    publication_session_site_web: true,
    publication_places_site_web: false, // Places non publiées
    nbdispo_preinscrit: null,
    effectif_maxi: null
  },
  {
    reference: "DEMO-SES-005",
    code_produit: "INC-DEMO",
    libelleproduit: "Incendie - Équipier de Première Intervention (EPI)",
    j1: getFictiveDate(2, 20), // Dans 2 mois + 20 jours
    jdernier: getFictiveDate(2, 20),   // Même jour (formation 1 jour)
    statut: "CONFIRMÉ",
    ville: "Marseille",
    code_postale: "13001",
    lieu_formation: "Centre Argalis Marseille",
    session_duree_heures: "7h",
    session_duree_jours: "1",
    libellemodalite: "Présentiel",
    publication_session_site_web: true,
    publication_places_site_web: true,
    nbdispo_preinscrit: 6,
    effectif_maxi: 10
  },
  {
    reference: "DEMO-SES-006",
    code_produit: "COM-DEMO",
    libelleproduit: "Communication Interpersonnelle",
    j1: getFictiveDate(3, 8), // Dans 3 mois + 8 jours
    jdernier: getFictiveDate(3, 9),   // Dans 3 mois + 9 jours
    statut: "PRÉVISIONNEL",
    ville: "Nantes",
    code_postale: "44000",
    lieu_formation: "Espace Formation Nantes",
    session_duree_heures: "14h",
    session_duree_jours: "2",
    libellemodalite: "Présentiel",
    publication_session_site_web: true,
    publication_places_site_web: true,
    nbdispo_preinscrit: 4,
    effectif_maxi: 12
  },
  {
    reference: "DEMO-SES-007",
    code_produit: "HAR-DEMO",
    libelleproduit: "Habilitation Électrique - Personnel Non Électricien (H0B0)",
    j1: getFictiveDate(3, 20), // Dans 3 mois + 20 jours
    jdernier: getFictiveDate(3, 20),   // Même jour (formation 1 jour)
    statut: "CONFIRMÉ",
    ville: "Lille",
    code_postale: "59000",
    lieu_formation: "Campus Argalis Lille",
    session_duree_heures: "7h",
    session_duree_jours: "1",
    libellemodalite: "Présentiel",
    publication_session_site_web: true,
    publication_places_site_web: false, // Places non publiées
    nbdispo_preinscrit: null,
    effectif_maxi: null
  },
  {
    reference: "DEMO-SES-008",
    code_produit: "LEA-DEMO",
    libelleproduit: "Leadership et Motivation d'Équipe",
    j1: getFictiveDate(4, 5), // Dans 4 mois + 5 jours
    jdernier: getFictiveDate(4, 7),   // Dans 4 mois + 7 jours
    statut: "PRÉVISIONNEL",
    ville: "Strasbourg",
    code_postale: "67000",
    lieu_formation: "Centre Argalis Strasbourg",
    session_duree_heures: "21h",
    session_duree_jours: "3",
    libellemodalite: "Distanciel",
    publication_session_site_web: true,
    publication_places_site_web: true,
    nbdispo_preinscrit: 7,
    effectif_maxi: 15
  }
];

// Fonction pour obtenir les données fictives
function getFictiveData() {
  return {
    formations: fictiveFormations,
    sessions: fictiveSessions
  };
}
