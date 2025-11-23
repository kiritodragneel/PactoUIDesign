import { useApp } from '../../context/AppContext';

const navItems = [
  { id: 'dashboard', label: 'Dashboard', icon: 'fa-th-large' },
  { id: 'view-data', label: 'View Data', icon: 'fa-database' },
  { id: 'plan-journey', label: 'Plan Journey', icon: 'fa-route' },
  { id: 'previous-journeys', label: 'Previous Journeys', icon: 'fa-history' },
  { id: 'reports', label: 'Reports', icon: 'fa-map-marked-alt' },
  { id: 'profile', label: 'Profile', icon: 'fa-user-circle' }
];

const Sidebar = () => {
  const {
    currentTab,
    setCurrentTab,
    sidebarCollapsed,
    toggleSidebar,
    mobileMenuOpen,
    closeMobileMenu
  } = useApp();

  const handleNavClick = (tabId) => {
    setCurrentTab(tabId);
    closeMobileMenu();
  };

  return (
    <aside className={`sidebar ${sidebarCollapsed ? 'collapsed' : ''} ${mobileMenuOpen ? 'mobile-open' : ''}`}>
      <div className="sidebar-header">
        <div className="logo">
          <i className="fas fa-cube"></i>
          <span>Pacto MCP</span>
        </div>
        <button className="sidebar-toggle" onClick={toggleSidebar}>
          <i className="fas fa-bars"></i>
        </button>
      </div>

      <nav className="sidebar-nav">
        <ul>
          {navItems.map(item => (
            <li key={item.id}>
              <a
                href="#"
                className={`nav-link ${currentTab === item.id ? 'active' : ''}`}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(item.id);
                }}
              >
                <i className={`fas ${item.icon}`}></i>
                <span>{item.label}</span>
              </a>
            </li>
          ))}
        </ul>
      </nav>

      <div className="sidebar-footer">
        <div className="user-info">
          <img
            src="https://ui-avatars.com/api/?name=Admin+User&background=6366f1&color=fff"
            alt="User"
            className="user-avatar"
          />
          <div className="user-details">
            <span className="user-name">Admin User</span>
            <span className="user-role">Administrator</span>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
