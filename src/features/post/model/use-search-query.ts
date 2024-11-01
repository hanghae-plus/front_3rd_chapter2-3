import { useNavigate, useSearchParams } from "react-router-dom";

import { SearchQueryType } from "./search-query-type";
import { useSearchPostList } from "./use-search-post-list";

export const useSearchQuery = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { searchPostList } = useSearchPostList();

  const initialQuery = {
    skip: "0",
    limit: "10",
    keyword: "",
    sortBy: "",
    sortOrder: "asc",
    tag: "",
  };

  const searchQuery: SearchQueryType = {
    ...initialQuery,
    ...Object.fromEntries([...searchParams.entries()]),
  };

  function updateParams(searchQuery: SearchQueryType) {
    const params = Object.entries(searchQuery)
      .filter(([, value]) => value !== "")
      .map(([key, value]) => `${key}=${value}`)
      .join("&");

    navigate("?" + params, { replace: true });
  }

  const handleChangeQuery = <K extends keyof SearchQueryType>(
    key: K,
    value: SearchQueryType[K],
  ) => {
    searchQuery[key] = value;
    updateParams(searchQuery);

    if (key !== "keyword") {
      searchPostList();
    }
  };

  const handleSearchPostList = (key: string) => {
    if (key !== "Enter") {
      return;
    }
    searchPostList();
  };

  return { searchQuery, handleChangeQuery, handleSearchPostList };
};
