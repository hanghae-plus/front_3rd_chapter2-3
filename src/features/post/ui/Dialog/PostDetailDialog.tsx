import React from 'react';

import { Post } from '../../../../entities';
import useDialogStore from '../../../../shared/lib/dialog/model/useDialogStore';
import { highlightText } from '../../../../shared/lib/utils/highlightText';
import { Dialog } from '../../../../shared/ui/organisms/Dialog/ui/Dialog';
import {
  DialogContent,
} from '../../../../shared/ui/organisms/Dialog/ui/DialogContent';
import {
  DialogHeader,
} from '../../../../shared/ui/organisms/Dialog/ui/DialogHeader';
import {
  DialogTitle,
} from '../../../../shared/ui/organisms/Dialog/ui/DialogTitle';
import Comment from '../../../comment/ui/Comment/Comment';
import { useSearchStore } from '../../../postSearch/model/useSearchStore';

interface PostDetailDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}
const PostDetailDialog = ({ open, onOpenChange }: PostDetailDialogProps) => {
  const dialogProps = useDialogStore((state) => state?.dialogs.postDetail.props) as { post?: Post }
  const { post: selectedPost } = dialogProps
  const { search } = useSearchStore()

  if (!selectedPost) return null

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>{highlightText(selectedPost?.title, search)}</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <p>{highlightText(selectedPost?.body, search)}</p>
          <Comment postId={selectedPost.id} />
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default PostDetailDialog
