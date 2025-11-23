import { useState, useMemo } from 'react';
import { useApp } from '../../context/AppContext';
import { collections, collectionInfo } from '../../data/mockData';

const formatColumnName = (name) => {
  return name.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
};

const ViewData = () => {
  const { currentCollection, setCurrentCollection, currentView, setCurrentView } = useApp();
  const [searchTerm, setSearchTerm] = useState('');

  const filteredCollections = useMemo(() => {
    return collectionInfo.filter(col =>
      col.label.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm]);

  const collectionData = currentCollection ? collections[currentCollection] : null;

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
              <tr key={index}>
                {columns.map(col => (
                  <td key={col}>{row[col]}</td>
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
          <div key={index} className="vertical-record">
            <div className="vertical-record-header">Record #{index + 1}</div>
            <div className="vertical-fields">
              {columns.map(col => (
                <div key={col} className="vertical-field">
                  <div className="field-name">{formatColumnName(col)}</div>
                  <div className="field-value">{row[col]}</div>
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
          <ul className="collections-list">
            {filteredCollections.map(col => (
              <li
                key={col.name}
                className={`collection-item ${currentCollection === col.name ? 'active' : ''}`}
                onClick={() => setCurrentCollection(col.name)}
              >
                <i className={`fas ${col.icon}`}></i>
                <span>{col.label}</span>
                <span className="collection-count">{col.count.toLocaleString()}</span>
              </li>
            ))}
          </ul>
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
                <p>Select a collection from the sidebar to view its data.</p>
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
