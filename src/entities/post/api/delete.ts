export const deletePost = async (id: number): Promise<void> => {
  try {
    await fetch(`/api/posts/${id}`, {
      method: "DELETE",
    })
    setPosts(posts.filter((post) => post.id !== id))
  } catch (error) {
    console.error("게시물 삭제 오류:", error)
  }
}
