import { immer } from 'zustand/middleware/immer';
import { create } from 'zustand/react';

import { createSelectors } from '~/shared/lib/zustandUtil';

type State = {
  showUserModal: boolean;
};
type Action = {
  setShowUserModal: (showUserModal: boolean) => void;
};

const useModalStoreBase = create<State & Action>()(
  immer((set) => ({
    showUserModal: false,
    setShowUserModal: (isShow: boolean) =>
      set((state) => {
        state.showUserModal = isShow;
      }),
  }))
);

export const useModalStore = createSelectors(useModalStoreBase);
