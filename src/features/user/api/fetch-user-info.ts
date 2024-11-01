import { useQuery } from "@tanstack/react-query";

import { UserInfoType, UserType } from "@/entities/user/model/user-type";
import { fetchUserInfo } from "@/entities/user/api/fetch-user-info";

export const useQueryUserInfo = (user: UserType) => {
  return useQuery<UserInfoType>({
    queryKey: ["get-user-info", { ...user }],
    queryFn: () => fetchUserInfo(user),
  });
};
