import { useState } from "react";
import { useParams } from "react-router-dom";

import { updateState } from "@/shared/model";
import { useUpdateParams } from "./use-update-params";
import { useSearchPostList } from "./use-search-post-list";
import { SearchQueryType } from "./search-query-type";

export const useSearchQuery = () => {
  const params = useParams();
  const [searchQuery, setSearchQuery] = useState<SearchQueryType>({
    skip: params.skip || "",
    limit: params.limit || "",
    keyword: params.keyword || "",
    sortBy: params.sortBy || "",
    sortOrder: params.sortOrder || "",
    tag: params.tag || "",
  });
  const { searchPostList } = useSearchPostList();
  const { updateParams } = useUpdateParams();

  const handleChangeQuery = <K extends keyof SearchQueryType>(
    key: K,
    value: SearchQueryType[K],
  ) => {
    setSearchQuery(prev => updateState(prev, key, value));
  };

  function handleSearchPostList(key: string) {
    if (key !== "Enter") {
      return;
    }

    updateParams(searchQuery);
    searchPostList();
  }

  return { searchQuery, handleChangeQuery, handleSearchPostList };
};
