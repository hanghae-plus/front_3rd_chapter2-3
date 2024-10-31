import { Post } from "../../../entities/post/model/types"
import { atom, useAtom } from "jotai"

const selectedPostAtom = atom<Post | null>(null)

const showPostDetailDialogAtom = atom(false)

export const usePostsStore = () => {
  const [selectedPost, setSelectedPost] = useAtom<Post | null>(selectedPostAtom)
  const [showPostDetailDialog, setShowPostDetailDialog] = useAtom(showPostDetailDialogAtom)

  const openPostDetail = (post: Post) => {
    setSelectedPost(post)
    setShowPostDetailDialog(true)
  }

  return {
    selectedPost,
    setSelectedPost,

    showPostDetailDialog,
    setShowPostDetailDialog,
    openPostDetail,
  }
}
