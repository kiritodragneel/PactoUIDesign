// ============================================
// Pacto MCP Dashboard - JavaScript Application
// ============================================

// ============================================
// State Management
// ============================================

const AppState = {
    currentTab: 'dashboard',
    selectedJourneys: [],
    previousJourneys: [],
    currentCollection: null,
    currentView: 'table',
    map: null,
    markers: {
        all: [],
        stations: [],
        stops: [],
        hubs: [],
        incidents: []
    },
    activeMarkerType: 'all',
    searchCriteria: null
};

// ============================================
// Mock Data
// ============================================

const MockData = {
    collections: {
        users: [
            { id: 1, name: 'John Smith', email: 'john@example.com', role: 'Admin', status: 'Active', created: '2024-01-15' },
            { id: 2, name: 'Sarah Johnson', email: 'sarah@example.com', role: 'User', status: 'Active', created: '2024-01-20' },
            { id: 3, name: 'Mike Davis', email: 'mike@example.com', role: 'User', status: 'Inactive', created: '2024-02-01' },
            { id: 4, name: 'Emily Brown', email: 'emily@example.com', role: 'Editor', status: 'Active', created: '2024-02-10' },
            { id: 5, name: 'David Wilson', email: 'david@example.com', role: 'User', status: 'Active', created: '2024-02-15' }
        ],
        journeys: [
            { id: 1, origin: 'Central Station', destination: 'Airport', type: 'Train', duration: '45 mins', date: '2024-03-01' },
            { id: 2, origin: 'Downtown', destination: 'University', type: 'Bus', duration: '25 mins', date: '2024-03-02' },
            { id: 3, origin: 'Harbor', destination: 'City Center', type: 'Ferry', duration: '30 mins', date: '2024-03-03' },
            { id: 4, origin: 'North Station', destination: 'Tech Park', type: 'Metro', duration: '20 mins', date: '2024-03-04' },
            { id: 5, origin: 'Airport', destination: 'Hotel District', type: 'Bus', duration: '35 mins', date: '2024-03-05' }
        ],
        locations: [
            { id: 1, name: 'Central Station', type: 'Train Station', lat: 51.5074, lng: -0.1278, capacity: 50000 },
            { id: 2, name: 'Downtown Hub', type: 'Bus Terminal', lat: 51.5094, lng: -0.1338, capacity: 15000 },
            { id: 3, name: 'Harbor Terminal', type: 'Ferry Port', lat: 51.5034, lng: -0.1198, capacity: 8000 },
            { id: 4, name: 'Airport', type: 'Airport', lat: 51.4700, lng: -0.4543, capacity: 80000 },
            { id: 5, name: 'Tech Park Station', type: 'Metro Station', lat: 51.5154, lng: -0.1418, capacity: 25000 }
        ],
        routes: [
            { id: 1, name: 'Express Line 1', type: 'Train', stops: 12, distance: '45 km', status: 'Operational' },
            { id: 2, name: 'City Bus Route A', type: 'Bus', stops: 28, distance: '18 km', status: 'Operational' },
            { id: 3, name: 'Metro Green Line', type: 'Metro', stops: 15, distance: '22 km', status: 'Operational' },
            { id: 4, name: 'Harbor Express', type: 'Ferry', stops: 4, distance: '8 km', status: 'Maintenance' },
            { id: 5, name: 'Airport Shuttle', type: 'Bus', stops: 6, distance: '35 km', status: 'Operational' }
        ],
        reports: [
            { id: 1, title: 'Monthly Usage Report', type: 'Analytics', date: '2024-03-01', status: 'Complete' },
            { id: 2, title: 'Route Efficiency Analysis', type: 'Performance', date: '2024-02-28', status: 'Complete' },
            { id: 3, title: 'Incident Summary Q1', type: 'Safety', date: '2024-02-25', status: 'Pending' },
            { id: 4, title: 'Capacity Planning 2024', type: 'Planning', date: '2024-02-20', status: 'Complete' },
            { id: 5, title: 'Environmental Impact', type: 'Compliance', date: '2024-02-15', status: 'In Review' }
        ],
        activities: [
            { id: 1, action: 'User Login', user: 'john@example.com', timestamp: '2024-03-05 09:15:00', ip: '192.168.1.1' },
            { id: 2, action: 'Report Generated', user: 'sarah@example.com', timestamp: '2024-03-05 10:30:00', ip: '192.168.1.2' },
            { id: 3, action: 'Data Export', user: 'mike@example.com', timestamp: '2024-03-05 11:45:00', ip: '192.168.1.3' },
            { id: 4, action: 'Settings Updated', user: 'admin@example.com', timestamp: '2024-03-05 14:00:00', ip: '192.168.1.4' },
            { id: 5, action: 'Journey Planned', user: 'emily@example.com', timestamp: '2024-03-05 15:30:00', ip: '192.168.1.5' }
        ],
        settings: [
            { id: 1, key: 'app_name', value: 'Pacto MCP', category: 'General', updated: '2024-01-01' },
            { id: 2, key: 'timezone', value: 'UTC', category: 'General', updated: '2024-01-01' },
            { id: 3, key: 'max_routes', value: '100', category: 'Limits', updated: '2024-02-01' },
            { id: 4, key: 'cache_ttl', value: '3600', category: 'Performance', updated: '2024-02-15' },
            { id: 5, key: 'debug_mode', value: 'false', category: 'Development', updated: '2024-03-01' }
        ],
        media: [
            { id: 1, filename: 'station_photo.jpg', type: 'Image', size: '2.4 MB', uploaded: '2024-02-01' },
            { id: 2, filename: 'route_map.pdf', type: 'Document', size: '5.1 MB', uploaded: '2024-02-10' },
            { id: 3, filename: 'logo.svg', type: 'Vector', size: '48 KB', uploaded: '2024-01-15' },
            { id: 4, filename: 'promo_video.mp4', type: 'Video', size: '128 MB', uploaded: '2024-02-20' },
            { id: 5, filename: 'schedule.xlsx', type: 'Spreadsheet', size: '1.2 MB', uploaded: '2024-03-01' }
        ]
    },
    journeyOptions: [
        { id: 1, type: 'Train', origin: 'Central Station', destination: 'Airport', duration: 45, price: '$15', departures: '12', rating: 4.5 },
        { id: 2, type: 'Bus', origin: 'Central Station', destination: 'Airport', duration: 65, price: '$8', departures: '24', rating: 4.0 },
        { id: 3, type: 'Metro', origin: 'Central Station', destination: 'Airport Link', duration: 35, price: '$12', departures: '8', rating: 4.8 },
        { id: 4, type: 'Train', origin: 'South Station', destination: 'Airport', duration: 55, price: '$18', departures: '6', rating: 4.2 },
        { id: 5, type: 'Bus', origin: 'Downtown Hub', destination: 'Airport Terminal', duration: 50, price: '$10', departures: '15', rating: 4.3 },
        { id: 6, type: 'Train', origin: 'North Station', destination: 'Airport Express', duration: 40, price: '$20', departures: '10', rating: 4.7 }
    ],
    mapMarkers: {
        stations: [
            { lat: 51.5074, lng: -0.1278, name: 'Central Station', info: 'Main railway hub' },
            { lat: 51.5304, lng: -0.1248, name: 'King\'s Cross', info: 'Major terminus' },
            { lat: 51.4952, lng: -0.1439, name: 'Victoria', info: 'Southern terminus' }
        ],
        stops: [
            { lat: 51.5094, lng: -0.1338, name: 'Oxford Circus', info: 'Bus stop - 15 routes' },
            { lat: 51.5124, lng: -0.1198, name: 'Bank', info: 'Bus stop - 12 routes' },
            { lat: 51.5014, lng: -0.1258, name: 'Westminster', info: 'Bus stop - 8 routes' }
        ],
        hubs: [
            { lat: 51.5034, lng: -0.1134, name: 'Canary Wharf Hub', info: 'Multimodal transport hub' },
            { lat: 51.4700, lng: -0.4543, name: 'Heathrow Airport', info: 'International airport' },
            { lat: 51.5285, lng: -0.0818, name: 'Stratford International', info: 'High-speed rail hub' }
        ],
        incidents: [
            { lat: 51.5174, lng: -0.1378, name: 'Signal Failure', info: 'Delays expected - 15 mins' },
            { lat: 51.4984, lng: -0.1358, name: 'Road Works', info: 'Bus diversion in effect' }
        ]
    }
};

