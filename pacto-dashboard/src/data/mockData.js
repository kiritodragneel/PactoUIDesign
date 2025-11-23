// Mock data for the application
// In production, this would come from Directus

export const collections = {
  users: [
    { id: 1, name: 'John Smith', email: 'john@example.com', role: 'Admin', status: 'Active', created: '2024-01-15' },
    { id: 2, name: 'Sarah Johnson', email: 'sarah@example.com', role: 'User', status: 'Active', created: '2024-01-20' },
    { id: 3, name: 'Mike Davis', email: 'mike@example.com', role: 'User', status: 'Inactive', created: '2024-02-01' },
    { id: 4, name: 'Emily Brown', email: 'emily@example.com', role: 'Editor', status: 'Active', created: '2024-02-10' },
    { id: 5, name: 'David Wilson', email: 'david@example.com', role: 'User', status: 'Active', created: '2024-02-15' }
  ],
  journeys: [
    { id: 1, origin: 'Central Station', destination: 'Airport', type: 'Train', duration: '45 mins', date: '2024-03-01' },
    { id: 2, origin: 'Downtown', destination: 'University', type: 'Bus', duration: '25 mins', date: '2024-03-02' },
    { id: 3, origin: 'Harbor', destination: 'City Center', type: 'Ferry', duration: '30 mins', date: '2024-03-03' },
    { id: 4, origin: 'North Station', destination: 'Tech Park', type: 'Metro', duration: '20 mins', date: '2024-03-04' },
    { id: 5, origin: 'Airport', destination: 'Hotel District', type: 'Bus', duration: '35 mins', date: '2024-03-05' }
  ],
  locations: [
    { id: 1, name: 'Central Station', type: 'Train Station', lat: 51.5074, lng: -0.1278, capacity: 50000 },
    { id: 2, name: 'Downtown Hub', type: 'Bus Terminal', lat: 51.5094, lng: -0.1338, capacity: 15000 },
    { id: 3, name: 'Harbor Terminal', type: 'Ferry Port', lat: 51.5034, lng: -0.1198, capacity: 8000 },
    { id: 4, name: 'Airport', type: 'Airport', lat: 51.4700, lng: -0.4543, capacity: 80000 },
    { id: 5, name: 'Tech Park Station', type: 'Metro Station', lat: 51.5154, lng: -0.1418, capacity: 25000 }
  ],
  routes: [
    { id: 1, name: 'Express Line 1', type: 'Train', stops: 12, distance: '45 km', status: 'Operational' },
    { id: 2, name: 'City Bus Route A', type: 'Bus', stops: 28, distance: '18 km', status: 'Operational' },
    { id: 3, name: 'Metro Green Line', type: 'Metro', stops: 15, distance: '22 km', status: 'Operational' },
    { id: 4, name: 'Harbor Express', type: 'Ferry', stops: 4, distance: '8 km', status: 'Maintenance' },
    { id: 5, name: 'Airport Shuttle', type: 'Bus', stops: 6, distance: '35 km', status: 'Operational' }
  ],
  reports: [
    { id: 1, title: 'Monthly Usage Report', type: 'Analytics', date: '2024-03-01', status: 'Complete' },
    { id: 2, title: 'Route Efficiency Analysis', type: 'Performance', date: '2024-02-28', status: 'Complete' },
    { id: 3, title: 'Incident Summary Q1', type: 'Safety', date: '2024-02-25', status: 'Pending' },
    { id: 4, title: 'Capacity Planning 2024', type: 'Planning', date: '2024-02-20', status: 'Complete' },
    { id: 5, title: 'Environmental Impact', type: 'Compliance', date: '2024-02-15', status: 'In Review' }
  ],
  activities: [
    { id: 1, action: 'User Login', user: 'john@example.com', timestamp: '2024-03-05 09:15:00', ip: '192.168.1.1' },
    { id: 2, action: 'Report Generated', user: 'sarah@example.com', timestamp: '2024-03-05 10:30:00', ip: '192.168.1.2' },
    { id: 3, action: 'Data Export', user: 'mike@example.com', timestamp: '2024-03-05 11:45:00', ip: '192.168.1.3' },
    { id: 4, action: 'Settings Updated', user: 'admin@example.com', timestamp: '2024-03-05 14:00:00', ip: '192.168.1.4' },
    { id: 5, action: 'Journey Planned', user: 'emily@example.com', timestamp: '2024-03-05 15:30:00', ip: '192.168.1.5' }
  ],
  settings: [
    { id: 1, key: 'app_name', value: 'Pacto MCP', category: 'General', updated: '2024-01-01' },
    { id: 2, key: 'timezone', value: 'UTC', category: 'General', updated: '2024-01-01' },
    { id: 3, key: 'max_routes', value: '100', category: 'Limits', updated: '2024-02-01' },
    { id: 4, key: 'cache_ttl', value: '3600', category: 'Performance', updated: '2024-02-15' },
    { id: 5, key: 'debug_mode', value: 'false', category: 'Development', updated: '2024-03-01' }
  ],
  media: [
    { id: 1, filename: 'station_photo.jpg', type: 'Image', size: '2.4 MB', uploaded: '2024-02-01' },
    { id: 2, filename: 'route_map.pdf', type: 'Document', size: '5.1 MB', uploaded: '2024-02-10' },
    { id: 3, filename: 'logo.svg', type: 'Vector', size: '48 KB', uploaded: '2024-01-15' },
    { id: 4, filename: 'promo_video.mp4', type: 'Video', size: '128 MB', uploaded: '2024-02-20' },
    { id: 5, filename: 'schedule.xlsx', type: 'Spreadsheet', size: '1.2 MB', uploaded: '2024-03-01' }
  ]
};

