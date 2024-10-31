// src/features/posts/components/UserDetailDialog.tsx
import React, { useEffect } from 'react';
import { Dialog, DialogContents, DialogHeader, DialogTitle } from '../../../shared/ui/Dialog';
import { useAtom } from 'jotai';
import { selectedPostAtom } from '../../../entities/post/model/postAtom';
import { selectedUserAtom, showUserModalAtom } from '../../../entities/user/model/userAtom';
import useUser from '../model/useUser';

const UserDetailDialog: React.FC = () => {
  const [selectedPost] = useAtom(selectedPostAtom);
  const [showUserModal, setShowUserModal] = useAtom(showUserModalAtom);
  const [selectedUser] = useAtom(selectedUserAtom);
  const { fetchUserMutation } = useUser();

  useEffect(() => {
    if (selectedPost && !fetchUserMutation.isPending && !fetchUserMutation.isSuccess) {
      fetchUserMutation.mutate(selectedPost.userId);
    }
  }, [ fetchUserMutation, selectedPost]);

  if (!selectedPost) return null;

  return (
    <Dialog open={showUserModal} onOpenChange={setShowUserModal}>
      <DialogContents>
        <DialogHeader>
          <DialogTitle>사용자 정보</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          {fetchUserMutation.isPending ? (
            <p>사용자 정보를 불러오는 중...</p>
          ) : selectedUser ? (
            <>
              <img src={selectedUser.image} alt={selectedUser.username} className="w-24 h-24 rounded-full mx-auto" />
              <h3 className="text-xl font-semibold text-center">{selectedUser.username}</h3>
              <div className="space-y-2">
                <p>
                  <strong>이름:</strong> {selectedUser.firstName} {selectedUser.lastName}
                </p>
                <p>
                  <strong>나이:</strong> {selectedUser.age}
                </p>
                <p>
                  <strong>이메일:</strong> {selectedUser.email}
                </p>
                <p>
                  <strong>전화번호:</strong> {selectedUser.phone}
                </p>
                <p>
                  <strong>주소:</strong> {selectedUser.address?.address}, {selectedUser.address?.city}, {selectedUser.address?.state}
                </p>
                <p>
                  <strong>직장:</strong> {selectedUser.company?.name} - {selectedUser.company?.title}
                </p>
              </div>
            </>
          ) : (
            <p>사용자 정보를 불러올 수 없습니다.</p>
          )}
        </div>
      </DialogContents>
    </Dialog>
  );
};

export default UserDetailDialog;