import apiRequest from "@/shared/api";
import { UserType } from "../model/user-type";

export const fetchUserInfo = async (user: UserType) => {
  try {
    const res = await apiRequest.get(`/api/users/${user.id}`);
    return res.data;
  } catch (error) {
    console.error("유저정보 가져오기 오류: ", error);
    throw error;
  }
};
