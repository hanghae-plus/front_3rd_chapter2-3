import { useModalStore } from '~/entities/modal/model/modalStore';
import { fetchUserById } from '~/entities/user/api/userApi';
import { User } from '~/entities/user/model/types';
import { useUserStore } from '~/entities/user/model/userStore';

export const PostAuthorCell = ({ author }: { author?: User }) => {
  // modal store
  const changeOpen = useModalStore.use.changeOpen();

  // user store
  const selectUser = useUserStore.use.selectUser();

  // 사용자 모달 열기
  const openUserModal = async (user?: User) => {
    if (!user) {
      return;
    }
    try {
      const userData = await fetchUserById(user.id);
      selectUser(userData);
      changeOpen(true);
    } catch (error) {
      console.error('사용자 정보 가져오기 오류:', error);
    }
  };
  return (
    <div className="flex items-center space-x-2 cursor-pointer" onClick={() => openUserModal(author)}>
      <img src={author?.image} alt={author?.username} className="w-8 h-8 rounded-full" />
      <span>{author?.username}</span>
    </div>
  );
};
