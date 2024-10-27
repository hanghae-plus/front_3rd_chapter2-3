import { useCallback, useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export type UpdatableQueryKey = "skip" | "limit" | "search" | "sortBy" | "sortOrder" | "tag";

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

  const handleUpdateQuery = useCallback(
    (key: UpdatableQueryKey, value: string | number) => {
      const params = new URLSearchParams(queryParams);
      switch (key) {
        case "skip":
          params.set("skip", value.toString());
          setSkip(parseInt(value.toString()));
          break;
        case "limit":
          params.set("limit", value.toString());
          setLimit(parseInt(value.toString()));
          break;
        case "search":
          params.set("search", value as string);
          setSearchQuery(value as string);
          break;
        case "sortBy":
          params.set("sortBy", value as string);
          setSortBy(value as string);
          break;
        case "sortOrder":
          params.set("sortOrder", value as string);
          setSortOrder(value as string);
          break;
        case "tag":
          params.set("tag", value as string);
          setSelectedTag(value as string);
          break;
        default:
          break;
      }
      navigate(`?${params.toString()}`);
    },
    [navigate, queryParams],
  );

  const updateURL = () => {
    const params = new URLSearchParams();
    if (skip) params.set("skip", skip.toString());
    if (limit) params.set("limit", limit.toString());
    if (searchQuery) params.set("search", searchQuery);
    if (sortBy) params.set("sortBy", sortBy);
    if (sortOrder) params.set("sortOrder", sortOrder);
    if (selectedTag) params.set("tag", selectedTag);
    navigate(`?${params.toString()}`);
  };

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

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    setSkip(parseInt(params.get("skip") || "0"));
    setLimit(parseInt(params.get("limit") || "10"));
    setSearchQuery(params.get("search") || "");
    setSortBy(params.get("sortBy") || "");
    setSortOrder(params.get("sortOrder") || "asc");
    setSelectedTag(params.get("tag") || "");
  }, [location.search]);

  return { updateURL, queries, handleUpdateQuery };
};
