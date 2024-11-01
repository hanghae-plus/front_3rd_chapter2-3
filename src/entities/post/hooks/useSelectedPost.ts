import { selectedPostsAtom } from "@entities/post/model/atom"
import { useCallback, useMemo } from "react"
import { Post } from "@entities/post/types"
import { useAtom } from "jotai"

export const useSelectedPost = () => {
  const [selectedPost, setSelectedPost] = useAtom<Post>(selectedPostsAtom)

  // 포스트 선택
  const updateSelectedPost = useCallback(
    (post: Post) => {
      setSelectedPost(post)
    },
    [selectedPost],
  )

  return {
    selectedPost: useMemo(() => selectedPost, [selectedPost]),
    updateSelectedPost,
  }
}