// ============================================
// DOM Elements
// ============================================

const elements = {
    sidebar: document.getElementById('sidebar'),
    sidebarToggle: document.getElementById('sidebarToggle'),
    mobileMenuBtn: document.getElementById('mobileMenuBtn'),
    pageTitle: document.getElementById('pageTitle'),
    navLinks: document.querySelectorAll('.nav-link'),
    tabContents: document.querySelectorAll('.tab-content'),
    collectionsList: document.getElementById('collectionsList'),
    collectionSearch: document.getElementById('collectionSearch'),
    dataPreviewBody: document.getElementById('dataPreviewBody'),
    selectedCollectionTitle: document.getElementById('selectedCollectionTitle'),
    recordCount: document.getElementById('recordCount'),
    viewToggle: document.querySelectorAll('.view-btn'),
    journeySearchForm: document.getElementById('journeySearchForm'),
    journeyResults: document.getElementById('journeyResults'),
    viewChoicesBtn: document.getElementById('viewChoicesBtn'),
    selectedCount: document.getElementById('selectedCount'),
    choicesModal: document.getElementById('choicesModal'),
    selectedChoicesList: document.getElementById('selectedChoicesList'),
    previousJourneysList: document.getElementById('previousJourneysList'),
    profileForm: document.getElementById('profileForm'),
    newsFeed: document.getElementById('newsFeed'),
    toastContainer: document.getElementById('toastContainer')
};

