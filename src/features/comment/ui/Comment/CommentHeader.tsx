import { Plus } from 'lucide-react';

import {
  useCommentStore,
} from '../../../../entities/comment/model/useCommentStore';
import useDialogStore from '../../../../shared/lib/dialog/model/useDialogStore';
import Button from '../../../../shared/ui/atoms/Button/ui/Button';

interface CommentHeaderProps {
  postId: number
}

const CommentHeader = ({ postId }: CommentHeaderProps) => {
  const { setNewComment } = useCommentStore()
  const { openDialog } = useDialogStore()

  return (
    <div className="flex items-center justify-between mb-2">
      <h3 className="text-sm font-semibold">댓글</h3>
      <Button
        size="sm"
        onClick={() => {
          setNewComment({
            body: "",
            postId: postId,
            userId: 1,
          })
          openDialog("addComment", { postId })
        }}
      >
        <Plus className="w-3 h-3 mr-1" />
        댓글 추가
      </Button>
    </div>
  )
}

export default CommentHeader
