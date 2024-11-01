import { useEffect } from "react";

import { userListState } from "@/entities/user/model/user-state";
import { useQueryUserList } from "../api/fetch-user-list";

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
