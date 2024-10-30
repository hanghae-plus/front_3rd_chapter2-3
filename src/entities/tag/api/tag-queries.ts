import { tagApi } from "./tag-api";

const createQueryKey = (base: string[], ...params: unknown[]) => [...base, ...params];

export const tagQueries = {
  all: () => ["tags"],
  list: () => ({ queryKey: createQueryKey(tagQueries.all()), queryFn: tagApi.fetchTags }),
};
