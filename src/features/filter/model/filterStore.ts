import { atom } from "jotai"
import { initialSearchParams } from "@features/filter/config/initialValues"

export interface SearchParams {
  skip: number
  limit: number
  sortBy: string
  sortOrder: string
  searchQuery: string
  selectedTag: string
}

export const searchParamsAtom = atom<SearchParams>(initialSearchParams) 