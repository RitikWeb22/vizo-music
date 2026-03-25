/**
 * Central API configuration - update for your deployment
 */
const API_BASE =
  import.meta.env.VITE_API_URL || "http://localhost:3000/api";

export const API = {
  base: API_BASE,
  auth: `${API_BASE}/auth`,
  songs: `${API_BASE}/songs`,
};
