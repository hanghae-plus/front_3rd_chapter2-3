import { createQueryKey } from "@/shared/lib/api";
import { tagApi } from "./tag-api";

export const tagQueries = {
  all: () => ["tags"],
  list: () => ({ queryKey: createQueryKey(tagQueries.all()), queryFn: tagApi.fetchTags }),
};
