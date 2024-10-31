import apiRequest from "@/shared/api";
import { TagType } from "../model/tag-type";
import { useQuery } from "@tanstack/react-query";

const fetchTagList = async () => {
  try {
    const res = await apiRequest.get(`/api/posts/tags`);
    return res.data;
  } catch (error) {
    console.error("태그 가져오기 오류:", error);
  }
};

export const useQueryTagList = () => {
  return useQuery<TagType[]>({
    queryKey: ["get-tag-list"],
    queryFn: () => fetchTagList(),
  });
};