// ============================================
// Navigation
// ============================================

function initNavigation() {
    // Tab navigation
    elements.navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const tab = link.dataset.tab;
            switchToTab(tab);
        });
    });

    // Sidebar toggle
    elements.sidebarToggle?.addEventListener('click', () => {
        elements.sidebar.classList.toggle('collapsed');
    });

    // Mobile menu
    elements.mobileMenuBtn?.addEventListener('click', () => {
        elements.sidebar.classList.toggle('mobile-open');
    });

    // Close mobile menu on outside click
    document.addEventListener('click', (e) => {
        if (window.innerWidth <= 768) {
            if (!elements.sidebar.contains(e.target) && !elements.mobileMenuBtn.contains(e.target)) {
                elements.sidebar.classList.remove('mobile-open');
            }
        }
    });
}

function switchToTab(tabId) {
    // Update navigation
    elements.navLinks.forEach(link => {
        link.classList.toggle('active', link.dataset.tab === tabId);
    });

    // Update content
    elements.tabContents.forEach(content => {
        content.classList.toggle('active', content.id === tabId);
    });

    // Update page title
    const titles = {
        'dashboard': 'Dashboard',
        'view-data': 'View Data',
        'plan-journey': 'Plan Journey',
        'previous-journeys': 'Previous Journeys',
        'reports': 'Reports',
        'profile': 'Profile'
    };
    elements.pageTitle.textContent = titles[tabId] || 'Dashboard';

    // Initialize map if reports tab
    if (tabId === 'reports' && !AppState.map) {
        setTimeout(initMap, 100);
    }

    // Close mobile menu
    elements.sidebar.classList.remove('mobile-open');

    AppState.currentTab = tabId;
}

// ============================================
// View Data Tab
// ============================================

function initViewData() {
    // Collection item clicks
    elements.collectionsList?.addEventListener('click', (e) => {
        const item = e.target.closest('.collection-item');
        if (item) {
            selectCollection(item.dataset.collection);
        }
    });

    // Collection search
    elements.collectionSearch?.addEventListener('input', (e) => {
        filterCollections(e.target.value);
    });

    // View toggle
    elements.viewToggle.forEach(btn => {
        btn.addEventListener('click', () => {
            const view = btn.dataset.view;
            elements.viewToggle.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            AppState.currentView = view;
            if (AppState.currentCollection) {
                renderCollectionData(AppState.currentCollection);
            }
        });
    });
}

function selectCollection(collectionName) {
    // Update active state
    document.querySelectorAll('.collection-item').forEach(item => {
        item.classList.toggle('active', item.dataset.collection === collectionName);
    });

    AppState.currentCollection = collectionName;
    renderCollectionData(collectionName);
}

function filterCollections(searchTerm) {
    const items = document.querySelectorAll('.collection-item');
    items.forEach(item => {
        const name = item.querySelector('span:first-of-type').textContent.toLowerCase();
        item.style.display = name.includes(searchTerm.toLowerCase()) ? 'flex' : 'none';
    });
}

