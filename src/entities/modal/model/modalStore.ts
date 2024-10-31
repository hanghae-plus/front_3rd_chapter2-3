import { create } from 'zustand';

import { createSelectors } from '~/shared/lib/zustandUtil';

import { ModalType } from './types';

type State = {
  open: boolean;
  type: ModalType;
};
type Action = {
  changeOpen: (open: boolean) => void;
  selectModalType: (selectedType: ModalType) => void;
};

const useModalStoreBase = create<State & Action>()((set) => ({
  open: false,
  type: 'addPost',
  changeOpen: (open: boolean) => set(() => ({ open: open })),
  selectModalType: (selectedType: ModalType) => set(() => ({ type: selectedType })),
}));

export const useModalStore = createSelectors(useModalStoreBase);
