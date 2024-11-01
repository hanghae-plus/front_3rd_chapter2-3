import { useSearchParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getPostList } from "../../../entities/post/api/get-post-list";
import { getSearchedPostList } from "../../../entities/post/api/get-searched-post-list";

const DEFAULT_VALUES = {
  page: 1,
  limit: 10,
} as const;

export const usePostQuery = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const searchQuery = searchParams.get("search") || "";
  const page = Number(searchParams.get("page")) || DEFAULT_VALUES.page;
  const limit = Number(searchParams.get("limit")) || DEFAULT_VALUES.limit;
  const skip = (page - 1) * limit;
  const selectedTag = searchParams.get("tag") || "";
  const sortBy = searchParams.get("sortBy") || "";
  const sortOrder = searchParams.get("sortOrder") || "asc";

  const updateParams = (updates: Record<string, string | null>) => {
    const newParams = new URLSearchParams(searchParams);
    Object.entries(updates).forEach(([key, value]) => {
      if (value === null) {
        newParams.delete(key);
      } else {
        newParams.set(key, value);
      }
    });
    setSearchParams(newParams, { replace: true });
  };

  const setSearchQuery = (value: string) => {
    updateParams({
      search: value || null,
      page: "1",
    });
  };

  const setPage = (newPage: number) => {
    updateParams({ page: newPage.toString() });
  };

  const setLimit = (newLimit: number) => {
    updateParams({
      limit: newLimit.toString(),
      page: "1",
    });
  };

  const postQuery = useQuery({
    queryKey: ["postList", { limit, skip, sortBy, sortOrder, selectedTag, searchQuery }],
    queryFn: async () => {
      if (searchQuery) {
        return getSearchedPostList({
          searchQuery,
          limit,
          skip,
        });
      }
      return getPostList({
        limit,
        skip,
        tag: selectedTag,
      });
    },
  });

  const totalPages = Math.ceil((postQuery.data?.total || 0) / limit);

  return {
    // 데이터
    data: postQuery.data?.postList || [],
    total: postQuery.data?.total || 0,

    // 검색
    searchQuery,
    setSearchQuery,

    // 페이지네이션
    page,
    limit,
    totalPages,
    setPage,
    setLimit,
    hasNextPage: page < totalPages,
    hasPrevPage: page > 1,

    // 필터
    selectedTag,
    sortBy,
    sortOrder,
    updateParams,

    // 상태
    isLoading: postQuery.isLoading,
    isError: postQuery.isError,
    error: postQuery.error,
  };
};
