import apiRequest from "@/shared/api";

export const fetchTagList = async () => {
  try {
    const res = await apiRequest.get(`/api/posts/tags`);
    return res.data;
  } catch (error) {
    console.error("태그 가져오기 오류:", error);
  }
};
