import apiRequest from "@/shared/api";
import { UserInfoType, UserType } from "../model/user-type";
import { useQuery } from "@tanstack/react-query";

const fetchUserInfo = async (user: UserType) => {
  try {
    const res = await apiRequest.get(`/api/users/${user.id}`);
    return res.data;
  } catch (error) {
    console.error("유저정보 가져오기 오류: ", error);
    throw error;
  }
};

export const useQueryUserInfo = (user: UserType) => {
  return useQuery<UserInfoType>({
    queryKey: ["get-user-info", { ...user }],
    queryFn: () => fetchUserInfo(user),
  });
};
