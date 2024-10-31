import { UserApi } from "../../../entities/user/api/UserApi";
import { User } from "../../../entities/user/model/type";
import { create } from "zustand";

type UserStore = {
  user: User | null;
  selectedUser: User | null;

  handleSelectUser: (user: User) => void;
  fetchUser: (id: number) => Promise<void>;
};

const userStore = create<UserStore>()((set) => ({
  user: null,
  selectedUser: null,
  handleSelectUser: (user) => set({ selectedUser: user }),
  fetchUser: async (id: number) => {
    const user = await UserApi.fetchUserById(id);

    if (!user) return;
    set({ selectedUser: user });
  },
}));

export default userStore;