import { useCallback, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

interface PostFilter {
  search: string;
  tag: string;
  page: number;
  pageSize: number;
  sortBy: string;
  sortOrder: 'asc' | 'desc';
}

const DEFAULT_FILTERS: PostFilter = {
  search: '',
  tag: 'all',
  page: 1,
  pageSize: 10,
  sortBy: '',
  sortOrder: 'asc',
} as const;

const createUtlParams = (filters: Partial<PostFilter>) => {
  const params = new URLSearchParams();
  Object.entries(filters).forEach(([key, value]) => {
    if (value && value !== '') params.set(key, String(value));
  });
  return params;
};
const parseUrlParams = (): PostFilter => {
  const params = new URLSearchParams(location.search);
  return {
    search: params.get('search') || DEFAULT_FILTERS.search,
    tag: params.get('tag') || DEFAULT_FILTERS.tag,
    page: Number(params.get('page')) || DEFAULT_FILTERS.page,
    pageSize: Number(params.get('pageSize')) || DEFAULT_FILTERS.pageSize,
    sortBy: params.get('sortBy') || DEFAULT_FILTERS.sortBy,
    sortOrder: (params.get('sortOrder') as PostFilter['sortOrder']) || DEFAULT_FILTERS.sortOrder,
  };
};

export const usePostFilter = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [filters, setFilters] = useState<PostFilter>(parseUrlParams());

  // Filter 객체 -> URL 파라미터로 변환
  const applyFilters = useCallback(
    (newFilters: Partial<PostFilter>) => {
      const updatedFilters = { ...filters, ...newFilters };
      const params = createUtlParams(updatedFilters);

      navigate(`?${params.toString()}`);
      setFilters(updatedFilters);
    },
    [navigate, filters],
  );

  useEffect(() => {
    setFilters(parseUrlParams());
  }, [location.search, setFilters]);

  return {
    filters: parseUrlParams(),
    applyFilters,

    // 편의 메서드들
    setSearch: (search: string) => applyFilters({ search }),
    setTag: (tag: string) => applyFilters({ tag }),
    setPage: (page: number) => applyFilters({ page }),
    setPageSize: (pageSize: number) => applyFilters({ pageSize }),
    setSortBy: (sortBy: string) => applyFilters({ sortBy }),
    setSortOrder: (sortOrder: PostFilter['sortOrder']) => applyFilters({ sortOrder }),
    setSorting: (sortBy: string, sortOrder: PostFilter['sortOrder']) => applyFilters({ sortBy, sortOrder }),
  };
};
