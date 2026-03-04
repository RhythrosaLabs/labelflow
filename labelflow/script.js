// LabelFlow Main Application
class LabelFlowApp {
    constructor() {
        this.currentSection = 'dashboard';
        this.init();
    }

    init() {
        this.bindEvents();
        this.initializeComponents();
        this.loadDashboardData();
    }

    bindEvents() {
        // Navigation
        document.querySelectorAll('.nav-item').forEach(item => {
            item.addEventListener('click', (e) => {
                const section = e.currentTarget.dataset.section;
                this.navigateToSection(section);
            });
        });

        // AI Assistant
        const aiButton = document.querySelector('.ai-button');
        const aiModal = document.getElementById('ai-modal');
        const closeBtn = document.querySelector('.close-btn');
        const sendBtn = document.getElementById('send-btn');
        const aiInput = document.getElementById('ai-input');

        if (aiButton) {
            aiButton.addEventListener('click', () => {
                aiModal.classList.add('show');
            });
        }

        if (closeBtn) {
            closeBtn.addEventListener('click', () => {
                aiModal.classList.remove('show');
            });
        }

        if (sendBtn) {
            sendBtn.addEventListener('click', () => this.sendAIMessage());
        }

        if (aiInput) {
            aiInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') this.sendAIMessage();
            });
        }

        // Modal close on outside click
        if (aiModal) {
            aiModal.addEventListener('click', (e) => {
                if (e.target === aiModal) {
                    aiModal.classList.remove('show');
                }
            });
        }
    }

    navigateToSection(section) {
        // Update active nav item
        document.querySelectorAll('.nav-item').forEach(item => {
            item.classList.remove('active');
        });
        document.querySelector(`[data-section="${section}"]`).classList.add('active');

        // Show/hide content sections
        document.querySelectorAll('.content-section').forEach(section => {
            section.classList.remove('active');
        });
        document.getElementById(section).classList.add('active');

        this.currentSection = section;

        // Load section-specific data
        this.loadSectionData(section);
    }

    loadSectionData(section) {
        switch (section) {
            case 'dashboard':
                this.loadDashboardData();
                break;
            case 'artists':
                this.loadArtistsData();
                break;
            case 'campaigns':
                this.loadCampaignsData();
                break;
            case 'flyer-placement':
                this.initializeFlyerPlacement();
                break;
            case 'merch-generator':
                this.initializeMerchGenerator();
                break;
            case 'schedule':
                this.loadScheduleData();
                break;
            case 'contacts':
                this.loadContactsData();
                break;
            case 'opportunities':
                this.loadOpportunitiesData();
                break;
            case 'analytics':
                this.loadAnalyticsData();
                break;
            case 'notes':
                this.initializeNotes();
                break;
            case 'resources':
                this.loadResourcesData();
                break;
            case 'todos':
                this.initializeTodos();
                break;
            case 'ai-artist':
                this.initializeAIArtist();
                break;
        }
    }

    initializeComponents() {
        // Initialize integrated components
        if (document.getElementById('flyer-placement')) {
            this.flyerPlacement = new FlyerPlacement();
        }
        
        if (document.getElementById('merch-generator')) {
            this.merchGenerator = new MerchGenerator();
        }
    }

    loadDashboardData() {
        // Load recent activity
        const activities = [
            {
                icon: 'fas fa-upload',
                text: '<strong>New track uploaded</strong> by Luna Nova',
                time: '2 hours ago'
            },
            {
                icon: 'fas fa-bullhorn',
                text: '<strong>Campaign launched</strong> for "Summer Vibes" EP',
                time: '5 hours ago'
            },
            {
                icon: 'fas fa-handshake',
                text: '<strong>New collaboration</strong> opportunity with Metro FM',
                time: '1 day ago'
            }
        ];

        const activityList = document.querySelector('.activity-list');
        if (activityList) {
            activityList.innerHTML = activities.map(activity => `
                <div class="activity-item">
                    <div class="activity-icon">
                        <i class="${activity.icon}"></i>
                    </div>
                    <div class="activity-info">
                        <p>${activity.text}</p>
                        <span>${activity.time}</span>
                    </div>
                </div>
            `).join('');
        }

        // Load upcoming events
        const events = [
            {
                day: '15',
                month: 'Dec',
                title: 'Luna Nova - Studio Session',
                time: '2:00 PM'
            },
            {
                day: '18',
                month: 'Dec',
                title: 'Alex Chen - Music Video Shoot',
                time: '10:00 AM'
            },
            {
                day: '22',
                month: 'Dec',
                title: 'Label Meeting - Q4 Review',
                time: '3:00 PM'
            }
        ];

        const eventsList = document.querySelector('.events-list');
        if (eventsList) {
            eventsList.innerHTML = events.map(event => `
                <div class="event-item">
                    <div class="event-date">
                        <span class="day">${event.day}</span>
                        <span class="month">${event.month}</span>
                    </div>
                    <div class="event-info">
                        <h4>${event.title}</h4>
                        <span>${event.time}</span>
                    </div>
                </div>
            `).join('');
        }
    }

    loadArtistsData() {
        // Artists data would be loaded here
        console.log('Loading artists data...');
    }

    loadCampaignsData() {
        // Load campaigns data
        const campaigns = [
            {
                title: 'Summer Vibes EP Launch',
                artist: 'Luna Nova',
                status: 'active',
                budget: '$5,000',
                spent: '$2,800',
                progress: 65,
                platforms: ['Spotify', 'Instagram', 'TikTok'],
                metrics: {
                    reach: '125K',
                    engagement: '8.2%',
                    streams: '45K'
                }
            },
            {
                title: 'Electronic Dreams Tour',
                artist: 'Alex Chen',
                status: 'planning',
                budget: '$15,000',
                spent: '$3,200',
                progress: 25,
                platforms: ['Facebook', 'Instagram', 'YouTube'],
                metrics: {
                    reach: '89K',
                    engagement: '6.8%',
                    tickets: '234'
                }
            }
        ];

        const campaignsList = document.querySelector('.campaigns-list');
        if (campaignsList) {
            campaignsList.innerHTML = campaigns.map(campaign => `
                <div class="campaign-card">
                    <div class="campaign-header">
                        <h3>${campaign.title}</h3>
                        <span class="status ${campaign.status}">${campaign.status}</span>
                    </div>
                    <p class="campaign-artist">Artist: ${campaign.artist}</p>
                    <div class="campaign-metrics">
                        <span><i class="fas fa-eye"></i> ${campaign.metrics.reach} reach</span>
                        <span><i class="fas fa-heart"></i> ${campaign.metrics.engagement} engagement</span>
                        <span><i class="fas fa-play"></i> ${campaign.metrics.streams || campaign.metrics.tickets} ${campaign.metrics.streams ? 'streams' : 'tickets'}</span>
                    </div>
                    <div class="campaign-progress">
                        <div class="progress-bar">
                            <div class="progress-fill" style="width: ${campaign.progress}%"></div>
                        </div>
                        <span>${campaign.progress}%</span>
                    </div>
                    <div class="campaign-budget">
                        <span>Budget: ${campaign.budget} | Spent: ${campaign.spent}</span>
                    </div>
                </div>
            `).join('');
        }
    }

    initializeFlyerPlacement() {
        // Enhanced flyer placement with cardspotter integration
        const container = document.querySelector('.cardspotter-container');
        if (container && !container.querySelector('.cardspotter-search')) {
            container.innerHTML = `
                <div class="cardspotter-search">
                    <div class="search-container">
                        <input type="text" placeholder="Search city or neighborhood for flyer placement..." class="google-like-input">
                        <button class="btn btn-primary">
                            <i class="fas fa-search"></i>
                            Find Locations
                        </button>
                    </div>
                    <div class="search-options">
                        <input type="text" placeholder="What are you promoting? (Optional)" class="google-like-input">
                    </div>
                </div>
                <div class="cardspotter-results">
                    <div class="placeholder-content">
                        <div class="placeholder-icon">📍</div>
                        <h3>Find Perfect Flyer Locations</h3>
                        <p>Use AI-powered location search to find the best spots for your promotional materials</p>
                    </div>
                </div>
                <div class="cardspotter-animation">
                    <svg viewBox="0 0 800 500" xmlns="http://www.w3.org/2000/svg">
                        <defs>
                            <linearGradient id="locationGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                                <stop offset="0%" style="stop-color:#4ecdc4"/>
                                <stop offset="100%" style="stop-color:#ff6b6b"/>
                            </linearGradient>
                        </defs>
                        
                        <!-- City Skyline Background -->
                        <rect x="0" y="350" width="800" height="150" fill="#333"/>
                        <rect x="0" y="380" width="800" height="120" fill="#2a2a2a"/>
                        
                        <!-- Buildings -->
                        <rect x="50" y="250" width="80" height="100" fill="#444"/>
                        <rect x="200" y="200" width="100" height="150" fill="#555"/>
                        <rect x="400" y="180" width="120" height="170" fill="#555"/>
                        <rect x="600" y="220" width="90" height="130" fill="#444"/>
                        
                        <!-- Dynamic Location Pins -->
                        <path class="pin-path" d="M100,300 Q400,100 700,300" stroke="url(#locationGradient)" stroke-width="4" fill="none"/>
                        
                        <g class="location-pin" transform="translate(100, 300)">
                            <path d="M0,0 L-10,-20 A20,20 0 1,1 10,-20 Z" fill="url(#locationGradient)"/>
                            <circle cx="0" cy="-30" r="5" fill="white"/>
                        </g>
                        
                        <g class="location-pin" transform="translate(400, 200)">
                            <path d="M0,0 L-10,-20 A20,20 0 1,1 10,-20 Z" fill="url(#locationGradient)"/>
                            <circle cx="0" cy="-30" r="5" fill="white"/>
                        </g>
                        
                        <g class="location-pin" transform="translate(700, 300)">
                            <path d="M0,0 L-10,-20 A20,20 0 1,1 10,-20 Z" fill="url(#locationGradient)"/>
                            <circle cx="0" cy="-30" r="5" fill="white"/>
                        </g>
                    </svg>
                </div>
            `;

            // Bind search functionality
            const searchBtn = container.querySelector('.btn-primary');
            const searchInput = container.querySelector('input');
            
            searchBtn.addEventListener('click', () => this.searchFlyerLocations());
            searchInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') this.searchFlyerLocations();
            });
        }
    }

    async searchFlyerLocations() {
        const container = document.querySelector('.cardspotter-results');
        const searchInput = document.querySelector('.cardspotter-search input');
        const query = searchInput.value.trim();

        if (!query) return;

        // Show loading
        container.innerHTML = '<div class="loading">🔍 Searching for optimal locations...</div>';

        // Simulate API call
        setTimeout(() => {
            const results = [
                {
                    name: 'Downtown Coffee Hub',
                    type: 'Coffee Shop',
                    score: 94,
                    address: '123 Main St',
                    footTraffic: 'High',
                    demographics: 'Young professionals, students',
                    bestTimes: 'Morning rush (7-9 AM), Lunch (12-2 PM)'
                },
                {
                    name: 'Vinyl Records & More',
                    type: 'Record Store',
                    score: 91,
                    address: '456 Music Ave',
                    footTraffic: 'Medium-High',
                    demographics: 'Music enthusiasts, collectors',
                    bestTimes: 'Weekends, Evening (5-8 PM)'
                },
                {
                    name: 'University Student Center',
                    type: 'Educational',
                    score: 88,
                    address: '789 Campus Dr',
                    footTraffic: 'Very High',
                    demographics: 'Students, faculty',
                    bestTimes: 'Between classes, Lunch hours'
                }
            ];

            container.innerHTML = `
                <div class="results-header">
                    <h3>🎯 Strategic Locations Found</h3>
                    <p>AI-powered recommendations for "${query}"</p>
                </div>
                ${results.map(result => `
                    <div class="location-card">
                        <div class="location-header">
                            <h4>${result.name}</h4>
                            <div class="location-score">
                                <span class="score">${result.score}/100</span>
                                <span class="score-label">Match Score</span>
                            </div>
                        </div>
                        <div class="location-details">
                            <p><i class="fas fa-map-marker-alt"></i> ${result.address}</p>
                            <p><i class="fas fa-store"></i> ${result.type}</p>
                            <p><i class="fas fa-walking"></i> ${result.footTraffic} foot traffic</p>
                            <p><i class="fas fa-users"></i> ${result.demographics}</p>
                            <p><i class="fas fa-clock"></i> Best times: ${result.bestTimes}</p>
                        </div>
                        <div class="location-actions">
                            <button class="btn btn-secondary btn-sm">
                                <i class="fas fa-route"></i> Get Directions
                            </button>
                            <button class="btn btn-primary btn-sm">
                                <i class="fas fa-plus"></i> Add to Campaign
                            </button>
                        </div>
                    </div>
                `).join('')}
            `;
        }, 1500);
    }

    initializeMerchGenerator() {
        // Enhanced merch generator integration
        const container = document.querySelector('.merchmaker-container');
        if (container && !container.querySelector('.merchmaker-form')) {
            container.innerHTML = `
                <div class="merchmaker-form">
                    <h3>🎨 AI Merch Generator</h3>
                    <div class="form-group">
                        <label>Product Type</label>
                        <select class="form-control">
                            <option value="">Select product...</option>
                            <option value="t-shirt">T-Shirt</option>
                            <option value="hoodie">Hoodie</option>
                            <option value="mug">Coffee Mug</option>
                            <option value="poster">Poster</option>
                            <option value="sticker">Sticker Pack</option>
                            <option value="tote-bag">Tote Bag</option>
                            <option value="phone-case">Phone Case</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label>Design Description</label>
                        <textarea class="form-control" placeholder="Describe your design idea..." rows="3"></textarea>
                    </div>
                    <div class="form-group">
                        <label>Style</label>
                        <select class="form-control">
                            <option value="">Select style...</option>
                            <option value="minimalist">Minimalist</option>
                            <option value="vintage">Vintage</option>
                            <option value="modern">Modern</option>
                            <option value="grunge">Grunge</option>
                            <option value="artistic">Artistic</option>
                        </select>
                    </div>
                    <button class="btn btn-primary btn-block">
                        <i class="fas fa-magic"></i>
                        Generate Mockup
                    </button>
                </div>
                <div class="merchmaker-preview">
                    <div class="placeholder-content">
                        <div class="placeholder-icon">🎨</div>
                        <h3>Your mockup will appear here</h3>
                        <p>Fill out the form and generate your AI-powered merchandise design</p>
                    </div>
                </div>
            `;

            // Bind generate functionality
            const generateBtn = container.querySelector('.btn-primary');
            generateBtn.addEventListener('click', () => this.generateMerchMockup());
        }
    }

    async generateMerchMockup() {
        const preview = document.querySelector('.merchmaker-preview');
        const form = document.querySelector('.merchmaker-form');
        const product = form.querySelector('select').value;
        const description = form.querySelector('textarea').value;
        const style = form.querySelectorAll('select')[1].value;

        if (!product || !description) {
            alert('Please select a product and provide a design description');
            return;
        }

        // Show loading
        preview.innerHTML = '<div class="loading">🎨 Creating your mockup...</div>';

        // Simulate API call
        setTimeout(() => {
            const mockupUrl = `https://via.placeholder.com/600x400/4ecdc4/ffffff?text=${encodeURIComponent(product + ' mockup')}`;
            
            preview.innerHTML = `
                <div class="mockup-result">
                    <img src="${mockupUrl}" alt="${product} mockup" style="max-width: 100%; border-radius: 8px;">
                    <div class="mockup-details">
                        <h4>${product.charAt(0).toUpperCase() + product.slice(1)} Design</h4>
                        <p><strong>Description:</strong> ${description}</p>
                        <p><strong>Style:</strong> ${style || 'Default'}</p>
                        <div class="mockup-actions">
                            <button class="btn btn-secondary">
                                <i class="fas fa-download"></i> Download
                            </button>
                            <button class="btn btn-primary">
                                <i class="fas fa-redo"></i> Regenerate
                            </button>
                        </div>
                    </div>
                </div>
            `;
        }, 2000);
    }

    loadScheduleData() {
        console.log('Loading schedule data...');
    }

    loadContactsData() {
        console.log('Loading contacts data...');
    }

    loadOpportunitiesData() {
        console.log('Loading opportunities data...');
    }

    loadAnalyticsData() {
        // Initialize charts if Chart.js is available
        if (typeof Chart !== 'undefined') {
            this.initializeCharts();
        }
    }

    initializeCharts() {
        // Streaming Performance Chart
        const streamingCtx = document.getElementById('streamingChart');
        if (streamingCtx) {
            new Chart(streamingCtx, {
                type: 'line',
                data: {
                    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
                    datasets: [{
                        label: 'Monthly Streams',
                        data: [1200000, 1350000, 1800000, 2100000, 2400000, 2400000],
                        borderColor: '#4ecdc4',
                        backgroundColor: 'rgba(78, 205, 196, 0.1)',
                        tension: 0.4
                    }]
                },
                options: {
                    responsive: true,
                    plugins: {
                        legend: {
                            labels: {
                                color: '#fff'
                            }
                        }
                    },
                    scales: {
                        y: {
                            ticks: {
                                color: '#999'
                            },
                            grid: {
                                color: '#333'
                            }
                        },
                        x: {
                            ticks: {
                                color: '#999'
                            },
                            grid: {
                                color: '#333'
                            }
                        }
                    }
                }
            });
        }

        // Revenue Chart
        const revenueCtx = document.getElementById('revenueChart');
        if (revenueCtx) {
            new Chart(revenueCtx, {
                type: 'doughnut',
                data: {
                    labels: ['Streaming', 'Merchandise', 'Live Shows', 'Licensing'],
                    datasets: [{
                        data: [45, 25, 20, 10],
                        backgroundColor: ['#4ecdc4', '#ff6b6b', '#667eea', '#ffa726']
                    }]
                },
                options: {
                    responsive: true,
                    plugins: {
                        legend: {
                            labels: {
                                color: '#fff'
                            }
                        }
                    }
                }
            });
        }
    }

    initializeNotes() {
        console.log('Initializing notes...');
    }

    loadResourcesData() {
        console.log('Loading resources data...');
    }

    initializeTodos() {
        console.log('Initializing todos...');
    }

    initializeAIArtist() {
        const generateBtn = document.getElementById('start-generation');
        if (generateBtn) {
            generateBtn.addEventListener('click', () => this.generateAIArtist());
        }
    }

    async generateAIArtist() {
        const prompt = document.getElementById('artist-prompt').value;
        const genre = document.getElementById('genre-focus').value;
        const aesthetic = document.getElementById('aesthetic-style').value;

        if (!prompt.trim()) {
            alert('Please provide a description for your artist');
            return;
        }

        const progressContainer = document.getElementById('generation-progress');
        const resultsContainer = document.getElementById('generated-artists');
        
        // Show progress
        progressContainer.style.display = 'block';
        resultsContainer.innerHTML = '';

        const steps = ['profile', 'image', 'album', 'merch', 'music'];
        
        for (let i = 0; i < steps.length; i++) {
            const step = steps[i];
            const stepElement = document.querySelector(`[data-step="${step}"]`);
            
            stepElement.classList.add('active');
            
            // Simulate processing time
            await new Promise(resolve => setTimeout(resolve, 2000));
            
            stepElement.classList.remove('active');
            stepElement.classList.add('complete');
        }

        // Hide progress and show results
        progressContainer.style.display = 'none';
        
        // Generate mock artist data
        const artistData = this.generateMockArtistData(prompt, genre, aesthetic);
        this.displayGeneratedArtist(artistData);
    }

    generateMockArtistData(prompt, genre, aesthetic) {
        const names = ['Luna Nova', 'Echo Drift', 'Neon Pulse', 'Midnight Sage', 'Crystal Wave'];
        const randomName = names[Math.floor(Math.random() * names.length)];
        
        return {
            name: randomName,
            genre: genre || 'Electronic',
            bio: `${randomName} is an innovative artist who ${prompt.toLowerCase()}. Known for their unique sound and captivating performances.`,
            image: `https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop&crop=face`,
            album: {
                title: 'Digital Dreams',
                cover: `https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=300&h=300&fit=crop`,
                tracks: [
                    'Intro - Digital Awakening',
                    'Neon Nights',
                    'Electric Soul',
                    'Midnight Drive',
                    'Outro - Dawn'
                ]
            },
            merch: [
                { type: 'T-Shirt', price: '$25' },
                { type: 'Hoodie', price: '$45' },
                { type: 'Poster', price: '$15' },
                { type: 'Sticker Pack', price: '$8' }
            ]
        };
    }

    displayGeneratedArtist(artist) {
        const container = document.getElementById('generated-artists');
        
        container.innerHTML = `
            <div class="generated-artist-card">
                <div class="artist-header">
                    <div class="artist-main-info">
                        <img src="${artist.image}" alt="${artist.name}" class="artist-profile-image">
                        <div class="artist-basic-info">
                            <h2>${artist.name}</h2>
                            <p class="artist-genre">${artist.genre}</p>
                            <p class="artist-bio">${artist.bio}</p>
                        </div>
                    </div>
                </div>
                
                <div class="artist-details-tabs">
                    <div class="tab-nav">
                        <button class="tab-btn active" data-tab="album">Album</button>
                        <button class="tab-btn" data-tab="merch">Merchandise</button>
                        <button class="tab-btn" data-tab="details">Details</button>
                    </div>
                    
                    <div class="tab-content active" id="album-tab">
                        <div class="album-showcase">
                            <img src="${artist.album.cover}" alt="${artist.album.title}" class="album-cover">
                            <div class="album-info">
                                <h3>${artist.album.title}</h3>
                                <div class="track-list">
                                    ${artist.album.tracks.map((track, index) => `
                                        <div class="track-item">
                                            <button class="track-play">▶</button>
                                            <span>${track}</span>
                                            <span>3:${20 + index * 15}</span>
                                        </div>
                                    `).join('')}
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div class="tab-content" id="merch-tab">
                        <div class="merch-grid">
                            ${artist.merch.map(item => `
                                <div class="merch-item">
                                    <div class="merch-placeholder">🎨</div>
                                    <h4>${item.type}</h4>
                                    <p class="merch-price">${item.price}</p>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                    
                    <div class="tab-content" id="details-tab">
                        <div class="artist-full-details">
                            <div class="detail-section">
                                <h4>Background</h4>
                                <p>Generated based on your prompt and preferences.</p>
                            </div>
                            <div class="detail-section">
                                <h4>Style</h4>
                                <p>Unique blend of ${artist.genre.toLowerCase()} with modern influences.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;

        // Bind tab functionality
        const tabBtns = container.querySelectorAll('.tab-btn');
        const tabContents = container.querySelectorAll('.tab-content');

        tabBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const tabId = btn.dataset.tab;
                
                tabBtns.forEach(b => b.classList.remove('active'));
                tabContents.forEach(c => c.classList.remove('active'));
                
                btn.classList.add('active');
                document.getElementById(`${tabId}-tab`).classList.add('active');
            });
        });
    }

    sendAIMessage() {
        const input = document.getElementById('ai-input');
        const messages = document.getElementById('chat-messages');
        const message = input.value.trim();

        if (!message) return;

        // Add user message
        const userMessage = document.createElement('div');
        userMessage.className = 'message user';
        userMessage.textContent = message;
        messages.appendChild(userMessage);

        // Clear input
        input.value = '';

        // Simulate AI response
        setTimeout(() => {
            const aiMessage = document.createElement('div');
            aiMessage.className = 'message ai';
            aiMessage.innerHTML = this.generateAIResponse(message);
            messages.appendChild(aiMessage);
            messages.scrollTop = messages.scrollHeight;
        }, 1000);

        messages.scrollTop = messages.scrollHeight;
    }

    generateAIResponse(message) {
        const responses = [
            "I can help you with that! Let me analyze your label's data and provide some insights.",
            "Based on your current campaigns, I recommend focusing on social media engagement.",
            "Your streaming numbers look great! Consider expanding to new platforms.",
            "I notice some opportunities in your schedule. Would you like me to suggest some optimizations?",
            "Let me help you create a targeted marketing strategy for your artists."
        ];

        return responses[Math.floor(Math.random() * responses.length)];
    }
}

