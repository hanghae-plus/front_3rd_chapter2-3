import { Post, PostWithUser, UpdatePostRequest } from "../../../entities/post"

export const updatePost = async (
  selectedPost: PostWithUser,
  setPosts: (posts: PostWithUser[]) => void,
  setShowEditDialog: (show: boolean) => void,
) => {
  if (!selectedPost) return

  const updateRequest: UpdatePostRequest = {
    id: selectedPost.id,
    title: selectedPost.title,
    body: selectedPost.body,
  }

  try {
    const response = await fetch(`/api/posts/${selectedPost.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updateRequest),
    })
    const data: Post = await response.json()
    setPosts(posts.map((post) => (post.id === data.id ? { ...post, ...data } : post)))
    setShowEditDialog(false)
  } catch (error) {
    console.error("게시물 업데이트 오류:", error)
  }
}
