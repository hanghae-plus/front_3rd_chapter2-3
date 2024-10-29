export const addPost = async () => {
  try {
    const response = await fetch("/api/posts/add", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newPost),
    })
    const data = await response.json()
    setPosts([data, ...posts])
    setShowAddDialog(false)
    setNewPost({ title: "", body: "", userId: 1 })
  } catch (error) {
    console.error("게시물 추가 오류:", error)
  }
}
