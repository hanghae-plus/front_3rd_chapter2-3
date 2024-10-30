import { createQueryKey } from "@/shared/lib/api";
import { queryOptions } from "@tanstack/react-query";
import { tagApi } from "./tag-api";

export const tagQueries = {
  all: () => ["tags"],
  list: () =>
    queryOptions({
      queryKey: createQueryKey(tagQueries.all()),
      queryFn: async () => {
        try {
          const data = await tagApi.fetchTags();
          return data;
        } catch (error) {
          console.error("태그 가져오기 오류:", error);
          throw error;
        }
      },
    }),
};
