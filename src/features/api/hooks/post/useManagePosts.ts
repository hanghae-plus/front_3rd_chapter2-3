import { useAtom } from "jotai"
import { newPostAtom, selectedPostAtom, showAddDialogAtom, showEditDialogAtom } from "../../../../app/atom"
import usePosts from "./usePosts"
import { useMutation } from "@tanstack/react-query"

export const useAddPost = () => {
  const { setPosts } = usePosts()
  const [newPost] = useAtom(newPostAtom)
  const [, setShowAddDialog] = useAtom(showAddDialogAtom)

  return useMutation({
    mutationKey: ["addPost"],
    mutationFn: async () => {
      const response = await fetch("/api/posts/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newPost),
      })
      if (!response.ok) {
        throw new Error("Network response was not ok")
      }

      const data = await response.json()
      return data
    },
    onSuccess: (data) => {
      setPosts((prev) => [data, ...prev])
      setShowAddDialog(false)
    },
    onError: (error) => {
      console.error("게시물 추가 오류:", error) // Handle error if needed
    },
  })
}

export const useUpdatePost = () => {
  const [selectedPost] = useAtom(selectedPostAtom)
  const [, setShowEditDialog] = useAtom(showEditDialogAtom)
  const { setPosts } = usePosts()

  return useMutation({
    mutationKey: ["updatePost"],
    mutationFn: async () => {
      if (!selectedPost) return

      const response = await fetch(`/api/posts/${selectedPost.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(selectedPost),
      })
      const data = await response.json()
      return data
    },
    onSuccess: (data) => {
      setPosts((prev) => prev.map((post) => (post.id === data.id ? data : post)))
      setShowEditDialog(false)
    },
    onError: (error) => {
      console.error("게시물 업데이트 오류:", error)
    },
  })
}

export const useDeletePost = () => {
  const { setPosts } = usePosts()

  return useMutation({
    mutationKey: ["deletePost"],
    mutationFn: async (id: number) => {
      const response = await fetch(`/api/posts/${id}`, {
        method: "DELETE",
      })
      if (!response.ok) throw new Error("게시물 삭제 오류")
      return id // 삭제된 게시물의 ID를 반환
    },
    onSuccess: (variables) => {
      const id = variables // variables에서 ID를 추출
      setPosts((prev) => prev.filter((post) => post.id !== id))
    },
    onError: (error) => {
      console.error("게시물 삭제 오류:", error)
    },
  })
}
