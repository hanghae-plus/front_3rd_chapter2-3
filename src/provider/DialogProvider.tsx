import { ReactNode } from 'react';

import EditCommentDialog from '../features/comment/ui/Dialog/EditCommentDialog';
import AddPostDialog from '../features/post/ui/Dialog/AddPostDialog';
import PostDetailDialog from '../features/post/ui/Dialog/PostDetailDialog';
import UserDetailDialog from '../features/user/ui/Dialog/UserDetailDialog';
import useDialogStore from '../shared/lib/dialog/model/useDialogStore';

interface DialogProviderProps {
  children: ReactNode
}
export const DialogProvider = ({ children }: DialogProviderProps) => {
  const dialogs = useDialogStore((state) => state.dialogs)

  return (
    <>
      {dialogs.addPost.isOpen && (
        <AddPostDialog
          open={dialogs.addPost.isOpen}
          onOpenChange={(open) => !open && useDialogStore.getState().closeDialog("addPost")}
        />
      )}

      {/* {modals.editPost.isOpen && (
        <EditPostDialog
          open={modals.editPost.isOpen}
          onOpenChange={(open) => !open && useDialogStore.getState().closeDialog("editPost")}
        />
      )}

  
      {modals.addComment.isOpen && (
        <AddCommentDialog
          postId={modals.addComment.props.postId}
          open={modals.addComment.isOpen}
          onOpenChange={(open) => !open && useDialogStore.getState().closeDialog("addComment")}
        />
      )}
*/}

      {dialogs.editComment.isOpen && (
        <EditCommentDialog
          open={dialogs.editComment.isOpen}
          onOpenChange={(open) => !open && useDialogStore.getState().closeDialog("editComment")}
        />
      )}

      {dialogs.postDetail.isOpen && (
        <PostDetailDialog
          open={dialogs.postDetail.isOpen}
          onOpenChange={(open) => !open && useDialogStore.getState().closeDialog("postDetail")}
        />
      )}

      {dialogs.userInfo.isOpen && (
        <UserDetailDialog
          open={dialogs.userInfo.isOpen}
          onOpenChange={(open) => !open && useDialogStore.getState().closeDialog("userInfo")}
        />
      )}

      {children}
    </>
  )
}
