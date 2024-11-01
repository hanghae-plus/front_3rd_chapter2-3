import { create } from "zustand";

type UserState = {
  selectedUserId: number | null;
  showUserDialog: boolean;
};

type UserAction = {
  setSelectedUserId: (userId: number | null) => void;
  setShowUserDialog: (show: boolean) => void;
};

export const useUserStore = create<UserState & UserAction>((set) => ({
  selectedUserId: null,
  showUserDialog: false,

  setSelectedUserId: (userId) => set({ selectedUserId: userId }),
  setShowUserDialog: (show) => set({ showUserDialog: show }),
}));
