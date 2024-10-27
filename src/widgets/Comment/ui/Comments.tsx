import React from "react"
import { Edit2, Plus, ThumbsUp, Trash2 } from "lucide-react"
import {
  Button,
} from "../../../shared/ui"

import { Comment } from "../../../shared/types"
import { highlightText } from "../../../shared/model/HighlightText"

interface CommentsProps {
    comments: Comment[];
    postId: number;
    searchQuery: string;
    onAddComment: (postId: number) => void;
    onEditComment: (comment: Comment) => void;
    onDeleteComment: (id: number, postId: number) => void;
    onLikeComment: (id: number, postId: number) => void;
  }

// 댓글 렌더링
const Comments: React.FC<CommentsProps> = ({
    comments,
    postId,
    searchQuery,
    onAddComment,
    onEditComment,
    onDeleteComment,
    onLikeComment,
  }: CommentsProps) => {

    return (
        <div className="mt-2">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-semibold">댓글</h3>
            <Button
              size="sm"
              onClick={() => {
                onAddComment(postId)
              }}
            >
              <Plus className="w-3 h-3 mr-1" />
              댓글 추가
            </Button>
          </div>
          <div className="space-y-1">
            {comments[postId]?.map((comment) => (
              <div key={comment.id} className="flex items-center justify-between text-sm border-b pb-1">
                <div className="flex items-center space-x-2 overflow-hidden">
                  <span className="font-medium truncate">{comment.user.username}:</span>
                  <span className="truncate">{highlightText(comment.body, searchQuery)}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Button variant="ghost" size="sm" onClick={() => onLikeComment(comment.id, postId)}>
                    <ThumbsUp className="w-3 h-3" />
                    <span className="ml-1 text-xs">{comment.likes}</span>
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      onEditComment(comment)
                    }}
                  >
                    <Edit2 className="w-3 h-3" />
                  </Button>
                  <Button variant="ghost" size="sm" onClick={() => onDeleteComment(comment.id, postId)}>
                    <Trash2 className="w-3 h-3" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )
  }


  export default Comments;