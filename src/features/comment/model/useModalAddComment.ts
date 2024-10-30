import { getModalKey, useModalStore } from "@/shared/model/useModalStore";
import { useShallow } from "zustand/shallow";
import { useAddComment } from "../api/use-add-comment";

export const useModalAddComment = () => {
  const modalStore = useModalStore(
    useShallow((state) => ({
      activeModals: state.activeModals,
      toggle: state.toggle,
      close: state.close,
    })),
  );
  const { mutate: addComment } = useAddComment();

  return {
    isOpen: modalStore.activeModals.has(getModalKey({ type: "addComment" })),
    toggle: (isOpen: boolean) => modalStore.toggle({ type: "addComment" }, isOpen),
    close: () => modalStore.close({ type: "addComment" }),
    addComment,
  };
};
