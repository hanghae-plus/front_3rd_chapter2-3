import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export interface QueryParams {
  skip: number;
  limit: number;
  searchQuery: string;
  sortBy: string;
  sortOrder: string;
  selectedTag: string;
}

export const useQueryParams = () => {
  const navigate = useNavigate();

  const [queryParams, setQueryParamsState] = useState<QueryParams>({
    skip: parseInt(new URLSearchParams(window.location.search).get("skip") || "0"),
    limit: parseInt(new URLSearchParams(window.location.search).get("limit") || "10"),
    searchQuery: new URLSearchParams(window.location.search).get("search") || "",
    sortBy: new URLSearchParams(window.location.search).get("sortBy") || "",
    sortOrder: new URLSearchParams(window.location.search).get("sortOrder") || "asc",
    selectedTag: new URLSearchParams(window.location.search).get("tag") || "",
  });

  const setQueryParams = (newParams: Partial<QueryParams>) => {
``    const updatedParams = { ...queryParams, ...newParams };
    setQueryParamsState(updatedParams);

    const searchParams = new URLSearchParams();
    if (updatedParams.skip) searchParams.set("skip", updatedParams.skip.toString());
    if (updatedParams.limit) searchParams.set("limit", updatedParams.limit.toString());
    if (updatedParams.searchQuery) searchParams.set("search", updatedParams.searchQuery);
    if (updatedParams.sortBy) searchParams.set("sortBy", updatedParams.sortBy);
    if (updatedParams.sortOrder) searchParams.set("sortOrder", updatedParams.sortOrder);
    if (updatedParams.selectedTag) searchParams.set("tag", updatedParams.selectedTag);

    navigate(`?${searchParams.toString()}`);
  };

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    setQueryParamsState({
      skip: parseInt(params.get("skip") || "0"),
      limit: parseInt(params.get("limit") || "10"),
      searchQuery: params.get("search") || "",
      sortBy: params.get("sortBy") || "",
      sortOrder: params.get("sortOrder") || "asc",
      selectedTag: params.get("tag") || "",
    });
  }, [location.search]);

  return { queryParams, setQueryParams };
};
