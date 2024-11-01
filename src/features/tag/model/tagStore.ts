import { create } from "zustand"

type TagStore = {
  selectedTag: string
  setSelectedTag: (tag: string) => void
}

export const useTagStore = create<TagStore>((set) => ({
  selectedTag: "all",
  setSelectedTag: (tag) => set({ selectedTag: tag }),
}))
