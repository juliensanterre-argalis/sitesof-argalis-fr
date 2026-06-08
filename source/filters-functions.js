// Fonctions pour les filtres avancés

// Toggle l'affichage du panneau de filtres
function toggleFilters() {
  showFilters = !showFilters;
  renderCatalogue(formationsData);
  // L'initialisation des sliders est gérée dans renderCatalogue()
}

// Compter les filtres actifs
function getActiveFiltersCount() {
  let count = 0;
  if (advancedFilters.secteur) count++;
  if (advancedFilters.famille) count++;
  if (advancedFilters.groupe) count++;
  
  // Pour la durée, vérifier si les valeurs sont différentes des valeurs par défaut
  if (advancedFilters.dureeMin !== null || advancedFilters.dureeMax !== null) {
    const dureeType = advancedFilters.dureeType || 'heures';
    const dureeRange = getDureeRange(dureeType);
    if (advancedFilters.dureeMin !== dureeRange.min || advancedFilters.dureeMax !== dureeRange.max) {
      count++;
    }
  }
  
  if (advancedFilters.prixType) count++;
  
  // Pour le prix, vérifier si les valeurs sont différentes des valeurs par défaut
  if (advancedFilters.prixMin !== null || advancedFilters.prixMax !== null) {
    const prixRange = getPrixRange(advancedFilters.prixType);
    if (advancedFilters.prixMin !== prixRange.min || advancedFilters.prixMax !== prixRange.max) {
      count++;
    }
  }
  
  if (advancedFilters.certifiante) count++;
  return count;
}

// Obtenir la liste des secteurs uniques
function getSecteurs() {
  const secteurs = [...new Set(formationsData.map(f => f.categorie))];
  return secteurs.filter(s => s).sort();
}

// Obtenir la liste des familles pour un secteur donné
function getFamilles(secteur) {
  if (!secteur) return [];
  const familles = [...new Set(
    formationsData
      .filter(f => f.categorie === secteur)
      .map(f => f.famille)
  )];
  return familles.filter(f => f).sort();
}

// Obtenir la liste des groupes pour une famille donnée
function getGroupes(secteur, famille) {
  if (!secteur || !famille) return [];
  const groupes = [...new Set(
    formationsData
      .filter(f => f.categorie === secteur && f.famille === famille)
      .map(f => f.groupe)
  )];
  return groupes.filter(g => g).sort();
}

// Obtenir les valeurs min/max pour la durée (heures ou jours)
function getDureeRange(type = 'heures') {
  console.log(`🎯 getDureeRange appelé avec type: ${type}`);
  let durees;
  
  if (type === 'jours') {
    console.log(`🔍 Recherche des durées en jours dans formationsData (${formationsData.length} formations)`);
    const allDureeJours = formationsData.map(f => f.duree_jours);
    console.log(`📋 Exemples de duree_jours:`, allDureeJours.slice(0, 5));
    
    durees = formationsData
      .map(f => parseDureeJours(f.duree_jours))
      .filter(d => d !== null);
    console.log(`📊 Durées en jours parsées:`, durees.slice(0, 10), `Total: ${durees.length}`);
  } else {
    durees = formationsData
      .map(f => parseDuree(f.duree_heures))
      .filter(d => d !== null);
  }
  
  if (durees.length === 0) {
    console.warn(`⚠️ Aucune durée trouvée pour le type: ${type}`);
    return { min: 0, max: type === 'jours' ? 10 : 100 };
  }
  
  const result = {
    min: Math.floor(Math.min(...durees)),
    max: Math.ceil(Math.max(...durees))
  };
  
  console.log(`📏 Range calculé pour ${type}:`, result);
  
  return result;
}

// Obtenir les valeurs min/max pour le prix selon le type
function getPrixRange(type) {
  let prix = [];
  
  if (type === 'apprenant') {
    prix = formationsData
      .map(f => parsePrix(f.prix.apprenant))
      .filter(p => p !== null);
  } else if (type === 'groupe') {
    prix = formationsData
      .map(f => parsePrix(f.prix.groupe))
      .filter(p => p !== null);
  } else {
    // Si aucun type, prendre tous les prix
    prix = formationsData
      .flatMap(f => [parsePrix(f.prix.apprenant), parsePrix(f.prix.groupe)])
      .filter(p => p !== null);
  }
  
  if (prix.length === 0) return { min: 0, max: 5000 };
  
  return {
    min: Math.floor(Math.min(...prix) / 100) * 100, // Arrondi à la centaine inférieure
    max: Math.ceil(Math.max(...prix) / 100) * 100   // Arrondi à la centaine supérieure
  };
}

