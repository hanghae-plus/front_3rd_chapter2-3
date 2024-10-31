import { create } from "zustand";
import { ModalActions, ModalState, ModalWithId } from "./types/modal-store-types";

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
    if (isOpen) {
      get().open(modal);
    } else {
      get().close(modal);
    }
  },
  closeAll: () => set({ activeModals: new Set() }),
  isOpen: (modal) => get().activeModals.has(getModalKey(modal)),
}));