export const journeyOptions = [
  { id: 1, type: 'Train', origin: 'Central Station', destination: 'Airport', duration: 45, price: '$15', departures: '12', rating: 4.5 },
  { id: 2, type: 'Bus', origin: 'Central Station', destination: 'Airport', duration: 65, price: '$8', departures: '24', rating: 4.0 },
  { id: 3, type: 'Metro', origin: 'Central Station', destination: 'Airport Link', duration: 35, price: '$12', departures: '8', rating: 4.8 },
  { id: 4, type: 'Train', origin: 'South Station', destination: 'Airport', duration: 55, price: '$18', departures: '6', rating: 4.2 },
  { id: 5, type: 'Bus', origin: 'Downtown Hub', destination: 'Airport Terminal', duration: 50, price: '$10', departures: '15', rating: 4.3 },
  { id: 6, type: 'Train', origin: 'North Station', destination: 'Airport Express', duration: 40, price: '$20', departures: '10', rating: 4.7 }
];

export const mapMarkers = {
  stations: [
    { lat: 51.5074, lng: -0.1278, name: 'Central Station', info: 'Main railway hub' },
    { lat: 51.5304, lng: -0.1248, name: "King's Cross", info: 'Major terminus' },
    { lat: 51.4952, lng: -0.1439, name: 'Victoria', info: 'Southern terminus' }
  ],
  stops: [
    { lat: 51.5094, lng: -0.1338, name: 'Oxford Circus', info: 'Bus stop - 15 routes' },
    { lat: 51.5124, lng: -0.1198, name: 'Bank', info: 'Bus stop - 12 routes' },
    { lat: 51.5014, lng: -0.1258, name: 'Westminster', info: 'Bus stop - 8 routes' }
  ],
  hubs: [
    { lat: 51.5034, lng: -0.1134, name: 'Canary Wharf Hub', info: 'Multimodal transport hub' },
    { lat: 51.4700, lng: -0.4543, name: 'Heathrow Airport', info: 'International airport' },
    { lat: 51.5285, lng: -0.0818, name: 'Stratford International', info: 'High-speed rail hub' }
  ],
  incidents: [
    { lat: 51.5174, lng: -0.1378, name: 'Signal Failure', info: 'Delays expected - 15 mins' },
    { lat: 51.4984, lng: -0.1358, name: 'Road Works', info: 'Bus diversion in effect' }
  ]
};

export const collectionInfo = [
  { name: 'users', icon: 'fa-users', label: 'Users', count: 156 },
  { name: 'journeys', icon: 'fa-route', label: 'Journeys', count: 1284 },
  { name: 'locations', icon: 'fa-map-marker-alt', label: 'Locations', count: 892 },
  { name: 'routes', icon: 'fa-road', label: 'Routes', count: 234 },
  { name: 'reports', icon: 'fa-file-alt', label: 'Reports', count: 342 },
  { name: 'activities', icon: 'fa-clock', label: 'Activities', count: 5621 },
  { name: 'settings', icon: 'fa-cog', label: 'Settings', count: 48 },
  { name: 'media', icon: 'fa-images', label: 'Media', count: 1205 }
];

export const newsItems = [
  {
    id: 1,
    icon: 'fa-bell',
    color: 'blue',
    title: 'System Update Available',
    message: 'Version 2.4.1 is now available with improved mapping features.',
    time: '2 hours ago'
  },
  {
    id: 2,
    icon: 'fa-check-circle',
    color: 'green',
    title: 'Report Generation Complete',
    message: 'Monthly mapping report has been successfully generated.',
    time: '5 hours ago'
  },
  {
    id: 3,
    icon: 'fa-database',
    color: 'purple',
    title: 'New Collection Added',
    message: 'Transportation data collection has been added to the system.',
    time: '1 day ago'
  },
  {
    id: 4,
    icon: 'fa-user-plus',
    color: 'orange',
    title: 'New User Registration',
    message: '5 new users have registered in the last 24 hours.',
    time: '1 day ago'
  }
];

export const dashboardStats = [
  { title: 'Total Journeys', value: '1,284', change: '+12.5%', positive: true, icon: 'fa-route', color: 'blue' },
  { title: 'Collections', value: '48', change: '+3.2%', positive: true, icon: 'fa-database', color: 'green' },
  { title: 'Reports Generated', value: '342', change: '+8.1%', positive: true, icon: 'fa-file-alt', color: 'purple' },
  { title: 'Active Users', value: '156', change: '-2.4%', positive: false, icon: 'fa-users', color: 'orange' }
];
