// Cardspotter Integration
class FlyerPlacement {
    constructor() {
        this.initElements();
        this.bindEvents();
    }

    initElements() {
        this.searchInput = document.querySelector('.lf-flyer-search input');
        this.searchBtn = document.querySelector('.lf-flyer-search button');
        this.resultsContainer = document.querySelector('.lf-flyer-results');
        this.animationContainer = document.querySelector('.lf-flyer-animation');
    }

    bindEvents() {
        this.searchBtn.addEventListener('click', () => this.searchLocations());
        this.searchInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.searchLocations();
        });
    }

    async searchLocations() {
        const query = this.searchInput.value.trim();
        if (!query) return;

        this.showLoading();
        
        try {
            const results = await this.fetchLocations(query);
            this.displayResults(results);
        } catch (error) {
            console.error('Search error:', error);
            this.showError('Failed to search locations');
        }
    }

    async fetchLocations(query) {
        // Simulate API call - replace with actual implementation
        return new Promise(resolve => {
            setTimeout(() => {
                resolve([
                    { name: 'Coffee Shop', type: 'cafe', score: 92 },
                    { name: 'Record Store', type: 'music', score: 88 },
                    { name: 'University Campus', type: 'education', score: 85 }
                ]);
            }, 1000);
        });
    }

    displayResults(results) {
        this.resultsContainer.innerHTML = results.map(result => `
            <div class="lf-flyer-card">
                <h4>${result.name}</h4>
                <p>Type: ${result.type}</p>
                <p>Score: ${result.score}/100</p>
            </div>
        `).join('');
    }

    showLoading() {
        this.resultsContainer.innerHTML = '<div class="loading">Searching...</div>';
    }

    showError(message) {
        this.resultsContainer.innerHTML = `<div class="error">${message}</div>`;
    }
}

// Merch Maker Integration
class MerchGenerator {
    constructor() {
        this.initElements();
        this.bindEvents();
    }

    initElements() {
        this.productSelect = document.querySelector('.lf-merch-product-select');
        this.designInput = document.querySelector('.lf-merch-design-input');
        this.generateBtn = document.querySelector('.lf-merch-generate-btn');
        this.previewContainer = document.querySelector('.lf-merch-preview');
    }

    bindEvents() {
        this.generateBtn.addEventListener('click', () => this.generateMockup());
    }

    async generateMockup() {
        const product = this.productSelect.value;
        const design = this.designInput.value.trim();
        
        if (!product || !design) return;

        this.showLoading();
        
        try {
            const mockup = await this.createMockup(product, design);
            this.displayMockup(mockup);
        } catch (error) {
            console.error('Generation error:', error);
            this.showError('Failed to generate mockup');
        }
    }

    async createMockup(product, design) {
        // Simulate API call - replace with actual implementation
        return new Promise(resolve => {
            setTimeout(() => {
                resolve({
                    url: `https://via.placeholder.com/600x400?text=${product}+${encodeURIComponent(design)}`,
                    product: product,
                    design: design
                });
            }, 1500);
        });
    }

    displayMockup(mockup) {
        this.previewContainer.innerHTML = `
            <img src="${mockup.url}" alt="${mockup.product} mockup">
            <p>${mockup.design}</p>
        `;
    }

    showLoading() {
        this.previewContainer.innerHTML = '<div class="loading">Generating...</div>';
    }

    showError(message) {
        this.previewContainer.innerHTML = `<div class="error">${message}</div>`;
    }
}

// Initialize integrated components
document.addEventListener('DOMContentLoaded', () => {
    // Existing Labelflow initialization
    
    // Initialize Flyer Placement if section exists
    if (document.getElementById('flyer-placement')) {
        new FlyerPlacement();
    }
    
    // Initialize Merch Generator if section exists
    if (document.getElementById('merch-generator')) {
        new MerchGenerator();
    }
});
