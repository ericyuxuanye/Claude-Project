// API Base URL
const API_BASE = '/api';

// Mapbox configuration
mapboxgl.accessToken = 'pk.eyJ1IjoiZXJpY3k0IiwiYSI6ImNtaG14ODczaTFwYXkycnB0azI5eGF0bjgifQ.Gwv4jC4Je1pJnHKsirVb_g';

// State
let buildings = [];
let map = null;
let markers = [];
let currentLocationMarker = null;
let userLocation = null;

// DOM Elements
const fromTypeSelect = document.getElementById('from-type');
const fromBuildingSelect = document.getElementById('from-building');
const toBuildingSelect = document.getElementById('to-building');
const routeTimeInput = document.getElementById('route-time');
const useCurrentTimeBtn = document.getElementById('use-current-time');
const findRouteBtn = document.getElementById('find-route');
const routeResult = document.getElementById('route-result');
const routeSummary = document.getElementById('route-summary');
const routeSteps = document.getElementById('route-steps');
const routeWarnings = document.getElementById('route-warnings');
const errorToast = document.getElementById('error-toast');
const buildingInfo = document.getElementById('building-info');
const currentTimeDisplay = document.getElementById('current-time-display');
const togglePanelBtn = document.getElementById('toggle-panel');
const closeResultBtn = document.getElementById('close-result');
const closeInfoBtn = document.getElementById('close-info');

// Initialize app
async function init() {
    await loadBuildings();
    initializeMap();
    setCurrentTime();
    updateCurrentTimeDisplay();
    setInterval(updateCurrentTimeDisplay, 1000);
    setupEventListeners();
    requestUserLocation();
}

// Initialize Mapbox map with dark theme
function initializeMap() {
    map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/mapbox/dark-v11', // Dark theme
        center: [-122.3078, 47.6553],
        zoom: 15.5,
        pitch: 45 // 3D tilt
    });

    // Add navigation controls
    map.addControl(new mapboxgl.NavigationControl(), 'bottom-right');

    map.on('load', () => {
        addBuildingMarkers();
    });
}

// Request user's current location
function requestUserLocation() {
    if ('geolocation' in navigator) {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                userLocation = {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude
                };
                addCurrentLocationMarker();
            },
            (error) => {
                console.log('Location access denied or unavailable');
            }
        );
    }
}

// Add current location marker
function addCurrentLocationMarker() {
    if (!userLocation || !map) return;

    const el = document.createElement('div');
    el.className = 'marker-current-location';

    currentLocationMarker = new mapboxgl.Marker(el)
        .setLngLat([userLocation.lng, userLocation.lat])
        .setPopup(new mapboxgl.Popup({ offset: 25 }).setHTML(
            '<div style="padding: 8px; color: #333;"><strong>You are here</strong></div>'
        ))
        .addTo(map);
}

// Add building markers to map
function addBuildingMarkers() {
    buildings.forEach(building => {
        const el = document.createElement('div');
        el.style.width = '30px';
        el.style.height = '30px';
        el.style.borderRadius = '50%';
        el.style.backgroundColor = '#4b2e83';
        el.style.border = '3px solid white';
        el.style.boxShadow = '0 2px 8px rgba(0,0,0,0.5)';
        el.style.cursor = 'pointer';

        const popup = new mapboxgl.Popup({ offset: 25 }).setHTML(
            `<div style="padding: 8px; color: #333;">
                <strong style="color: #4b2e83;">${building.name}</strong><br>
                <small>${building.entrances.length} entrance(s)</small>
            </div>`
        );

        const marker = new mapboxgl.Marker(el)
            .setLngLat([building.coordinates.lng, building.coordinates.lat])
            .setPopup(popup)
            .addTo(map);

        markers.push(marker);

        el.addEventListener('click', () => {
            showBuildingInfo(building.id);
        });
    });
}

