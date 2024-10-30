import { userQueries } from "@/entities/user/api/user-queries";
import { useQuery } from "@tanstack/react-query";

export const useGetUser = (id: number) => {
  return useQuery(userQueries.detail({ id }));
};
