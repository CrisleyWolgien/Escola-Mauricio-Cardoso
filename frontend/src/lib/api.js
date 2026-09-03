const API_URL = import.meta.env.VITE_API_URL || "http://127.0.0.1:8001/api";

export class ApiError extends Error {
  constructor(message, status) {
    super(message);
    this.status = status;
  }
}

async function request(path, { signal } = {}) {
  const response = await fetch(`${API_URL}${path}`, { signal });
  if (!response.ok) throw new ApiError("Não foi possível carregar este conteúdo.", response.status);
  return response.json();
}

export const publicApi = {
  announcements: (options) => request("/announcements", options),
  events: (options) => request("/events", options),
  albums: (options) => request("/gallery/albums", options),
  games: (options) => request("/games", options),
  settings: (options) => request("/settings", options),
};
