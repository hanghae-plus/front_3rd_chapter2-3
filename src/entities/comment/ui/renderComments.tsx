import { useEffect } from "react"
import CommentAddButton from "../../../features/comment-management/ui/CommentAddButton"
import CommentDeleteButton from "../../../features/comment-management/ui/CommentDeleteButton"
import CommentEditButton from "../../../features/comment-management/ui/CommentEditButton"
import CommentLikeButton from "../../../features/comment-management/ui/CommentLikeButton"
import { highlightText } from "../../../pages/PostsManagerPage"
import useCommentStore from "../model/useCommentStore"
import { useQuery } from "@tanstack/react-query"
import fetchComments from "../model/fetchComments"
import { CommentType } from "../../../shared/type"

interface Props {
  postId: number
  searchQuery: string
}

// 댓글 렌더링
const RenderComments = ({ postId, searchQuery }: Props) => {
  const { comments, setComments } = useCommentStore.getState()

  const { data } = useQuery({
    queryKey: ["getComments", postId],
    queryFn: () => fetchComments(postId),
  })

  useEffect(() => {
    if (!data) return
    if (comments[postId]) return
    setComments(postId, data.comments)
  }, [data])

  useEffect(() => {}, [comments])

  if (!comments) return <div></div>

  return (
    <div className="mt-2">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-sm font-semibold">댓글</h3>
        <CommentAddButton postId={postId} />
      </div>
      <div className="space-y-1">
        {comments[postId]?.map((comment: CommentType) => (
          <div key={comment.id} className="flex items-center justify-between text-sm border-b pb-1">
            <div className="flex items-center space-x-2 overflow-hidden">
              <span className="font-medium truncate">{comment.user?.username}:</span>
              <span className="truncate">{highlightText(comment.body as string, searchQuery)}</span>
            </div>
            <div className="flex items-center space-x-1">
              <CommentLikeButton comment={comment} postId={postId} />
              <CommentEditButton comment={comment} />
              <CommentDeleteButton comment={comment} postId={postId} />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default RenderComments
