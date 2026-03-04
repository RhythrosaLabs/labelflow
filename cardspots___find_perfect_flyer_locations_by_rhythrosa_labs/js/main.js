import { initAdvancedSearch } from './components/advancedSearch.js';
import { initPlanningOptions } from './components/planningOptions.js';
import { initSearchContainer } from './components/searchContainer.js';
import { initAnimationContainer } from './components/animation.js';
import { initThemeToggle } from './utils/theme.js';
import { searchLocationsWithAI } from './services/searchService.js';

// Make search function globally available for onclick handlers
window.searchLocationsWithAI = searchLocationsWithAI;

document.addEventListener('DOMContentLoaded', () => {
    initAdvancedSearch();
    initPlanningOptions();
    initSearchContainer();
    initAnimationContainer();
    initThemeToggle();
});

