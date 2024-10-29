interface UpdateURLParams {
  navigate: (path: string) => void // navigate 함수를 위한 타입 정의
  skip?: number
  limit?: number
  searchQuery?: string
  sortBy?: string
  sortOrder?: string
  selectedTag?: string
}

export const UpdateURL = ({ navigate, skip, limit, searchQuery, sortBy, sortOrder, selectedTag }: UpdateURLParams) => {
  const params = new URLSearchParams()

  // 모든 파라미터를 조건부로 설정
  if (skip) {
    params.set("skip", skip.toString())
  }
  if (limit) {
    params.set("limit", limit.toString())
  }
  if (searchQuery) {
    params.set("search", searchQuery)
  }
  if (sortBy) {
    params.set("sortBy", sortBy)
  }
  if (sortOrder) {
    params.set("sortOrder", sortOrder)
  }
  if (selectedTag) {
    params.set("tag", selectedTag)
  }

  // 빈 값 제거
  for (const [key, value] of params) {
    if (!value) {
      params.delete(key)
    }
  }

  navigate(`?${params.toString()}`)
}
