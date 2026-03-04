import { generateDayPlan, generateWeekPlan } from '../services/aiService.js';

export function displayResults(spots, dayPlan, weekPlan) {
    const recommendationSummary = document.getElementById('recommendationSummary');
    if (!recommendationSummary) return;
    
    recommendationSummary.innerHTML = '';
    
    // Add view type selector
    const viewTypeSelector = createViewTypeSelector();
    recommendationSummary.appendChild(viewTypeSelector);
    
    // Create container for location cards
    const locationsContainer = document.createElement('div');
    locationsContainer.id = 'locationsContainer';
    locationsContainer.classList.add('locations-container');
    
    // Display spot recommendations
    spots.forEach(spot => {
        const recommendationCard = createRecommendationCard(spot);
        locationsContainer.appendChild(recommendationCard);
    });
    
    recommendationSummary.appendChild(locationsContainer);

    // Add export buttons after locations
    const exportButtonsContainer = document.createElement('div');
    exportButtonsContainer.classList.add('d-flex', 'justify-content-center', 'gap-3', 'mt-3', 'mb-4');
    
    const exportTextButton = document.createElement('button');
    exportTextButton.classList.add('btn', 'btn-outline-primary', 'export-button');
    exportTextButton.innerHTML = '<i class="material-icons">description</i> Export as Text';
    exportTextButton.onclick = () => {
        const docContent = generateDocContent(spots, dayPlan, weekPlan);
        downloadDoc(docContent, 'txt');
    };
    
    const exportJsonButton = document.createElement('button');
    exportJsonButton.classList.add('btn', 'btn-outline-primary', 'export-button');
    exportJsonButton.innerHTML = '<i class="material-icons">code</i> Export as JSON';
    exportJsonButton.onclick = () => {
        const jsonContent = generateJsonContent(spots, dayPlan, weekPlan);
        downloadDoc(jsonContent, 'json');
    };
    
    const exportCsvButton = document.createElement('button');
    exportCsvButton.classList.add('btn', 'btn-outline-primary', 'export-button');
    exportCsvButton.innerHTML = '<i class="material-icons">grid_on</i> Export as CSV';
    exportCsvButton.onclick = () => {
        const csvContent = generateCsvContent(spots, dayPlan, weekPlan);
        downloadDoc(csvContent, 'csv');
    };
    
    exportButtonsContainer.appendChild(exportTextButton);
    exportButtonsContainer.appendChild(exportJsonButton);
    exportButtonsContainer.appendChild(exportCsvButton);
    
    recommendationSummary.appendChild(exportButtonsContainer);

    // If there are plans, create a separate container below the locations
    if (dayPlan.length || weekPlan.length) {
        const plansContainer = document.createElement('div');
        plansContainer.classList.add('plans-container');
        
        if (dayPlan.length) {
            const dayPlanSection = createDayPlanSection(dayPlan, spots);
            plansContainer.appendChild(dayPlanSection);
        }
        
        if (weekPlan.length) {
            const weekPlanSection = createWeekPlanSection(weekPlan);
            plansContainer.appendChild(weekPlanSection);
        }

        // Add refresh button
        const refreshButton = createRefreshButton();
        plansContainer.appendChild(refreshButton);
        
        recommendationSummary.appendChild(plansContainer);
    }
}

function createViewTypeSelector() {
    const container = document.createElement('div');
    container.classList.add('d-flex', 'justify-content-end', 'mb-3');
    
    const label = document.createElement('label');
    label.htmlFor = 'viewTypeSelector';
    label.classList.add('me-2', 'form-label', 'align-self-center', 'mb-0');
    label.textContent = 'View as:';
    
    const select = document.createElement('select');
    select.id = 'viewTypeSelector';
    select.classList.add('form-select', 'form-select-sm');
    select.style.width = 'auto';
    
    ['Grid', 'List', 'Cards', 'Compact'].forEach(viewType => {
        const option = document.createElement('option');
        option.value = viewType.toLowerCase();
        option.textContent = viewType;
        select.appendChild(option);
    });
    
    select.addEventListener('change', function() {
        updateViewType(this.value);
    });
    
    container.appendChild(label);
    container.appendChild(select);
    
    return container;
}

function updateViewType(viewType) {
    const container = document.getElementById('locationsContainer');
    if (!container) return;
    
    // Remove existing layout classes
    container.classList.remove(
        'locations-container', 
        'locations-list', 
        'locations-cards', 
        'locations-compact'
    );
    
    // Add appropriate class based on view type
    switch(viewType) {
        case 'grid':
            container.classList.add('locations-container');
            break;
        case 'list':
            container.classList.add('locations-list');
            break;
        case 'cards':
            container.classList.add('locations-cards');
            break;
        case 'compact':
            container.classList.add('locations-compact');
            break;
        default:
            container.classList.add('locations-container');
    }
}

function createRecommendationCard(spot) {
    const card = document.createElement('div');
    card.classList.add('recommendation-card');
    card.innerHTML = `
        <h6>${spot.name}</h6>
        <p class="text-muted">${spot.type}</p>
        <small>${spot.address}</small>
        <div class="recommendation-details">
            <p><strong>Why:</strong> ${spot.rationale}</p>
            <p><strong>Approach:</strong> ${spot.suggestedApproach}</p>
        </div>
    `;
    return card;
}

