import { useUserInfo } from "../model/use-user-info";
import { UserType } from "../model/user-type";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/shared/ui";

interface UserInfoDialogProps {
  user: UserType;
  isOpen: boolean;
  close: () => void;
}

export const UserInfoDialog = ({ user, isOpen, close }: UserInfoDialogProps) => {
  const { data: UserInfo, isLoading } = useUserInfo(user);

  if (isLoading) {
    return <div className="flex justify-center items-center">유저정보 가져오는 중...</div>;
  }

  return (
    <Dialog open={isOpen} onOpenChange={close}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>사용자 정보</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <img
            src={UserInfo?.image}
            alt={UserInfo?.username}
            className="w-24 h-24 rounded-full mx-auto"
          />
          <h3 className="text-xl font-semibold text-center">{UserInfo?.username}</h3>
          <div className="space-y-2">
            <p>
              <strong>이름:</strong> {UserInfo?.firstName} {UserInfo?.lastName}
            </p>
            <p>
              <strong>나이:</strong> {UserInfo?.age}
            </p>
            <p>
              <strong>이메일:</strong> {UserInfo?.email}
            </p>
            <p>
              <strong>전화번호:</strong> {UserInfo?.phone}
            </p>
            <p>
              <strong>주소:</strong> {UserInfo?.address?.address}, {UserInfo?.address?.city},{" "}
              {UserInfo?.address?.state}
            </p>
            <p>
              <strong>직장:</strong> {UserInfo?.company?.name} - {UserInfo?.company?.title}
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
