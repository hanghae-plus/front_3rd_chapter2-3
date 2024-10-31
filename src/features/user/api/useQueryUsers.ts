import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { fetchUsersApi } from "../../../entities/user/api";
import { UsersDTO } from "../../../entities/user/model/types";

export const useQueryUsers = (): UseQueryResult<UsersDTO> => {
  return useQuery<UsersDTO, Error>({
    queryKey: ["users"],
    queryFn: () => fetchUsersApi(),
  });
};
