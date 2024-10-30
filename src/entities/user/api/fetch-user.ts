import apiRequest from "@/shared/api";
import { useQuery } from "@tanstack/react-query";
import { UserType } from "../model/user-type";

const fetchUserList = async () => {
  try {
    const res = await apiRequest.get("/api/users?limit=0&select=username,image");
    return res.data;
  } catch (error) {
    console.error("유저정보 가져오기 오류: ", error);
    throw error;
  }
};

export const useQueryUserList = () => {
  return useQuery<UserType[]>({
    queryKey: ["search-user"],
    queryFn: () => fetchUserList(),
  });
};
