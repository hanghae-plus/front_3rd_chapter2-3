import { Post } from "@/entities/post/model/types";
import { User } from "@/entities/user/model/types";

import UserInfo from "@/features/user/ui/UserInfo";

import useToggle from "@/shared/lib/useToggle";
import { Dialog } from "@/shared/ui";
import { useShallow } from "zustand/shallow";
import useUserStore from "../../model/useUserStore";

type ModalUserInfoProps = {
  post: Post;
};

// Data Component
const ModalUserInfo = ({ post }: ModalUserInfoProps) => {
  const { selectedUser, fetchUser } = useUserStore(
    useShallow((state) => ({
      selectedUser: state.selectedUser,
      fetchUser: state.fetchUser,
    })),
  );
  const { isOpen, toggle } = useToggle();

  const openUserModal = async (user: Pick<User, "id" | "username" | "image"> | undefined) => {
    if (!user) return;
    fetchUser(user.id);
  };

  return (
    <Dialog.Container open={isOpen} onOpenChange={toggle}>
      <Dialog.Trigger asChild>
        <div className="flex items-center space-x-2 cursor-pointer" onClick={() => openUserModal(post.author)}>
          <img src={post.author?.image} alt={post.author?.username} className="w-8 h-8 rounded-full" />
          <span>{post.author?.username}</span>
        </div>
      </Dialog.Trigger>
      <Dialog.Content>
        <Dialog.Header>
          <Dialog.Title>사용자 정보</Dialog.Title>
        </Dialog.Header>
        <UserInfo selectedUser={selectedUser} />
      </Dialog.Content>
    </Dialog.Container>
  );
};

export default ModalUserInfo;
