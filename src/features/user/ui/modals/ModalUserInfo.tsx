import { Post } from "@/entities/post/model/types";

import UserInfo from "@/features/user/ui/UserInfo";

import { Dialog } from "@/shared/ui";
import { useModalUser } from "../../model/useModalUser";

type ModalUserInfoProps = {
  post: Post;
};

// Data Component
const ModalUserInfo = ({ post }: ModalUserInfoProps) => {
  const { isOpen, toggle, userData, isLoading } = useModalUser(post.author?.id ?? 0);

  return (
    <Dialog.Container open={isOpen} onOpenChange={toggle}>
      <Dialog.Trigger asChild>
        <div className="flex items-center space-x-2 cursor-pointer">
          <img src={post.author?.image} alt={post.author?.username} className="w-8 h-8 rounded-full" />
          <span>{post.author?.username}</span>
        </div>
      </Dialog.Trigger>
      <Dialog.Content>
        <Dialog.Header>
          <Dialog.Title>사용자 정보</Dialog.Title>
        </Dialog.Header>
        {isLoading ? <div className="text-center">로딩중...</div> : <UserInfo selectedUser={userData} />}
      </Dialog.Content>
    </Dialog.Container>
  );
};

export default ModalUserInfo;
