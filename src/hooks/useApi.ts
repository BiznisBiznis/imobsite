import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  propertyService,
  teamService,
  analyticsService,
} from "@/services/api";
import type {
  Property,
  PropertyFormData,
  TeamMember,
  TeamMemberFormData,
} from "@/types/models";

// Query Keys
export const queryKeys = {
  properties: ["properties"] as const,
  property: (id: string) => ["properties", id] as const,
  team: ["team"] as const,
  teamMember: (id: string) => ["team", id] as const,
  analytics: {
    stats: (period: string) => ["analytics", "stats", period] as const,
    logs: (page: number) => ["analytics", "logs", page] as const,
    daily: (days: number) => ["analytics", "daily", days] as const,
    pages: ["analytics", "pages"] as const,
  },
};

// Properties Hooks
export const useProperties = (
  initialPage = 1,
  limit = 9,
  filters: Record<string, any> = {}
) => {
  const [page, setPage] = useState(initialPage);
  const filterKey = JSON.stringify(filters); // Stable key for query

  const queryResult = useQuery({
    queryKey: [...queryKeys.properties, page, limit, filterKey],
    queryFn: () => propertyService.getAll(page, limit, filters),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  return {
    ...queryResult,
    page,
    setPage,
    totalPages: queryResult.data?.data.totalPages ?? 1,
  };
};

export const useProperty = (id: string) => {
  return useQuery({
    queryKey: queryKeys.property(id),
    queryFn: () => propertyService.getById(id),
    enabled: !!id,
  });
};

export const useCreateProperty = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: PropertyFormData) => propertyService.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.properties });
    },
  });
};

export const useUpdateProperty = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      data,
    }: {
      id: string;
      data: Partial<PropertyFormData>;
    }) => propertyService.update(id, data),
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.properties });
      queryClient.invalidateQueries({ queryKey: queryKeys.property(id) });
    },
  });
};

export const useDeleteProperty = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => propertyService.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.properties });
    },
  });
};

// Team Hooks
export const useTeam = () => {
  return useQuery({
    queryKey: queryKeys.team,
    queryFn: () => teamService.getAll(),
    staleTime: 10 * 60 * 1000, // 10 minutes
  });
};

export const useTeamMember = (id: string) => {
  return useQuery({
    queryKey: queryKeys.teamMember(id),
    queryFn: () => teamService.getById(id),
    enabled: !!id,
  });
};

export const useCreateTeamMember = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: TeamMemberFormData) => teamService.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.team });
    },
  });
};

export const useUpdateTeamMember = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      data,
    }: {
      id: string;
      data: Partial<TeamMemberFormData>;
    }) => teamService.update(id, data),
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.team });
      queryClient.invalidateQueries({ queryKey: queryKeys.teamMember(id) });
    },
  });
};

export const useDeleteTeamMember = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => teamService.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.team });
    },
  });
};

// Analytics Hooks
export const useAnalyticsStats = (period = "7d") => {
  return useQuery({
    queryKey: queryKeys.analytics.stats(period),
    queryFn: () => analyticsService.getStats(period),
    staleTime: 2 * 60 * 1000, // 2 minutes
    refetchInterval: 5 * 60 * 1000, // Refetch every 5 minutes
  });
};

export const useVisitorLogs = (page = 1, limit = 50) => {
  return useQuery({
    queryKey: queryKeys.analytics.logs(page),
    queryFn: () => analyticsService.getVisitorLogs(page, limit),
    staleTime: 1 * 60 * 1000, // 1 minute
    refetchInterval: 2 * 60 * 1000, // Refetch every 2 minutes
  });
};

export const useDailyStats = (days = 7) => {
  return useQuery({
    queryKey: queryKeys.analytics.daily(days),
    queryFn: () => analyticsService.getDailyStats(days),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

export const usePageStats = () => {
  return useQuery({
    queryKey: queryKeys.analytics.pages,
    queryFn: () => analyticsService.getPageStats(),
    staleTime: 10 * 60 * 1000, // 10 minutes
  });
};

export const useTrackVisit = () => {
  return useMutation({
    mutationFn: (data: any) => analyticsService.trackVisit(data),
    // Don't need to invalidate anything for tracking
  });
};
