class MerchMockupMaker {
    constructor() {
        this.generatedMockups = [];
        this.favoritedMockups = [];
        this.currentMockup = null;
        this.kitPresets = this.initializeKitPresets();
        this.customKitItems = [];
        this.maxCustomKitItems = 10;
        this.initializeElements();
        this.bindEvents();
    }

    initializeKitPresets() {
        return {
            'starter-kit': ['t-shirt', 'mug', 'sticker'],
            'apparel-kit': ['t-shirt', 'hoodie', 'baseball-cap', 'tote-bag'],
            'office-kit': ['mug', 'notebook', 'mousepad', 'pen'],
            'lifestyle-kit': ['water-bottle', 't-shirt', 'phone-case', 'keychain'],
            'premium-kit': ['hoodie', 'mug', 'poster', 'sticker'],
            'tech-kit': ['laptop-skin', 'phone-case', 'mousepad', 'cable-organizer'],
            'outdoor-kit': ['water-bottle', 'baseball-cap', 'backpack', 'patch'],
            'cozy-kit': ['blanket', 'mug', 'pillow', 'candle'],
            'student-kit': ['notebook', 'pen', 'sticker', 'tote-bag'],
            'complete-kit': ['t-shirt', 'hoodie', 'mug', 'sticker', 'phone-case', 'tote-bag'],
            'fitness-kit': ['water-bottle', 'towel', 't-shirt', 'wristband'],
            'travel-kit': ['passport-holder', 'luggage-tag', 'travel-mug', 'neck-pillow'],
            'gamer-kit': ['mousepad', 'phone-case', 'sticker', 'tumbler'],
            'artist-kit': ['notebook', 'pen', 'tote-bag', 'sticker'],
            'coffee-lover-kit': ['mug', 'travel-mug', 'coaster', 'coffee-bag'],
            'eco-friendly-kit': ['water-bottle', 'tote-bag', 'bamboo-pen', 'sticker'],
            'professional-kit': ['business-card-holder', 'notebook', 'pen', 'mousepad'],
            'party-kit': ['shot-glass', 'coaster', 'napkin', 'party-favor'],
            'pet-lover-kit': ['pet-bowl', 'pet-toy', 't-shirt', 'car-decal'],
            'music-kit': ['phone-case', 'sticker', 'poster', 'tote-bag']
        };
    }

    initializeElements() {
        this.productTypeSelect = document.getElementById('product-type');
        this.designInput = document.getElementById('design-input');
        this.styleInput = document.getElementById('style-input');
        this.colorSchemeSelect = document.getElementById('color-scheme');
        this.environmentSelect = document.getElementById('environment');
        this.sizeFormatSelect = document.getElementById('size-format');
        this.materialTextureSelect = document.getElementById('material-texture');
        this.noTextCheckbox = document.getElementById('no-text');
        this.generateBtn = document.getElementById('generate-btn');
        this.mockupDisplay = document.getElementById('mockup-display');
        this.mockupActions = document.getElementById('mockup-actions');
        this.downloadBtn = document.getElementById('download-btn');
        this.regenerateBtn = document.getElementById('regenerate-btn');
        this.newMockupBtn = document.getElementById('new-mockup-btn');
        this.gallery = document.getElementById('gallery');
        this.gallerySection = document.getElementById('gallery-section');
        this.favoriteBtn = document.getElementById('favorite-btn');
        this.cameraAngles = document.getElementById('camera-angles');
        this.customKitBuilder = document.getElementById('custom-kit-builder');
        this.kitCheckboxes = document.querySelectorAll('.kit-checkbox');
        this.kitCounterText = document.getElementById('kit-counter-text');
    }

