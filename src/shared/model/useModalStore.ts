import { create } from "zustand";

type BaseModalType = "addPost" | "editPost" | "postDetail" | "addComment" | "editComment" | "userInfo";

type ModalWithId = {
  type: BaseModalType;
  id?: number | string;
};

type ModalState = {
  activeModals: Set<string>; // "type:id" 형태로 저장
};

type ModalActions = {
  open: (modal: ModalWithId) => void;
  close: (modal: ModalWithId) => void;
  toggle: (modal: ModalWithId, isOpen: boolean) => void;
  closeAll: () => void;
  isOpen: (modal: ModalWithId) => boolean;
};

export const getModalKey = (modal: ModalWithId) => (modal.id ? `${modal.type}:${modal.id}` : modal.type);

export const useModalStore = create<ModalState & ModalActions>()((set, get) => ({
  activeModals: new Set(),

  open: (modal) =>
    set((state) => ({
      activeModals: new Set(state.activeModals).add(getModalKey(modal)),
    })),

  close: (modal) =>
    set((state) => {
      const newModals = new Set(state.activeModals);
      newModals.delete(getModalKey(modal));
      return { activeModals: newModals };
    }),

  toggle: (modal, isOpen) => {
    isOpen ? get().open(modal) : get().close(modal);
  },

  closeAll: () => set({ activeModals: new Set() }),

  isOpen: (modal) => get().activeModals.has(getModalKey(modal)),
}));
