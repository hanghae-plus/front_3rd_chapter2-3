import { create } from "zustand";

type SearchFilterState = {
  sortBy: string;
  sortOrder: "asc" | "desc";
  limit: number;
  skip: number;
  searchQuery: string;
  selectedTag: string;
};

type SearchFilterAction = {
  setSortBy: (sortBy: string) => void;
  setSortOrder: (sortOrder: "asc" | "desc") => void;
  setLimit: (limit: number) => void;
  setSkip: (skip: number) => void;
  setSearchQuery: (query: string) => void;
  setSelectedTag: (tag: string) => void;
  updateURL: (navigate: (path: string) => void) => void;
};

export const useSearchFilterStore = create<SearchFilterState & SearchFilterAction>((set, get) => ({
  sortBy: "",
  sortOrder: "asc",
  limit: 10,
  skip: 0,
  searchQuery: "",
  selectedTag: "",

  setSortBy: (sortBy) => set({ sortBy }),
  setSortOrder: (sortOrder) => set({ sortOrder }),
  setLimit: (limit) => set({ limit }),
  setSkip: (skip) => set({ skip }),
  setSearchQuery: (searchQuery) => set({ searchQuery }),
  setSelectedTag: (selectedTag) => set({ selectedTag }),

  updateURL: (navigate) => {
    const state = get();
    const params = new URLSearchParams();

    if (state.skip) params.set("skip", state.skip.toString());
    if (state.limit) params.set("limit", state.limit.toString());
    if (state.searchQuery) params.set("search", state.searchQuery);
    if (state.sortBy) params.set("sortBy", state.sortBy);
    if (state.sortOrder) params.set("sortOrder", state.sortOrder);
    if (state.selectedTag) params.set("tag", state.selectedTag);

    navigate(`?${params.toString()}`);
  },
}));
