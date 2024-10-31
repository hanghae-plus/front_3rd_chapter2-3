import {
  Edit2,
  ThumbsUp,
  Trash2,
} from 'lucide-react';

import {
  Comment,
  useDeleteCommentMutation,
  useLikeCommentMutation,
} from '../../../../entities';
import {
  useCommentStore,
} from '../../../../entities/comment/model/useCommentStore';
import useDialogStore from '../../../../shared/lib/dialog/model/useDialogStore';
import { highlightText } from '../../../../shared/lib/utils/highlightText';
import Button from '../../../../shared/ui/atoms/Button/ui/Button';
import { useSearchStore } from '../../../postSearch/model/useSearchStore';

interface CommentItemProps {
  postId: number
  comment: Comment
}

const CommentItem = ({ postId, comment }: CommentItemProps) => {
  const { search } = useSearchStore()
  const { setSelectedComment } = useCommentStore()
  const { openDialog } = useDialogStore()
  const likeMutation = useLikeCommentMutation()
  const deleteMutation = useDeleteCommentMutation()

  return (
    <div key={comment.id} className="flex items-center justify-between text-sm border-b pb-1">
      <div className="flex items-center space-x-2 overflow-hidden">
        <span className="font-medium truncate">{comment.user.username}:</span>
        <span className="truncate">{highlightText(comment.body, search)}</span>
      </div>
      <div className="flex items-center space-x-1">
        <Button
          variant="ghost"
          size="sm"
          onClick={() =>
            likeMutation.mutate({
              id: comment.id,
              postId,
            })
          }
        >
          <ThumbsUp className="w-3 h-3" />
          <span className="ml-1 text-xs">{comment.likes}</span>
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => {
            setSelectedComment(comment)
            openDialog("editComment", { comment })
          }}
        >
          <Edit2 className="w-3 h-3" />
        </Button>
        <Button variant="ghost" size="sm" onClick={() => deleteMutation.mutate({ id: comment.id, postId })}>
          <Trash2 className="w-3 h-3" />
        </Button>
      </div>
    </div>
  )
}

export default CommentItem
