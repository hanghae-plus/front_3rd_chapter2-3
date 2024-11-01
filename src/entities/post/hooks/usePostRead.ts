import { searchParamsAtom } from "@features/searchParams/model/atom"
import { useQuery } from "@tanstack/react-query"
import { readPostApi } from "@entities/post/api"
import { Post } from "@entities/post/types"
import { useAtomValue } from "jotai"

// 게시글과 사용자 데이터를 결합하여 반환하는 커스텀 훅
export const usePostRead = () => {
  const searchParams = useAtomValue(searchParamsAtom)

  // posts 데이터를 가져옴
  const {
    data: postData,
    isLoading: isPostsLoading,
    error: postsError,
  } = useQuery<{ total: number; posts: Post[] }>({
    queryKey: ["posts", searchParams],
    queryFn: () => readPostApi(searchParams),
    refetchInterval: 1000 * 60,
  })

  // posts 로딩 중이면 중지
  if (isPostsLoading)
    return {
      postData: { total: 0, posts: [] },
      isPostsLoading: true,
      error: postsError,
    }

  return {
    postData: postData ?? { total: 0, posts: [] },
    isPostsLoading: false,
    error: null,
  }
}
