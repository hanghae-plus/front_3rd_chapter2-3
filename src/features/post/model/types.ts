export type UseQueryPosts = {
  limit: number;
  skip: number;
  search?: string;
  tag?: string;
  priorityKey: string | null;
};