// Flyer Placement Component (Enhanced)
class FlyerPlacement {
    constructor() {
        this.initElements();
        this.bindEvents();
    }

    initElements() {
        this.searchInput = document.querySelector('.cardspotter-search input');
        this.searchBtn = document.querySelector('.cardspotter-search button');
        this.resultsContainer = document.querySelector('.cardspotter-results');
    }

    bindEvents() {
        if (this.searchBtn) {
            this.searchBtn.addEventListener('click', () => this.searchLocations());
        }
        if (this.searchInput) {
            this.searchInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') this.searchLocations();
            });
        }
    }

    async searchLocations() {
        const query = this.searchInput?.value.trim();
        if (!query || !this.resultsContainer) return;

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
                    { name: 'Coffee Shop', type: 'cafe', score: 92, address: '123 Main St' },
                    { name: 'Record Store', type: 'music', score: 88, address: '456 Music Ave' },
                    { name: 'University Campus', type: 'education', score: 85, address: '789 Campus Dr' }
                ]);
            }, 1000);
        });
    }

    displayResults(results) {
        if (!this.resultsContainer) return;
        
        this.resultsContainer.innerHTML = results.map(result => `
            <div class="lf-flyer-card">
                <h4>${result.name}</h4>
                <p>Type: ${result.type}</p>
                <p>Score: ${result.score}/100</p>
                <p>Address: ${result.address}</p>
            </div>
        `).join('');
    }

    showLoading() {
        if (this.resultsContainer) {
            this.resultsContainer.innerHTML = '<div class="loading">Searching...</div>';
        }
    }

    showError(message) {
        if (this.resultsContainer) {
            this.resultsContainer.innerHTML = `<div class="error">${message}</div>`;
        }
    }
}

