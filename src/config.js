// Backend base URL. Empty means same origin (requests go to /users/...),
// which is how the app is served behind the Kubernetes Ingress.
// Set REACT_APP_API_URL at build time to point at a different backend.
export const API_BASE_URL = process.env.REACT_APP_API_URL || '';