function renderCollectionData(collectionName) {
    const data = MockData.collections[collectionName];
    if (!data || data.length === 0) {
        elements.dataPreviewBody.innerHTML = `
            <div class="empty-state">
                <i class="fas fa-inbox"></i>
                <h4>No Data Available</h4>
                <p>This collection is empty.</p>
            </div>
        `;
        return;
    }

    // Update header
    const formattedName = collectionName.charAt(0).toUpperCase() + collectionName.slice(1);
    elements.selectedCollectionTitle.textContent = formattedName;
    elements.recordCount.textContent = `${data.length} records`;

    if (AppState.currentView === 'table') {
        renderTableView(data);
    } else {
        renderVerticalView(data);
    }
}

function renderTableView(data) {
    const columns = Object.keys(data[0]);

    let html = `
        <div class="data-table-container">
            <table class="data-table">
                <thead>
                    <tr>
                        ${columns.map(col => `<th>${formatColumnName(col)}</th>`).join('')}
                    </tr>
                </thead>
                <tbody>
                    ${data.map(row => `
                        <tr>
                            ${columns.map(col => `<td>${row[col]}</td>`).join('')}
                        </tr>
                    `).join('')}
                </tbody>
            </table>
        </div>
    `;

    elements.dataPreviewBody.innerHTML = html;
}

function renderVerticalView(data) {
    const columns = Object.keys(data[0]);

    let html = `
        <div class="vertical-table-container">
            ${data.map((row, index) => `
                <div class="vertical-record">
                    <div class="vertical-record-header">Record #${index + 1}</div>
                    <div class="vertical-fields">
                        ${columns.map(col => `
                            <div class="vertical-field">
                                <div class="field-name">${formatColumnName(col)}</div>
                                <div class="field-value">${row[col]}</div>
                            </div>
                        `).join('')}
                    </div>
                </div>
            `).join('')}
        </div>
    `;

    elements.dataPreviewBody.innerHTML = html;
}

function formatColumnName(name) {
    return name.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
}

// ============================================
// Plan Journey Tab
// ============================================

function initPlanJourney() {
    elements.journeySearchForm?.addEventListener('submit', (e) => {
        e.preventDefault();
        searchJourneys();
    });

    elements.journeySearchForm?.addEventListener('reset', () => {
        AppState.selectedJourneys = [];
        updateSelectedCount();
        elements.journeyResults.innerHTML = `
            <div class="empty-state">
                <i class="fas fa-search"></i>
                <h4>No Results Yet</h4>
                <p>Use the search form to find available journeys.</p>
            </div>
        `;
    });
}

function searchJourneys() {
    const origin = document.getElementById('origin').value;
    const destination = document.getElementById('destination').value;
    const date = document.getElementById('journeyDate').value;
    const time = document.getElementById('journeyTime').value;
    const transportType = document.getElementById('transportType').value;
    const maxDuration = document.getElementById('maxDuration').value;

    // Store search criteria
    AppState.searchCriteria = { origin, destination, date, time, transportType, maxDuration };

    // Simulate search (filter mock data)
    let results = [...MockData.journeyOptions];

    if (transportType) {
        results = results.filter(j => j.type.toLowerCase() === transportType.toLowerCase());
    }

    if (maxDuration) {
        results = results.filter(j => j.duration <= parseInt(maxDuration));
    }

    renderJourneyResults(results);
    showToast('Search Complete', `Found ${results.length} journey options`, 'success');
}

function renderJourneyResults(results) {
    if (results.length === 0) {
        elements.journeyResults.innerHTML = `
            <div class="empty-state">
                <i class="fas fa-search"></i>
                <h4>No Results Found</h4>
                <p>Try adjusting your search criteria.</p>
            </div>
        `;
        return;
    }

    const typeIcons = {
        'Train': 'fa-train',
        'Bus': 'fa-bus',
        'Metro': 'fa-subway',
        'Ferry': 'fa-ship',
        'Tram': 'fa-tram'
    };

    let html = results.map(journey => `
        <div class="journey-card ${AppState.selectedJourneys.includes(journey.id) ? 'selected' : ''}"
             data-journey-id="${journey.id}"
             onclick="toggleJourneySelection(${journey.id})">
            <div class="selection-indicator">
                <i class="fas fa-check"></i>
            </div>
            <div class="journey-card-header">
                <div class="journey-type">
                    <i class="fas ${typeIcons[journey.type] || 'fa-route'}"></i>
                    <span>${journey.type}</span>
                </div>
                <div class="journey-duration">${journey.duration} mins</div>
            </div>
            <div class="journey-route">
                <div class="route-point origin">
                    <i class="fas fa-circle"></i>
                    <span>${journey.origin}</span>
                </div>
                <div class="route-point destination">
                    <i class="fas fa-map-marker-alt"></i>
                    <span>${journey.destination}</span>
                </div>
            </div>
            <div class="journey-meta">
                <span><i class="fas fa-tag"></i> ${journey.price}</span>
                <span><i class="fas fa-clock"></i> ${journey.departures} departures/day</span>
                <span><i class="fas fa-star"></i> ${journey.rating}</span>
            </div>
        </div>
    `).join('');

    elements.journeyResults.innerHTML = html;
}

