import axios from 'axios';
import type { AxiosResponse } from 'axios';
import type {
  AuthResponse,
  LoginRequest,
  PaginatedData,
  AnalyticsStats,
  VisitorLog,
  ApiResponse,
} from '@/types/api';
import type {
  Property,
  PropertyFormData,
  TeamMember,
  TeamMemberFormData,
} from '@/types/models';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3001/api',
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('admin_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('admin_token');
      if (window.location.pathname !== '/admin/login') {
        window.location.href = '/admin/login';
      }
    }
    return Promise.reject(error);
  }
);

const responseBody = <T>(response: AxiosResponse<T>) => response.data;

export const authService = {
  login: (data: LoginRequest) => api.post<AuthResponse>('/auth/login', data).then(responseBody),
  validateToken: () => api.get<{ valid: boolean }>('/auth/validate').then(responseBody),
};

export const propertyService = {
  getAll: (
    page: number,
    limit: number,
    filters: Record<string, any> = {}
  ) => {
    const params = new URLSearchParams({
      page: page.toString(),
      limit: limit.toString(),
    });
    Object.entries(filters).forEach(([key, value]) => {
      if (value) {
        params.append(key, value.toString());
      }
    });
    return api.get<ApiResponse<PaginatedData<Property>>>(`/properties?${params.toString()}`).then(responseBody);
  },
  getById: (id: string) => api.get<ApiResponse<Property>>(`/properties/${id}`).then(responseBody),
  create: (data: PropertyFormData) => api.post<ApiResponse<Property>>('/properties', data).then(responseBody),
  update: (id: string, data: Partial<PropertyFormData>) => api.put<ApiResponse<Property>>(`/properties/${id}`, data).then(responseBody),
  delete: (id: string) => api.delete<ApiResponse<void>>(`/properties/${id}`).then(responseBody),
};

export const teamService = {
  getAll: () => api.get<ApiResponse<{ data: TeamMember[], total: number }>>('/team').then(responseBody),
  getById: (id: string) => api.get<ApiResponse<TeamMember>>(`/team/${id}`).then(responseBody),
  create: (data: TeamMemberFormData) => api.post<ApiResponse<TeamMember>>('/team', data).then(responseBody),
  update: (id: string, data: Partial<TeamMemberFormData>) => api.put<ApiResponse<TeamMember>>(`/team/${id}`, data).then(responseBody),
  delete: (id: string) => api.delete<ApiResponse<void>>(`/team/${id}`).then(responseBody),
};

export const analyticsService = {
  getStats: (period = '7d') => api.get<ApiResponse<AnalyticsStats>>(`/analytics/stats?period=${period}`).then(responseBody),
  getVisitorLogs: (page = 1, limit = 50) => api.get<ApiResponse<PaginatedData<VisitorLog>>>(`/analytics/logs?page=${page}&limit=${limit}`).then(responseBody),
  getDailyStats: (days = 7) => api.get<ApiResponse<any[]>>(`/analytics/daily?days=${days}`).then(responseBody),
  getPageStats: () => api.get<ApiResponse<any[]>>('/analytics/pages').then(responseBody),
  trackVisit: (data: Partial<VisitorLog>) => api.post<ApiResponse<void>>('/analytics/track', data).then(responseBody),
};

export default api;
