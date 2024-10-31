import { selectedPostsAtom } from "@features/post/model"
import { useCallback, useMemo } from "react"
import { Post } from "@entities/post/model"
import { useAtom } from "jotai"

export const useSelectedPost = () => {
  const [selectedPost, setSelectedPost] = useAtom<Post>(selectedPostsAtom)

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
