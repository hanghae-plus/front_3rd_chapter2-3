import { useEffect } from "react";

import { useQueryTagList } from "@/entities/tag/api/fetch-tag-list";
import { tagListState } from "@/entities/tag/model/tag-state";

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
