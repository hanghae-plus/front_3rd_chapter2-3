import { useQuery } from "@tanstack/react-query"
import { Tag } from "../../model"

const fetchTags = async (): Promise<Tag[]> => {
  const response = await fetch("/api/posts/tags")
  const data = await response.json()

  return data
}

export const useTags = () => {
  return useQuery({
    queryKey: ["tags"],
    queryFn: () => fetchTags(),
    initialData: [],
  })
}
