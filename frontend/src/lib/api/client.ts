import { getApiBaseUrl } from "@/config/site.config";

class ApiError extends Error {
  status: number;
  constructor(message: string, status: number) {
    super(message);
    this.status = status;
    this.name = "ApiError";
  }
}

function getBasicAuthHeader(): string | null {
  if (typeof window === "undefined") return null;
  const credentials = localStorage.getItem("basic_auth_credentials");
  return credentials ? `Basic ${credentials}` : null;
}

async function request<T>(
  endpoint: string,
  options: RequestInit = {},
  customBaseUrl?: string
): Promise<T> {
  const basicAuth = getBasicAuthHeader();

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...(options.headers as Record<string, string>),
  };

  if (basicAuth) {
    headers["Authorization"] = basicAuth;
  }

  const baseUrl = customBaseUrl || getApiBaseUrl();

  let response: Response;
  try {
    response = await fetch(`${baseUrl}${endpoint}`, {
      ...options,
      headers,
      credentials: "include",
    });
  } catch {
    throw new ApiError(
      "Unable to reach the server. Please check your connection or try again later.",
      0
    );
  }

  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: "Request failed" }));
    throw new ApiError(error.message || error.title || "Request failed", response.status);
  }

  if (response.status === 204) return {} as T;
  return response.json();
}

export const api = {
  get: <T>(endpoint: string, customBaseUrl?: string) => request<T>(endpoint, {}, customBaseUrl),
  post: <T>(endpoint: string, data: unknown, customBaseUrl?: string) =>
    request<T>(endpoint, { method: "POST", body: JSON.stringify(data) }, customBaseUrl),
  put: <T>(endpoint: string, data: unknown, customBaseUrl?: string) =>
    request<T>(endpoint, { method: "PUT", body: JSON.stringify(data) }, customBaseUrl),
  delete: <T>(endpoint: string, customBaseUrl?: string) =>
    request<T>(endpoint, { method: "DELETE" }, customBaseUrl),
};

export const auth = {
  setCredentials(username: string, password: string) {
    if (typeof window !== "undefined") {
      const encoded = btoa(`${username}:${password}`);
      localStorage.setItem("basic_auth_credentials", encoded);
    }
  },

  clearCredentials() {
    if (typeof window !== "undefined") {
      localStorage.removeItem("basic_auth_credentials");
    }
  },

  hasCredentials(): boolean {
    if (typeof window === "undefined") return false;
    return !!localStorage.getItem("basic_auth_credentials");
  },
};

export { ApiError };