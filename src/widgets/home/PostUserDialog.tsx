import { FC } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@shared/ui/Dialog';

import { useUser } from '@/features/home/model/useUser';

import UserDetail from '@/entities/home/ui/UserDetail';

const PostUserDialog: FC = () => {
  const { user, isPostUserDialogOpen, setIsPostUserDialogOpen } = useUser();

  return (
    <Dialog
      open={isPostUserDialogOpen}
      onOpenChange={setIsPostUserDialogOpen}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>사용자 정보</DialogTitle>
        </DialogHeader>

        {user && <UserDetail user={user} />}
      </DialogContent>
    </Dialog>
  );
};

PostUserDialog.displayName = 'PostUserDialog';
export default PostUserDialog;
