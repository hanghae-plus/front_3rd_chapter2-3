import { useShallow } from "zustand/shallow";
import { BaseModalType } from "./types/modal-store-types";
import { getModalKey, useModalStore } from "./useModalStore";

export const useGlobalModal = (type: BaseModalType, id?: number | string) => {
  const modalKey = { type, id };

  const modalStore = useModalStore(
    useShallow((state) => ({
      activeModals: state.activeModals,
      toggle: state.toggle,
      close: state.close,
      open: state.open,
      closeAll: state.closeAll,
    })),
  );

  return {
    isOpen: modalStore.activeModals.has(getModalKey(modalKey)),
    toggle: (isOpen: boolean) => modalStore.toggle(modalKey, isOpen),
    close: () => modalStore.close(modalKey),
    open: () => modalStore.open(modalKey),
    closeAll: () => modalStore.closeAll(),
  };
};
