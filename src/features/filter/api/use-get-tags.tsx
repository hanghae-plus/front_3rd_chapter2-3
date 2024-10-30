import { tagQueries } from "@/entities/tag/api/tag-queries";
import { useQuery } from "@tanstack/react-query";

const useFetchTags = () => {
  return useQuery(tagQueries.list());
};

export default useFetchTags;
