const fetchComments = (postId: number) => `/api/comments/post/${postId}`
const addComment = "/api/comments/add"
const updateComment = (id: number) => `/api/comments/${id}`
const deleteComment = (id: number) => `/api/comments/${id}`
const likeComment = (id: number) => `/api/comments/${id}`

export { fetchComments, addComment, updateComment, deleteComment, likeComment }
