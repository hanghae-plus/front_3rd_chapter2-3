import { useQuery } from "@tanstack/react-query";
import { tagApis } from "../../../../entities/tag/api";

export function useTagsQuery() {
  return useQuery({
    queryKey: ["tags"],
    queryFn: tagApis.fetchTagList,
  });
}