function createDayPlanSection(dayPlan, spots) {
    const section = document.createElement('div');
    section.classList.add('plan-section');
    section.innerHTML = `
        <h5 class="mb-3">Recommended Day Plan</h5>
        <div class="plan-items">
            ${dayPlan.map((plan, index) => `
                <div class="plan-item">
                    <div class="time-badge">${plan.bestTime}</div>
                    <div class="plan-content">
                        <strong>${spots[index].name}</strong>
                        <div class="plan-strategy">${plan.marketingStrategy}</div>
                    </div>
                </div>
            `).join('')}
        </div>
    `;
    return section;
}

function createWeekPlanSection(weekPlan) {
    const section = document.createElement('div');
    section.classList.add('plan-section');
    section.innerHTML = `
        <h5 class="mb-3">Recommended Week Plan</h5>
        <div class="plan-items">
            ${weekPlan.map((plan) => `
                <div class="plan-item">
                    <div class="day-badge">${plan.day}</div>
                    <div class="plan-content">
                        <strong>${plan.location}</strong>
                        <div class="time-info">${plan.bestTime}</div>
                        <div class="plan-strategy">${plan.marketingStrategy}</div>
                    </div>
                </div>
            `).join('')}
        </div>
    `;
    return section;
}

function createRefreshButton() {
    const button = document.createElement('button');
    button.classList.add('btn', 'btn-outline-primary', 'mt-3');
    button.innerHTML = '<i class="material-icons">refresh</i> Generate New Schedule';
    
    button.onclick = async () => {
        const loadingIndicator = document.getElementById('loadingIndicator');
        if (loadingIndicator) {
            loadingIndicator.style.display = 'block';
        }
        
        try {
            const spots = window.currentSpots;
            if (!spots || !spots.length) {
                console.error('No current spots available');
                return;
            }
            
            const planDay = document.getElementById('planDayCheckbox')?.checked || false;
            const planWeek = document.getElementById('planWeekCheckbox')?.checked || false;
            
            let newDayPlan = [];
            let newWeekPlan = [];
            
            if (planDay) {
                newDayPlan = await generateDayPlan(spots);
            }
            if (planWeek) {
                newWeekPlan = await generateWeekPlan(spots);
            }
            
            displayResults(spots, newDayPlan, newWeekPlan);
        } catch (error) {
            console.error('Error refreshing plans:', error);
        } finally {
            if (loadingIndicator) {
                loadingIndicator.style.display = 'none';
            }
        }
    };
    
    return button;
}

function formatDateTime() {
    const now = new Date();
    return now.toLocaleDateString() + '_' + now.toLocaleTimeString().replace(/:/g, '-');
}

function generateDocContent(spots, dayPlan, weekPlan) {
    let content = `STREET TEAM SPOT SPOTTER - MARKETING LOCATIONS REPORT
Generated: ${new Date().toLocaleString()}
----------------------------------------

RECOMMENDED LOCATIONS:
`;

    spots.forEach((spot, index) => {
        content += `
${index + 1}. ${spot.name}
   Type: ${spot.type}
   Address: ${spot.address}
   Strategic Value: ${spot.rationale}
   Recommended Approach: ${spot.suggestedApproach}
`;
    });

    if (dayPlan.length) {
        content += `

DAILY SCHEDULE PLAN:
----------------------------------------`;
        dayPlan.forEach((plan, index) => {
            content += `
${plan.bestTime}
* Location: ${spots[index].name}
* Duration: ${plan.duration}
* Strategy: ${plan.marketingStrategy}
`;
        });
    }

    if (weekPlan.length) {
        content += `

WEEKLY SCHEDULE PLAN:
----------------------------------------`;
        weekPlan.forEach((plan) => {
            content += `
${plan.day}
* Location: ${plan.location}
* Best Time: ${plan.bestTime}
* Strategy: ${plan.marketingStrategy}
`;
        });
    }

    return content;
}

function generateJsonContent(spots, dayPlan, weekPlan) {
    const data = {
        generated: new Date().toISOString(),
        spots: spots,
        dayPlan: dayPlan || [],
        weekPlan: weekPlan || []
    };
    
    return JSON.stringify(data, null, 2);
}

function generateCsvContent(spots, dayPlan, weekPlan) {
    let csv = 'Name,Type,Address,Rationale,Suggested Approach\n';
    
    spots.forEach(spot => {
        csv += `"${spot.name}","${spot.type}","${spot.address}","${spot.rationale}","${spot.suggestedApproach}"\n`;
    });
    
    if (dayPlan.length) {
        csv += '\n\nDAY PLAN\n';
        csv += 'Location,Best Time,Duration,Marketing Strategy\n';
        
        dayPlan.forEach((plan, index) => {
            const location = spots[index] ? spots[index].name : '';
            csv += `"${location}","${plan.bestTime}","${plan.duration}","${plan.marketingStrategy}"\n`;
        });
    }
    
    if (weekPlan.length) {
        csv += '\n\nWEEK PLAN\n';
        csv += 'Day,Location,Best Time,Marketing Strategy\n';
        
        weekPlan.forEach(plan => {
            csv += `"${plan.day}","${plan.location}","${plan.bestTime}","${plan.marketingStrategy}"\n`;
        });
    }
    
    return csv;
}

function downloadDoc(content, type = 'txt') {
    const mimeTypes = {
        'txt': 'text/plain',
        'json': 'application/json',
        'csv': 'text/csv'
    };
    
    const blob = new Blob([content], { type: mimeTypes[type] || 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `street_team_spots_${formatDateTime()}.${type}`;
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
}