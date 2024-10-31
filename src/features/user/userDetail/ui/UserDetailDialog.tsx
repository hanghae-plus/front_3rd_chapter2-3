import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../../../../shared/ui';
import { getUser } from '../../../../entities/user/api/userApi';
import { transformUserDetail } from '../../../../entities/user/lib';
import { Post } from '../../../../entities/post/model/types';
import { UserDetail } from '../../../../entities/user/model/types';
import { useQuery } from 'react-query';

type Props = {
  user: Required<Post>['author'];
};

export const UserDetailDialog = ({ user }: Props) => {
  const [open, toggle] = useState(false);

  const { data: userDetail, isLoading } = useQuery({
    queryKey: ['user', user.id],
    queryFn: async () => {
      const data = await getUser(user.id);
      return transformUserDetail(data);
    },
    enabled: open,
  });

  return (
    <Dialog open={open} onOpenChange={toggle}>
      <DialogTrigger asChild>
        {/* TODO: UserAvatar 컴포넌트로 분리 */}
        <div className="flex items-center space-x-2 cursor-pointer">
          <img src={user.image} alt={user.username} className="w-8 h-8 rounded-full" />
          <span>{user.username}</span>
        </div>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>사용자 정보</DialogTitle>
        </DialogHeader>

        {isLoading && <p>Loading...</p>}

        {userDetail && <UserInfo userDetail={userDetail} />}
      </DialogContent>
    </Dialog>
  );
};

const UserInfo = ({ userDetail }: { userDetail: UserDetail }) => {
  return (
    <div className="space-y-4">
      <img src={userDetail.image} alt={userDetail.username} className="w-24 h-24 rounded-full mx-auto" />
      <h3 className="text-xl font-semibold text-center">{userDetail.username}</h3>
      <div className="space-y-2">
        <p>
          <strong>이름:</strong> {userDetail.firstName} {userDetail.lastName}
        </p>
        <p>
          <strong>나이:</strong> {userDetail.age}
        </p>
        <p>
          <strong>이메일:</strong> {userDetail.email}
        </p>
        <p>
          <strong>전화번호:</strong> {userDetail.phone}
        </p>
        <p>
          <strong>주소:</strong> {userDetail.address?.address}, {userDetail.address?.city}, {userDetail.address?.state}
        </p>
        <p>
          <strong>직장:</strong> {userDetail.company?.name} - {userDetail.company?.title}
        </p>
      </div>
    </div>
  );
};
