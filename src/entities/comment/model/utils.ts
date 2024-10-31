import { Comment } from "./types"

function addToComments(comments: Comment[], newComment: Comment) {
  return [...comments, { ...newComment, likes: 0 }]
}

function updateInComments(comments: Comment[], updatingComment: Comment) {
  return comments.map((comment) => (comment.id === updatingComment.id ? { ...comment, ...updatingComment } : comment))
}

function removeFromComments(comments: Comment[], commentId: number) {
  return comments.filter((comment) => comment.id !== commentId)
}

export function findInCommentsRecord(comments: Record<number, Comment[]>, postId: number, commentId: number) {
  return comments[postId].find(comment => comment.id === commentId)
}

export function addToCommentsRecord(comments: Record<number, Comment[]>, postId: number, newComment: Comment) {
  return {
    ...comments,
    [postId]: addToComments(comments[postId] || [], newComment)
  }
}

export function updateInCommentsMap(comments: Record<number, Comment[]>, postId: number, updatingComment: Comment) {
  return {
    ...comments,
    [postId]: updateInComments(comments[postId], updatingComment)
  }
}

export function removeFromCommentsRecord(comments: Record<number, Comment[]>, postId: number, commentId: number) {
  return {
    ...comments,
    [postId]: removeFromComments(comments[postId], commentId)
  }
}