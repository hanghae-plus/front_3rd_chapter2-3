import { createQueryKey } from "@/shared/lib/api";
import { queryOptions } from "@tanstack/react-query";
import { FetchUsersProps } from "../model/types";
import { userApi } from "./user-api";

export const userQueries = {
  all: () => ["users"],
  list: (props: FetchUsersProps) =>
    queryOptions({
      queryKey: createQueryKey(userQueries.all(), "list", props.select),
      queryFn: () => userApi.getUsers(props),
    }),
  detail: ({ id }: { id: number }) =>
    queryOptions({
      queryKey: createQueryKey(userQueries.all(), "detail", id),
      queryFn: () => userApi.getUser(id),
    }),
};
