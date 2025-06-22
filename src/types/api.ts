// TypeScript types for API responses
import { Property } from '@/types/models';

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}

export interface PaginatedData<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}


export interface PaginatedProperties {
  properties: Property[];
  totalPages: number;
  currentPage: number;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  phone: string;
  email: string;
  image: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateTeamMemberData extends Omit<TeamMember, 'id' | 'createdAt' | 'updatedAt'> {}

export interface AnalyticsStats {
  totalVisitors: number;
  uniqueVisitors: number;
  pageViews: number;
  avgSessionDuration: string;
  bounceRate: string;
  topCountry: string;
}

export interface VisitorLog {
  id: number;
  ip: string;
  location: string;
  device: string;
  browser: string;
  page: string;
  timestamp: string;
  duration: string;
  referrer: string;
  userAgent: string;
}

export interface PaginatedLogs {
  logs: VisitorLog[];
  totalPages: number;
  currentPage: number;
}

export interface DailyStat {
  date: string;
  visits: number;
}

export interface PageStat {
  page: string;
  visits: number;
}

export interface LoginRequest {
  password: string;
}

export interface AuthResponse {
  token: string;
  user: {
    id: string;
    role: string;
  };
}
