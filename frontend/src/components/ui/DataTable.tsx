'use client';

import { useState, useMemo, type ReactNode } from 'react';

export interface Column<T> {
  key: string;
  header: string;
  sortable?: boolean;
  render?: (item: T) => ReactNode;
  className?: string;
}

interface DataTableProps<T> {
  columns: Column<T>[];
  data: T[];
  keyField?: string;
  onRowClick?: (item: T) => void;
  pagination?: {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
    total: number;
    perPage: number;
  };
  searchable?: boolean;
  onSearch?: (query: string) => void;
  searchPlaceholder?: string;
  actions?: (item: T) => ReactNode;
  emptyMessage?: string;
  loading?: boolean;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function DataTable<T extends Record<string, any>>({
  columns,
  data,
  keyField = 'id',
  onRowClick,
  pagination,
  searchable = false,
  onSearch,
  searchPlaceholder = 'Search...',
  actions,
  emptyMessage = 'No data found',
  loading = false,
}: DataTableProps<T>) {
  const [sortKey, setSortKey] = useState<string>('');
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('asc');
  const [searchQuery, setSearchQuery] = useState('');

  const sortedData = useMemo(() => {
    if (!sortKey) return data;
    return [...data].sort((a, b) => {
      const aVal = a[sortKey] as string;
      const bVal = b[sortKey] as string;
      if (aVal < bVal) return sortDir === 'asc' ? -1 : 1;
      if (aVal > bVal) return sortDir === 'asc' ? 1 : -1;
      return 0;
    });
  }, [data, sortKey, sortDir]);

  const handleSort = (key: string) => {
    if (sortKey === key) {
      setSortDir(sortDir === 'asc' ? 'desc' : 'asc');
    } else {
      setSortKey(key);
      setSortDir('asc');
    }
  };

  const handleSearch = (value: string) => {
    setSearchQuery(value);
    onSearch?.(value);
  };

  if (loading) {
    return (
      <div className="rounded-xl border border-[var(--border-color)] bg-[var(--card-bg)] overflow-hidden">
        <div className="p-4 space-y-3">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="flex gap-4">
              {columns.map((_, j) => (
                <div key={j} className="skeleton h-8 flex-1" />
              ))}
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-xl border border-[var(--border-color)] bg-[var(--card-bg)] overflow-hidden">
      {searchable && (
        <div className="border-b border-[var(--border-color)] p-4">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => handleSearch(e.target.value)}
            placeholder={searchPlaceholder}
            className="w-full max-w-sm rounded-lg border border-[var(--input-border)] bg-[var(--input-bg)] px-4 py-2 text-sm outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 transition-all"
          />
        </div>
      )}

      <div className="overflow-x-auto">
        <table className="w-full text-sm" role="table">
          <thead>
            <tr className="border-b border-[var(--border-color)] bg-gray-50 dark:bg-slate-800/50">
              {columns.map((col) => (
                <th
                  key={col.key}
                  className={`px-4 py-3 text-left font-semibold text-[var(--muted)] ${col.sortable ? 'cursor-pointer select-none hover:text-[var(--foreground)]' : ''} ${col.className || ''}`}
                  onClick={() => col.sortable && handleSort(col.key)}
                  role="columnheader"
                  aria-sort={sortKey === col.key ? sortDir === 'asc' ? 'ascending' : 'descending' : 'none'}
                >
                  <span className="inline-flex items-center gap-1">
                    {col.header}
                    {col.sortable && sortKey === col.key && (
                      <span className="text-xs">{sortDir === 'asc' ? '▲' : '▼'}</span>
                    )}
                  </span>
                </th>
              ))}
              {actions && <th className="px-4 py-3 text-right font-semibold text-[var(--muted)]">Actions</th>}
            </tr>
          </thead>
          <tbody>
            {sortedData.length === 0 ? (
              <tr>
                <td colSpan={columns.length + (actions ? 1 : 0)} className="px-4 py-12 text-center text-[var(--muted)]">
                  {emptyMessage}
                </td>
              </tr>
            ) : (
              sortedData.map((item, index) => (
                <tr
                  key={item[keyField] as string ?? index}
                  className={`border-b border-[var(--border-color)] transition-colors hover:bg-gray-50 dark:hover:bg-slate-800/30 ${onRowClick ? 'cursor-pointer' : ''}`}
                  onClick={() => onRowClick?.(item)}
                  role="row"
                >
                  {columns.map((col) => (
                    <td key={col.key} className={`px-4 py-3 ${col.className || ''}`}>
                      {col.render ? col.render(item) : (item[col.key] as ReactNode)}
                    </td>
                  ))}
                  {actions && (
                    <td className="px-4 py-3 text-right">
                      <div onClick={(e) => e.stopPropagation()}>{actions(item)}</div>
                    </td>
                  )}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {pagination && pagination.totalPages > 1 && (
        <div className="flex items-center justify-between border-t border-[var(--border-color)] px-4 py-3">
          <span className="text-sm text-[var(--muted)]">
            Showing {(pagination.currentPage - 1) * pagination.perPage + 1} to{' '}
            {Math.min(pagination.currentPage * pagination.perPage, pagination.total)} of {pagination.total}
          </span>
          <div className="flex gap-1">
            <button
              onClick={() => pagination.onPageChange(pagination.currentPage - 1)}
              disabled={pagination.currentPage === 1}
              className="rounded-lg px-3 py-1.5 text-sm font-medium disabled:opacity-50 hover:bg-gray-100 dark:hover:bg-slate-700 transition-colors"
              aria-label="Previous page"
            >
              Prev
            </button>
            {Array.from({ length: Math.min(5, pagination.totalPages) }, (_, i) => {
              let page: number;
              if (pagination.totalPages <= 5) {
                page = i + 1;
              } else if (pagination.currentPage <= 3) {
                page = i + 1;
              } else if (pagination.currentPage >= pagination.totalPages - 2) {
                page = pagination.totalPages - 4 + i;
              } else {
                page = pagination.currentPage - 2 + i;
              }
              return (
                <button
                  key={page}
                  onClick={() => pagination.onPageChange(page)}
                  className={`rounded-lg px-3 py-1.5 text-sm font-medium transition-colors ${
                    page === pagination.currentPage
                      ? 'bg-primary-600 text-white'
                      : 'hover:bg-gray-100 dark:hover:bg-slate-700'
                  }`}
                  aria-label={`Page ${page}`}
                  aria-current={page === pagination.currentPage ? 'page' : undefined}
                >
                  {page}
                </button>
              );
            })}
            <button
              onClick={() => pagination.onPageChange(pagination.currentPage + 1)}
              disabled={pagination.currentPage === pagination.totalPages}
              className="rounded-lg px-3 py-1.5 text-sm font-medium disabled:opacity-50 hover:bg-gray-100 dark:hover:bg-slate-700 transition-colors"
              aria-label="Next page"
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
