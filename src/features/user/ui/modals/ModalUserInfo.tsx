import { UserSummary } from "@/entities/user/model/types";
import UserInfo from "@/entities/user/ui/UserInfo";

import { useToggle } from "@/shared/model";
import { Dialog, Loader } from "@/shared/ui";

import { useGetUser } from "../../api/use-get-user";

type ModalUserInfoProps = {
  user?: UserSummary;
};

// Data Component
const ModalUserInfo = ({ user }: ModalUserInfoProps) => {
  const { isOpen, toggle } = useToggle();
  const { data: userData, isLoading } = useGetUser({ id: user?.id ?? 0, options: { enabled: isOpen } });

  return (
    <Dialog.Container open={isOpen} onOpenChange={toggle}>
      <Dialog.Trigger asChild>
        {user ? (
          <div className="flex items-center space-x-2 cursor-pointer">
            <img src={user?.image} alt={user?.username} className="w-8 h-8 rounded-full" />
            <span>{user?.username}</span>
          </div>
        ) : (
          <span>사용자 정보 없음</span>
        )}
      </Dialog.Trigger>
      <Dialog.Content>
        <Dialog.Header>
          <Dialog.Title>사용자 정보</Dialog.Title>
        </Dialog.Header>
        {isLoading ? <Loader /> : <UserInfo user={userData} />}
      </Dialog.Content>
    </Dialog.Container>
  );
};

export default ModalUserInfo;
