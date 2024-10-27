import { User } from "../../../temp/types.ts";

export const getUserInfo = async (user: User) => {
  try {
    const response = await fetch(`/api/users/${user?.id}`);

    return await response.json();
  } catch (error) {
    console.error("사용자 정보 가져오기 오류:", error);
  }
};
