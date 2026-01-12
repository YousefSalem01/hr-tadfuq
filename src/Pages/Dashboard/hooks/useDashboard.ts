import { useState, useEffect, useCallback } from 'react';
import { api } from '../../../services/api';
import { endpoints } from '../../../config/endpoints';
import type { DashboardResponse, DashboardData } from '../types';

export const useDashboard = () => {
  const [data, setData] = useState<DashboardData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [searchValue, setSearchValue] = useState('');

  const fetchDashboard = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const searchParam = searchValue ? `&search=${encodeURIComponent(searchValue)}` : '';
      const response = await api.get<DashboardResponse>(
        `${endpoints.dashboard}?page=${currentPage}&limit=${pageSize}${searchParam}`
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
  }, [currentPage, pageSize, searchValue]);

  useEffect(() => {
    fetchDashboard();
  }, [fetchDashboard]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handlePageSizeChange = (size: number) => {
    setPageSize(size);
    setCurrentPage(1);
  };

  const handleSearchChange = (value: string) => {
    setSearchValue(value);
    setCurrentPage(1);
  };

  return {
    data,
    isLoading,
    error,
    currentPage,
    pageSize,
    searchValue,
    handlePageChange,
    handlePageSizeChange,
    handleSearchChange,
    refetch: fetchDashboard,
  };
};

