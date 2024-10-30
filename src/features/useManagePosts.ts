import { useAtom } from "jotai"
import { newPostAtom, selectedPostAtom, showAddDialogAtom, showEditDialogAtom } from "../app/atom"
import usePosts from "./usePosts"

const useManagePosts = () => {
  const { setPosts } = usePosts()
  const [showAddDialog, setShowAddDialog] = useAtom(showAddDialogAtom)
  const [newPost, setNewPost] = useAtom(newPostAtom)
  const [selectedPost] = useAtom(selectedPostAtom)
  const [, setShowEditDialog] = useAtom(showEditDialogAtom)

  const addPost = async () => {
    try {
      const response = await fetch("/api/posts/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newPost),
      })
      const data = await response.json()
      setPosts((prev) => [data, ...prev])
      setShowAddDialog(false)
    } catch (error) {
      console.error("게시물 추가 오류:", error)
    }
  }

  const updatePost = async () => {
    if (!selectedPost) return

    try {
      const response = await fetch(`/api/posts/${selectedPost.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(selectedPost),
      })
      const data = await response.json()
      setPosts((prev) => prev.map((post) => (post.id === data.id ? data : post)))
      setShowEditDialog(false)
    } catch (error) {
      console.error("게시물 업데이트 오류:", error)
    }
  }

  const deletePost = async (id: number) => {
    try {
      await fetch(`/api/posts/${id}`, {
        method: "DELETE",
      })
      setPosts((prev) => prev.filter((post) => post.id !== id))
    } catch (error) {
      console.error("게시물 삭제 오류:", error)
    }
  }

  return { addPost, updatePost, deletePost, showAddDialog, setShowAddDialog, newPost, setNewPost }
}

export default useManagePosts