// Draw route on map
function drawRouteOnMap(routeData, fromCoords) {
    // Clear existing route
    if (map.getLayer('route')) map.removeLayer('route');
    if (map.getLayer('route-background')) map.removeLayer('route-background');
    if (map.getSource('route')) map.removeSource('route');

    // Stop existing animation
    if (window.routeAnimationInterval) {
        clearInterval(window.routeAnimationInterval);
    }

    // Remove previous start/end markers
    const oldMarkers = document.querySelectorAll('.route-marker');
    oldMarkers.forEach(m => m.remove());

    // Build coordinates array
    const coordinates = [];

    // Check if route has coordinates in steps (from GPS routing)
    const hasStepCoordinates = routeData.route.steps.some(step => step.coordinates);

    if (hasStepCoordinates) {
        // Use coordinates from steps for GPS-based routing
        routeData.route.steps.forEach(step => {
            if (step.coordinates) {
                coordinates.push([step.coordinates.lng, step.coordinates.lat]);
            }
        });
    } else {
        // Legacy building-to-building routing
        // Add starting point if provided
        if (fromCoords) {
            coordinates.push([fromCoords.lng, fromCoords.lat]);
        }

        // Add route path coordinates
        routeData.route.path.forEach(entranceId => {
            for (let building of buildings) {
                const entrance = building.entrances.find(e => e.id === entranceId);
                if (entrance) {
                    coordinates.push([entrance.coordinates.lng, entrance.coordinates.lat]);
                    return;
                }
            }
        });
    }

    if (coordinates.length < 2) return;

    // Add route line
    map.addSource('route', {
        type: 'geojson',
        data: {
            type: 'Feature',
            properties: {},
            geometry: {
                type: 'LineString',
                coordinates: coordinates
            }
        }
    });

    // Background line (solid)
    map.addLayer({
        id: 'route-background',
        type: 'line',
        source: 'route',
        layout: {
            'line-join': 'round',
            'line-cap': 'round'
        },
        paint: {
            'line-color': '#2e7d32',
            'line-width': 8,
            'line-opacity': 0.4
        }
    });

    // Main route line with animated dashes
    map.addLayer({
        id: 'route',
        type: 'line',
        source: 'route',
        layout: {
            'line-join': 'round',
            'line-cap': 'round'
        },
        paint: {
            'line-color': '#4caf50',
            'line-width': 6,
            'line-opacity': 1,
            'line-dasharray': [0, 4, 3]
        }
    });

    // Animate the dash offset
    let dashArraySequence = [
        [0, 4, 3],
        [0.5, 4, 2.5],
        [1, 4, 2],
        [1.5, 4, 1.5],
        [2, 4, 1],
        [2.5, 4, 0.5],
        [3, 4, 0]
    ];
    let step = 0;

    function animateDashArray(timestamp) {
        step = (step + 1) % dashArraySequence.length;
        if (map.getLayer('route')) {
            map.setPaintProperty('route', 'line-dasharray', dashArraySequence[step]);
        }
    }

    // Clear any existing animation
    if (window.routeAnimationInterval) {
        clearInterval(window.routeAnimationInterval);
    }

    // Start animation (update every 100ms for smooth motion)
    window.routeAnimationInterval = setInterval(animateDashArray, 100);

    // Start marker
    const startEl = document.createElement('div');
    startEl.className = 'route-marker';
    startEl.style.width = '40px';
    startEl.style.height = '40px';
    startEl.style.borderRadius = '50%';
    startEl.style.backgroundColor = '#4caf50';
    startEl.style.border = '4px solid white';
    startEl.style.boxShadow = '0 3px 12px rgba(0,0,0,0.6)';
    startEl.innerHTML = '<div style="color: white; font-weight: bold; text-align: center; line-height: 32px; font-size: 18px;">S</div>';

    new mapboxgl.Marker(startEl).setLngLat(coordinates[0]).addTo(map);

    // End marker
    const endEl = document.createElement('div');
    endEl.className = 'route-marker';
    endEl.style.width = '40px';
    endEl.style.height = '40px';
    endEl.style.borderRadius = '50%';
    endEl.style.backgroundColor = '#f44336';
    endEl.style.border = '4px solid white';
    endEl.style.boxShadow = '0 3px 12px rgba(0,0,0,0.6)';
    endEl.innerHTML = '<div style="color: white; font-weight: bold; text-align: center; line-height: 32px; font-size: 18px;">E</div>';

    new mapboxgl.Marker(endEl).setLngLat(coordinates[coordinates.length - 1]).addTo(map);

    // Fit map to route
    const bounds = new mapboxgl.LngLatBounds();
    coordinates.forEach(coord => bounds.extend(coord));
    map.fitBounds(bounds, { padding: 100, duration: 1500 });
}

