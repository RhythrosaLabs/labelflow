import { PLACE_TYPES } from '../config/placeTypes.js';

export function initAdvancedSearch() {
    const container = document.getElementById('advancedSearchContainer');
    container.innerHTML = `
        <div class="col-md-10 offset-md-1 mb-3">
            <div class="advanced-search-container bg-light p-3 rounded">
                <h5>
                    <a class="btn btn-link" data-bs-toggle="collapse" href="#advancedSearchOptions">
                        Advanced Search Options <i class="material-icons">expand_more</i>
                    </a>
                </h5>
                <div class="collapse" id="advancedSearchOptions">
                    <div class="row">
                        <div class="col-md-6">
                            <div class="d-flex justify-content-between align-items-center mb-2">
                                <label class="form-label mb-0">Place Types</label>
                                <button class="btn btn-sm btn-outline-primary" id="toggleAllPlaceTypes">
                                    Select All
                                </button>
                            </div>
                            ${generatePlaceTypeCheckboxes()}
                        </div>
                        <div class="col-md-6">
                            ${generateSearchOptions()}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;

    // Initialize tooltips with error handling
    setTimeout(() => {
        try {
            const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
            tooltipTriggerList.map(function (tooltipTriggerEl) {
                return new bootstrap.Tooltip(tooltipTriggerEl);
            });
        } catch (error) {
            console.warn('Bootstrap tooltips not available:', error);
        }
    }, 100);

    // Initialize select all button
    initSelectAllButton();
}

function initSelectAllButton() {
    const toggleAllBtn = document.getElementById('toggleAllPlaceTypes');
    if (!toggleAllBtn) return;
    
    const placeTypeCheckboxes = document.querySelectorAll('.place-type-checkbox');
    let allSelected = checkIfAllSelected();

    updateToggleButtonText(allSelected);

    toggleAllBtn.addEventListener('click', () => {
        allSelected = !allSelected;
        placeTypeCheckboxes.forEach(checkbox => {
            checkbox.checked = allSelected;
        });
        updateToggleButtonText(allSelected);
    });

    // Update button text when individual checkboxes change
    placeTypeCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', () => {
            allSelected = checkIfAllSelected();
            updateToggleButtonText(allSelected);
        });
    });

    function checkIfAllSelected() {
        return Array.from(placeTypeCheckboxes).every(checkbox => checkbox.checked);
    }

    function updateToggleButtonText(isAllSelected) {
        toggleAllBtn.textContent = isAllSelected ? 'Deselect All' : 'Select All';
    }
}

function generatePlaceTypeCheckboxes() {
    return Object.entries(PLACE_TYPES)
        .map(([value, label]) => `
            <div class="form-check">
                <input class="form-check-input place-type-checkbox" type="checkbox" value="${value}" 
                       id="${value}Places" ${value === 'coffee' ? 'checked' : ''}>
                <label class="form-check-label" for="${value}Places">${label}</label>
            </div>
        `).join('');
}

function generateSearchOptions() {
    return `
        <div class="mb-3">
            <label for="resultCount" class="form-label d-flex justify-content-between align-items-center">
                Number of Results
                <i class="material-icons" data-bs-toggle="tooltip" 
                   title="Maximum number of locations to find">info</i>
            </label>
            <select class="form-select" id="resultCount">
                <option value="3">3 Results</option>
                <option value="5" selected>5 Results</option>
                <option value="10">10 Results</option>
                <option value="15">15 Results</option>
                <option value="20">20 Results</option>
                <option value="25">25 Results</option>
                <option value="50">50 Results</option>
                <option value="75">75 Results</option>
                <option value="100">100 Results</option>
            </select>
        </div>

        <div class="mb-3">
            <label for="searchRadius" class="form-label d-flex justify-content-between align-items-center">
                Search Radius
                <i class="material-icons" data-bs-toggle="tooltip" 
                   title="Maximum distance from target location">info</i>
            </label>
            <select class="form-select" id="searchRadius">
                <option value="1">1 mile</option>
                <option value="5">5 miles</option>
                <option value="10">10 miles</option>
                <option value="25" selected>25 miles</option>
                <option value="50">50 miles</option>
                <option value="75">75 miles</option>
                <option value="100">100 miles</option>
            </select>
        </div>

        <div class="mb-3">
            <label for="sortPreference" class="form-label d-flex justify-content-between align-items-center">
                Sort Results By
                <i class="material-icons" data-bs-toggle="tooltip" 
                   title="How to order the recommendations">info</i>
            </label>
            <select class="form-select" id="sortPreference">
                <option value="optimal">Optimal Route</option>
                <option value="distance">Distance</option>
                <option value="popularity">Popularity</option>
                <option value="rating">Rating</option>
            </select>
        </div>

        <div class="mb-3">
            <label for="timePreference" class="form-label d-flex justify-content-between align-items-center">
                Best Time to Visit
                <i class="material-icons" data-bs-toggle="tooltip" 
                   title="Preferred time of day for visits">info</i>
            </label>
            <select class="form-select" id="timePreference">
                <option value="any">Any Time</option>
                <option value="morning">Morning</option>
                <option value="afternoon">Afternoon</option>
                <option value="evening">Evening</option>
                <option value="night">Night</option>
            </select>
        </div>
    `;
}