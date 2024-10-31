import { Comments, NewComment } from "../model/Comments"

const fetchComments = async (postId: number) => {
  const response = await fetch(`/api/comments/post/${postId}`)
  return await response.json()
}

const addComment = async (newComment: NewComment) => {
  const response = await fetch("/api/comments/add", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newComment),
  })

  if (!response.ok) {
    throw new Error("Failed to add Comment")
  }

  return response.status !== 204 ? await response.json() : null
}

const updateComment = async (selectedComment: Comments) => {
  const response = await fetch(`/api/comments/${selectedComment?.id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ body: selectedComment?.body }),
  })

  if (!response.ok) {
    throw new Error("Failed to update Comment")
  }

  return response.status !== 204 ? await response.json() : null
}

const deleteComment = async (id: number) => {
  const response = await fetch(`/api/comments/${id}`, {
    method: "DELETE",
  })

  if (!response.ok) {
    throw new Error("Failed to delete Comment")
  }

  return response.status !== 204 ? await response.json() : null
}

const likeComment = async (id: number, updateLikes: number) => {
  const response = await fetch(`/api/comments/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ likes: updateLikes }),
  })

  if (!response.ok) {
    throw new Error("Failed to update like count")
  }

  return response.status !== 204 ? await response.json() : null
}

export { fetchComments, addComment, updateComment, deleteComment, likeComment }
