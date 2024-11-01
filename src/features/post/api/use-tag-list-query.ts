import { useQuery } from "@tanstack/react-query";

export const useTagListQuery = () => {
  return useQuery({
    queryKey: ["tags", "list"],
    queryFn: async () => {
      const response = await fetch("/api/posts/tags");
      if (!response.ok) {
        throw new Error("Failed to fetch tags");
      }
      return response.json();
    },
  });
};