function toggleJourneySelection(journeyId) {
    const index = AppState.selectedJourneys.indexOf(journeyId);
    if (index > -1) {
        AppState.selectedJourneys.splice(index, 1);
    } else {
        AppState.selectedJourneys.push(journeyId);
    }

    // Update UI
    document.querySelectorAll('.journey-card').forEach(card => {
        const id = parseInt(card.dataset.journeyId);
        card.classList.toggle('selected', AppState.selectedJourneys.includes(id));
    });

    updateSelectedCount();
}

function updateSelectedCount() {
    const count = AppState.selectedJourneys.length;
    elements.selectedCount.textContent = count;
    elements.viewChoicesBtn.style.display = count > 0 ? 'flex' : 'none';
}

// ============================================
// Choices Modal
// ============================================

function openChoicesModal() {
    const selectedJourneys = MockData.journeyOptions.filter(j =>
        AppState.selectedJourneys.includes(j.id)
    );

    const typeIcons = {
        'Train': 'fa-train',
        'Bus': 'fa-bus',
        'Metro': 'fa-subway',
        'Ferry': 'fa-ship',
        'Tram': 'fa-tram'
    };

    let html = selectedJourneys.map(journey => `
        <div class="selected-choice-item" data-journey-id="${journey.id}">
            <div class="stat-icon blue">
                <i class="fas ${typeIcons[journey.type] || 'fa-route'}"></i>
            </div>
            <div class="choice-info">
                <h4>${journey.type}: ${journey.origin} → ${journey.destination}</h4>
                <p>${journey.duration} mins | ${journey.price} | ${journey.rating} rating</p>
            </div>
            <button class="recommend-btn" onclick="toggleRecommend(this, ${journey.id})">
                <i class="fas fa-thumbs-up"></i>
                Recommend
            </button>
        </div>
    `).join('');

    elements.selectedChoicesList.innerHTML = html;
    elements.choicesModal.classList.add('active');
}

function closeChoicesModal() {
    elements.choicesModal.classList.remove('active');
}

function toggleRecommend(btn, journeyId) {
    btn.classList.toggle('recommended');
    if (btn.classList.contains('recommended')) {
        btn.innerHTML = '<i class="fas fa-check"></i> Recommended';
    } else {
        btn.innerHTML = '<i class="fas fa-thumbs-up"></i> Recommend';
    }
}

function submitJourneyRecommendations() {
    const recommendedItems = document.querySelectorAll('.recommend-btn.recommended');
    const recommendedIds = Array.from(recommendedItems).map(btn =>
        parseInt(btn.closest('.selected-choice-item').dataset.journeyId)
    );

    if (recommendedIds.length === 0) {
        showToast('No Recommendations', 'Please recommend at least one journey', 'error');
        return;
    }

    const recommendedJourneys = MockData.journeyOptions.filter(j => recommendedIds.includes(j.id));

    // Create journey entry
    const journeyEntry = {
        id: Date.now(),
        date: new Date().toISOString(),
        searchCriteria: AppState.searchCriteria,
        recommendations: recommendedJourneys
    };

    AppState.previousJourneys.push(journeyEntry);

    // Clear selection
    AppState.selectedJourneys = [];
    updateSelectedCount();

    // Close modal
    closeChoicesModal();

    // Update previous journeys display
    renderPreviousJourneys();

    // Show success message
    showToast('Success', `${recommendedJourneys.length} journeys recommended and saved`, 'success');

    // Switch to previous journeys tab
    setTimeout(() => switchToTab('previous-journeys'), 500);
}

// ============================================
// Previous Journeys Tab
// ============================================

