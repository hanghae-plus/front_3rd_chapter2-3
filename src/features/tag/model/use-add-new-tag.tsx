import { useEffect } from "react";

import { tagListState } from "@/entities/tag/model/tag-state";
import { useQueryTagList } from "../api/use-query-tag-list";

export function useAddNewTag() {
  const { setNewTagList } = tagListState();
  const { refetch } = useQueryTagList();

  const searchTagList = async () => {
    const tagList = await refetch();
    setNewTagList(tagList.data ?? []);
  };

  useEffect(() => {
    searchTagList();
  }, []);
}
