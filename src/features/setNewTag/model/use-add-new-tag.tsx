import { useQueryTagList } from "@/entities/tag/api/fetch-tag";
import { tagListState } from "@/entities/tag/model/tag-state";
import { useEffect } from "react";

export function useAddNewTag() {
  const { setNewTagList } = tagListState();
  const { data: tagList } = useQueryTagList();

  useEffect(() => {
    if (tagList !== undefined) {
      setNewTagList(tagList);
    }
  }, []);
}
