// model
export type { Comment } from "./model/types"
// api
export { fetchComments, putComment, deleteComment, createComment } from "./api/comment"
export { queryKeys } from "./api/comment.query"
export { mutateKeys } from "./api/comment.mutate"
export type { ResponseFetchComments } from "./api/types"
