import { useState } from "react"
import { Post } from "../../../entities/post/model/type"

export const usePost = () => {
  const [posts, setPosts] = useState<Post[]>([])
  const [showAddDialog, setShowAddDialog] = useState(false)
  const [showEditDialog, setShowEditDialog] = useState(false)
  //   const [showEditDialog, setShowEditDialog] = useAtom(showEditDialogAtom)
  //   const [total, setTotal] = useAtom(totalAtom)
  // 게시물 삭제
  const deletePost = async (id: number) => {
    try {
      await fetch(`/api/posts/${id}`, {
        method: "DELETE",
      })
      setPosts(posts.filter((post: Post) => post.id !== id))
    } catch (error) {
      console.error("게시물 삭제 오류:", error)
    }
  }

  return {
    posts,
    setPosts,
    deletePost,
    showAddDialog,
    setShowAddDialog,
    showEditDialog,
    setShowEditDialog,
  }
}
