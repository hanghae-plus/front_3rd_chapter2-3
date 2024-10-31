import { NewComment } from "../model/types"

export const fetchCommentsFetch = async (postId: number) => {
  try {
    const response = await fetch(`/api/comments/post/${postId}`)
    return await response.json()
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message)
    }
    throw new Error("Unknown error occurred")
  }
}

export const postCommentFetch = async (newComment: NewComment) => {
  try {
    const response = await fetch("/api/comments/add", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newComment),
    })
    return await response.json()
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message)
    }
    throw new Error("Unknown error occurred")
  }
}

export const deleteCommentFetch = async (id: number) => {
  try {
    await fetch(`/api/comments/${id}`, {
      method: "DELETE",
    })
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message)
    }
    throw new Error("Unknown error occurred")
  }
}

export const patchCommentFetch = async (id: number, likes: number) => {
  try {
    const response = await fetch(`/api/comments/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ likes }),
    })
    return await response.json()
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message)
    }
    throw new Error("Unknown error occurred")
  }
}

export const putCommentFetch = async (id: number, body: string) => {
  try {
    const response = await fetch(`/api/comments/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ body }),
    })
    return await response.json()
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message)
    }
    throw new Error("Unknown error occurred")
  }
}