function renderPreviousJourneys() {
    if (AppState.previousJourneys.length === 0) {
        elements.previousJourneysList.innerHTML = `
            <div class="empty-state">
                <i class="fas fa-history"></i>
                <h4>No Previous Journeys</h4>
                <p>Recommended journeys will appear here after you submit them from the Plan Journey tab.</p>
            </div>
        `;
        return;
    }

    let html = AppState.previousJourneys.map(entry => {
        const searchTerms = [];
        if (entry.searchCriteria.origin) searchTerms.push(`From: ${entry.searchCriteria.origin}`);
        if (entry.searchCriteria.destination) searchTerms.push(`To: ${entry.searchCriteria.destination}`);
        if (entry.searchCriteria.transportType) searchTerms.push(`Type: ${entry.searchCriteria.transportType}`);
        if (entry.searchCriteria.date) searchTerms.push(`Date: ${entry.searchCriteria.date}`);

        return `
            <div class="previous-journey-card">
                <div class="previous-journey-header">
                    <h4>Journey Recommendation #${entry.id}</h4>
                    <span class="journey-date">${new Date(entry.date).toLocaleString()}</span>
                </div>
                <div class="search-terms">
                    ${searchTerms.map(term => `<span class="search-term">${term}</span>`).join('')}
                </div>
                <div class="recommended-items">
                    ${entry.recommendations.map(r => `
                        <span class="recommended-item">
                            <i class="fas fa-check-circle"></i>
                            ${r.type}: ${r.origin} → ${r.destination}
                        </span>
                    `).join('')}
                </div>
            </div>
        `;
    }).reverse().join('');

    elements.previousJourneysList.innerHTML = html;
}

function exportJourneys() {
    if (AppState.previousJourneys.length === 0) {
        showToast('No Data', 'No journeys to export', 'error');
        return;
    }

    const dataStr = JSON.stringify(AppState.previousJourneys, null, 2);
    const blob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = `journeys-export-${Date.now()}.json`;
    a.click();

    URL.revokeObjectURL(url);
    showToast('Export Complete', 'Journey data has been exported', 'success');
}

function clearAllJourneys() {
    if (confirm('Are you sure you want to clear all journey history?')) {
        AppState.previousJourneys = [];
        renderPreviousJourneys();
        showToast('Cleared', 'All journey history has been cleared', 'info');
    }
}

// ============================================
// Reports Tab - Interactive Map
// ============================================

function initMap() {
    if (typeof L === 'undefined') {
        console.error('Leaflet not loaded');
        return;
    }

    // Initialize map centered on London
    AppState.map = L.map('map').setView([51.5074, -0.1278], 12);

    // Add tile layer with dark theme
    L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
        subdomains: 'abcd',
        maxZoom: 19
    }).addTo(AppState.map);

    // Create markers for each category
    createMarkers();

    // Show all markers by default
    toggleMarkers('all');
}

function createMarkers() {
    const markerColors = {
        stations: '#6366f1',
        stops: '#10b981',
        hubs: '#f59e0b',
        incidents: '#ef4444'
    };

    const markerIcons = {
        stations: 'fa-train',
        stops: 'fa-bus',
        hubs: 'fa-building',
        incidents: 'fa-exclamation-triangle'
    };

    Object.keys(MockData.mapMarkers).forEach(category => {
        MockData.mapMarkers[category].forEach(point => {
            const icon = L.divIcon({
                className: 'custom-marker',
                html: `<div style="background: ${markerColors[category]}; width: 32px; height: 32px; border-radius: 50%; display: flex; align-items: center; justify-content: center; color: white; box-shadow: 0 2px 8px rgba(0,0,0,0.3);">
                    <i class="fas ${markerIcons[category]}" style="font-size: 14px;"></i>
                </div>`,
                iconSize: [32, 32],
                iconAnchor: [16, 16]
            });

            const marker = L.marker([point.lat, point.lng], { icon })
                .bindPopup(`<b>${point.name}</b><br>${point.info}`);

            AppState.markers[category].push(marker);
            AppState.markers.all.push(marker);
        });
    });
}

function toggleMarkers(type) {
    // Update button states
    document.querySelectorAll('.marker-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.marker === type);
    });

    // Clear all markers from map
    Object.values(AppState.markers).flat().forEach(marker => {
        AppState.map.removeLayer(marker);
    });

    // Add selected markers
    let markersToShow = [];
    if (type === 'all') {
        markersToShow = AppState.markers.all;
    } else {
        markersToShow = AppState.markers[type] || [];
    }

    markersToShow.forEach(marker => {
        marker.addTo(AppState.map);
    });

    // Update stats
    document.getElementById('visibleMarkers').textContent = markersToShow.length;
    AppState.activeMarkerType = type;
}