// Load buildings from API
async function loadBuildings() {
    try {
        const response = await fetch(`${API_BASE}/buildings`);
        const data = await response.json();
        buildings = data.buildings;
        populateBuildingSelects();
    } catch (error) {
        showError('Failed to load buildings. Please refresh the page.');
        console.error('Error loading buildings:', error);
    }
}

// Populate building select dropdowns
function populateBuildingSelects() {
    const options = buildings.map(building =>
        `<option value="${building.id}">${building.name}</option>`
    ).join('');

    fromBuildingSelect.innerHTML = '<option value="">Select building...</option>' + options;
    toBuildingSelect.innerHTML = '<option value="">Select destination...</option>' + options;
}

// Show building info panel
async function showBuildingInfo(buildingId) {
    const building = buildings.find(b => b.id === buildingId);
    if (!building) return;

    const dateTime = routeTimeInput.value || new Date().toISOString();

    try {
        const response = await fetch(`${API_BASE}/access/building/${buildingId}?dateTime=${dateTime}`);
        const data = await response.json();

        document.getElementById('building-name').textContent = building.name;

        const entrancesList = data.entrances.map(entrance => {
            const isAccessible = entrance.accessible;
            const statusClass = isAccessible ? 'entrance-accessible' : 'entrance-restricted';
            const statusBadge = isAccessible ?
                '<span class="access-status status-open">OPEN</span>' :
                '<span class="access-status status-closed">CLOSED</span>';

            const cardBadge = entrance.requiresCard ?
                '<span class="card-required">🔒 Husky Card Required</span>' : '';

            const reason = !isAccessible && entrance.reason ?
                `<p style="color: #f44336; margin-top: 10px;">⚠️ ${entrance.reason}</p>` : '';

            return `
                <div class="entrance-item ${statusClass}">
                    <h4>${entrance.name}</h4>
                    ${statusBadge}
                    ${cardBadge}
                    ${reason}
                </div>
            `;
        }).join('');

        document.getElementById('entrance-list').innerHTML = entrancesList;
        buildingInfo.classList.remove('hidden');

        map.flyTo({
            center: [building.coordinates.lng, building.coordinates.lat],
            zoom: 17,
            duration: 1500
        });

    } catch (error) {
        showError('Failed to load building information.');
        console.error('Error loading building info:', error);
    }
}

// Setup event listeners
function setupEventListeners() {
    findRouteBtn.addEventListener('click', findRoute);
    useCurrentTimeBtn.addEventListener('click', setCurrentTime);
    togglePanelBtn.addEventListener('click', () => {
        const panel = document.querySelector('.route-panel .panel-content');
        panel.style.display = panel.style.display === 'none' ? 'block' : 'none';
        togglePanelBtn.textContent = panel.style.display === 'none' ? '+' : '−';
    });
    closeResultBtn.addEventListener('click', () => {
        routeResult.classList.add('hidden');
        // Clear route from map
        if (map.getLayer('route')) map.removeLayer('route');
        if (map.getLayer('route-background')) map.removeLayer('route-background');
        if (map.getSource('route')) map.removeSource('route');
        if (window.routeAnimationInterval) {
            clearInterval(window.routeAnimationInterval);
        }
        // Remove route markers
        const oldMarkers = document.querySelectorAll('.route-marker');
        oldMarkers.forEach(m => m.remove());
    });
    closeInfoBtn.addEventListener('click', () => buildingInfo.classList.add('hidden'));
    fromTypeSelect.addEventListener('change', (e) => {
        fromBuildingSelect.style.display = e.target.value === 'building' ? 'block' : 'none';
    });
}

// Set current time
function setCurrentTime() {
    const now = new Date();
    const offset = now.getTimezoneOffset() * 60000;
    const localTime = new Date(now - offset);
    routeTimeInput.value = localTime.toISOString().slice(0, 16);
}

