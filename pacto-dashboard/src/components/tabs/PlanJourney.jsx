import { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { useCollection } from '../../hooks/useDirectus';
import ChoicesModal from '../modals/ChoicesModal';

const typeIcons = {
  'Train': 'fa-train',
  'Bus': 'fa-bus',
  'Metro': 'fa-subway',
  'Ferry': 'fa-ship',
  'Tram': 'fa-tram'
};

const PlanJourney = () => {
  const {
    selectedJourneys,
    toggleJourneySelection,
    showToast,
    setSearchCriteria
  } = useApp();

  const [searchResults, setSearchResults] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [formData, setFormData] = useState({
    origin: '',
    destination: '',
    journeyDate: new Date().toISOString().split('T')[0],
    journeyTime: '',
    transportType: '',
    maxDuration: ''
  });

  // Fetch journey options from Pacto MCP
  const {
    data: journeyOptions,
    isLoading: optionsLoading,
    error: optionsError,
    refetch: refetchJourneys
  } = useCollection('journey_options', {
    limit: 100
  });

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    setIsSearching(true);
    setSearchCriteria(formData);

    // Refetch data from Pacto MCP
    await refetchJourneys();

    // Filter results based on form data
    let results = [...(journeyOptions || [])];

    if (formData.transportType) {
      results = results.filter(j => j.type?.toLowerCase() === formData.transportType.toLowerCase());
    }

    if (formData.maxDuration) {
      results = results.filter(j => j.duration <= parseInt(formData.maxDuration));
    }

    if (formData.origin) {
      results = results.filter(j =>
        j.origin?.toLowerCase().includes(formData.origin.toLowerCase())
      );
    }

    if (formData.destination) {
      results = results.filter(j =>
        j.destination?.toLowerCase().includes(formData.destination.toLowerCase())
      );
    }

    setSearchResults(results);
    setIsSearching(false);
    showToast('Search Complete', `Found ${results.length} journey options from Pacto MCP`, 'success');
  };

  const handleReset = () => {
    setFormData({
      origin: '',
      destination: '',
      journeyDate: new Date().toISOString().split('T')[0],
      journeyTime: '',
      transportType: '',
      maxDuration: ''
    });
    setSearchResults([]);
  };

  return (
    <section className="tab-content active">
      <div className="plan-journey-container">
        <div className="journey-search-panel">
          <div className="card-header">
            <h2>Search Journey Options</h2>
            {optionsError && (
              <span className="api-status error">
                <i className="fas fa-exclamation-circle"></i> Pacto MCP unavailable
              </span>
            )}
          </div>
          <div className="card-body">
            <form onSubmit={handleSearch}>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="origin">Origin</label>
                  <input
                    type="text"
                    id="origin"
                    name="origin"
                    placeholder="Enter starting point"
                    value={formData.origin}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="destination">Destination</label>
                  <input
                    type="text"
                    id="destination"
                    name="destination"
                    placeholder="Enter destination"
                    value={formData.destination}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="journeyDate">Date</label>
                  <input
                    type="date"
                    id="journeyDate"
                    name="journeyDate"
                    value={formData.journeyDate}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="journeyTime">Time</label>
                  <input
                    type="time"
                    id="journeyTime"
                    name="journeyTime"
                    value={formData.journeyTime}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="transportType">Transport Type</label>
                  <select
                    id="transportType"
                    name="transportType"
                    value={formData.transportType}
                    onChange={handleChange}
                  >
                    <option value="">All Types</option>
                    <option value="bus">Bus</option>
                    <option value="train">Train</option>
                    <option value="metro">Metro</option>
                    <option value="tram">Tram</option>
                    <option value="ferry">Ferry</option>
                  </select>
                </div>
                <div className="form-group">
                  <label htmlFor="maxDuration">Max Duration (mins)</label>
                  <input
                    type="number"
                    id="maxDuration"
                    name="maxDuration"
                    placeholder="e.g., 60"
                    value={formData.maxDuration}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="form-actions">
                <button type="submit" className="btn btn-primary" disabled={isSearching || optionsLoading}>
                  {isSearching || optionsLoading ? (
                    <><i className="fas fa-spinner fa-spin"></i> Searching...</>
                  ) : (
                    <><i className="fas fa-search"></i> Search Journeys</>
                  )}
                </button>
                <button type="button" className="btn btn-secondary" onClick={handleReset}>
                  <i className="fas fa-undo"></i>
                  Reset
                </button>
              </div>
            </form>
          </div>
        </div>

        <div className="journey-results-panel">
          <div className="card-header">
            <h2>Search Results</h2>
            {selectedJourneys.length > 0 && (
              <button className="btn btn-primary" onClick={() => setModalOpen(true)}>
                <i className="fas fa-eye"></i>
                View Choices ({selectedJourneys.length})
              </button>
            )}
          </div>
          <div className="card-body">
            <div className="journey-results">
              {isSearching || optionsLoading ? (
                <div className="loading-state">
                  <i className="fas fa-spinner fa-spin"></i>
                  <span>Fetching journey options from Pacto MCP...</span>
                </div>
              ) : searchResults.length === 0 ? (
                <div className="empty-state">
                  <i className="fas fa-search"></i>
                  <h4>No Results Yet</h4>
                  <p>Use the search form to find available journeys from Pacto MCP.</p>
                </div>
              ) : (
                searchResults.map(journey => (
                  <div
                    key={journey.id}
                    className={`journey-card ${selectedJourneys.includes(journey.id) ? 'selected' : ''}`}
                    onClick={() => toggleJourneySelection(journey.id)}
                  >
                    <div className="selection-indicator">
                      <i className="fas fa-check"></i>
                    </div>
                    <div className="journey-card-header">
                      <div className="journey-type">
                        <i className={`fas ${typeIcons[journey.type] || 'fa-route'}`}></i>
                        <span>{journey.type}</span>
                      </div>
                      <div className="journey-duration">{journey.duration} mins</div>
                    </div>
                    <div className="journey-route">
                      <div className="route-point origin">
                        <i className="fas fa-circle"></i>
                        <span>{journey.origin}</span>
                      </div>
                      <div className="route-point destination">
                        <i className="fas fa-map-marker-alt"></i>
                        <span>{journey.destination}</span>
                      </div>
                    </div>
                    <div className="journey-meta">
                      <span><i className="fas fa-tag"></i> {journey.price}</span>
                      <span><i className="fas fa-clock"></i> {journey.departures} departures/day</span>
                      <span><i className="fas fa-star"></i> {journey.rating}</span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>

      <ChoicesModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </section>
  );
};

export default PlanJourney;
