export const fetchPosts = async (limit: number, skip: number) => {
  const response = await fetch(`/api/posts?limit=${limit}&skip=${skip}`)
  const postsData = await response.json()
  const usersResponse = await fetch("/api/users?limit=0&select=username,image")
  const usersData = await usersResponse.json()

  return postsData.posts.map((post: any) => ({
    ...post,
    author: usersData.users.find((user: any) => user.id === post.userId),
  }))
}

export const addPost = async (newPost: { title: string; body: string; userId: number }) => {
  const response = await fetch("/api/posts/add", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newPost),
  })
  return response.json()
}

export const updatePost = async (postId: number, updatedPost: { title: string; body: string }) => {
  const response = await fetch(`/api/posts/${postId}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(updatedPost),
  })
  return response.json()
}

export const deletePost = async (postId: number) => {
  await fetch(`/api/posts/${postId}`, { method: "DELETE" })
}
