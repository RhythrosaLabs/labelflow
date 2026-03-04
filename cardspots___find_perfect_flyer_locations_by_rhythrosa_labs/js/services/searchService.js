import { getAIRecommendations, generateDayPlan, generateWeekPlan } from './aiService.js';
import { displayResults } from '../utils/displayUtils.js';

export async function searchLocationsWithAI() {
    const searchTerm = document.getElementById('locationSearch').value;
    const promotionDetails = document.getElementById('promotionDetails').value;
    const selectedPlaceTypes = getSelectedPlaceTypes();
    const resultCount = document.getElementById('resultCount').value;
    const searchRadius = document.getElementById('searchRadius').value;
    const planDay = document.getElementById('planDayCheckbox').checked;
    const planWeek = document.getElementById('planWeekCheckbox').checked;

    if (!searchTerm.trim()) {
        alert('Please enter a location to search');
        return;
    }

    console.log('🔍 Starting REAL LOCATION SEARCH with params:', {
        location: searchTerm,
        promotionDetails,
        placeTypes: selectedPlaceTypes,
        resultCount: parseInt(resultCount),
        radius: parseInt(searchRadius),
        planDay,
        planWeek
    });

    showLoading(true);

    try {
        console.log('🌐 Requesting real business data from web search...');
        const aiSpots = await getAIRecommendations({
            location: searchTerm,
            promotionDetails,
            placeTypes: selectedPlaceTypes,
            resultCount: parseInt(resultCount),
            radius: parseInt(searchRadius)
        });

        console.log('📍 Received location data:', aiSpots);

        // Check if we got mock data (indicates API failure)
        const isMockData = aiSpots.some(spot => spot.name && spot.name.includes('⚠️ MOCK'));
        
        if (isMockData) {
            console.warn('⚠️ WARNING: Displaying mock data due to API failure');
            alert('⚠️ WARNING: The real location search is not working. Showing test data only. Please check your API configuration.');
        } else {
            console.log('✅ Successfully retrieved real location data');
        }

        // Store spots globally for refresh functionality
        window.currentSpots = aiSpots;

        let dayPlan = planDay ? await generateDayPlan(aiSpots) : [];
        let weekPlan = planWeek ? await generateWeekPlan(aiSpots) : [];

        console.log('📅 Day plan:', dayPlan);
        console.log('🗓️ Week plan:', weekPlan);

        if (aiSpots && aiSpots.length > 0) {
            displayResults(aiSpots, dayPlan, weekPlan);
        } else {
            displayError('No location recommendations found. The search API may not be working properly. Please verify your search terms and try again.');
        }
    } catch (error) {
        console.error("❌ Search failed with error:", error);
        displayError(`Search failed: ${error.message}. Please check your connection and API configuration.`);
    } finally {
        showLoading(false);
    }
}

function getSelectedPlaceTypes() {
    return Array.from(document.querySelectorAll('#advancedSearchOptions .form-check-input:checked'))
        .map(checkbox => checkbox.value);
}

function showLoading(show) {
    document.getElementById('loadingIndicator').style.display = show ? 'block' : 'none';
    document.getElementById('recommendationsOverview').style.display = show ? 'none' : 'block';
}

function displayError(message = 'Error generating recommendations. Please try again.') {
    const recommendationSummary = document.getElementById('recommendationSummary');
    const recommendationsOverview = document.getElementById('recommendationsOverview');
    
    if (recommendationSummary) {
        recommendationSummary.innerHTML = `<p class="text-danger">${message}</p>`;
    }
    
    if (recommendationsOverview) {
        recommendationsOverview.style.display = 'block';
    }
}