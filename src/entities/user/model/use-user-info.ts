import { useQueryUserInfo } from "../api/fetch-user-info";
import { UserType } from "./user-type";

export const useUserInfo = (user: UserType) => {
  const { isLoading, data } = useQueryUserInfo(user);

  return { data, isLoading };
};
