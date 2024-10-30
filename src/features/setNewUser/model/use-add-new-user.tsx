import { useEffect } from "react";

import { useQueryUserList } from "@/entities/user/api/fetch-user";
import { userListState } from "@/entities/user/model/user-state";

export function useAddNewUser() {
  const { setNewUserList } = userListState();
  const { data: userList } = useQueryUserList();

  useEffect(() => {
    if (userList !== undefined) {
      setNewUserList(userList);
    }
  }, []);
}
