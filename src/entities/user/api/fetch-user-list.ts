import apiRequest from "@/shared/api";

export const fetchUserList = async () => {
  try {
    const res = await apiRequest.get("/api/users?limit=0&select=username,image");
    return res.data;
  } catch (error) {
    console.error("유저정보 가져오기 오류: ", error);
    throw error;
  }
};
