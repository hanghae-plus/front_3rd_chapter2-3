import { searchParamsAtom } from "@features/filter/model"
import { useQuery } from "@tanstack/react-query"
import { readPostApi } from "@entities/post/api"
import { PostResponse } from "@entities/post/model"
import { useAtomValue } from "jotai"

const DEFAULT_QUERY_RESULT: PostResponse = {
  total: 0,
  posts: [],
  limit: 10,
  skip: 0,
}

export const useQueryPostList = () => {
  const searchParams = useAtomValue(searchParamsAtom)

  const {
    data: posts,
    isLoading,
    error,
  } = useQuery<PostResponse>({
    queryKey: ["posts", searchParams],
    queryFn: () => readPostApi(searchParams),
    refetchInterval: 1000 * 60,
    initialData: DEFAULT_QUERY_RESULT,
  })

  return {
    posts,
    isLoading,
    error,
  }
} 