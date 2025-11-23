import { useApp } from '../../context/AppContext';

const PreviousJourneys = () => {
  const { previousJourneys, clearPreviousJourneys, showToast } = useApp();

  const handleExport = () => {
    if (previousJourneys.length === 0) {
      showToast('No Data', 'No journeys to export', 'error');
      return;
    }

    const dataStr = JSON.stringify(previousJourneys, null, 2);
    const blob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = `journeys-export-${Date.now()}.json`;
    a.click();

    URL.revokeObjectURL(url);
    showToast('Export Complete', 'Journey data has been exported', 'success');
  };

  const handleClearAll = () => {
    if (window.confirm('Are you sure you want to clear all journey history?')) {
      clearPreviousJourneys();
      showToast('Cleared', 'All journey history has been cleared', 'info');
    }
  };

  return (
    <section className="tab-content active">
      <div className="previous-journeys-container">
        <div className="card-header">
          <h2>Recommended Journeys</h2>
          <div className="header-actions">
            <button className="btn btn-secondary" onClick={handleExport}>
              <i className="fas fa-download"></i>
              Export
            </button>
            <button className="btn btn-danger" onClick={handleClearAll}>
              <i className="fas fa-trash"></i>
              Clear All
            </button>
          </div>
        </div>
        <div className="card-body">
          <div className="previous-journeys-list">
            {previousJourneys.length === 0 ? (
              <div className="empty-state">
                <i className="fas fa-history"></i>
                <h4>No Previous Journeys</h4>
                <p>Recommended journeys will appear here after you submit them from the Plan Journey tab.</p>
              </div>
            ) : (
              [...previousJourneys].reverse().map(entry => {
                const searchTerms = [];
                if (entry.searchCriteria?.origin) searchTerms.push(`From: ${entry.searchCriteria.origin}`);
                if (entry.searchCriteria?.destination) searchTerms.push(`To: ${entry.searchCriteria.destination}`);
                if (entry.searchCriteria?.transportType) searchTerms.push(`Type: ${entry.searchCriteria.transportType}`);
                if (entry.searchCriteria?.journeyDate) searchTerms.push(`Date: ${entry.searchCriteria.journeyDate}`);

                return (
                  <div key={entry.id} className="previous-journey-card">
                    <div className="previous-journey-header">
                      <h4>Journey Recommendation #{entry.id}</h4>
                      <span className="journey-date">{new Date(entry.date).toLocaleString()}</span>
                    </div>
                    <div className="search-terms">
                      {searchTerms.map((term, index) => (
                        <span key={index} className="search-term">{term}</span>
                      ))}
                    </div>
                    <div className="recommended-items">
                      {entry.recommendations.map(r => (
                        <span key={r.id} className="recommended-item">
                          <i className="fas fa-check-circle"></i>
                          {r.type}: {r.origin} → {r.destination}
                        </span>
                      ))}
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default PreviousJourneys;
