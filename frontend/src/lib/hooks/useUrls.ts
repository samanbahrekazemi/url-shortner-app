"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { urlService } from "@/lib/api/services/url.service";
import type { UrlListRequest, CreateUrlRequest } from "@/lib/api/types/url.types";
import { toast } from "sonner";
import { getErrorMessage } from "@/config/i18n";

export function useUrls(params?: UrlListRequest) {
  return useQuery({
    queryKey: ["urls", params],
    queryFn: () => urlService.list(params),
    staleTime: 30_000,
  });
}

export function useUrlStats(slug: string) {
  return useQuery({
    queryKey: ["url", slug],
    queryFn: () => urlService.getStats(slug),
    enabled: !!slug,
  });
}

export function useCreateUrl() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateUrlRequest) => urlService.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["urls"] });
      queryClient.invalidateQueries({ queryKey: ["dashboard"] });
    },
    onError: (error: Error) => {
      toast.error(getErrorMessage(error));
    },
  });
}

export function useUpdateUrl() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ slug, data }: { slug: string; data: { original_url: string } }) =>
      urlService.update(slug, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["urls"] });
      queryClient.invalidateQueries({ queryKey: ["url"] });
      toast.success("URL updated successfully");
    },
    onError: (error: Error) => {
      toast.error(getErrorMessage(error));
    },
  });
}

export function useDeleteUrl() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (slug: string) => urlService.remove(slug),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["urls"] });
      queryClient.invalidateQueries({ queryKey: ["dashboard"] });
      toast.success("URL deleted successfully");
    },
    onError: (error: Error) => {
      toast.error(getErrorMessage(error));
    },
  });
}

export function useDashboardStats() {
  return useQuery({
    queryKey: ["dashboard"],
    queryFn: () => urlService.getDashboardStats(),
    staleTime: 30_000,
  });
}