// Update current time display
function updateCurrentTimeDisplay() {
    const now = new Date();
    const options = {
        weekday: 'short',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    };
    currentTimeDisplay.textContent = now.toLocaleDateString('en-US', options);
}

// Find route
async function findRoute() {
    const fromType = fromTypeSelect.value;
    const to = toBuildingSelect.value;
    const dateTime = routeTimeInput.value;

    let from = fromBuildingSelect.value;
    let fromCoords = null;

    // Validation
    if (fromType === 'current') {
        if (!userLocation) {
            showError('Location not available. Please enable location services.');
            return;
        }
        fromCoords = userLocation;
    } else if (!from) {
        showError('Please select a starting building.');
        return;
    }

    if (!to) {
        showError('Please select a destination.');
        return;
    }

    if (from === to && fromType === 'building') {
        showError('Starting building and destination cannot be the same.');
        return;
    }

    if (!dateTime) {
        showError('Please select a time for your route.');
        return;
    }

    try {
        const requestBody = { to, dateTime };

        // Add either fromCoords or from building ID
        if (fromCoords) {
            requestBody.fromCoords = fromCoords;
        } else {
            requestBody.from = from;
        }

        const response = await fetch(`${API_BASE}/route`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(requestBody)
        });

        const data = await response.json();

        if (data.error) {
            showError(`${data.error}${data.reason ? ': ' + data.reason : ''}`);
            return;
        }

        displayRoute(data, fromType === 'current' ? 'Your Location' : null);
        drawRouteOnMap(data, fromCoords);

    } catch (error) {
        showError('Failed to calculate route. Please try again.');
        console.error('Error finding route:', error);
    }
}

// Find nearest building to current location
function findNearestBuilding() {
    if (!userLocation) return null;

    let nearest = null;
    let minDist = Infinity;

    buildings.forEach(building => {
        const dist = Math.sqrt(
            Math.pow(building.coordinates.lat - userLocation.lat, 2) +
            Math.pow(building.coordinates.lng - userLocation.lng, 2)
        );
        if (dist < minDist) {
            minDist = dist;
            nearest = building.id;
        }
    });

    return nearest;
}

// Display route results
function displayRoute(routeData, customStart) {
    const fromText = customStart || buildings.find(b => b.id === fromBuildingSelect.value).name;
    const toBuilding = buildings.find(b => b.id === toBuildingSelect.value);

    routeSummary.innerHTML = `
        <p><strong>From:</strong> ${fromText}</p>
        <p><strong>To:</strong> ${toBuilding.name}</p>
        <p class="estimated-time">⏱️ ${routeData.estimatedMinutes} min</p>
    `;

    const stepsHTML = routeData.route.steps.map((step, index) => {
        let stepClass = 'step';
        if (step.type === 'start') stepClass += ' step-start';
        if (step.type === 'end') stepClass += ' step-end';

        return `
            <div class="${stepClass}">
                <span class="step-number">${index + 1}</span>
                <strong>${step.description}</strong>
            </div>
        `;
    }).join('');

    routeSteps.innerHTML = stepsHTML;
    checkRouteWarnings(routeData);
    routeResult.classList.remove('hidden');
}

// Check for route warnings
function checkRouteWarnings(routeData) {
    const warnings = [];

    routeData.route.path.forEach(entranceId => {
        const building = buildings.find(b => b.entrances.some(e => e.id === entranceId));
        if (building) {
            const entrance = building.entrances.find(e => e.id === entranceId);
            if (entrance && entrance.requiresCard) {
                warnings.push(`${building.name} - ${entrance.name} requires Husky Card`);
            }
        }
    });

    if (warnings.length > 0) {
        const warningsHTML = `
            <h4>⚠️ Important Notes:</h4>
            ${warnings.map(w => `<div class="warning-item">🔒 ${w}</div>`).join('')}
        `;
        routeWarnings.innerHTML = warningsHTML;
        routeWarnings.classList.remove('hidden');
    } else {
        routeWarnings.classList.add('hidden');
    }
}

// Show error toast
function showError(message) {
    errorToast.textContent = message;
    errorToast.classList.remove('hidden');
    setTimeout(() => {
        errorToast.classList.add('hidden');
    }, 4000);
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}
