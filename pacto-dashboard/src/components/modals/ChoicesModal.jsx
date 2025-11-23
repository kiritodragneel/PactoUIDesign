import { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { useCollection, useCreateItem } from '../../hooks/useDirectus';

const typeIcons = {
  'Train': 'fa-train',
  'Bus': 'fa-bus',
  'Metro': 'fa-subway',
  'Ferry': 'fa-ship',
  'Tram': 'fa-tram'
};

const ChoicesModal = ({ isOpen, onClose }) => {
  const {
    selectedJourneys,
    clearSelectedJourneys,
    addToPreviousJourneys,
    searchCriteria,
    showToast,
    setCurrentTab
  } = useApp();

  const [recommendedIds, setRecommendedIds] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Fetch journey options from Pacto MCP
  const {
    data: journeyOptions,
    isLoading: optionsLoading,
    error: optionsError
  } = useCollection('journey_options');

  // Mutation for saving recommendations to Pacto MCP
  const createRecommendation = useCreateItem('recommendations');

  if (!isOpen) return null;

  // Use data from API
  const allJourneyOptions = journeyOptions || [];

  const selectedJourneyData = allJourneyOptions.filter(j =>
    selectedJourneys.includes(j.id)
  );

  const toggleRecommend = (journeyId) => {
    setRecommendedIds(prev => {
      if (prev.includes(journeyId)) {
        return prev.filter(id => id !== journeyId);
      }
      return [...prev, journeyId];
    });
  };

  const handleSubmit = async () => {
    if (recommendedIds.length === 0) {
      showToast('No Recommendations', 'Please recommend at least one journey', 'error');
      return;
    }

    setIsSubmitting(true);

    const recommendedJourneys = allJourneyOptions.filter(j => recommendedIds.includes(j.id));

    const journeyEntry = {
      id: Date.now(),
      date: new Date().toISOString(),
      searchCriteria: searchCriteria,
      recommendations: recommendedJourneys
    };

    try {
      // Try to save to Pacto MCP
      await createRecommendation.mutateAsync({
        date_created: new Date().toISOString(),
        search_criteria: JSON.stringify(searchCriteria),
        journey_ids: recommendedIds,
        recommendations: JSON.stringify(recommendedJourneys)
      });

      showToast('Saved to Pacto MCP', `${recommendedJourneys.length} recommendations saved`, 'success');
    } catch (error) {
      // Fallback to local storage if API fails
      console.warn('Could not save to Pacto MCP, using local storage', error);
    }

    // Always save locally as well
    addToPreviousJourneys(journeyEntry);
    clearSelectedJourneys();
    setRecommendedIds([]);
    setIsSubmitting(false);
    onClose();

    showToast('Success', `${recommendedJourneys.length} journeys recommended and saved`, 'success');

    setTimeout(() => setCurrentTab('previous-journeys'), 500);
  };

  const handleClose = () => {
    setRecommendedIds([]);
    onClose();
  };

  return (
    <div className="modal active">
      <div className="modal-overlay" onClick={handleClose}></div>
      <div className="modal-content">
        <div className="modal-header">
          <h2>Selected Journey Choices</h2>
          <button className="modal-close" onClick={handleClose}>
            <i className="fas fa-times"></i>
          </button>
        </div>
        <div className="modal-body">
          {optionsLoading ? (
            <div className="loading-state">
              <i className="fas fa-spinner fa-spin"></i>
              <span>Loading journey data from Pacto MCP...</span>
            </div>
          ) : optionsError ? (
            <div className="error-state">
              <i className="fas fa-exclamation-triangle"></i>
              <p>Unable to load data from Pacto MCP</p>
            </div>
          ) : selectedJourneyData.length === 0 ? (
            <div className="empty-state">
              <i className="fas fa-inbox"></i>
              <h4>No Journeys Selected</h4>
              <p>Select journeys from the search results to view them here.</p>
            </div>
          ) : (
            <div className="selected-choices-list">
              {selectedJourneyData.map(journey => (
                <div key={journey.id} className="selected-choice-item">
                  <div className="stat-icon blue">
                    <i className={`fas ${typeIcons[journey.type] || 'fa-route'}`}></i>
                  </div>
                  <div className="choice-info">
                    <h4>{journey.type}: {journey.origin} → {journey.destination}</h4>
                    <p>{journey.duration} mins | {journey.price} | {journey.rating} rating</p>
                  </div>
                  <button
                    className={`recommend-btn ${recommendedIds.includes(journey.id) ? 'recommended' : ''}`}
                    onClick={() => toggleRecommend(journey.id)}
                  >
                    {recommendedIds.includes(journey.id) ? (
                      <><i className="fas fa-check"></i> Recommended</>
                    ) : (
                      <><i className="fas fa-thumbs-up"></i> Recommend</>
                    )}
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
        <div className="modal-footer">
          <button className="btn btn-secondary" onClick={handleClose}>Cancel</button>
          <button
            className="btn btn-primary"
            onClick={handleSubmit}
            disabled={isSubmitting || optionsLoading}
          >
            {isSubmitting ? (
              <><i className="fas fa-spinner fa-spin"></i> Saving...</>
            ) : (
              <><i className="fas fa-check"></i> Submit Recommendations</>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChoicesModal;
