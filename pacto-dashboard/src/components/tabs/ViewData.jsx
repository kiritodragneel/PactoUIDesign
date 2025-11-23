import { useState, useMemo } from 'react';
import { useApp } from '../../context/AppContext';
import { useCollection } from '../../hooks/useDirectus';

// Default collection info - will be populated from Pacto MCP
const defaultCollectionInfo = [
  { name: 'users', icon: 'fa-users', label: 'Users' },
  { name: 'journeys', icon: 'fa-route', label: 'Journeys' },
  { name: 'locations', icon: 'fa-map-marker-alt', label: 'Locations' },
  { name: 'routes', icon: 'fa-road', label: 'Routes' },
  { name: 'reports', icon: 'fa-file-alt', label: 'Reports' },
  { name: 'activities', icon: 'fa-clock', label: 'Activities' },
  { name: 'settings', icon: 'fa-cog', label: 'Settings' },
  { name: 'media', icon: 'fa-images', label: 'Media' }
];

const formatColumnName = (name) => {
  return name.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
};

const ViewData = () => {
  const { currentCollection, setCurrentCollection, currentView, setCurrentView } = useApp();
  const [searchTerm, setSearchTerm] = useState('');

  // Fetch collection metadata from Pacto MCP
  const {
    data: collectionMetadata,
    isLoading: metadataLoading
  } = useCollection('collection_info');

  // Fetch current collection data from Pacto MCP
  const {
    data: collectionData,
    isLoading: dataLoading,
    error: dataError
  } = useCollection(currentCollection, {
    limit: 100
  });

  // Use API metadata or defaults
  const collectionInfo = collectionMetadata?.length ? collectionMetadata : defaultCollectionInfo;

  const filteredCollections = useMemo(() => {
    return collectionInfo.filter(col =>
      col.label.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm, collectionInfo]);

  const renderTableView = () => {
    if (!collectionData || collectionData.length === 0) return null;
    const columns = Object.keys(collectionData[0]);

    return (
      <div className="data-table-container">
        <table className="data-table">
          <thead>
            <tr>
              {columns.map(col => (
                <th key={col}>{formatColumnName(col)}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {collectionData.map((row, index) => (
              <tr key={row.id || index}>
                {columns.map(col => (
                  <td key={col}>{typeof row[col] === 'object' ? JSON.stringify(row[col]) : row[col]}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  const renderVerticalView = () => {
    if (!collectionData || collectionData.length === 0) return null;
    const columns = Object.keys(collectionData[0]);

    return (
      <div className="vertical-table-container">
        {collectionData.map((row, index) => (
          <div key={row.id || index} className="vertical-record">
            <div className="vertical-record-header">Record #{index + 1}</div>
            <div className="vertical-fields">
              {columns.map(col => (
                <div key={col} className="vertical-field">
                  <div className="field-name">{formatColumnName(col)}</div>
                  <div className="field-value">{typeof row[col] === 'object' ? JSON.stringify(row[col]) : row[col]}</div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <section className="tab-content active">
      <div className="view-data-container">
        <div className="collections-sidebar">
          <div className="collections-header">
            <h3>Collections</h3>
            <div className="collections-search">
              <i className="fas fa-search"></i>
              <input
                type="text"
                placeholder="Search collections..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          {metadataLoading ? (
            <div className="loading-state">
              <i className="fas fa-spinner fa-spin"></i>
              <span>Loading collections...</span>
            </div>
          ) : (
            <ul className="collections-list">
              {filteredCollections.map(col => (
                <li
                  key={col.name}
                  className={`collection-item ${currentCollection === col.name ? 'active' : ''}`}
                  onClick={() => setCurrentCollection(col.name)}
                >
                  <i className={`fas ${col.icon}`}></i>
                  <span>{col.label}</span>
                  {col.count !== undefined && (
                    <span className="collection-count">{col.count.toLocaleString()}</span>
                  )}
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="data-preview">
          <div className="data-preview-header">
            <div className="preview-title">
              <h3>{currentCollection ? formatColumnName(currentCollection) : 'Select a Collection'}</h3>
              {collectionData && (
                <span className="record-count">{collectionData.length} records</span>
              )}
            </div>
            <div className="view-toggle">
              <button
                className={`view-btn ${currentView === 'table' ? 'active' : ''}`}
                onClick={() => setCurrentView('table')}
                title="Table View"
              >
                <i className="fas fa-table"></i>
              </button>
              <button
                className={`view-btn ${currentView === 'vertical' ? 'active' : ''}`}
                onClick={() => setCurrentView('vertical')}
                title="Vertical View"
              >
                <i className="fas fa-list"></i>
              </button>
            </div>
          </div>

          <div className="data-preview-body">
            {!currentCollection ? (
              <div className="empty-state">
                <i className="fas fa-database"></i>
                <h4>No Collection Selected</h4>
                <p>Select a collection from the sidebar to view its data from Pacto MCP.</p>
              </div>
            ) : dataLoading ? (
              <div className="loading-state">
                <i className="fas fa-spinner fa-spin"></i>
                <span>Loading data from Pacto MCP...</span>
              </div>
            ) : dataError ? (
              <div className="error-state">
                <i className="fas fa-exclamation-triangle"></i>
                <h4>Error Loading Data</h4>
                <p>Unable to fetch data from Pacto MCP. Please check your connection.</p>
              </div>
            ) : !collectionData || collectionData.length === 0 ? (
              <div className="empty-state">
                <i className="fas fa-inbox"></i>
                <h4>No Data Found</h4>
                <p>This collection is empty or not available in Pacto MCP.</p>
              </div>
            ) : currentView === 'table' ? (
              renderTableView()
            ) : (
              renderVerticalView()
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ViewData;
