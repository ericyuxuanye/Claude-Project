// API Base URL
const API_BASE = '/api';

// Mapbox configuration
mapboxgl.accessToken = 'pk.eyJ1IjoiZXJpY3k0IiwiYSI6ImNtaG14ODczaTFwYXkycnB0azI5eGF0bjgifQ.Gwv4jC4Je1pJnHKsirVb_g';

// State
let buildings = [];
let selectedBuilding = null;
let map = null;
let routeLayer = null;
let markers = [];

// DOM Elements
const fromBuildingSelect = document.getElementById('from-building');
const toBuildingSelect = document.getElementById('to-building');
const routeTimeInput = document.getElementById('route-time');
const useCurrentTimeBtn = document.getElementById('use-current-time');
const findRouteBtn = document.getElementById('find-route');
const routeResult = document.getElementById('route-result');
const routeSummary = document.getElementById('route-summary');
const routeSteps = document.getElementById('route-steps');
const routeWarnings = document.getElementById('route-warnings');
const errorMessage = document.getElementById('error-message');
const buildingList = document.getElementById('building-list');
const accessDetails = document.getElementById('access-details');
const currentTimeDisplay = document.getElementById('current-time-display');

// Initialize app
async function init() {
    await loadBuildings();
    initializeMap();
    setCurrentTime();
    updateCurrentTimeDisplay();
    setInterval(updateCurrentTimeDisplay, 1000);
    setupEventListeners();
}

// Initialize Mapbox map
function initializeMap() {
    map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/mapbox/streets-v12',
        center: [-122.3078, 47.6553], // UW campus center
        zoom: 15.5
    });

    // Add navigation controls
    map.addControl(new mapboxgl.NavigationControl());

    map.on('load', () => {
        addBuildingMarkers();
    });
}

// Add building markers to map
function addBuildingMarkers() {
    buildings.forEach(building => {
        // Create custom marker element
        const el = document.createElement('div');
        el.className = 'custom-marker';
        el.style.width = '30px';
        el.style.height = '30px';
        el.style.borderRadius = '50%';
        el.style.backgroundColor = '#4b2e83';
        el.style.border = '3px solid white';
        el.style.boxShadow = '0 2px 8px rgba(0,0,0,0.3)';
        el.style.cursor = 'pointer';

        // Create popup
        const popup = new mapboxgl.Popup({ offset: 25 }).setHTML(
            `<div style="padding: 8px;">
                <strong style="color: #4b2e83;">${building.name}</strong><br>
                <small>${building.entrances.length} entrance(s)</small>
            </div>`
        );

        // Add marker
        const marker = new mapboxgl.Marker(el)
            .setLngLat([building.coordinates.lng, building.coordinates.lat])
            .setPopup(popup)
            .addTo(map);

        markers.push(marker);

        // Click handler
        el.addEventListener('click', () => {
            showBuildingAccess(building.id);
        });
    });
}

// Draw route on map
function drawRouteOnMap(routeData) {
    // Clear existing route
    if (map.getLayer('route')) {
        map.removeLayer('route');
    }
    if (map.getSource('route')) {
        map.removeSource('route');
    }

    // Get coordinates for each entrance in the path
    const coordinates = routeData.route.path.map(entranceId => {
        for (let building of buildings) {
            const entrance = building.entrances.find(e => e.id === entranceId);
            if (entrance) {
                return [entrance.coordinates.lng, entrance.coordinates.lat];
            }
        }
        return null;
    }).filter(coord => coord !== null);

    if (coordinates.length < 2) return;

    // Add route source
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

    // Add route layer
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
            'line-width': 5,
            'line-opacity': 0.8
        }
    });

    // Add start and end markers
    const startCoord = coordinates[0];
    const endCoord = coordinates[coordinates.length - 1];

    // Start marker (green)
    const startEl = document.createElement('div');
    startEl.style.width = '40px';
    startEl.style.height = '40px';
    startEl.style.borderRadius = '50%';
    startEl.style.backgroundColor = '#4caf50';
    startEl.style.border = '4px solid white';
    startEl.style.boxShadow = '0 3px 12px rgba(0,0,0,0.4)';
    startEl.innerHTML = '<div style="color: white; font-weight: bold; text-align: center; line-height: 32px; font-size: 18px;">S</div>';

    new mapboxgl.Marker(startEl)
        .setLngLat(startCoord)
        .addTo(map);

    // End marker (red)
    const endEl = document.createElement('div');
    endEl.style.width = '40px';
    endEl.style.height = '40px';
    endEl.style.borderRadius = '50%';
    endEl.style.backgroundColor = '#f44336';
    endEl.style.border = '4px solid white';
    endEl.style.boxShadow = '0 3px 12px rgba(0,0,0,0.4)';
    endEl.innerHTML = '<div style="color: white; font-weight: bold; text-align: center; line-height: 32px; font-size: 18px;">E</div>';

    new mapboxgl.Marker(endEl)
        .setLngLat(endCoord)
        .addTo(map);

    // Fit map to show entire route
    const bounds = new mapboxgl.LngLatBounds();
    coordinates.forEach(coord => bounds.extend(coord));
    map.fitBounds(bounds, { padding: 80, duration: 1000 });
}

