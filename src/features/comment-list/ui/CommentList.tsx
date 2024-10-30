import React from "react"
import { Button } from "../../../shared/ui/button/ui/Button.tsx"
import { useQueryCommentList } from "../api/useQueryCommentList.ts"
import { useCommentStore } from "../../comment/model/store.ts"
import { highlightText } from "../../../shared/lib/highlightText.tsx"
import usePostURLParams from "../../post/model/usePostURLParams.ts"
import { Edit2, ThumbsUp, Trash2 } from "lucide-react"

const CommentList = () => {
  const { searchQuery } = usePostURLParams()
  const { postId } = useCommentStore((state) => state)
  const { data: comments, isLoading } = useQueryCommentList(postId)
  console.log(comments, "comments")

  if (isLoading || !comments) return null

  return (
    <div className="space-y-1">
      {comments.map((comment) => (
        <div key={comment.id} className="flex items-center justify-between text-sm border-b pb-1">
          <div className="flex items-center space-x-2 overflow-hidden">
            <span className="font-medium truncate">{comment.user.username}:</span>
            <span className="truncate">{highlightText(comment.body, searchQuery)}</span>
          </div>
          <div className="flex items-center space-x-1">
            {/*<Button variant="ghost" size="sm" onClick={() => likeComment(comment.id, postId)}>*/}
            {/*  <ThumbsUp className="w-3 h-3" />*/}
            {/*  <span className="ml-1 text-xs">{comment.likes}</span>*/}
            {/*</Button>*/}
            {/*<Button*/}
            {/*  variant="ghost"*/}
            {/*  size="sm"*/}
            {/*  onClick={() => {*/}
            {/*    setSelectedComment(comment)*/}
            {/*    setShowEditCommentDialog(true)*/}
            {/*  }}*/}
            {/*>*/}
            {/*  <Edit2 className="w-3 h-3" />*/}
            {/*</Button>*/}
            {/*<Button variant="ghost" size="sm" onClick={() => deleteComment(comment.id, postId)}>*/}
            {/*  <Trash2 className="w-3 h-3" />*/}
            {/*</Button>*/}
          </div>
        </div>
      ))}
    </div>
  )
}

export default CommentList
