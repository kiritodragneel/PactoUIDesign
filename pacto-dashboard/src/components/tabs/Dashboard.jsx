import { useApp } from '../../context/AppContext';
import { dashboardStats, newsItems } from '../../data/mockData';

const Dashboard = () => {
  const { setCurrentTab, showToast } = useApp();

  const handleRefreshNewsFeed = () => {
    showToast('Refreshed', 'News feed has been updated', 'success');
  };

  const handleGenerateMappingReport = () => {
    showToast('Generating', 'Mapping report is being generated...', 'info');
    setTimeout(() => {
      showToast('Complete', 'Mapping report has been generated successfully', 'success');
    }, 2000);
  };

  return (
    <section className="tab-content active">
      <div className="stats-grid">
        {dashboardStats.map((stat, index) => (
          <div key={index} className="stat-card">
            <div className={`stat-icon ${stat.color}`}>
              <i className={`fas ${stat.icon}`}></i>
            </div>
            <div className="stat-info">
              <h3>{stat.title}</h3>
              <p className="stat-value">{stat.value}</p>
              <span className={`stat-change ${stat.positive ? 'positive' : 'negative'}`}>
                <i className={`fas ${stat.positive ? 'fa-arrow-up' : 'fa-arrow-down'}`}></i> {stat.change.replace(/[+-]/, '')}
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="dashboard-grid">
        <div className="quick-actions-card">
          <div className="card-header">
            <h2>Quick Actions</h2>
          </div>
          <div className="card-body">
            <div className="action-buttons">
              <button className="action-btn primary" onClick={() => setCurrentTab('plan-journey')}>
                <i className="fas fa-route"></i>
                <span>Plan Journey</span>
              </button>
              <button className="action-btn secondary" onClick={handleGenerateMappingReport}>
                <i className="fas fa-map"></i>
                <span>Generate Mapping Report</span>
              </button>
              <button className="action-btn tertiary" onClick={() => setCurrentTab('view-data')}>
                <i className="fas fa-eye"></i>
                <span>View Collections</span>
              </button>
              <button className="action-btn quaternary" onClick={() => setCurrentTab('reports')}>
                <i className="fas fa-chart-bar"></i>
                <span>View Reports</span>
              </button>
            </div>
          </div>
        </div>

        <div className="news-feed-card">
          <div className="card-header">
            <h2>News Feed</h2>
            <button className="refresh-btn" onClick={handleRefreshNewsFeed}>
              <i className="fas fa-sync-alt"></i>
            </button>
          </div>
          <div className="card-body">
            <div className="news-feed">
              {newsItems.map(item => (
                <div key={item.id} className="news-item">
                  <div className={`news-icon ${item.color}`}>
                    <i className={`fas ${item.icon}`}></i>
                  </div>
                  <div className="news-content">
                    <h4>{item.title}</h4>
                    <p>{item.message}</p>
                    <span className="news-time">{item.time}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="activity-card">
        <div className="card-header">
          <h2>Recent Activity</h2>
          <select className="filter-select">
            <option>Last 7 days</option>
            <option>Last 30 days</option>
            <option>Last 90 days</option>
          </select>
        </div>
        <div className="card-body">
          <div className="activity-chart">
            <div className="chart-bars">
              <div className="chart-bar" style={{ '--height': '60%' }}><span>Mon</span></div>
              <div className="chart-bar" style={{ '--height': '80%' }}><span>Tue</span></div>
              <div className="chart-bar" style={{ '--height': '45%' }}><span>Wed</span></div>
              <div className="chart-bar" style={{ '--height': '90%' }}><span>Thu</span></div>
              <div className="chart-bar" style={{ '--height': '70%' }}><span>Fri</span></div>
              <div className="chart-bar" style={{ '--height': '40%' }}><span>Sat</span></div>
              <div className="chart-bar" style={{ '--height': '55%' }}><span>Sun</span></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Dashboard;
