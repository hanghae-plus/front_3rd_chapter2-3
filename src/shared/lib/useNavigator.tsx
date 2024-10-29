import { useCallback, useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export type UpdatableQueryKey = "skip" | "limit" | "search" | "sortBy" | "sortOrder" | "tag";

const controlQueryParams = (key: UpdatableQueryKey, value: string | number, params: URLSearchParams) => {
  if (!value || (key === "skip" && value === "0") || (key === "limit" && value === "10") || key === "search") {
    params.delete(key);
  } else {
    params.set(key, value.toString());
  }
};

export const useNavigator = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  const [skip, setSkip] = useState(parseInt(queryParams.get("skip") || "0"));
  const [limit, setLimit] = useState(parseInt(queryParams.get("limit") || "10"));
  const [searchQuery, setSearchQuery] = useState(queryParams.get("search") || "");
  const [sortBy, setSortBy] = useState(queryParams.get("sortBy") || "");
  const [sortOrder, setSortOrder] = useState(queryParams.get("sortOrder") || "asc");
  const [selectedTag, setSelectedTag] = useState(queryParams.get("tag") || "");

  const setQueryParams = (key: UpdatableQueryKey, value: string | number) => {
    switch (key) {
      case "skip":
        setSkip(parseInt(value.toString()));
        break;
      case "limit":
        setLimit(parseInt(value.toString()));
        break;
      case "search":
        setSearchQuery(value as string);
        break;
      case "sortBy":
        setSortBy(value as string);
        break;
      case "sortOrder":
        setSortOrder(value as string);
        break;
      case "tag":
        setSelectedTag(value as string);
        break;
    }
  };

  const handleUpdateQuery = useCallback(
    (key: UpdatableQueryKey, value: string | number) => {
      const params = new URLSearchParams(location.search);
      // 파라미터 제어
      controlQueryParams(key, value, params);
      // 상태 업데이트
      setQueryParams(key, value);
      // URL 업데이트
      navigate(`?${params.toString()}`);
    },
    [navigate, location.search, setQueryParams],
  );

  const queries = useMemo(
    () => ({
      skip,
      limit,
      search: searchQuery,
      sortBy,
      sortOrder,
      tag: selectedTag,
    }),
    [skip, limit, searchQuery, sortBy, sortOrder, selectedTag],
  );

  const initializeQueries = useCallback(() => {
    const params = new URLSearchParams(location.search);
    setSkip(parseInt(params.get("skip") || "0"));
    setLimit(parseInt(params.get("limit") || "10"));
    setSearchQuery(params.get("search") || "");
    setSortBy(params.get("sortBy") || "");
    setSortOrder(params.get("sortOrder") || "asc");
    setSelectedTag(params.get("tag") || "");
  }, [location.search]);

  useEffect(() => {
    initializeQueries();
  }, [initializeQueries]);

  return { queries, handleUpdateQuery };
};
