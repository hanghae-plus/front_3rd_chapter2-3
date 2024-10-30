import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";

import { updateState } from "@/shared/model";
import { useUpdateParams } from "./use-update-params";
import { useSearchPostList } from "./use-search-post-list";
import { SearchQueryType } from "./search-query-type";

export const useSearchQuery = () => {
  const params = useParams();
  const [searchQuery, setSearchQuery] = useState<SearchQueryType>({
    skip: params.skip || "0",
    limit: params.limit || "10",
    keyword: params.keyword || "",
    sortBy: params.sortBy || "",
    sortOrder: params.sortOrder || "asc",
    tag: params.tag || "",
  });
  const prevKeywordRef = useRef(searchQuery.keyword);

  const { searchPostList } = useSearchPostList();
  const { updateParams } = useUpdateParams();

  function handleChangeQuery<K extends keyof SearchQueryType>(key: K, value: SearchQueryType[K]) {
    setSearchQuery(prev => updateState(prev, key, value));
  }

  function handleSearchPostList(key: string) {
    if (key !== "Enter") {
      return;
    }

    updateParams(searchQuery);
    searchPostList();
  }

  useEffect(() => {
    if (prevKeywordRef.current === searchQuery.keyword) {
      updateParams(searchQuery);
    } else {
      prevKeywordRef.current = searchQuery.keyword;
    }
  }, [searchQuery]);

  return { searchQuery, handleChangeQuery, handleSearchPostList };
};
