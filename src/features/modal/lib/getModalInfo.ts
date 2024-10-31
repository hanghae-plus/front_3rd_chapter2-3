import { MODAL_INFOS } from '../config/constant';
import { ModalType } from '../model/types';

export const getModalInfo = (type: ModalType) => {
  return MODAL_INFOS[type];
};
