import { useQuery } from "@tanstack/react-query";
import { userApis } from "../../../entities/user/api";

export function useUsersQuery() {
  return useQuery({
    queryKey: ["users"],
    queryFn: () => userApis.fetchUserList(),
    gcTime: Infinity,
  });
}