function generateMapReport() {
    showToast('Generating Report', 'PDF report is being generated...', 'info');
    setTimeout(() => {
        showToast('Report Ready', 'Your PDF report has been generated', 'success');
    }, 2000);
}

function exportMapData() {
    const data = {
        activeMarkers: AppState.activeMarkerType,
        markers: MockData.mapMarkers,
        exportDate: new Date().toISOString()
    };

    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = `map-data-${Date.now()}.json`;
    a.click();

    URL.revokeObjectURL(url);
    showToast('Export Complete', 'Map data has been exported', 'success');
}

// ============================================
// Profile Tab
// ============================================

function initProfile() {
    elements.profileForm?.addEventListener('submit', (e) => {
        e.preventDefault();
        saveProfile();
    });
}

function saveProfile() {
    // Get form values
    const firstName = document.getElementById('firstName').value;
    const lastName = document.getElementById('lastName').value;

    // Update UI
    document.querySelector('.profile-details h2').textContent = `${firstName} ${lastName}`;
    document.querySelector('.user-name').textContent = `${firstName} ${lastName}`;

    // Update avatar
    const avatarUrl = `https://ui-avatars.com/api/?name=${firstName}+${lastName}&size=150&background=6366f1&color=fff`;
    document.querySelector('.profile-avatar').src = avatarUrl;
    document.querySelector('.user-avatar').src = `https://ui-avatars.com/api/?name=${firstName}+${lastName}&background=6366f1&color=fff`;

    showToast('Profile Updated', 'Your profile has been saved successfully', 'success');
}

// ============================================
// Dashboard Functions
// ============================================

function refreshNewsFeed() {
    const btn = document.querySelector('.refresh-btn');
    btn.classList.add('fa-spin');

    setTimeout(() => {
        btn.classList.remove('fa-spin');
        showToast('Refreshed', 'News feed has been updated', 'success');
    }, 1000);
}

function generateMappingReport() {
    showToast('Generating', 'Mapping report is being generated...', 'info');
    setTimeout(() => {
        showToast('Complete', 'Mapping report has been generated successfully', 'success');
    }, 2000);
}

// ============================================
// Toast Notifications
// ============================================

function showToast(title, message, type = 'info') {
    const icons = {
        success: 'fa-check-circle',
        error: 'fa-times-circle',
        info: 'fa-info-circle'
    };

    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.innerHTML = `
        <div class="toast-icon">
            <i class="fas ${icons[type]}"></i>
        </div>
        <div class="toast-content">
            <h4>${title}</h4>
            <p>${message}</p>
        </div>
        <button class="toast-close" onclick="this.parentElement.remove()">
            <i class="fas fa-times"></i>
        </button>
    `;

    elements.toastContainer.appendChild(toast);

    // Auto remove after 5 seconds
    setTimeout(() => {
        if (toast.parentElement) {
            toast.style.animation = 'toastOut 0.3s ease forwards';
            setTimeout(() => toast.remove(), 300);
        }
    }, 5000);
}

// ============================================
// Initialization
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    initNavigation();
    initViewData();
    initPlanJourney();
    initProfile();
    renderPreviousJourneys();

    // Set today's date as default
    const today = new Date().toISOString().split('T')[0];
    const dateInput = document.getElementById('journeyDate');
    if (dateInput) {
        dateInput.value = today;
    }

    // Update last updated time
    const lastUpdated = document.getElementById('lastUpdated');
    if (lastUpdated) {
        lastUpdated.textContent = 'Just now';
    }

    console.log('Pacto MCP Dashboard initialized');
});

// Make functions globally available
window.switchToTab = switchToTab;
window.toggleJourneySelection = toggleJourneySelection;
window.openChoicesModal = openChoicesModal;
window.closeChoicesModal = closeChoicesModal;
window.toggleRecommend = toggleRecommend;
window.submitJourneyRecommendations = submitJourneyRecommendations;
window.exportJourneys = exportJourneys;
window.clearAllJourneys = clearAllJourneys;
window.toggleMarkers = toggleMarkers;
window.generateMapReport = generateMapReport;
window.exportMapData = exportMapData;
window.refreshNewsFeed = refreshNewsFeed;
window.generateMappingReport = generateMappingReport;
window.showToast = showToast;
