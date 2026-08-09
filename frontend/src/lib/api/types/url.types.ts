export type AlgorithmVersion = "v1" | "v2";

export interface CreateUrlRequest {
  original_url: string;
  algorithm: AlgorithmVersion;
}

export interface CreateUrlResponse {
  id: string;
  slug: string;
  short_url: string;
  created_at: string;
}

export interface UrlStatsResponse {
  id: string;
  slug: string;
  original_url: string;
  click_count: number;
  created_at: string;
}

export interface UrlListItemResponse {
  id: string;
  slug: string;
  original_url: string;
  click_count: number;
  created_at: string;
}

export interface PaginatedResponse<T> {
  items: T[];
  total_count: number;
  filtered_count: number;
  page: number;
  page_size: number;
  total_pages: number;
  has_previous: boolean;
  has_next: boolean;
}

export interface UrlListRequest {
  page?: number;
  limit?: number;
  search?: string;
  sort?: string;
  order?: "asc" | "desc";
  created_from?: string;
  created_to?: string;
  min_clicks?: number;
  max_clicks?: number;
}

export interface UpdateUrlRequest {
  original_url: string;
}

export interface DashboardStats {
  total_urls: number;
  total_clicks: number;
  active_urls: number;
  recent_urls: UrlListItemResponse[];
}
