import { createQueryKey } from "@/shared/lib/api";
import { queryOptions, UseQueryOptions } from "@tanstack/react-query";
import { FetchUsersProps, User } from "../model/types";
import { userApi } from "./user-api";

export const userQueries = {
  all: () => ["users"],
  list: (props: FetchUsersProps) =>
    queryOptions({
      queryKey: createQueryKey(userQueries.all(), "list", props.select),
      queryFn: async () => {
        try {
          const data = await userApi.getUsers(props);
          return data;
        } catch (error) {
          console.error("유저 가져오기 오류:", error);
          throw error;
        }
      },
    }),
  detail: ({ id, options }: { id: number; options?: Omit<UseQueryOptions<User>, "queryKey" | "queryFn"> }) =>
    queryOptions({
      queryKey: createQueryKey(userQueries.all(), "detail", id),
      queryFn: async () => {
        try {
          const data = await userApi.getUser(id);
          return data;
        } catch (error) {
          console.error("유저 가져오기 오류:", error);
          throw error;
        }
      },
      ...options,
    }),
};
