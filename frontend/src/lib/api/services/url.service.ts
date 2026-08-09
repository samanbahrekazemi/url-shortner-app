import { api } from "@/lib/api/client";
import { getApiBaseUrl } from "@/config/site.config";
import type {
  CreateUrlRequest,
  CreateUrlResponse,
  UrlStatsResponse,
  PaginatedResponse,
  UrlListItemResponse,
  UrlListRequest,
  UpdateUrlRequest,
  DashboardStats,
} from "@/lib/api/types/url.types";

const SORT_FIELD_MAP: Record<string, string> = {
  created_at: "createdat",
  click_count: "clickcount",
  original_url: "originalurl",
  slug: "slug",
};

export const urlService = {
  async create(data: CreateUrlRequest): Promise<CreateUrlResponse> {
    const version = data.algorithm === "v2" ? "v2" : "v1";
    return api.post<CreateUrlResponse>("/urls", { original_url: data.original_url }, getApiBaseUrl(version));
  },

  async list(params?: UrlListRequest): Promise<PaginatedResponse<UrlListItemResponse>> {
    const searchParams = new URLSearchParams();
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null && value !== "") {
          if (key === "sort" && typeof value === "string") {
            searchParams.set(key, SORT_FIELD_MAP[value] ?? value);
          } else {
            searchParams.set(key, String(value));
          }
        }
      });
    }
    const qs = searchParams.toString();
    return api.get<PaginatedResponse<UrlListItemResponse>>(`/urls${qs ? `?${qs}` : ""}`, getApiBaseUrl("v1"));
  },

  async getStats(slug: string, version: "v1" | "v2" = "v1"): Promise<UrlStatsResponse> {
    return api.get<UrlStatsResponse>(`/urls/${slug}`, getApiBaseUrl(version));
  },

  async update(slug: string, data: UpdateUrlRequest, version: "v1" | "v2" = "v1"): Promise<UrlStatsResponse> {
    return api.put<UrlStatsResponse>(`/urls/${slug}`, data, getApiBaseUrl(version));
  },

  async remove(slug: string, version: "v1" | "v2" = "v1"): Promise<void> {
    return api.delete<void>(`/urls/${slug}`, getApiBaseUrl(version));
  },

  async getDashboardStats(): Promise<DashboardStats> {
    return api.get<DashboardStats>("/dashboard/stats", getApiBaseUrl("v1"));
  },
};
