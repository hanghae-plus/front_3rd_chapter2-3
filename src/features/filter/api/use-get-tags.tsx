import { tagQueries } from "@/entities/tag/api/tag-queries";
import { useQuery } from "@tanstack/react-query";

const useQueryTags = () => {
  return useQuery(tagQueries.list());
};

export default useQueryTags;
