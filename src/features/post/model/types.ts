export type PostSearchParamsKey = {
  limit: number;
  skip: number;
  sortBy: string;
  sortOrder: string;
  search?: string;
  tag?: string;
  priorityKey?: string | null;
};
