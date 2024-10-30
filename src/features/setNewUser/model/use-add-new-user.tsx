import { useEffect } from "react";

import { useQueryUserList } from "@/entities/user/api/fetch-user";
import { userListState } from "@/entities/user/model/user-state";

export function useAddNewUser() {
  const { setNewUserList } = userListState();
  const { refetch } = useQueryUserList();

  const searchTagList = async () => {
    const userList = await refetch();
    setNewUserList(userList.data?.users ?? []);
  };

  useEffect(() => {
    searchTagList();
  }, []);
}
