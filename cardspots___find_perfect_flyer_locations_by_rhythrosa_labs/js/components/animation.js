export function initAnimationContainer() {
    const container = document.getElementById('animationContainer');
    container.innerHTML = `
        <div id="spotterAnimation">
            <svg viewBox="0 0 800 500" xmlns="http://www.w3.org/2000/svg">
                <defs>
                    <linearGradient id="locationGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" style="stop-color:#3494E6"/>
                        <stop offset="100%" style="stop-color:#EC6EAD"/>
                    </linearGradient>
                </defs>
                
                <!-- City Skyline Background -->
                <rect x="0" y="350" width="800" height="150" fill="#e0e0e0"/>
                <rect x="0" y="380" width="800" height="120" fill="#d0d0d0"/>
                
                <!-- Buildings -->
                <rect x="50" y="250" width="80" height="100" fill="#a0a0a0"/>
                <rect x="200" y="200" width="100" height="150" fill="#909090"/>
                <rect x="400" y="180" width="120" height="170" fill="#909090"/>
                <rect x="600" y="220" width="90" height="130" fill="#a0a0a0"/>
                
                <!-- Dynamic Location Pins -->
                <path class="pin-path" d="M100,300 Q400,100 700,300" 
                      stroke="url(#locationGradient)" stroke-width="4" fill="none"/>
                
                ${generateLocationPins()}
            </svg>
        </div>
    `;
}

function generateLocationPins() {
    const pinLocations = [
        { x: 100, y: 300 },
        { x: 400, y: 200 },
        { x: 700, y: 300 }
    ];
    
    return pinLocations.map(loc => `
        <g class="location-pin" transform="translate(${loc.x}, ${loc.y})">
            <path d="M0,0 L-10,-20 A20,20 0 1,1 10,-20 Z" fill="url(#locationGradient)"/>
            <circle cx="0" cy="-30" r="5" fill="white"/>
        </g>
    `).join('');
}