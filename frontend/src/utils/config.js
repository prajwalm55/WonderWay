const configuredBaseUrl = import.meta.env.VITE_BASE_URL || "http://localhost:4000/api";
const normalizedBaseUrl = configuredBaseUrl.replace(/\/+$/, "");
const BASE_URL = normalizedBaseUrl.endsWith("/api")
  ? normalizedBaseUrl
  : `${normalizedBaseUrl}/api`;

export default BASE_URL;