// Mettre à jour un filtre
function updateFilter(filterName, value) {
  if (value === '' || value === null) {
    advancedFilters[filterName] = null;
  } else if (filterName === 'certifiante') {
    advancedFilters[filterName] = value;
  } else {
    advancedFilters[filterName] = value;
  }
  
  // Si on change le secteur, réinitialiser famille et groupe
  if (filterName === 'secteur') {
    advancedFilters.famille = null;
    advancedFilters.groupe = null;
  }
  
  // Si on change la famille, réinitialiser groupe
  if (filterName === 'famille') {
    advancedFilters.groupe = null;
  }
  
  // Si on change le type de prix, recalculer la plage de prix
  if (filterName === 'prixType') {
    advancedFilters.prixMin = null;
    advancedFilters.prixMax = null;
  }
  
  // Si on change le type de durée, recalculer la plage de durée
  if (filterName === 'dureeType') {
    advancedFilters.dureeMin = null;
    advancedFilters.dureeMax = null;
  }
  
  renderCatalogue(formationsData);
}

// Mettre à jour le slider de durée
function updateDureeSlider(min, max) {
  // Ne rien faire si les valeurs n'ont pas changé
  if (advancedFilters.dureeMin === min && advancedFilters.dureeMax === max) return;
  
  advancedFilters.dureeMin = min;
  advancedFilters.dureeMax = max;
  
  // Mettre à jour uniquement la grille de formations, pas tout le catalogue
  updateFormationsGrid();
  
  // Mettre à jour le bouton "Réinitialiser les filtres"
  updateResetButton();
  
  // Mettre à jour les badges de filtres actifs
  updateFilterBadges();
}

// Mettre à jour le slider de prix
function updatePrixSlider(min, max) {
  // Ne rien faire si les valeurs n'ont pas changé
  if (advancedFilters.prixMin === min && advancedFilters.prixMax === max) return;
  
  advancedFilters.prixMin = min;
  advancedFilters.prixMax = max;
  
  // Mettre à jour uniquement la grille de formations, pas tout le catalogue
  updateFormationsGrid();
  
  // Mettre à jour le bouton "Réinitialiser les filtres"
  updateResetButton();
  
  // Mettre à jour les badges de filtres actifs
  updateFilterBadges();
}

// Mettre à jour les badges de filtres actifs
function updateFilterBadges() {
  const badgesContainer = document.querySelector('.filter-badges-container');
  if (!badgesContainer) return;
  
  // Régénérer les badges
  badgesContainer.innerHTML = renderActiveFiltersBadges();
  
  // Mettre à jour le badge du bouton "Filtres avancés"
  updateFilterButtonBadge();
}

// Mettre à jour le badge du bouton "Filtres avancés"
function updateFilterButtonBadge() {
  const filterButton = document.querySelector('button[onclick="toggleFilters()"]');
  if (!filterButton) return;
  
  const activeCount = getActiveFiltersCount();
  
  // Chercher le badge existant
  const existingBadge = filterButton.querySelector('.badge');
  
  if (activeCount > 0) {
    if (existingBadge) {
      // Mettre à jour le nombre
      existingBadge.textContent = activeCount;
    } else {
      // Ajouter le badge
      const badgeHTML = `<span class="badge badge-default" style="margin-left: 0.25rem;">${activeCount}</span>`;
      filterButton.insertAdjacentHTML('beforeend', badgeHTML);
    }
  } else if (existingBadge) {
    // Supprimer le badge si aucun filtre actif
    existingBadge.remove();
  }
}

// Mettre à jour le bouton "Réinitialiser les filtres"
function updateResetButton() {
  const filtersPanelContent = document.querySelector('#filters-panel .card-content');
  if (!filtersPanelContent) return;
  
  const activeCount = getActiveFiltersCount();
  const existingButtonContainer = filtersPanelContent.querySelector('.reset-filters-container');
  
  if (activeCount > 0 && !existingButtonContainer) {
    // Ajouter le bouton
    const buttonHTML = `
      <div class="reset-filters-container" style="margin-top: 1.5rem; text-align: right;">
        <button onclick="resetFilters()" class="btn btn-outline" style="font-size: 0.875rem;">
          <svg style="width: 1rem; height: 1rem; display: inline; margin-right: 0.25rem;" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
          </svg>
          Réinitialiser les filtres
        </button>
      </div>
    `;
    filtersPanelContent.insertAdjacentHTML('beforeend', buttonHTML);
  } else if (activeCount === 0 && existingButtonContainer) {
    // Supprimer le bouton
    existingButtonContainer.remove();
  }
}

