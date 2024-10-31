import { create } from "zustand";

import { TagType } from "./tag-type";

interface TagListState {
  tagList: TagType[];
  setNewTagList: (_newTagList: TagType[]) => void;
}

export const tagListState = create<TagListState>(set => ({
  tagList: [],
  setNewTagList: newTagList => {
    set(() => ({ tagList: newTagList }));
  },
}));
