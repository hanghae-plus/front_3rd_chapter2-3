import { getModalKey, useModalStore } from "@/shared/model/useModalStore";
import { useShallow } from "zustand/shallow";

export const useModalAddPost = () => {
  const modalStore = useModalStore(
    useShallow((state) => ({
      activeModals: state.activeModals,
      toggle: state.toggle,
      close: state.close,
    })),
  );

  return {
    isOpen: modalStore.activeModals.has(getModalKey({ type: "addPost" })),
    toggle: (isOpen: boolean) => modalStore.toggle({ type: "addPost" }, isOpen),
    close: () => modalStore.close({ type: "addPost" }),
  };
};
