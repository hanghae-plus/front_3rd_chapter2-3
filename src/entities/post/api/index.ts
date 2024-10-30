import { Post } from "../model/types"

export interface NewPost {
  title: string
  body: string
  userId: number
}

export const postPostFetch = async (newPost: NewPost) => {
  try {
    const response = await fetch("/api/posts/add", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newPost),
    })
    return await response.json()
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message)
    }
    throw new Error("Unknown error occurred")
  }
}

export const fetchPostsFetch = async (limit: number, skip: number) => {
  try {
    const response = await fetch(`/api/posts?limit=${limit}&skip=${skip}`)
    return await response.json()
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message)
    }
    throw new Error("Unknown error occurred")
  }
}

export const deletePostFetch = async (id: number) => {
  try {
    await fetch(`/api/posts/${id}`, {
      method: "DELETE",
    })
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message)
    }
    throw new Error("Unknown error occurred")
  }
}

export const fetchPostsByTagFetch = async (tag: string) => {
  try {
    const response = await fetch(`/api/posts/tag/${tag}`)
    return await response.json()
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message)
    }
    throw new Error("Unknown error occurred")
  }
}

export const fetchTagsFetch = async () => {
  try {
    const response = await fetch(`/api/posts/tags`)
    return await response.json()
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message)
    }
    throw new Error("Unknown error occurred")
  }
}

export const fetchPostsBySearchFetch = async (searchQuery: string) => {
  try {
    const response = await fetch(`/api/posts/search?q=${searchQuery}`)
    return await response.json()
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message)
    }
    throw new Error("Unknown error occurred")
  }
}

export const putPostFetch = async (post: Post) => {
  try {
    const response = await fetch(`/api/posts/${post.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(post),
    })
    return await response.json()
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message)
    }
    throw new Error("Unknown error occurred")
  }
}
