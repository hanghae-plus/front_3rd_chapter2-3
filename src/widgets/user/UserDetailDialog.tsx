import { DialogContainer } from "../../shared/ui";
import { useUserQuery } from "../../features/user/model/hook/useQuery";
import { useUserStore } from "../../features/user/store/useUserStore";

export function UserDetailDialog() {
  const { selectedUserId, showUserDialog, setShowUserDialog } = useUserStore();
  const { data: userData } = useUserQuery(selectedUserId);

  if (!userData) {
    return;
  }

  const {
    username,
    image,
    firstName,
    lastName,
    age,
    email,
    phone,
    address: { address, city, state },
    company: { name, title },
  } = userData;

  return (
    <DialogContainer title="사용자 정보" open={showUserDialog} onOpenChange={setShowUserDialog}>
      <div className="space-y-4">
        <img src={image} alt={username} className="w-24 h-24 rounded-full mx-auto" />
        <h3 className="text-xl font-semibold text-center">{username}</h3>
        <div className="space-y-2">
          <p>
            <strong>이름:</strong> {firstName} {lastName}
          </p>
          <p>
            <strong>나이:</strong> {age}
          </p>
          <p>
            <strong>이메일:</strong> {email}
          </p>
          <p>
            <strong>전화번호:</strong> {phone}
          </p>
          <p>
            <strong>주소:</strong> {address}, {city}, {state}
          </p>
          <p>
            <strong>직장:</strong> {name} - {title}
          </p>
        </div>
      </div>
    </DialogContainer>
  );
}