// Load buildings from API
async function loadBuildings() {
    try {
        const response = await fetch(`${API_BASE}/buildings`);
        const data = await response.json();
        buildings = data.buildings;
        populateBuildingSelects();
        displayBuildingList();
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

    fromBuildingSelect.innerHTML = '<option value="">Select starting building...</option>' + options;
    toBuildingSelect.innerHTML = '<option value="">Select destination...</option>' + options;
}

// Display building list
function displayBuildingList() {
    buildingList.innerHTML = buildings.map(building => `
        <div class="building-card" onclick="showBuildingAccess('${building.id}')">
            <h3>${building.name}</h3>
            <p class="entrance-count">${building.entrances.length} entrance${building.entrances.length > 1 ? 's' : ''}</p>
        </div>
    `).join('');
}

// Show building access details
async function showBuildingAccess(buildingId) {
    selectedBuilding = buildingId;
    const building = buildings.find(b => b.id === buildingId);

    if (!building) return;

    const dateTime = routeTimeInput.value || new Date().toISOString();

    try {
        const response = await fetch(`${API_BASE}/access/building/${buildingId}?dateTime=${dateTime}`);
        const data = await response.json();

        document.getElementById('access-building-name').textContent = building.name;

        const entrancesList = data.entrances.map(entrance => {
            const isAccessible = entrance.accessible;
            const statusClass = isAccessible ? 'entrance-accessible' : 'entrance-restricted';
            const statusBadge = isAccessible ?
                '<span class="access-status status-open">OPEN</span>' :
                '<span class="access-status status-closed">CLOSED</span>';

            let scheduleHTML = '';
            if (entrance.schedule) {
                const days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
                scheduleHTML = '<div class="access-schedule">' +
                    days.map(day => {
                        const capitalDay = day.charAt(0).toUpperCase() + day.slice(1);
                        const schedule = entrance.schedule;
                        return schedule ?
                            `<div class="schedule-day"><span class="day-name">${capitalDay}:</span> ${schedule.open} - ${schedule.close}</div>` :
                            `<div class="schedule-day"><span class="day-name">${capitalDay}:</span> Closed</div>`;
                    }).join('') +
                    '</div>';
            }

            const cardBadge = entrance.requiresCard ?
                '<span class="card-required">🔒 Husky Card Required</span>' : '';

            const reason = !isAccessible && entrance.reason ?
                `<p style="color: #c62828; margin-top: 10px;">⚠️ ${entrance.reason}</p>` : '';

            return `
                <div class="entrance-item ${statusClass}">
                    <h4>${entrance.name}</h4>
                    ${statusBadge}
                    ${cardBadge}
                    ${reason}
                    ${scheduleHTML}
                </div>
            `;
        }).join('');

        document.getElementById('entrance-access-list').innerHTML = entrancesList;
        accessDetails.classList.remove('hidden');

        // Fly to building on map
        if (map && building.coordinates) {
            map.flyTo({
                center: [building.coordinates.lng, building.coordinates.lat],
                zoom: 17,
                duration: 1500
            });
        }

    } catch (error) {
        showError('Failed to load access information.');
        console.error('Error loading access info:', error);
    }
}

// Setup event listeners
function setupEventListeners() {
    findRouteBtn.addEventListener('click', findRoute);
    useCurrentTimeBtn.addEventListener('click', setCurrentTime);
}

// Set current time in datetime input
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
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
    };
    currentTimeDisplay.textContent = now.toLocaleDateString('en-US', options);
}

// Find route between buildings
async function findRoute() {
    const from = fromBuildingSelect.value;
    const to = toBuildingSelect.value;
    const dateTime = routeTimeInput.value;

    // Validation
    if (!from || !to) {
        showError('Please select both starting building and destination.');
        return;
    }

    if (from === to) {
        showError('Starting building and destination cannot be the same.');
        return;
    }

    if (!dateTime) {
        showError('Please select a time for your route.');
        return;
    }

    hideError();
    routeResult.classList.add('hidden');

    try {
        const response = await fetch(`${API_BASE}/route`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ from, to, dateTime })
        });

        const data = await response.json();

        if (data.error) {
            showError(`${data.error}${data.reason ? ': ' + data.reason : ''}`);
            return;
        }

        displayRoute(data);
        drawRouteOnMap(data);

    } catch (error) {
        showError('Failed to calculate route. Please try again.');
        console.error('Error finding route:', error);
    }
}

// Display route results
function displayRoute(routeData) {
    const fromBuilding = buildings.find(b => b.id === fromBuildingSelect.value);
    const toBuilding = buildings.find(b => b.id === toBuildingSelect.value);

    // Summary
    routeSummary.innerHTML = `
        <p><strong>From:</strong> ${fromBuilding.name}</p>
        <p><strong>To:</strong> ${toBuilding.name}</p>
        <p class="estimated-time">⏱️ Estimated Time: ${routeData.estimatedMinutes} minutes</p>
    `;

    // Steps
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

    // Check for any warnings
    checkRouteWarnings(routeData);

    // Show result
    routeResult.classList.remove('hidden');
    routeResult.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

// Check for route warnings (e.g., card required)
function checkRouteWarnings(routeData) {
    const warnings = [];

    // Check if any entrance requires card
    routeData.route.path.forEach(entranceId => {
        const building = buildings.find(b =>
            b.entrances.some(e => e.id === entranceId)
        );

        if (building) {
            const entrance = building.entrances.find(e => e.id === entranceId);
            if (entrance && entrance.requiresCard) {
                warnings.push(`${building.name} (${entrance.name}) requires a Husky Card`);
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

// Show error message
function showError(message) {
    errorMessage.textContent = message;
    errorMessage.classList.remove('hidden');
    errorMessage.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

// Hide error message
function hideError() {
    errorMessage.classList.add('hidden');
}

// Make showBuildingAccess globally accessible
window.showBuildingAccess = showBuildingAccess;

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}
