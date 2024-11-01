import { useQuery } from "@tanstack/react-query";

export const useUserDataQuery = (userId: number | undefined) => {
  return useQuery({
    queryKey: ["user", userId],
    queryFn: async () => {
      const response = await fetch(`/api/users/${userId}`);
      return response.json();
    },
    enabled: !!userId,
  });
}; 