import { createDirectus, rest, authentication, readItems, createItem, updateItem, deleteItem } from '@directus/sdk';

/**
 * Pacto MCP API Configuration
 *
 * This module configures the Directus SDK to connect to Pacto MCP.
 * All data fetching in the application goes through this client.
 *
 * Environment Variables:
 * - VITE_DIRECTUS_URL: The Pacto MCP API endpoint
 * - VITE_PACTO_MCP_URL: Alternative Pacto MCP URL (fallback)
 *
 * Collections available in Pacto MCP:
 * - dashboard_stats: Dashboard statistics and metrics
 * - news_items: News feed items
 * - collection_info: Metadata about available collections
 * - journey_options: Available journey search results
 * - stations: Train station markers
 * - stops: Bus stop markers
 * - hubs: Transport hub markers
 * - incidents: Incident report markers
 * - users, journeys, locations, routes, reports, activities, settings, media
 */
const DIRECTUS_URL = import.meta.env.VITE_DIRECTUS_URL || import.meta.env.VITE_PACTO_MCP_URL || 'http://localhost:8055';

// Create Directus client
const directus = createDirectus(DIRECTUS_URL)
  .with(authentication())
  .with(rest());

export { directus };

// Helper functions for common operations
export const fetchCollection = async (collection, options = {}) => {
  try {
    const items = await directus.request(readItems(collection, options));
    return items;
  } catch (error) {
    console.error(`Error fetching ${collection}:`, error);
    throw error;
  }
};

export const createRecord = async (collection, data) => {
  try {
    const item = await directus.request(createItem(collection, data));
    return item;
  } catch (error) {
    console.error(`Error creating record in ${collection}:`, error);
    throw error;
  }
};

export const updateRecord = async (collection, id, data) => {
  try {
    const item = await directus.request(updateItem(collection, id, data));
    return item;
  } catch (error) {
    console.error(`Error updating record in ${collection}:`, error);
    throw error;
  }
};

export const deleteRecord = async (collection, id) => {
  try {
    await directus.request(deleteItem(collection, id));
    return true;
  } catch (error) {
    console.error(`Error deleting record in ${collection}:`, error);
    throw error;
  }
};

// Authentication helpers
export const login = async (email, password) => {
  try {
    const result = await directus.login(email, password);
    return result;
  } catch (error) {
    console.error('Login error:', error);
    throw error;
  }
};

export const logout = async () => {
  try {
    await directus.logout();
    return true;
  } catch (error) {
    console.error('Logout error:', error);
    throw error;
  }
};

export const getToken = () => {
  return directus.getToken();
};

export default directus;
