import { useEffect } from "react";
import { useAtom } from "jotai";
import { useNavigate } from "react-router-dom";
import { queryParamsAtom, setQueryParamsAtom } from "./usePost.ts";

export interface QueryParams {
  skip: number;
  limit: number;
  searchQuery: string;
  sortBy: string;
  sortOrder: string;
  selectedTag: string;
}

export const useQueryParams = () => {
  const [queryParams] = useAtom(queryParamsAtom);
  const [, updateQueryParams] = useAtom(setQueryParamsAtom);
  const navigate = useNavigate();

  useEffect(() => {
    const searchParams = new URLSearchParams();
    if (queryParams.skip) searchParams.set("skip", queryParams.skip.toString());
    if (queryParams.limit) searchParams.set("limit", queryParams.limit.toString());
    if (queryParams.searchQuery) searchParams.set("search", queryParams.searchQuery);
    if (queryParams.sortBy) searchParams.set("sortBy", queryParams.sortBy);
    if (queryParams.sortOrder) searchParams.set("sortOrder", queryParams.sortOrder);
    if (queryParams.selectedTag) searchParams.set("tag", queryParams.selectedTag);

    navigate(`?${searchParams.toString()}`);
  }, [navigate, queryParams.skip, queryParams.limit]);

  return { queryParams, setQueryParams: updateQueryParams };
};
