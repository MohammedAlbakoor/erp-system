'use client';

import { useState, useEffect, useCallback } from 'react';
import api from '@/lib/api';
import type { PaginatedResponse } from '@/types';

export function useFetch<T>(url: string, deps: unknown[] = []) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      const { data: result } = await api.get<T>(url);
      setData(result);
      setError(null);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'An error occurred';
      setError(message);
    } finally {
      setLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [url, ...deps]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { data, loading, error, refetch: fetchData };
}

export function usePaginatedFetch<T>(baseUrl: string, initialPage = 1, perPage = 15) {
  const [page, setPage] = useState(initialPage);
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState<Record<string, string>>({});

  const buildUrl = useCallback(() => {
    const params = new URLSearchParams({ page: String(page), per_page: String(perPage) });
    if (searchQuery) params.set('search', searchQuery);
    Object.entries(filters).forEach(([key, val]) => {
      if (val) params.set(key, val);
    });
    return `${baseUrl}?${params.toString()}`;
  }, [baseUrl, page, perPage, searchQuery, filters]);

  const { data, loading, error, refetch } = useFetch<PaginatedResponse<T>>(buildUrl(), [page, searchQuery, JSON.stringify(filters)]);

  return {
    data: data?.data || [],
    pagination: data ? {
      currentPage: data.current_page,
      totalPages: data.last_page,
      total: data.total,
      perPage: data.per_page,
      onPageChange: setPage,
    } : undefined,
    loading,
    error,
    refetch,
    searchQuery,
    setSearchQuery,
    filters,
    setFilters,
  };
}
