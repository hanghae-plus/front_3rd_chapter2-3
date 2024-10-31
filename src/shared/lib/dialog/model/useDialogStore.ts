import { create } from 'zustand';

import { Post } from '../../../../entities';
import { DialogPropsRequired } from './dialogTypes';

export type DialogType = "addPost" | "editPost" | "addComment" | "editComment" | "postDetail" | "userInfo"

interface DialogState {
  dialogs: {
    [K in DialogType]: {
      isOpen: boolean
      props: DialogPropsRequired[K]
    }
  }
  openDialog: <K extends DialogType>(type: K, props: DialogPropsRequired[K]) => void
  closeDialog: (type: DialogType) => void
}

const initialDialogState: { [K in DialogType]: { isOpen: boolean; props: DialogPropsRequired[K] } } = {
  addPost: { isOpen: false, props: {} },
  editPost: { isOpen: false, props: { post: null as unknown as Post } }, // null as initial state
  addComment: { isOpen: false, props: { postId: 0 as number } },
  editComment: {
    isOpen: false,
    props: {
      comment: {
        id: 0,
        post_id: 0,
        body: "",
      } as unknown as Comment,
    },
  },
  postDetail: { isOpen: false, props: { post: null as unknown as Post, postId: 0 as number } },
  userInfo: { isOpen: false, props: { userId: null as unknown as number } },
}

export const useDialogStore = create<DialogState>((set) => ({
  dialogs: initialDialogState,
  openDialog: (type, props) =>
    set((state) => ({
      dialogs: {
        ...state.dialogs,
        [type]: { isOpen: true, props },
      },
    })),
  closeDialog: (type) =>
    set((state) => ({
      dialogs: {
        ...state.dialogs,
        [type]: { isOpen: false, props: initialDialogState[type].props },
      },
    })),
}))

export const useDialogProps = <K extends DialogType>(dialogType: K): DialogPropsRequired[K] => {
  const props = useDialogStore((state) => state.dialogs[dialogType].props)
  return props
}

export default useDialogStore