    bindEvents() {
        [this.productTypeSelect, this.designInput].forEach(element => {
            element.addEventListener('input', () => this.updateGenerateButton());
        });

        this.productTypeSelect.addEventListener('change', () => this.handleProductTypeChange());

        this.kitCheckboxes.forEach(checkbox => {
            checkbox.addEventListener('change', () => this.handleCustomKitChange());
        });

        this.generateBtn.addEventListener('click', () => this.generateMockup());
        this.downloadBtn.addEventListener('click', () => this.downloadMockup());
        this.regenerateBtn.addEventListener('click', () => this.regenerateMockup());
        this.newMockupBtn.addEventListener('click', () => this.createNewMockup());
        this.favoriteBtn.addEventListener('click', () => this.toggleFavorite());
        document.querySelectorAll('.angle-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const angle = e.target.dataset.angle;
                this.generateCameraAngle(angle);
            });
        });
    }

    handleProductTypeChange() {
        const selectedProduct = this.productTypeSelect.value;
        
        if (selectedProduct === 'custom-kit') {
            this.customKitBuilder.style.display = 'block';
        } else {
            this.customKitBuilder.style.display = 'none';
            this.clearCustomKit();
        }
        
        this.updateGenerateButton();
    }

    handleCustomKitChange() {
        const checkedBoxes = Array.from(this.kitCheckboxes).filter(cb => cb.checked);
        const checkedCount = checkedBoxes.length;
        
        // Update custom kit items array
        this.customKitItems = checkedBoxes.map(cb => cb.value);
        
        // Update counter
        this.kitCounterText.textContent = `${checkedCount} / ${this.maxCustomKitItems} items selected`;
        
        // Handle max limit
        const kitCounter = document.querySelector('.kit-counter');
        if (checkedCount >= this.maxCustomKitItems) {
            kitCounter.classList.add('max-reached');
            // Disable unchecked checkboxes
            this.kitCheckboxes.forEach(cb => {
                if (!cb.checked) {
                    cb.disabled = true;
                    cb.parentElement.style.opacity = '0.5';
                }
            });
        } else {
            kitCounter.classList.remove('max-reached');
            // Re-enable all checkboxes
            this.kitCheckboxes.forEach(cb => {
                cb.disabled = false;
                cb.parentElement.style.opacity = '1';
            });
        }
        
        // Update visual selection state
        this.kitCheckboxes.forEach(cb => {
            if (cb.checked) {
                cb.parentElement.classList.add('selected');
            } else {
                cb.parentElement.classList.remove('selected');
            }
        });
        
        this.updateGenerateButton();
    }

    clearCustomKit() {
        this.customKitItems = [];
        this.kitCheckboxes.forEach(cb => {
            cb.checked = false;
            cb.disabled = false;
            cb.parentElement.classList.remove('selected');
            cb.parentElement.style.opacity = '1';
        });
        this.kitCounterText.textContent = '0 / 10 items selected';
        document.querySelector('.kit-counter').classList.remove('max-reached');
    }

    updateGenerateButton() {
        const hasProductType = this.productTypeSelect.value.trim() !== '';
        const hasDesign = this.designInput.value.trim() !== '';
        
        let isValidKit = true;
        if (this.productTypeSelect.value === 'custom-kit') {
            isValidKit = this.customKitItems.length > 0;
        }
        
        this.generateBtn.disabled = !(hasProductType && hasDesign && isValidKit);
    }

    async generateMockup() {
        const mockupData = this.getMockupData();
        if (!this.validateMockupData(mockupData)) return;

        this.setLoadingState(true);

        try {
            // Check if it's a kit (preset or custom)
            if (this.kitPresets[mockupData.productType] || mockupData.productType === 'custom-kit') {
                await this.generateKit(mockupData);
            } else {
                await this.generateSingleMockup(mockupData);
            }
            
        } catch (error) {
            console.error('Error generating mockup:', error);
            this.showError('Failed to generate mockup. Please try again.');
        } finally {
            this.setLoadingState(false);
        }
    }

    async generateKit(mockupData) {
        let kitItems;
        
        if (mockupData.productType === 'custom-kit') {
            kitItems = this.customKitItems;
        } else {
            kitItems = this.kitPresets[mockupData.productType];
        }
        
        const kitImages = [];
        
        for (const item of kitItems) {
            const itemPrompt = this.buildPrompt({ ...mockupData, productType: item });
            const result = await websim.imageGen({
                prompt: itemPrompt,
                aspect_ratio: "1:1",
                width: 512,
                height: 512
            });
            
            kitImages.push({
                productType: item,
                imageUrl: result.url
            });
        }
        
        this.currentMockup = {
            ...mockupData,
            isKit: true,
            kitImages: kitImages,
            timestamp: new Date().toISOString()
        };

        this.displayKit(this.currentMockup);
        this.addToGallery(this.currentMockup);
    }

    async generateSingleMockup(mockupData) {
        const prompt = this.buildPrompt(mockupData);
        const result = await websim.imageGen({
            prompt: prompt,
            aspect_ratio: "1:1",
            width: 1024,
            height: 1024
        });

        this.currentMockup = {
            ...mockupData,
            imageUrl: result.url,
            timestamp: new Date().toISOString()
        };

        this.displayMockup(this.currentMockup);
        this.addToGallery(this.currentMockup);
    }

    getMockupData() {
        return {
            productType: this.productTypeSelect.value,
            design: this.designInput.value.trim(),
            style: this.styleInput.value,
            colorScheme: this.colorSchemeSelect.value,
            environment: this.environmentSelect.value,
            sizeFormat: this.sizeFormatSelect.value,
            materialTexture: this.materialTextureSelect.value,
            noText: this.noTextCheckbox.checked
        };
    }

    validateMockupData(data) {
        if (!data.productType) {
            this.showError('Please select a product type.');
            return false;
        }
        if (!data.design) {
            this.showError('Please describe your design.');
            return false;
        }
        return true;
    }

    buildPrompt(data) {
        let prompt = `High-quality realistic product mockup photograph of a ${data.productType}`;
        
        // Add design description
        prompt += ` featuring "${data.design}"`;
        
        // Handle no text option
        if (data.noText) {
            prompt += `, no text, no words, no letters, no typography, clean design without any textual elements`;
        }
        
        // Add style if specified
        if (data.style) {
            prompt += ` in ${data.style} style`;
        }
        
        // Add color scheme if specified
        if (data.colorScheme) {
            prompt += ` with ${data.colorScheme} color scheme`;
        }
        
        // Add material and texture
        if (data.materialTexture) {
            prompt += `, ${data.materialTexture} material`;
        }
        
        // Add size and format
        if (data.sizeFormat) {
            prompt += `, ${data.sizeFormat}`;
        }
        
        // Add environment and setting
        if (data.environment) {
            prompt += `, photographed in ${data.environment} setting`;
        }
        
        // Add technical specifications for better results
        prompt += `, professional photography, highly detailed, 4K quality`;
        
        // Enhanced product-specific specifications
        const productSpecifics = {
            't-shirt': ', model wearing the shirt, lifestyle photography',
            'hoodie': ', model wearing the hoodie, comfortable fit, lifestyle setting',
            'sweatshirt': ', cozy casual wear, relaxed fit',
            'tank-top': ', athletic wear, summer vibes',
            'long-sleeve': ', layered styling, casual comfort',
            'polo-shirt': ', smart casual wear, collar detail',
            'mug': ', sitting on surface, steam or liquid visible',
            'travel-mug': ', commuter lifestyle, on-the-go setting',
            'phone-case': ', iPhone in hand, showing design clearly',
            'tote-bag': ', carried by person or displayed elegantly',
            'backpack': ', travel or school setting, practical use',
            'drawstring-bag': ', sports or casual use, lightweight feel',
            'baseball-cap': ', worn by model or displayed on stand',
            'beanie': ', winter wear, cozy atmosphere',
            'poster': ', framed and hanging on wall, gallery style',
            'canvas-print': ', wall mounted, art gallery presentation',
            'framed-print': ', elegant framing, home decor setting',
            'sticker': ', applied to laptop, water bottle, or surface',
            'laptop-skin': ', applied to MacBook, sleek tech aesthetic',
            'water-bottle': ', held in hand or on desk, active lifestyle',
            'notebook': ', open on desk, study or work environment',
            'pillow': ', on couch or bed, home comfort setting',
            'mousepad': ', on desk with computer setup',
            'keychain': ', attached to keys, everyday carry item',
            'pin': ', pinned to jacket or bag, collectible display',
            'patch': ', sewn on fabric, detailed embroidery',
            'tumbler': ', with straw, beverage lifestyle',
            'wine-glass': ', elegant dining setting',
            'blanket': ', cozy home environment, comfort focus',
            'journal': ', personal writing space, inspirational setting',
            'greeting-card': ', gift presentation, special occasion',
            'coaster': ', protecting furniture, drink setting',
            'magnet': ', on refrigerator, kitchen environment',
            'clock': ', wall mounted, home or office decor'
        };
        
        if (productSpecifics[data.productType]) {
            prompt += productSpecifics[data.productType];
        }
        
        return prompt;
    }

    setLoadingState(isLoading) {
        if (isLoading) {
            this.generateBtn.querySelector('.btn-text').style.display = 'none';
            this.generateBtn.querySelector('.btn-loader').style.display = 'inline';
            this.generateBtn.disabled = true;
            
            // Show loading in mockup display
            this.mockupDisplay.innerHTML = `
                <div class="loading-overlay">
                    <div class="loading-spinner">🎨</div>
                </div>
            `;
        } else {
            this.generateBtn.querySelector('.btn-text').style.display = 'inline';
            this.generateBtn.querySelector('.btn-loader').style.display = 'none';
            this.updateGenerateButton();
        }
    }

    displayMockup(mockup) {
        this.mockupDisplay.innerHTML = `
            <img src="${mockup.imageUrl}" alt="Generated mockup" class="mockup-image">
        `;
        this.mockupActions.style.display = 'flex';
    }

    displayKit(mockup) {
        let kitHTML = '<div class="kit-images">';
        mockup.kitImages.forEach(item => {
            kitHTML += `
                <div class="kit-item">
                    <img src="${item.imageUrl}" alt="${item.productType}">
                    <div class="kit-item-info">
                        <h4>${this.capitalizeFirst(item.productType)}</h4>
                    </div>
                </div>
            `;
        });
        kitHTML += '</div>';
        
        this.mockupDisplay.innerHTML = kitHTML;
        this.mockupActions.style.display = 'flex';
    }

    addToGallery(mockup) {
        this.generatedMockups.push(mockup);
        
        const galleryItem = document.createElement('div');
        galleryItem.className = 'gallery-item';
        
        if (mockup.isKit) {
            const firstImage = mockup.kitImages[0];
            galleryItem.innerHTML = `
                <img src="${firstImage.imageUrl}" alt="Kit mockup" class="gallery-image">
                <div class="gallery-info">
                    <h4>${this.capitalizeFirst(mockup.productType)} (${mockup.kitImages.length} items)</h4>
                    <p>${mockup.design.substring(0, 60)}${mockup.design.length > 60 ? '...' : ''}</p>
                </div>
            `;
        } else {
            galleryItem.innerHTML = `
                <img src="${mockup.imageUrl}" alt="Mockup" class="gallery-image">
                <div class="gallery-info">
                    <h4>${this.capitalizeFirst(mockup.productType)} Design</h4>
                    <p>${mockup.design.substring(0, 60)}${mockup.design.length > 60 ? '...' : ''}</p>
                </div>
            `;
        }
        
        galleryItem.addEventListener('click', () => {
            this.currentMockup = mockup;
            if (mockup.isKit) {
                this.displayKit(mockup);
            } else {
                this.displayMockup(mockup);
            }
            
            // Update favorite button state
            const isFavorited = this.favoritedMockups.some(m => m.timestamp === mockup.timestamp);
            if (isFavorited) {
                this.favoriteBtn.textContent = '⭐ Favorited';
                this.favoriteBtn.classList.add('favorited');
                this.cameraAngles.style.display = 'block';
            } else {
                this.favoriteBtn.textContent = '⭐ Favorite';
                this.favoriteBtn.classList.remove('favorited');
                this.cameraAngles.style.display = 'none';
            }
            
            this.mockupDisplay.scrollIntoView({ behavior: 'smooth' });
        });
        
        this.gallery.insertBefore(galleryItem, this.gallery.firstChild);
        this.gallerySection.style.display = 'block';
    }

    async downloadMockup() {
        if (!this.currentMockup) return;
        
        try {
            if (this.currentMockup.isKit) {
                // For kits, download each image separately
                for (let i = 0; i < this.currentMockup.kitImages.length; i++) {
                    const item = this.currentMockup.kitImages[i];
                    await this.downloadSingleImage(item.imageUrl, `kit-${item.productType}-${Date.now()}.png`);
                    // Add small delay between downloads
                    if (i < this.currentMockup.kitImages.length - 1) {
                        await new Promise(resolve => setTimeout(resolve, 500));
                    }
                }
            } else {
                await this.downloadSingleImage(this.currentMockup.imageUrl, `mockup-${this.currentMockup.productType}-${Date.now()}.png`);
            }
            
        } catch (error) {
            console.error('Error downloading mockup:', error);
            this.showError('Failed to download mockup. Please try again.');
        }
    }

    async downloadSingleImage(imageUrl, filename) {
        try {
            // Try direct blob download first
            const response = await fetch(imageUrl, { mode: 'cors' });
            
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            
            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);
            
            const a = document.createElement('a');
            a.style.display = 'none';
            a.href = url;
            a.download = filename;
            
            document.body.appendChild(a);
            a.click();
            
            window.URL.revokeObjectURL(url);
            document.body.removeChild(a);
            
        } catch (error) {
            // Fallback: Open image in new tab if CORS fails
            console.warn('Direct download failed, opening in new tab:', error);
            const a = document.createElement('a');
            a.href = imageUrl;
            a.target = '_blank';
            a.download = filename;
            a.click();
        }
    }

    async regenerateMockup() {
        if (!this.currentMockup) return;
        
        this.setLoadingState(true);
        
        try {
            const prompt = this.buildPrompt(this.currentMockup) + ` (variation ${Math.floor(Math.random() * 1000)})`;
            const result = await websim.imageGen({
                prompt: prompt,
                aspect_ratio: "1:1",
                width: 1024,
                height: 1024
            });
            
            this.currentMockup.imageUrl = result.url;
            this.currentMockup.timestamp = new Date().toISOString();
            
            this.displayMockup(this.currentMockup);
            this.addToGallery(this.currentMockup);
            
        } catch (error) {
            console.error('Error regenerating mockup:', error);
            this.showError('Failed to regenerate mockup. Please try again.');
        } finally {
            this.setLoadingState(false);
        }
    }

    createNewMockup() {
        // Reset form
        this.productTypeSelect.value = '';
        this.designInput.value = '';
        this.styleInput.value = '';
        this.colorSchemeSelect.value = '';
        this.environmentSelect.value = '';
        this.sizeFormatSelect.value = '';
        this.materialTextureSelect.value = '';
        this.noTextCheckbox.checked = false;
        
        // Hide custom kit builder and clear selections
        this.customKitBuilder.style.display = 'none';
        this.clearCustomKit();
        
        // Reset display
        this.mockupDisplay.innerHTML = `
            <div class="placeholder-content">
                <div class="placeholder-icon">🎨</div>
                <h3>Your mockup will appear here</h3>
                <p>Fill out the form and click "Generate Mockup" to create your AI-powered product visualization</p>
            </div>
        `;
        
        this.mockupActions.style.display = 'none';
        this.currentMockup = null;
        this.updateGenerateButton();
        
        // Scroll to top
        this.productTypeSelect.scrollIntoView({ behavior: 'smooth' });
    }

    toggleFavorite() {
        if (!this.currentMockup) return;
        
        const isFavorited = this.favoritedMockups.some(m => m.timestamp === this.currentMockup.timestamp);
        
        if (isFavorited) {
            this.favoritedMockups = this.favoritedMockups.filter(m => m.timestamp !== this.currentMockup.timestamp);
            this.favoriteBtn.textContent = '⭐ Favorite';
            this.favoriteBtn.classList.remove('favorited');
            this.cameraAngles.style.display = 'none';
        } else {
            this.favoritedMockups.push(this.currentMockup);
            this.favoriteBtn.textContent = '⭐ Favorited';
            this.favoriteBtn.classList.add('favorited');
            this.cameraAngles.style.display = 'block';
        }
    }

    async generateCameraAngle(angle) {
        if (!this.currentMockup) return;
        
        this.setLoadingState(true);
        
        try {
            const anglePrompts = {
                'front-view': 'straight front view, centered composition',
                'side-view': 'side profile view, showing depth and dimension',
                'top-view': 'top-down aerial view, bird\'s eye perspective',
                'diagonal-view': 'diagonal 45-degree angle, dynamic perspective',
                'lifestyle-shot': 'lifestyle photography, natural environment, in-use',
                'close-up': 'extreme close-up detail shot, macro photography'
            };
            
            if (this.currentMockup.isKit) {
                // Generate new angles for each item in the kit
                const newKitImages = [];
                for (const item of this.currentMockup.kitImages) {
                    const basePrompt = this.buildPrompt({ ...this.currentMockup, productType: item.productType });
                    const anglePrompt = `${basePrompt}, ${anglePrompts[angle]}`;
                    
                    const result = await websim.imageGen({
                        prompt: anglePrompt,
                        aspect_ratio: "1:1",
                        width: 512,
                        height: 512
                    });
                    
                    newKitImages.push({
                        productType: item.productType,
                        imageUrl: result.url
                    });
                }
                
                this.currentMockup.kitImages = newKitImages;
                this.displayKit(this.currentMockup);
            } else {
                // Generate new angle for single mockup
                const basePrompt = this.buildPrompt(this.currentMockup);
                const anglePrompt = `${basePrompt}, ${anglePrompts[angle]}`;
                
                const result = await websim.imageGen({
                    prompt: anglePrompt,
                    aspect_ratio: "1:1",
                    width: 1024,
                    height: 1024
                });
                
                this.currentMockup.imageUrl = result.url;
                this.displayMockup(this.currentMockup);
            }
            
            this.currentMockup.timestamp = new Date().toISOString();
            this.addToGallery(this.currentMockup);
            
        } catch (error) {
            console.error('Error generating camera angle:', error);
            this.showError('Failed to generate new camera angle. Please try again.');
        } finally {
            this.setLoadingState(false);
        }
    }

    showError(message) {
        // Simple error display - could be enhanced with a proper modal
        alert(message);
    }

    capitalizeFirst(str) {
        return str.charAt(0).toUpperCase() + str.slice(1).replace('-', ' ');
    }
}

// Initialize the application when the page loads
document.addEventListener('DOMContentLoaded', () => {
    new MerchMockupMaker();
});