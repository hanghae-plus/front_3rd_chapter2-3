import CommentItem from "./CommentItem"
import { Button } from "../../../shared/ui/Button/Button"
import { Plus } from "lucide-react"
import React from 'react';
import { useAtom } from 'jotai';
import { commentAtom, showEditCommentDialogAtom } from '../../../entities/comment/model/commentAtom.js';

interface CommentListProps {
  comments: Comment[]
  onAddComment: () => void
  onEditComment: (comment: Comment) => void
  onDeleteComment: (commentId: number) => void
}

const CommentList: React.FC<CommentListProps> = () => {
  const [comments, ] = useAtom(commentAtom);
  const [, setShowEditCommentDialog] = useAtom(showEditCommentDialogAtom);

  return (<div>
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-sm font-semibold">댓글</h3>
        <Button size="sm" onClick={()=>setShowEditCommentDialog(true)}>
          <Plus className="w-3 h-3 mr-1" />
          댓글 추가
        </Button>
      </div>
      <div className="space-y-1">
        {comments?.map((comment) => (
          <CommentItem
            key={comment.id}
          />
        ))}
      </div>
    </div>
  )
}

export default CommentList