// Merch Generator Component (Enhanced)
class MerchGenerator {
    constructor() {
        this.initElements();
        this.bindEvents();
    }

    initElements() {
        this.productSelect = document.querySelector('.merchmaker-form select');
        this.designInput = document.querySelector('.merchmaker-form textarea');
        this.generateBtn = document.querySelector('.merchmaker-form .btn-primary');
        this.previewContainer = document.querySelector('.merchmaker-preview');
    }

    bindEvents() {
        if (this.generateBtn) {
            this.generateBtn.addEventListener('click', () => this.generateMockup());
        }
    }

    async generateMockup() {
        const product = this.productSelect?.value;
        const design = this.designInput?.value.trim();
        
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
        if (!this.previewContainer) return;
        
        this.previewContainer.innerHTML = `
            <img src="${mockup.url}" alt="${mockup.product} mockup" style="max-width: 100%; border-radius: 8px;">
            <p>${mockup.design}</p>
        `;
    }

    showLoading() {
        if (this.previewContainer) {
            this.previewContainer.innerHTML = '<div class="loading">Generating...</div>';
        }
    }

    showError(message) {
        if (this.previewContainer) {
            this.previewContainer.innerHTML = `<div class="error">${message}</div>`;
        }
    }
}

// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.labelFlowApp = new LabelFlowApp();
});
