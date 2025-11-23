import { createContext, useContext, useState, useCallback } from 'react';

const AppContext = createContext(null);

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};

export const AppProvider = ({ children }) => {
  // Navigation state
  const [currentTab, setCurrentTab] = useState('dashboard');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Journey planning state
  const [selectedJourneys, setSelectedJourneys] = useState([]);
  const [previousJourneys, setPreviousJourneys] = useState([]);
  const [searchCriteria, setSearchCriteria] = useState(null);

  // View data state
  const [currentCollection, setCurrentCollection] = useState(null);
  const [currentView, setCurrentView] = useState('table');

  // Map state
  const [activeMarkerType, setActiveMarkerType] = useState('all');

  // Toast notifications
  const [toasts, setToasts] = useState([]);

  // Toggle journey selection
  const toggleJourneySelection = useCallback((journeyId) => {
    setSelectedJourneys(prev => {
      if (prev.includes(journeyId)) {
        return prev.filter(id => id !== journeyId);
      }
      return [...prev, journeyId];
    });
  }, []);

  // Clear journey selection
  const clearSelectedJourneys = useCallback(() => {
    setSelectedJourneys([]);
  }, []);

  // Add journey to previous journeys
  const addToPreviousJourneys = useCallback((journeyEntry) => {
    setPreviousJourneys(prev => [...prev, journeyEntry]);
  }, []);

  // Clear all previous journeys
  const clearPreviousJourneys = useCallback(() => {
    setPreviousJourneys([]);
  }, []);

  // Show toast notification
  const showToast = useCallback((title, message, type = 'info') => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, title, message, type }]);

    // Auto remove after 5 seconds
    setTimeout(() => {
      setToasts(prev => prev.filter(toast => toast.id !== id));
    }, 5000);
  }, []);

  // Remove toast
  const removeToast = useCallback((id) => {
    setToasts(prev => prev.filter(toast => toast.id !== id));
  }, []);

  // Toggle sidebar
  const toggleSidebar = useCallback(() => {
    setSidebarCollapsed(prev => !prev);
  }, []);

  // Toggle mobile menu
  const toggleMobileMenu = useCallback(() => {
    setMobileMenuOpen(prev => !prev);
  }, []);

  // Close mobile menu
  const closeMobileMenu = useCallback(() => {
    setMobileMenuOpen(false);
  }, []);

  const value = {
    // Navigation
    currentTab,
    setCurrentTab,
    sidebarCollapsed,
    toggleSidebar,
    mobileMenuOpen,
    toggleMobileMenu,
    closeMobileMenu,

    // Journey planning
    selectedJourneys,
    toggleJourneySelection,
    clearSelectedJourneys,
    previousJourneys,
    addToPreviousJourneys,
    clearPreviousJourneys,
    searchCriteria,
    setSearchCriteria,

    // View data
    currentCollection,
    setCurrentCollection,
    currentView,
    setCurrentView,

    // Map
    activeMarkerType,
    setActiveMarkerType,

    // Toasts
    toasts,
    showToast,
    removeToast,
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};

export default AppContext;
