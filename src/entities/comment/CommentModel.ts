export interface CommentModel {
  id: string
  content: string
  author: string
  postId: string // 어떤 포스트에 대한 댓글인지
  createdAt: Date
}
