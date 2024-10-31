type Props = {
  user: User;
};

export function UserAvatar({ user }: Props) {
  const { image, username } = user;

  return (
    <div
      className="flex items-center space-x-2 cursor-pointer"
      onClick={() => {
        // openUserModal(author)
      }}
    >
      <img src={image} alt={username} className="w-8 h-8 rounded-full" />
      <span>{username}</span>
    </div>
  );
}
