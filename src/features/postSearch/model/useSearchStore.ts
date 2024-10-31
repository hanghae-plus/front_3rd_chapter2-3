import { create } from "zustand"
import { PostSearchParams, SearchStore } from "./searchTypes"

export const useSearchStore = create<SearchStore>((set) => ({
  skip: 0,
  limit: 10,
  search: "",
  sortBy: "",
  sortOrder: "asc",
  tag: "",
  tags: [],

  setSearch: (search) => set({ search, skip: 0 }),
  setTag: (tag) => set({ tag, skip: 0 }),
  setSortBy: (sortBy) => set({ sortBy }),
  setSortOrder: (order) => set({ sortOrder: order }),
  setSkip: (skip) => set({ skip }),
  setLimit: (limit) => set({ limit, skip: 0 }),

  updateSearchParams: (params) => {
    set((state) => ({ ...state, ...params }))
    const searchParams = new URLSearchParams(window.location.search)

    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== "") {
        searchParams.set(key, String(value))
      } else {
        searchParams.delete(key)
      }
    })

    const newUrl = `${window.location.pathname}${searchParams.toString() ? `?${searchParams.toString()}` : ""}`
    window.history.pushState({}, "", newUrl)
  },

  syncWithUrl: () => {
    const params = new URLSearchParams(window.location.search)
    const urlParams: Partial<PostSearchParams> = {}

    // URL 파라미터를 적절한 타입으로 변환하여 상태에 동기화
    if (params.has("skip")) {
      urlParams.skip = parseInt(params.get("skip")!, 10)
    }
    if (params.has("limit")) {
      urlParams.limit = parseInt(params.get("limit")!, 10)
    }
    if (params.has("search")) {
      urlParams.search = params.get("search")!
    }
    if (params.has("sortBy")) {
      urlParams.sortBy = params.get("sortBy")!
    }
    if (params.has("sortOrder")) {
      const order = params.get("sortOrder")!
      urlParams.sortOrder = order === "desc" ? "desc" : "asc"
    }
    if (params.has("tag")) {
      urlParams.tag = params.get("tag")!
    }

    set((state) => ({ ...state, ...urlParams }))
  },
}))