// Réinitialiser tous les filtres
function resetFilters() {
  advancedFilters = {
    secteur: null,
    famille: null,
    groupe: null,
    dureeType: 'heures',
    dureeMin: null,
    dureeMax: null,
    prixType: null,
    prixMin: null,
    prixMax: null,
    certifiante: null
  };
  renderCatalogue(formationsData);
}

// Supprimer un filtre spécifique
function removeFilter(filterName) {
  advancedFilters[filterName] = null;
  renderCatalogue(formationsData);
}

// Rendre les badges des filtres actifs
function renderActiveFiltersBadges() {
  const badges = [];
  
  if (advancedFilters.secteur) {
    badges.push(`
      <span class="badge badge-secondary" style="display: inline-flex; align-items: center; gap: 0.25rem; margin-right: 0.5rem; margin-bottom: 0.5rem;">
        Secteur: ${advancedFilters.secteur}
        <button onclick="removeFilter('secteur')" style="background: none; border: none; cursor: pointer; padding: 0; display: flex; align-items: center;">
          <svg style="width: 0.875rem; height: 0.875rem;" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </button>
      </span>
    `);
  }
  
  if (advancedFilters.famille) {
    badges.push(`
      <span class="badge badge-secondary" style="display: inline-flex; align-items: center; gap: 0.25rem; margin-right: 0.5rem; margin-bottom: 0.5rem;">
        Famille: ${advancedFilters.famille}
        <button onclick="removeFilter('famille')" style="background: none; border: none; cursor: pointer; padding: 0; display: flex; align-items: center;">
          <svg style="width: 0.875rem; height: 0.875rem;" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </button>
      </span>
    `);
  }
  
  if (advancedFilters.groupe) {
    badges.push(`
      <span class="badge badge-secondary" style="display: inline-flex; align-items: center; gap: 0.25rem; margin-right: 0.5rem; margin-bottom: 0.5rem;">
        Groupe: ${advancedFilters.groupe}
        <button onclick="removeFilter('groupe')" style="background: none; border: none; cursor: pointer; padding: 0; display: flex; align-items: center;">
          <svg style="width: 0.875rem; height: 0.875rem;" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </button>
      </span>
    `);
  }
  
  if (advancedFilters.dureeMin !== null || advancedFilters.dureeMax !== null) {
    const dureeType = advancedFilters.dureeType || 'heures';
    const dureeRange = getDureeRange(dureeType);
    const min = advancedFilters.dureeMin !== null ? advancedFilters.dureeMin : dureeRange.min;
    const max = advancedFilters.dureeMax !== null ? advancedFilters.dureeMax : dureeRange.max;
    const unit = dureeType === 'jours' ? 'j' : 'h';
    badges.push(`
      <span class="badge badge-secondary" style="display: inline-flex; align-items: center; gap: 0.25rem; margin-right: 0.5rem; margin-bottom: 0.5rem;">
        Durée: ${min}${unit} - ${max}${unit}
        <button onclick="removeFilter('dureeMin'); removeFilter('dureeMax');" style="background: none; border: none; cursor: pointer; padding: 0; display: flex; align-items: center;">
          <svg style="width: 0.875rem; height: 0.875rem;" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </button>
      </span>
    `);
  }
  
  if (advancedFilters.prixType) {
    badges.push(`
      <span class="badge badge-secondary" style="display: inline-flex; align-items: center; gap: 0.25rem; margin-right: 0.5rem; margin-bottom: 0.5rem;">
        Tarif: Par ${advancedFilters.prixType}
        <button onclick="removeFilter('prixType')" style="background: none; border: none; cursor: pointer; padding: 0; display: flex; align-items: center;">
          <svg style="width: 0.875rem; height: 0.875rem;" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </button>
      </span>
    `);
  }
  
  if (advancedFilters.prixMin !== null || advancedFilters.prixMax !== null) {
    const prixRange = getPrixRange(advancedFilters.prixType);
    const min = advancedFilters.prixMin !== null ? advancedFilters.prixMin : prixRange.min;
    const max = advancedFilters.prixMax !== null ? advancedFilters.prixMax : prixRange.max;
    badges.push(`
      <span class="badge badge-secondary" style="display: inline-flex; align-items: center; gap: 0.25rem; margin-right: 0.5rem; margin-bottom: 0.5rem;">
        Budget: ${min}€ - ${max}€
        <button onclick="removeFilter('prixMin'); removeFilter('prixMax');" style="background: none; border: none; cursor: pointer; padding: 0; display: flex; align-items: center;">
          <svg style="width: 0.875rem; height: 0.875rem;" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </button>
      </span>
    `);
  }
  
  if (advancedFilters.certifiante) {
    badges.push(`
      <span class="badge badge-secondary" style="display: inline-flex; align-items: center; gap: 0.25rem; margin-right: 0.5rem; margin-bottom: 0.5rem;">
        ${advancedFilters.certifiante === 'true' ? 'Certifiantes uniquement' : 'Non certifiantes'}
        <button onclick="removeFilter('certifiante')" style="background: none; border: none; cursor: pointer; padding: 0; display: flex; align-items: center;">
          <svg style="width: 0.875rem; height: 0.875rem;" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </button>
      </span>
    `);
  }
  
  return badges.length > 0 ? `<div style="margin-bottom: 1rem;">${badges.join('')}</div>` : '';
}

