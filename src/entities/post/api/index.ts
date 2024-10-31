export async function getPosts(limit: number, skip: number) {
  const response = await fetch(`/api/posts?limit=${limit}&skip=${skip}`)
  return await response.json()
}

export async function deletePost(postId: number) {
  await fetch(`/api/posts/${postId}`, {
    method: "DELETE",
  })
  return postId
}
