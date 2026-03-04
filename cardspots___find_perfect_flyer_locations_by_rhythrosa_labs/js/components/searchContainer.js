import { searchLocationsWithAI } from '../services/searchService.js';

export function initSearchContainer() {
    const container = document.getElementById('searchContainer');
    container.innerHTML = `
        <div class="search-container">
            <div class="input-group mb-3">
                <input type="text" id="locationSearch" class="form-control google-like-input" 
                       placeholder="Search city or neighborhood for flyer placement...">
                <button class="btn btn-primary position-absolute" id="searchButton"
                        style="right: 0; top: 0; height: 100%; z-index: 10;">
                    <i class="material-icons">search</i>
                </button>
            </div>
            <div class="input-group mb-3">
                <input type="text" id="promotionDetails" class="form-control google-like-input" 
                       placeholder="What are you promoting? (Optional)">
            </div>
        </div>
        
        <div id="recommendationsOverview" style="display:none;">
            <h4>AI Strategic Recommendations</h4>
            <div id="recommendationSummary" class="recommendation-container"></div>
        </div>
        
        <div id="loadingIndicator" style="display:none;">
            <div class="spinner-border text-primary" role="status">
                <span class="visually-hidden">Loading...</span>
            </div>
            <p>Analyzing strategic spots...</p>
        </div>
        <div id="aiSuggestions"></div>
    `;

    // Add event listeners
    const searchButton = document.getElementById('searchButton');
    const locationInput = document.getElementById('locationSearch');
    
    searchButton.addEventListener('click', () => {
        if (window.searchLocationsWithAI) {
            window.searchLocationsWithAI();
        }
    });

    locationInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            if (window.searchLocationsWithAI) {
                window.searchLocationsWithAI();
            }
        }
    });
}