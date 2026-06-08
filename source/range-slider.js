// Composant de double slider (range slider) personnalisé

class RangeSlider {
  constructor(container, options = {}) {
    this.container = container;
    this.min = options.min || 0;
    this.max = options.max || 100;
    this.currentMin = options.currentMin !== undefined ? options.currentMin : this.min;
    this.currentMax = options.currentMax !== undefined ? options.currentMax : this.max;
    this.step = options.step || 1;
    this.unit = options.unit || '';
    this.onChange = options.onChange || (() => {});
    
    this.isDraggingMin = false;
    this.isDraggingMax = false;
    
    this.render();
    this.attachEvents();
  }
  
  render() {
    this.container.innerHTML = `
      <div class="range-slider-wrapper" style="position: relative; padding: 30px 12px 10px 12px;">
        
        <!-- Slider container -->
        <div class="range-slider-track" style="position: relative; height: 8px; background: hsl(var(--muted)); border-radius: 4px; cursor: pointer;">
          <!-- Zone active (entre les deux poignées) -->
          <div class="range-slider-range" style="position: absolute; height: 100%; background: hsl(var(--primary)); border-radius: 4px; pointer-events: none;"></div>
          
          <!-- Poignée MIN -->
          <div class="range-slider-thumb range-slider-thumb-min" style="position: absolute; top: 50%; transform: translate(-50%, -50%); width: 24px; height: 24px; background: hsl(var(--primary)); border: 3px solid white; border-radius: 50%; cursor: grab; box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2); transition: box-shadow 0.1s ease; z-index: 2; user-select: none;">
            <!-- Tooltip MIN -->
            <div class="range-slider-tooltip" style="position: absolute; bottom: 100%; left: 50%; transform: translateX(-50%); margin-bottom: 8px; padding: 4px 8px; background: hsl(var(--primary)); color: white; border-radius: 4px; font-size: 0.75rem; font-weight: 600; white-space: nowrap; opacity: 0; transition: opacity 0.2s ease; pointer-events: none;">
              ${this.currentMin}${this.unit}
            </div>
          </div>
          
          <!-- Poignée MAX -->
          <div class="range-slider-thumb range-slider-thumb-max" style="position: absolute; top: 50%; transform: translate(-50%, -50%); width: 24px; height: 24px; background: hsl(var(--primary)); border: 3px solid white; border-radius: 50%; cursor: grab; box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2); transition: box-shadow 0.1s ease; z-index: 2; user-select: none;">
            <!-- Tooltip MAX -->
            <div class="range-slider-tooltip" style="position: absolute; bottom: 100%; left: 50%; transform: translateX(-50%); margin-bottom: 8px; padding: 4px 8px; background: hsl(var(--primary)); color: white; border-radius: 4px; font-size: 0.75rem; font-weight: 600; white-space: nowrap; opacity: 0; transition: opacity 0.2s ease; pointer-events: none;">
              ${this.currentMax}${this.unit}
            </div>
          </div>
        </div>
        
        <!-- Labels min/max en dessous -->
        <div style="display: flex; justify-content: space-between; margin-top: 8px; font-size: 0.75rem; color: hsl(var(--muted-foreground));">
          <span>${this.min}${this.unit}</span>
          <span>${this.max}${this.unit}</span>
        </div>
      </div>
    `;
    
    this.track = this.container.querySelector('.range-slider-track');
    this.range = this.container.querySelector('.range-slider-range');
    this.thumbMin = this.container.querySelector('.range-slider-thumb-min');
    this.thumbMax = this.container.querySelector('.range-slider-thumb-max');
    this.tooltipMin = this.thumbMin.querySelector('.range-slider-tooltip');
    this.tooltipMax = this.thumbMax.querySelector('.range-slider-tooltip');
    
    this.updateUI();
  }
  
  attachEvents() {
    // Événements pour la poignée MIN
    this.thumbMin.addEventListener('mousedown', (e) => {
      e.preventDefault();
      e.stopPropagation();
      this.isDraggingMin = true;
      this.thumbMin.style.cursor = 'grabbing';
      this.thumbMin.style.transform = 'translate(-50%, -50%) scale(1.2)';
      this.thumbMin.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.3)';
      this.tooltipMin.style.opacity = '1';
      document.body.style.userSelect = 'none';
    });
    
