import { useState, useEffect, useCallback } from 'react';
import { api } from '../../../services/api';
import { endpoints } from '../../../config/endpoints';
import type { DashboardResponse, DashboardData } from '../types';

interface UseDashboardParams {
  page?: number;
  limit?: number;
  search?: string;
}

export const useDashboard = ({ page = 1, limit = 10, search = '' }: UseDashboardParams = {}) => {
  const [data, setData] = useState<DashboardData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchDashboard = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const searchParam = search ? `&search=${encodeURIComponent(search)}` : '';
      console.log(`${endpoints.dashboard}?page=${page}&limit=${limit}${searchParam}`);
      const response = await api.get<DashboardResponse>(
        `${endpoints.dashboard}?page=${page}&limit=${limit}${searchParam}`
      );

      if (response.success) {
        setData(response.data);
      } else {
        setError(response.message || 'Failed to fetch dashboard data');
      }
    } catch (err: any) {
      console.error('Dashboard fetch error:', err);
      setError(err.response?.data?.message || err.message || 'Failed to fetch dashboard data');
    } finally {
      setIsLoading(false);
    }
  }, [page, limit, search]);

  useEffect(() => {
    fetchDashboard();
  }, [fetchDashboard]);

  return {
    data,
    isLoading,
    error,
    refetch: fetchDashboard,
  };
};

