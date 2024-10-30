import { userQueries } from "@/entities/user/api/user-queries";
import { User } from "@/entities/user/model/types";
import { useQuery, UseQueryOptions } from "@tanstack/react-query";

type UseGetUserProps = {
  id: number;
  options?: Omit<UseQueryOptions<User>, "queryKey" | "queryFn">;
};

export const useGetUser = ({ id, options }: UseGetUserProps) => {
  return useQuery(userQueries.detail({ id, options }));
};
