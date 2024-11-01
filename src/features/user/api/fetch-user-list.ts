import { fetchUserList } from "@/entities/user/api/fetch-user-list";
import { UserType } from "@/entities/user/model/user-type";
import { useQuery } from "@tanstack/react-query";

interface FetchUserType {
  limit: number;
  skip: number;
  total: number;
  users: UserType[];
}

export const useQueryUserList = () => {
  return useQuery<FetchUserType>({
    queryKey: ["get-user-list"],
    queryFn: () => fetchUserList(),
  });
};
