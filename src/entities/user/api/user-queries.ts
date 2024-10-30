import { createQueryKey } from "@/shared/lib/api";
import { queryOptions, UseQueryOptions } from "@tanstack/react-query";
import { FetchUsersProps, User } from "../model/types";
import { userApi } from "./user-api";

export const userQueries = {
  all: () => ["users"],
  list: (props: FetchUsersProps) =>
    queryOptions({
      queryKey: createQueryKey(userQueries.all(), "list", props.select),
      queryFn: () => userApi.getUsers(props),
    }),
  detail: ({ id, options }: { id: number; options?: Omit<UseQueryOptions<User>, "queryKey" | "queryFn"> }) =>
    queryOptions({
      queryKey: createQueryKey(userQueries.all(), "detail", id),
      queryFn: () => userApi.getUser(id),
      ...options,
    }),
};
