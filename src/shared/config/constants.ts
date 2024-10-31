
type TableHeader = {
  id: string
  label: string
  width?: string
}

export const TABLE_HEADERS: TableHeader[] = [
  { id: "id", label: "ID", width: "w-[50px]" },
  { id: "title", label: "제목" },
  { id: "author", label: "작성자", width: "w-[150px]" },
  { id: "reactions", label: "반응", width: "w-[150px]" },
  { id: "actions", label: "작업", width: "w-[150px]" },
]
