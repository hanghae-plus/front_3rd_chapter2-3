import { useState } from "react"
import { useCommentsQuery } from "../../../entities/comment/api/useCommentsQuery"
import { NewComment } from "../../../entities/comment/model/types"
import { usePostQueryParams } from "../../../entities/post"
import { Post } from "../../../entities/post/model/types"
import {
  CommentDeleteButton,
  CommentLikeButton,
} from "../../../features/comment"
import { TextHighlighter } from "../../../shared/ui"
import { CommentAddDialogButton } from "./CommentAddDialogButton"
import { CommentEditDialogButton } from "./CommentEditDialogButton"

type Props = {
  postId: Post["id"]
}

export const Comments = ({ postId }: Props) => {
  const {
    queryParams: { search: searchQuery },
  } = usePostQueryParams()

  const { data: comments = [] } = useCommentsQuery(postId)

  const [newComment, setNewComment] = useState<NewComment>({
    body: "",
    postId: null,
    userId: 1,
  })

  return (
    <div className="mt-2">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-sm font-semibold">댓글</h3>

        <CommentAddDialogButton
          postId={postId}
          newComment={newComment}
          setNewComment={setNewComment}
        />
      </div>

      <div className="space-y-1">
        {comments.map((comment) => (
          <div
            key={comment.id}
            className="flex items-center justify-between text-sm border-b pb-1"
          >
            <div className="flex items-center space-x-2 overflow-hidden">
              <span className="font-medium truncate">
                {comment.user.username}:
              </span>
              <span className="truncate">
                <TextHighlighter text={comment.body} highlight={searchQuery} />
              </span>
            </div>
            <div className="flex items-center space-x-1">
              <CommentLikeButton comment={comment} />
              <CommentEditDialogButton comment={comment} />
              <CommentDeleteButton commentId={comment.id} />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
