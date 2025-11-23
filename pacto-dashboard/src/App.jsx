import { useEffect } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import Sidebar from './components/layout/Sidebar';
import Header from './components/layout/Header';
import Toast from './components/layout/Toast';
import Dashboard from './components/tabs/Dashboard';
import ViewData from './components/tabs/ViewData';
import PlanJourney from './components/tabs/PlanJourney';
import PreviousJourneys from './components/tabs/PreviousJourneys';
import Reports from './components/tabs/Reports';
import Profile from './components/tabs/Profile';
import './styles/App.css';

const AppContent = () => {
  const { currentTab, mobileMenuOpen, closeMobileMenu, sidebarCollapsed } = useApp();

  // Close mobile menu on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (window.innerWidth <= 768 && mobileMenuOpen) {
        const sidebar = document.querySelector('.sidebar');
        const mobileBtn = document.querySelector('.mobile-menu-btn');
        if (sidebar && !sidebar.contains(e.target) && mobileBtn && !mobileBtn.contains(e.target)) {
          closeMobileMenu();
        }
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [mobileMenuOpen, closeMobileMenu]);

  const renderCurrentTab = () => {
    switch (currentTab) {
      case 'dashboard':
        return <Dashboard />;
      case 'view-data':
        return <ViewData />;
      case 'plan-journey':
        return <PlanJourney />;
      case 'previous-journeys':
        return <PreviousJourneys />;
      case 'reports':
        return <Reports />;
      case 'profile':
        return <Profile />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="app-container">
      <Sidebar />
      <main className={`main-content ${sidebarCollapsed ? 'sidebar-collapsed' : ''}`}>
        <Header />
        <div className="content-area">
          {renderCurrentTab()}
        </div>
      </main>
      <Toast />
    </div>
  );
};

function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}

export default App;
