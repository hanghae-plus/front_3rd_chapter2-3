export type BaseModalType = "addPost" | "editPost" | "postDetail" | "addComment" | "editComment" | "userInfo";

export type ModalWithId = {
  type: BaseModalType;
  id?: number | string;
};

export type ModalState = {
  activeModals: Set<string>; // "type:id" 형태로 저장
};

export type ModalActions = {
  open: (modal: ModalWithId) => void;
  close: (modal: ModalWithId) => void;
  toggle: (modal: ModalWithId, isOpen: boolean) => void;
  closeAll: () => void;
  isOpen: (modal: ModalWithId) => boolean;
};
