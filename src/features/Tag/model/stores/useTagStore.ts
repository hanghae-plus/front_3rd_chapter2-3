import { create } from "zustand"
import { Tag } from "../../../../entities/Tag/model/types"

interface TagState {
  tags: Tag[]
  setTags: (tags: Tag[]) => void
}

export const useTagStore = create<TagState>((set) => ({
  tags: [],
  setTags: (tags) => set({ tags }),
}))
