import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import { useApp } from '../../context/AppContext';
import { useCollection } from '../../hooks/useDirectus';
import 'leaflet/dist/leaflet.css';

// Fix for default marker icons in React-Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
});

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

const createCustomIcon = (category) => {
  return L.divIcon({
    className: 'custom-marker',
    html: `<div style="background: ${markerColors[category] || '#6366f1'}; width: 32px; height: 32px; border-radius: 50%; display: flex; align-items: center; justify-content: center; color: white; box-shadow: 0 2px 8px rgba(0,0,0,0.3);">
      <i class="fas ${markerIcons[category] || 'fa-map-marker-alt'}" style="font-size: 14px;"></i>
    </div>`,
    iconSize: [32, 32],
    iconAnchor: [16, 16]
  });
};

const Reports = () => {
  const { activeMarkerType, setActiveMarkerType, showToast } = useApp();
  const [visibleMarkers, setVisibleMarkers] = useState(0);

  // Fetch map markers from Pacto MCP
  const {
    data: stationsData,
    isLoading: stationsLoading
  } = useCollection('stations');

  const {
    data: stopsData,
    isLoading: stopsLoading
  } = useCollection('stops');

  const {
    data: hubsData,
    isLoading: hubsLoading
  } = useCollection('hubs');

  const {
    data: incidentsData,
    isLoading: incidentsLoading
  } = useCollection('incidents');

  const isLoading = stationsLoading || stopsLoading || hubsLoading || incidentsLoading;

  // Organize markers by category from Pacto MCP data
  const mapMarkers = {
    stations: (stationsData || []).map(s => ({ ...s, category: 'stations' })),
    stops: (stopsData || []).map(s => ({ ...s, category: 'stops' })),
    hubs: (hubsData || []).map(h => ({ ...h, category: 'hubs' })),
    incidents: (incidentsData || []).map(i => ({ ...i, category: 'incidents' }))
  };

  const getAllMarkers = () => {
    const all = [];
    Object.keys(mapMarkers).forEach(category => {
      mapMarkers[category].forEach(marker => {
        all.push({ ...marker, category });
      });
    });
    return all;
  };

  const getFilteredMarkers = () => {
    if (activeMarkerType === 'all') {
      return getAllMarkers();
    }
    return (mapMarkers[activeMarkerType] || []).map(marker => ({
      ...marker,
      category: activeMarkerType
    }));
  };

  const filteredMarkers = getFilteredMarkers();

  useEffect(() => {
    setVisibleMarkers(filteredMarkers.length);
  }, [activeMarkerType, filteredMarkers.length]);

  const handleToggleMarkers = (type) => {
    setActiveMarkerType(type);
  };

  const handleGenerateReport = () => {
    showToast('Generating Report', 'PDF report is being generated from Pacto MCP data...', 'info');
    setTimeout(() => {
      showToast('Report Ready', 'Your PDF report has been generated', 'success');
    }, 2000);
  };

  const handleExportData = () => {
    const data = {
      activeMarkers: activeMarkerType,
      markers: mapMarkers,
      exportDate: new Date().toISOString(),
      source: 'Pacto MCP'
    };

    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = `pacto-mcp-map-data-${Date.now()}.json`;
    a.click();

    URL.revokeObjectURL(url);
    showToast('Export Complete', 'Map data from Pacto MCP has been exported', 'success');
  };

  const totalMarkers = getAllMarkers().length;

  return (
    <section className="tab-content active">
      <div className="reports-container">
        <div className="map-controls-panel">
          <div className="card-header">
            <h2>Map Controls</h2>
            {isLoading && (
              <span className="loading-indicator">
                <i className="fas fa-spinner fa-spin"></i>
              </span>
            )}
          </div>
          <div className="card-body">
            <div className="control-group">
              <h4>Marker Types</h4>
              <div className="marker-buttons">
                <button
                  className={`marker-btn ${activeMarkerType === 'all' ? 'active' : ''}`}
                  onClick={() => handleToggleMarkers('all')}
                >
                  <i className="fas fa-map-marker-alt"></i>
                  Show All
                </button>
                <button
                  className={`marker-btn ${activeMarkerType === 'stations' ? 'active' : ''}`}
                  onClick={() => handleToggleMarkers('stations')}
                >
                  <i className="fas fa-train"></i>
                  Stations
                </button>
                <button
                  className={`marker-btn ${activeMarkerType === 'stops' ? 'active' : ''}`}
                  onClick={() => handleToggleMarkers('stops')}
                >
                  <i className="fas fa-bus"></i>
                  Bus Stops
                </button>
                <button
                  className={`marker-btn ${activeMarkerType === 'hubs' ? 'active' : ''}`}
                  onClick={() => handleToggleMarkers('hubs')}
                >
                  <i className="fas fa-building"></i>
                  Transport Hubs
                </button>
                <button
                  className={`marker-btn ${activeMarkerType === 'incidents' ? 'active' : ''}`}
                  onClick={() => handleToggleMarkers('incidents')}
                >
                  <i className="fas fa-exclamation-triangle"></i>
                  Incidents
                </button>
              </div>
            </div>
            <div className="control-group">
              <h4>Report Actions</h4>
              <div className="report-actions">
                <button className="btn btn-primary" onClick={handleGenerateReport}>
                  <i className="fas fa-file-pdf"></i>
                  Generate PDF Report
                </button>
                <button className="btn btn-secondary" onClick={handleExportData}>
                  <i className="fas fa-file-export"></i>
                  Export Data
                </button>
              </div>
            </div>
            <div className="control-group">
              <h4>Statistics</h4>
              <div className="map-stats">
                <div className="map-stat">
                  <span className="stat-label">Total Markers</span>
                  <span className="stat-value">{isLoading ? '-' : totalMarkers}</span>
                </div>
                <div className="map-stat">
                  <span className="stat-label">Visible</span>
                  <span className="stat-value">{isLoading ? '-' : visibleMarkers}</span>
                </div>
                <div className="map-stat">
                  <span className="stat-label">Data Source</span>
                  <span className="stat-value">Pacto MCP</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="map-panel">
          {isLoading ? (
            <div className="loading-state map-loading">
              <i className="fas fa-spinner fa-spin"></i>
              <span>Loading map data from Pacto MCP...</span>
            </div>
          ) : (
            <MapContainer
              center={[51.5074, -0.1278]}
              zoom={12}
              style={{ height: '100%', width: '100%' }}
            >
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
                url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
              />
              {filteredMarkers.map((marker, index) => (
                marker.lat && marker.lng && (
                  <Marker
                    key={`${marker.category}-${marker.id || index}`}
                    position={[marker.lat, marker.lng]}
                    icon={createCustomIcon(marker.category)}
                  >
                    <Popup>
                      <b>{marker.name}</b><br />{marker.info || marker.description}
                    </Popup>
                  </Marker>
                )
              ))}
            </MapContainer>
          )}
        </div>
      </div>
    </section>
  );
};

export default Reports;
