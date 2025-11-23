import { useState } from 'react';
import { useApp } from '../../context/AppContext';

const Profile = () => {
  const { showToast } = useApp();
  const [formData, setFormData] = useState({
    firstName: 'Admin',
    lastName: 'User',
    email: 'admin@pacto-mcp.com',
    phone: '+1 (555) 123-4567',
    bio: 'System administrator with extensive experience in transportation data management.'
  });

  const [settings, setSettings] = useState({
    twoFactor: true,
    emailNotifications: true,
    sessionTimeout: '30 minutes'
  });

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSettingToggle = (setting) => {
    setSettings(prev => ({
      ...prev,
      [setting]: !prev[setting]
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    showToast('Profile Updated', 'Your profile has been saved successfully', 'success');
  };

  const avatarUrl = `https://ui-avatars.com/api/?name=${formData.firstName}+${formData.lastName}&size=150&background=6366f1&color=fff`;

  return (
    <section className="tab-content active">
      <div className="profile-container">
        <div className="profile-header-card">
          <div className="profile-cover"></div>
          <div className="profile-info">
            <div className="profile-avatar-wrapper">
              <img src={avatarUrl} alt="Profile" className="profile-avatar" />
              <button className="avatar-edit-btn">
                <i className="fas fa-camera"></i>
              </button>
            </div>
            <div className="profile-details">
              <h2>{formData.firstName} {formData.lastName}</h2>
              <p>Administrator</p>
              <div className="profile-meta">
                <span><i className="fas fa-envelope"></i> {formData.email}</span>
                <span><i className="fas fa-calendar"></i> Joined Jan 2024</span>
              </div>
            </div>
          </div>
        </div>

        <div className="profile-content">
          <div className="profile-form-card">
            <div className="card-header">
              <h3>Personal Information</h3>
            </div>
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="firstName">First Name</label>
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="lastName">Last Name</label>
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="email">Email Address</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="phone">Phone Number</label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className="form-group">
                  <label htmlFor="bio">Bio</label>
                  <textarea
                    id="bio"
                    name="bio"
                    rows="3"
                    placeholder="Write a short bio..."
                    value={formData.bio}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-actions">
                  <button type="submit" className="btn btn-primary">
                    <i className="fas fa-save"></i>
                    Save Changes
                  </button>
                </div>
              </form>
            </div>
          </div>

          <div className="profile-settings-card">
            <div className="card-header">
              <h3>Account Settings</h3>
            </div>
            <div className="card-body">
              <div className="settings-list">
                <div className="setting-item">
                  <div className="setting-info">
                    <h4>Change Password</h4>
                    <p>Update your password regularly for security</p>
                  </div>
                  <button className="btn btn-secondary btn-sm">Change</button>
                </div>
                <div className="setting-item">
                  <div className="setting-info">
                    <h4>Two-Factor Authentication</h4>
                    <p>Add an extra layer of security to your account</p>
                  </div>
                  <label className="toggle-switch">
                    <input
                      type="checkbox"
                      checked={settings.twoFactor}
                      onChange={() => handleSettingToggle('twoFactor')}
                    />
                    <span className="toggle-slider"></span>
                  </label>
                </div>
                <div className="setting-item">
                  <div className="setting-info">
                    <h4>Email Notifications</h4>
                    <p>Receive email updates about your account</p>
                  </div>
                  <label className="toggle-switch">
                    <input
                      type="checkbox"
                      checked={settings.emailNotifications}
                      onChange={() => handleSettingToggle('emailNotifications')}
                    />
                    <span className="toggle-slider"></span>
                  </label>
                </div>
                <div className="setting-item">
                  <div className="setting-info">
                    <h4>Session Timeout</h4>
                    <p>Automatically logout after inactivity</p>
                  </div>
                  <select
                    className="setting-select"
                    value={settings.sessionTimeout}
                    onChange={(e) => setSettings(prev => ({ ...prev, sessionTimeout: e.target.value }))}
                  >
                    <option>15 minutes</option>
                    <option>30 minutes</option>
                    <option>1 hour</option>
                    <option>Never</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          <div className="danger-zone-card">
            <div className="card-header">
              <h3>Danger Zone</h3>
            </div>
            <div className="card-body">
              <div className="danger-item">
                <div className="danger-info">
                  <h4>Delete Account</h4>
                  <p>Permanently delete your account and all associated data. This action cannot be undone.</p>
                </div>
                <button className="btn btn-danger">Delete Account</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Profile;
