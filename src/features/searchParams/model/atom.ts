import { SearchParams, SearchParamScale } from "@features/searchParams/types"
import { atom } from "jotai"

export const searchParamsAtom = atom<SearchParams>((get) => ({
  skip: get(searchScaleAtom).skip,
  limit: get(searchScaleAtom).limit,
  sortBy: get(searchSortByAtom),
  sortOrder: get(searchSortOrderAtom),
  q: get(searchTextAtom),
  selectedTag: get(searchTagAtom),
}))

export const searchScaleAtom = atom<SearchParamScale>({
  skip: 0,
  limit: 10,
})

export const searchSortByAtom = atom<string>("")

export const searchSortOrderAtom = atom<string>("asc")

export const searchTextAtom = atom<string>("")

export const searchTagAtom = atom<string>("")
