import { useApp } from '../../context/AppContext';

const pageTitles = {
  'dashboard': 'Dashboard',
  'view-data': 'View Data',
  'plan-journey': 'Plan Journey',
  'previous-journeys': 'Previous Journeys',
  'reports': 'Reports',
  'profile': 'Profile'
};

const Header = () => {
  const { currentTab, toggleMobileMenu } = useApp();

  return (
    <header className="top-header">
      <div className="header-left">
        <button className="mobile-menu-btn" onClick={toggleMobileMenu}>
          <i className="fas fa-bars"></i>
        </button>
        <h1 className="page-title">{pageTitles[currentTab] || 'Dashboard'}</h1>
      </div>
      <div className="header-right">
        <div className="search-box">
          <i className="fas fa-search"></i>
          <input type="text" placeholder="Search..." />
        </div>
        <button className="header-btn notification-btn">
          <i className="fas fa-bell"></i>
          <span className="notification-badge">3</span>
        </button>
        <button className="header-btn">
          <i className="fas fa-cog"></i>
        </button>
      </div>
    </header>
  );
};

export default Header;
