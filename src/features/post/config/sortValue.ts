interface SelectOption {
  id: number
  value: string
  label: string
}

export const sortValue = {
  initial: {
    by: "none" as const,
    order: "asc" as const
  },
  options: {
    by: [
      { id: -1, value: "none", label: "없음" },
      { id: 0, value: "id", label: "ID" },
      { id: 1, value: "title", label: "제목" },
      { id: 2, value: "reactions", label: "반응" },
    ] satisfies SelectOption[],
    order: [
      { id: 0, value: "asc", label: "오름차순" },
      { id: 1, value: "desc", label: "내림차순" },
    ] satisfies SelectOption[]
  }
}

export type SortBy = typeof sortValue.options.by[number]['value']
export type SortOrder = typeof sortValue.options.order[number]['value'] 