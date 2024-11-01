import { useQuery } from "@tanstack/react-query";
import { userApis } from "../../../../entities/user/api";

export function useUsersQuery() {
  return useQuery({
    queryKey: ["users"],
    queryFn: () => userApis.fetchUserList(),
  });
}

export function useUserQuery(userId: number | null) {
  return useQuery({
    queryKey: ["user", userId],
    queryFn: () => userApis.fetchUser(userId!),
    enabled: !!userId,
  });
}