    // Événements pour la poignée MAX
    this.thumbMax.addEventListener('mousedown', (e) => {
      e.preventDefault();
      e.stopPropagation();
      this.isDraggingMax = true;
      this.thumbMax.style.cursor = 'grabbing';
      this.thumbMax.style.transform = 'translate(-50%, -50%) scale(1.2)';
      this.thumbMax.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.3)';
      this.tooltipMax.style.opacity = '1';
      document.body.style.userSelect = 'none';
    });
    
    // Clic sur la piste
    this.track.addEventListener('click', (e) => {
      if (e.target === this.thumbMin || e.target === this.thumbMax) return;
      
      const rect = this.track.getBoundingClientRect();
      const percent = (e.clientX - rect.left) / rect.width;
      const value = Math.round(this.min + percent * (this.max - this.min));
      
      // Déplacer la poignée la plus proche
      const distToMin = Math.abs(value - this.currentMin);
      const distToMax = Math.abs(value - this.currentMax);
      
      if (distToMin < distToMax) {
        this.currentMin = Math.max(this.min, Math.min(value, this.currentMax - this.step));
      } else {
        this.currentMax = Math.min(this.max, Math.max(value, this.currentMin + this.step));
      }
      
      this.updateUI();
      this.onChange(this.currentMin, this.currentMax);
    });
    
    // Mouvement de la souris
    document.addEventListener('mousemove', (e) => {
      if (!this.isDraggingMin && !this.isDraggingMax) return;
      
      const rect = this.track.getBoundingClientRect();
      const percent = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
      const value = Math.round(this.min + percent * (this.max - this.min));
      
      if (this.isDraggingMin) {
        this.currentMin = Math.max(this.min, Math.min(value, this.currentMax - this.step));
      } else if (this.isDraggingMax) {
        this.currentMax = Math.min(this.max, Math.max(value, this.currentMin + this.step));
      }
      
      this.updateUI();
      this.onChange(this.currentMin, this.currentMax);
    });
    
    // Relâchement de la souris
    document.addEventListener('mouseup', () => {
      if (this.isDraggingMin) {
        this.isDraggingMin = false;
        this.thumbMin.style.cursor = 'grab';
        this.thumbMin.style.transform = 'translate(-50%, -50%) scale(1)';
        this.thumbMin.style.boxShadow = '0 2px 6px rgba(0, 0, 0, 0.2)';
        this.tooltipMin.style.opacity = '0';
        document.body.style.userSelect = '';
      }
      if (this.isDraggingMax) {
        this.isDraggingMax = false;
        this.thumbMax.style.cursor = 'grab';
        this.thumbMax.style.transform = 'translate(-50%, -50%) scale(1)';
        this.thumbMax.style.boxShadow = '0 2px 6px rgba(0, 0, 0, 0.2)';
        this.tooltipMax.style.opacity = '0';
        document.body.style.userSelect = '';
      }
    });
    
    // Survol des poignées
    this.thumbMin.addEventListener('mouseenter', () => {
      if (!this.isDraggingMin) {
        this.thumbMin.style.transform = 'translate(-50%, -50%) scale(1.1)';
        this.thumbMin.style.boxShadow = '0 3px 8px rgba(0, 0, 0, 0.25)';
        this.tooltipMin.style.opacity = '1';
      }
    });
    
    this.thumbMin.addEventListener('mouseleave', () => {
      if (!this.isDraggingMin) {
        this.thumbMin.style.transform = 'translate(-50%, -50%) scale(1)';
        this.thumbMin.style.boxShadow = '0 2px 6px rgba(0, 0, 0, 0.2)';
        this.tooltipMin.style.opacity = '0';
      }
    });
    
    this.thumbMax.addEventListener('mouseenter', () => {
      if (!this.isDraggingMax) {
        this.thumbMax.style.transform = 'translate(-50%, -50%) scale(1.1)';
        this.thumbMax.style.boxShadow = '0 3px 8px rgba(0, 0, 0, 0.25)';
        this.tooltipMax.style.opacity = '1';
      }
    });
    
    this.thumbMax.addEventListener('mouseleave', () => {
      if (!this.isDraggingMax) {
        this.thumbMax.style.transform = 'translate(-50%, -50%) scale(1)';
        this.thumbMax.style.boxShadow = '0 2px 6px rgba(0, 0, 0, 0.2)';
        this.tooltipMax.style.opacity = '0';
      }
    });
  }
  
  updateUI() {
    const percentMin = ((this.currentMin - this.min) / (this.max - this.min)) * 100;
    const percentMax = ((this.currentMax - this.min) / (this.max - this.min)) * 100;
    
    // Positionner les poignées
    this.thumbMin.style.left = `${percentMin}%`;
    this.thumbMax.style.left = `${percentMax}%`;
    
    // Mettre à jour la zone active
    this.range.style.left = `${percentMin}%`;
    this.range.style.width = `${percentMax - percentMin}%`;
    
    // Mettre à jour les tooltips
    this.tooltipMin.textContent = `${this.currentMin}${this.unit}`;
    this.tooltipMax.textContent = `${this.currentMax}${this.unit}`;
  }
  
  // Méthode pour mettre à jour les valeurs depuis l'extérieur
  setValues(min, max) {
    this.currentMin = Math.max(this.min, Math.min(min, this.max));
    this.currentMax = Math.min(this.max, Math.max(max, this.min));
    this.updateUI();
  }
  
  // Méthode pour mettre à jour la plage
  setRange(min, max) {
    this.min = min;
    this.max = max;
    this.currentMin = Math.max(min, this.currentMin);
    this.currentMax = Math.min(max, this.currentMax);
    this.render();
    this.attachEvents();
  }
}

// Fonction helper pour créer un range slider
function createRangeSlider(containerId, options) {
  const container = document.getElementById(containerId);
  if (!container) {
    console.error(`Container with id "${containerId}" not found`);
    return null;
  }
  return new RangeSlider(container, options);
}
