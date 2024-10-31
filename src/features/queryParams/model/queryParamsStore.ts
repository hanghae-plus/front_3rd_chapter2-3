import { atom } from "jotai"
import { useAtom } from "jotai"

export interface IQueryParams {
  skip: number
  limit: number
  searchQuery: string
  sortBy: TSortBy
  sortOrder: TSortOrder
  selectedTag: string
}

export type TSortBy = "none" | "id" | "title" | "reactions"

export type TSortOrder = "asc" | "desc"

const initialQueryParams: IQueryParams = {
  skip: 0,
  limit: 10,
  searchQuery: "",
  sortBy: "none",
  sortOrder: "asc",
  selectedTag: "",
}

const queryParamsAtom = atom(initialQueryParams)

export const useQueryParamsStore = () => {
  const [queryParams, setQueryParams] = useAtom<IQueryParams>(queryParamsAtom)

  const parseParamsToObj = (params: URLSearchParams): IQueryParams => {
    return {
      skip: parseInt(params.get("skip") || "0"),
      limit: parseInt(params.get("limit") || "10"),
      searchQuery: params.get("search") || "",
      sortBy: params.get("sortBy") || "",
      sortOrder: params.get("sortOrder") || "asc",
      selectedTag: params.get("tag") || "",
    } as IQueryParams
  }

  return { queryParams, setQueryParams, parseParamsToObj }
}