// Appliquer les filtres avancés aux formations
function applyAdvancedFilters(formations) {
  let filtered = [...formations];
  
  // Filtre par secteur
  if (advancedFilters.secteur) {
    filtered = filtered.filter(f => f.categorie === advancedFilters.secteur);
  }
  
  // Filtre par famille
  if (advancedFilters.famille) {
    filtered = filtered.filter(f => f.famille === advancedFilters.famille);
  }
  
  // Filtre par groupe
  if (advancedFilters.groupe) {
    filtered = filtered.filter(f => f.groupe === advancedFilters.groupe);
  }
  
  // Filtre par durée (slider)
  if (advancedFilters.dureeMin !== null || advancedFilters.dureeMax !== null) {
    const dureeType = advancedFilters.dureeType || 'heures';
    const dureeRange = getDureeRange(dureeType);
    const min = advancedFilters.dureeMin !== null ? advancedFilters.dureeMin : dureeRange.min;
    const max = advancedFilters.dureeMax !== null ? advancedFilters.dureeMax : dureeRange.max;
    
    filtered = filtered.filter(f => {
      const duree = dureeType === 'jours' ? parseDureeJours(f.duree_jours) : parseDuree(f.duree_heures);
      if (duree === null) return false;
      return duree >= min && duree <= max;
    });
  }
  
  // Filtre par type de prix
  if (advancedFilters.prixType) {
    filtered = filtered.filter(f => {
      if (advancedFilters.prixType === 'apprenant') {
        return f.prix.apprenant && f.prix.apprenant !== 'null' && f.prix.apprenant !== '';
      } else {
        return f.prix.groupe && f.prix.groupe !== 'null' && f.prix.groupe !== '';
      }
    });
  }
  
  // Filtre par plage de prix (slider)
  if (advancedFilters.prixMin !== null || advancedFilters.prixMax !== null) {
    const prixRange = getPrixRange(advancedFilters.prixType);
    const min = advancedFilters.prixMin !== null ? advancedFilters.prixMin : prixRange.min;
    const max = advancedFilters.prixMax !== null ? advancedFilters.prixMax : prixRange.max;
    
    filtered = filtered.filter(f => {
      let prix = null;
      
      // Utiliser le prix selon le type sélectionné, sinon prendre le premier disponible
      if (advancedFilters.prixType === 'apprenant') {
        prix = parsePrix(f.prix.apprenant);
      } else if (advancedFilters.prixType === 'groupe') {
        prix = parsePrix(f.prix.groupe);
      } else {
        // Prendre le premier prix disponible
        prix = parsePrix(f.prix.apprenant) || parsePrix(f.prix.groupe);
      }
      
      if (prix === null) return false;
      return prix >= min && prix <= max;
    });
  }
  
  // Filtre par certification
  if (advancedFilters.certifiante) {
    filtered = filtered.filter(f => {
      if (advancedFilters.certifiante === 'true') {
        return f.certification && f.certification.estCertifiante === true;
      } else {
        return !f.certification || f.certification.estCertifiante === false;
      }
    });
  }
  
  return filtered;
}

// Parser la durée en heures (extrait le nombre)
function parseDuree(dureeStr) {
  if (!dureeStr || dureeStr === 'Non spécifiée') return null;
  const match = dureeStr.match(/(\d+)/);
  return match ? parseInt(match[1]) : null;
}

// Parser la durée en jours (extrait le nombre)
function parseDureeJours(dureeStr) {
  if (!dureeStr || dureeStr === 'Non spécifiée' || dureeStr === '') return null;
  const match = dureeStr.toString().match(/(\d+)/);
  return match ? parseInt(match[1]) : null;
}

// Parser le prix (extrait le nombre)
function parsePrix(prixStr) {
  if (!prixStr || prixStr === 'null' || prixStr === '' || prixStr === 'NULL') return null;
  const match = prixStr.toString().match(/(\d+)/);
  return match ? parseInt(match[1]) : null;
}
