export interface IPost {
  id?: number
  userId: number
  title: string
  body: string
  tags: string[]
  reactions?: IReactions
  views?: number
  author?: string
}

export interface IReactions {
  likes: number
  dislikes: number
}

export interface IPostQueryResponse {
  limit: number
  posts: IPost[]
  skip: number
  total: number
}

// Read default Posts
export const fetchPostsDefaultApi = async (limit: number, skip: number): Promise<IPostQueryResponse> => {
  const response = await fetch(`/api/posts?limit=${limit}&skip=${skip}`)
  return response.json()
}

// Read search Posts
export const fetchPostsSearchApi = async (searchQuery: string): Promise<IPostQueryResponse> => {
  const response = await fetch(`/api/posts/search?q=${searchQuery}`)
  return response.json()
}

// Read tag Posts
export const fetchPostsTagApi = async (tag: string): Promise<IPostQueryResponse> => {
  const response = await fetch(`/api/posts/tag/${tag}`)
  return response.json()
}

// Create Post
export const createPostApi = async (newPost: IPost): Promise<IPost> => {
  const response = await fetch("/api/posts/add", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newPost),
  })
  return response.json()
}

// Update Post
export const updatePostApi = async (post: IPost): Promise<IPost> => {
  const response = await fetch(`/api/posts/${post.id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(post),
  })
  return response.json()
}

// Delete Post
export const deletePostApi = async (postId: number): Promise<IPost> => {
  const response = await fetch(`/api/posts/${postId}`, {
    method: "DELETE",
  })
  return response.json()
}
