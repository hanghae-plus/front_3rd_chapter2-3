import { userQueries } from "@/entities/user/api/user-queries";
import { User } from "@/entities/user/model/types";
import { useQuery, UseQueryOptions } from "@tanstack/react-query";

type useQueryUserProps = {
  id: number;
  options?: Omit<UseQueryOptions<User>, "queryKey" | "queryFn">;
};

export const useQueryUser = ({ id, options }: useQueryUserProps) => {
  return useQuery(userQueries.detail({ id, options }));
};
