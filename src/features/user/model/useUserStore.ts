import { userApi } from "@/entities/user/api/userApi";
import { User } from "@/entities/user/model/types";
import { apiHandler } from "@/shared/api/apiHandler";
import { create } from "zustand";

type UserStore = {
  user: User | null;
  selectedUser: User | null;

  handleSelectUser: (user: User) => void;
  fetchUser: (id: number) => Promise<void>;
};

const useUserStore = create<UserStore>()((set) => ({
  user: null,
  selectedUser: null,
  handleSelectUser: (user) => set({ selectedUser: user }),
  fetchUser: async (id: number) => {
    const user = await apiHandler(
      () => userApi.getUser(id),
      (error) => {
        console.error("사용자 정보 가져오기 오류:", error);
      },
    );
    if (!user) return;
    set({ selectedUser: user });
  },
}));

export default useUserStore;
