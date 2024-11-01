import { useUserStore } from "../store/useUserStore";

type Props = {
  user: User;
};

export function UserAvatar({ user }: Props) {
  const { image, username, id } = user;

  const { setSelectedUserId, setShowUserDialog } = useUserStore();

  const handleClickUserAvatar = () => {
    setSelectedUserId(id);
    setShowUserDialog(true);
  };

  return (
    <div className="flex items-center space-x-2 cursor-pointer" onClick={handleClickUserAvatar}>
      <img src={image} alt={username} className="w-8 h-8 rounded-full" />
      <span>{username}</span>
    </div>
  );
}
