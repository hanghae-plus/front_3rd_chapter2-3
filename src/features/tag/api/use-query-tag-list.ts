import { useQuery } from "@tanstack/react-query";

import { TagType } from "@/entities/tag/model/tag-type";
import { fetchTagList } from "@/entities/tag/api/fetch-tag-list";

export const useQueryTagList = () => {
  return useQuery<TagType[]>({
    queryKey: ["get-tag-list"],
    queryFn: () => fetchTagList(),
  });
};
